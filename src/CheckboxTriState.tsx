import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { Checkbox, CheckState } from "./components/Checkbox";
import { CheckboxTriStateContainerProps, AttributeListType } from "../typings/CheckboxTriStateProps";
import { ActionValue, EditableValue, ValueStatus, ObjectItem, ListValue } from "mendix";

import "./ui/CheckboxTriState.scss";

type DataSourceAttribute = (item: ObjectItem) => EditableValue<boolean>;

class CheckboxTriState extends Component<CheckboxTriStateContainerProps> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onEnterHandler = this.onEnterChange.bind(this);
    private readonly onLeaveHandler = this.onLeaveChange.bind(this);

    render(): ReactNode {
        return (
            <Checkbox
                value={this.getValue()}
                onChange={this.onChangeHandler}
                id={(this.props as any).id}
                disabled={this.getDisabled()}
                label={
                    this.props.labelCaption?.status === ValueStatus.Available
                        ? this.props.labelCaption.value
                        : undefined
                }
                validation={this.getValidation(this.props.attributeEnum)}
                onFocus={this.onEnterHandler}
                onBlur={this.onLeaveHandler}
            />
        );
    }

    private getValidation(attributeEnum?: EditableValue<string>): string | undefined {
        return attributeEnum?.validation;
    }

    private getValue(): CheckState {
        const { sourceType, attributeList, attributeEnum, attributeDS, attributeDsBool } = this.props;
        if (sourceType === "context") {
            return this.getValueContext(attributeList);
        } else if (sourceType === "enum" && attributeEnum) {
            return this.getValueEnum(attributeEnum);
        } else if (sourceType === "dataSource" && attributeDS && attributeDsBool) {
            return this.getValueDataSource(attributeDS, attributeDsBool);
        }
        return "unchecked";
    }

    private getValueDataSource(attributeDS: ListValue, attributeDsBool: DataSourceAttribute): CheckState {
        let values: boolean[] = [];
        if (attributeDS.status === ValueStatus.Available) {
            values = attributeDS.items?.map(item => attributeDsBool(item).value || false) ?? [];
        }
        return this.getCheckState(values);
    }

    private getValueContext(attributeList: AttributeListType[]): CheckState {
        const values = attributeList.map(a =>
            a.attributeCtxBool.status === ValueStatus.Available ? a.attributeCtxBool.value || false : false
        );
        return this.getCheckState(values);
    }

    getCheckState(values: boolean[]): CheckState {
        const trueValue = values.filter(v => v);
        const falseValue = values.filter(v => !v);
        if (!values.length || values.length === falseValue.length) {
            return "unchecked";
        }
        if (values.length === trueValue.length) {
            return "checked";
        }
        return "mixed";
    }

    getDisabled(): boolean {
        const { sourceType, attributeEnum, attributeList, attributeDS, attributeDsBool } = this.props;
        if (sourceType === "context") {
            return attributeList.some(a => a.attributeCtxBool.readOnly);
        } else if (sourceType === "enum" && attributeEnum) {
            return attributeEnum.readOnly;
        } else if (
            sourceType === "dataSource" &&
            attributeDS &&
            attributeDsBool &&
            attributeDS.status === ValueStatus.Available
        ) {
            return attributeDS.items?.some(i => attributeDsBool(i).readOnly) || false;
        }
        return true;
    }

    private onChange(value: CheckState): void {
        const { sourceType, attributeList, attributeEnum, attributeDS, attributeDsBool } = this.props;
        if (sourceType === "context") {
            attributeList.forEach(a => a.attributeCtxBool.setValue(value === "checked"));
        } else if (sourceType === "enum" && attributeEnum) {
            attributeEnum.setValue(value);
        } else if (
            sourceType === "dataSource" &&
            attributeDS &&
            attributeDsBool &&
            attributeDS.status === ValueStatus.Available &&
            attributeDS.items
        ) {
            attributeDS.items.forEach(item => {
                attributeDsBool(item).setValue(value === "checked");
            });
        }
    }

    private onEnterChange(): void {
        this.executeAction(this.props.onEnterAction);
    }

    private onLeaveChange(): void {
        this.executeAction(this.props.onLeaveAction);
    }

    private getValueEnum(attribute: EditableValue<string>): CheckState {
        const checked = ["checked", "_true", "true", "all"];
        const unchecked = ["unchecked", "_false", "false", "none"];
        const mixed = ["mixed", "partial", "some", "indeterminate"];
        const value = attribute.status === ValueStatus.Available ? String(attribute.value).toLowerCase() : undefined;
        if (!value) {
            return "unchecked";
        }
        if (checked.indexOf(value) !== -1) {
            return "checked";
        }
        if (unchecked.indexOf(value) !== -1) {
            return "unchecked";
        }
        if (mixed.indexOf(value) !== -1) {
            return "mixed";
        }
        return "unchecked";
    }

    private executeAction(action?: ActionValue): void {
        if (action && action.canExecute && !action.isExecuting) {
            action.execute();
        }
    }
}

export default hot(CheckboxTriState);
