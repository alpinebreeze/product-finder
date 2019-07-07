export interface Option {
    sku: string;
    props: {
        [key: string]: string;
    };
}

interface Filter {
    skus: string[];
}

interface FacetMap {
    [name: string]: {
        filterMap: {
            [name: string]: Filter,
        },
    };
}

const buildFacetMap = (options: Option[]): [FacetMap, string[]] => {
    const facetMap: FacetMap = {};
    const allSkus: string[] = [];

    for (const option of options) {
        allSkus.push(option.sku);
        for (const facetName in option.props) {
            if (option.props.hasOwnProperty(facetName)) {
                const filterName = option.props[facetName];
                if (!facetMap[facetName]) {
                    facetMap[facetName] = { filterMap: {} };
                }
                if (!facetMap[facetName].filterMap[filterName]) {
                    facetMap[facetName].filterMap[filterName] = { skus: [] };
                }
                facetMap[facetName].filterMap[filterName].skus.push(option.sku);
            }
        }
    }

    return [facetMap, allSkus];
};

const intersect = <T>(a: T[], b: T[]) => a.filter((x) => b.indexOf(x) >= 0);

type Filters = Array<{ name: string; hasOptions: boolean }>;
export type Facets = Array<{ name: string, filters: Filters }>;

const buildFacets = (facetMap: FacetMap, filteredSkus: string[]): Facets => {
    const facets: Facets = [];
    for (const facetName in facetMap) {
        if (facetMap.hasOwnProperty(facetName)) {
            const { filterMap } = facetMap[facetName];
            const filters: Filters = [];
            for (const filterName in filterMap) {
                if (filterMap.hasOwnProperty(filterName)) {
                    const filter = filterMap[filterName];
                    const hasOptions = !!intersect(filteredSkus, filter.skus).length;
                    filters.push({ name: filterName, hasOptions });
                }
            }
            facets.push({ name: facetName, filters });
        }
    }
    return facets;
};

export interface Finder {
    getFilteredSkus(): string[];
    reset(): Finder;
    selectFilter(facetName: string, filterName: string): Finder;
    toFacets(): Facets;
}

const toFinder = (options: Option[]): Finder => {
    const [facetMap, allSkus] = buildFacetMap(options);
    let selectedFilters: Filter[] = [];

    const getFilteredSkus = () => {
        let filteredSkus = allSkus;
        for (const filter of selectedFilters) {
            filteredSkus = intersect(filteredSkus, filter.skus);
        }
        return filteredSkus;
    };

    const reset = () => {
        selectedFilters = [];
        return finder();
    };

    const selectFilter = (facetName: string, filterName: string) => {
        if (facetMap[facetName] && facetMap[facetName].filterMap[filterName]) {
            const filter = facetMap[facetName].filterMap[filterName];
            if (selectedFilters.indexOf(filter) < 0) {
                selectedFilters.push(filter);
            }
        }
        return finder();
    };

    const toFacets = () => buildFacets(facetMap, getFilteredSkus());

    const finder = () => ({ getFilteredSkus, reset, selectFilter, toFacets });

    return finder();
};

export default toFinder;
