import { storiesOf } from "@storybook/react";
import React from "react";
import ProductFinder from "./ProductFinder";

const options = [
    {
        props: {
            carrier: "Rogers",
            color: "Black",
            model: "iPhone 11",
            size: "16 GB",
        },
        sku: "1000001",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Blue",
            model: "iPhone 11",
            size: "16 GB",
        },
        sku: "1000002",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Blue",
            model: "iPhone 11",
            size: "32 GB",
        },
        sku: "1000003",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Black",
            model: "iPhone 11 XL",
            size: "32 GB",
        },
        sku: "1000004",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Black",
            model: "iPhone 11 XL",
            size: "64 GB",
        },
        sku: "1000005",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Blue",
            model: "iPhone 11 XL",
            size: "32 GB",
        },
        sku: "1000006",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Blue",
            model: "iPhone 11 XL",
            size: "64 GB",
        },
        sku: "1000007",
    },
    {
        props: {
            carrier: "Rogers",
            color: "Red",
            model: "iPhone 11 XL",
            size: "128 GB",
        },
        sku: "1000008",
    },
    {
        props: {
            carrier: "Bell",
            color: "Red",
            model: "iPhone 11 XL",
            size: "128 GB",
        },
        sku: "1000009",
    },
    {
        props: {
            carrier: "Telus",
            color: "Black",
            model: "iPhone 11",
            size: "16 GB",
        },
        sku: "1000010",
    },
];

storiesOf("ProductFinder", module)
    .add("default", () => (
        <ProductFinder options={options} />
    ));
