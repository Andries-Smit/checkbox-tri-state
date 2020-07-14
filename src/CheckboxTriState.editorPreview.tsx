import { Component, ReactNode, createElement } from "react";
import { Checkbox } from "./components/Checkbox";
import { CheckboxTriStatePreviewProps } from "../typings/CheckboxTriStateProps";

declare function require(name: string): string;

export class preview extends Component<CheckboxTriStatePreviewProps> {
    render(): ReactNode {
        return <Checkbox value="unchecked" />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/CheckboxTriState.scss");
}
