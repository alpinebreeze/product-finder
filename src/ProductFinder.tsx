import React, { FC, useEffect, useState } from "react";
import toFinder, { Finder, Option } from "./finder";

interface FilterButtonOptions {
    facetName: string;
    filterName: string;
    hasOptions: boolean;
    onClick: (facetName: string, filterName: string) => void;
}

const FilterButton: FC<FilterButtonOptions> =
    ({ facetName, filterName, hasOptions, onClick }) => {
    const onFilterButtonClick = () => onClick(facetName, filterName);
    return (
        <button onClick={onFilterButtonClick} disabled={!hasOptions}>{filterName}</button>
    );
};

export interface Props {
    options: Option[];
}

const ProductFinder: FC<Props> = ({ options }) => {
    const [finder, setFinder] = useState<Finder>();
    useEffect(() => setFinder(toFinder(options)), [options]);

    if (!finder) { return null; }

    const onFilterClick = (facetName: string, filterName: string) =>
        setFinder(finder.selectFilter(facetName, filterName));

    const onResetClick = () => setFinder(finder.reset());

    return (
        <>
            <h1>Product Finder</h1>
            <button onClick={onResetClick}>reset</button>
            {
                finder.toFacets().map((facet) => (
                    <div key={facet.name}>
                        <h2>{facet.name}</h2>
                        {
                            facet.filters.map((filter) => (
                                <FilterButton
                                    facetName={facet.name}
                                    filterName={filter.name}
                                    hasOptions={filter.hasOptions}
                                    key={`${facet.name}-${filter.name}`}
                                    onClick={onFilterClick}
                                />
                            ))
                        }
                    </div>
                ))
            }
            <h3>Filtered Skus</h3>
            <pre>{JSON.stringify(finder.getFilteredSkus())}</pre>
        </>
    );
};

export default ProductFinder;
