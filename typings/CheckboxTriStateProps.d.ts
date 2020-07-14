/**
 * This file was generated from CheckboxTriState.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface CheckboxTriStateContainerProps extends CommonProps {
    attribute: EditableValue<string>;
    labelCaption?: DynamicValue<string>;
    onChangeAction?: ActionValue;
    onEnterAction?: ActionValue;
    onLeaveAction?: ActionValue;
}

export interface CheckboxTriStatePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    attribute: string;
    labelCaption?: string;
    onChangeAction?: ActionPreview;
    onEnterAction?: ActionPreview;
    onLeaveAction?: ActionPreview;
}

export interface VisibilityMap {
    attribute: boolean;
    labelCaption: boolean;
    onChangeAction: boolean;
    onEnterAction: boolean;
    onLeaveAction: boolean;
}
