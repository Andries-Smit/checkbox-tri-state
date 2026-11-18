import { ReactElement } from "react";
import { Checkbox } from "./components/Checkbox";
import { CheckboxTriStatePreviewProps } from "../typings/CheckboxTriStateProps";

export function preview(_props: CheckboxTriStatePreviewProps): ReactElement {
    return <Checkbox value="unchecked" />;
}

export function getPreviewCss(): string {
    return require("./ui/CheckboxTriState.scss");
}
