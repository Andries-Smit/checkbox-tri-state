/**
 * This file was generated from CheckboxTriState.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue, ListValue, ObjectItem } from "mendix";

interface CommonProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export type SourceTypeEnum = "context" | "dataSource" | "enum";

export interface AttributeListType {
    attributeCtxBool: EditableValue<boolean>;
}

export interface AttributeListPreviewType {
    attributeCtxBool: string;
}

export interface AttributeListVisibilityType {
    attributeCtxBool: boolean;
}

export interface CheckboxTriStateContainerProps extends CommonProps {
    sourceType: SourceTypeEnum;
    attributeList: AttributeListType[];
    attributeDS?: ListValue;
    attributeDsBool?: (item: ObjectItem) => EditableValue<boolean>;
    attributeEnum?: EditableValue<string>;
    labelCaption?: DynamicValue<string>;
    onChangeAction?: ActionValue;
    onEnterAction?: ActionValue;
    onLeaveAction?: ActionValue;
}

export interface CheckboxTriStatePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    sourceType: SourceTypeEnum;
    attributeList: AttributeListPreviewType[];
    attributeDS?: ListValue;
    attributeDsBool?: (item: { type: string }) => string;
    attributeEnum?: string;
    labelCaption?: string;
    onChangeAction?: ActionPreview;
    onEnterAction?: ActionPreview;
    onLeaveAction?: ActionPreview;
}

export interface VisibilityMap {
    sourceType: boolean;
    attributeList: AttributeListVisibilityType[] | boolean;
    attributeDS: boolean;
    attributeDsBool: boolean;
    attributeEnum: boolean;
    labelCaption: boolean;
    onChangeAction: boolean;
    onEnterAction: boolean;
    onLeaveAction: boolean;
}
