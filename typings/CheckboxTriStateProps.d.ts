/**
 * This file was generated from CheckboxTriState.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type EditabilityOverwriteEnum = "default" | "always";

export interface CheckboxTriStateContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    attributePath: EditableValue<string | boolean>;
    labelCaption?: DynamicValue<string>;
    editabilityOverwrite: EditabilityOverwriteEnum;
    onChangeAction?: ActionValue;
    onChangeActionOverwrite?: ActionValue;
    onEnterAction?: ActionValue;
    onLeaveAction?: ActionValue;
}

export interface CheckboxTriStatePreviewProps {
    class: string;
    style: string;
    attributePath: string;
    labelCaption: string;
    editabilityOverwrite: EditabilityOverwriteEnum;
    onChangeAction: {} | null;
    onChangeActionOverwrite: {} | null;
    onEnterAction: {} | null;
    onLeaveAction: {} | null;
}
