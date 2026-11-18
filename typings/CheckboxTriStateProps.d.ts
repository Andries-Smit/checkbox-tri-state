/**
 * This file was generated from CheckboxTriState.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type EditabilityOverwriteEnum = "default" | "always";

export interface CheckboxTriStateContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    attributePath: EditableValue<string | boolean>;
    labelCaption?: DynamicValue<string>;
    editabilityOverwrite: EditabilityOverwriteEnum;
    onChangeActionOverwrite?: ActionValue;
    onEnterAction?: ActionValue;
    onLeaveAction?: ActionValue;
}

export interface CheckboxTriStatePreviewProps {
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    attributePath: string;
    labelCaption: string;
    editabilityOverwrite: EditabilityOverwriteEnum;
    onChangeAction: {} | null;
    onChangeActionOverwrite: {} | null;
    onEnterAction: {} | null;
    onLeaveAction: {} | null;
}
