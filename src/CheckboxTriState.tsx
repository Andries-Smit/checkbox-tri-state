import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { Checkbox, CheckState } from "./components/Checkbox";
import { CheckboxTriStateContainerProps } from "../typings/CheckboxTriStateProps";
import { ActionValue, EditableValue, ValueStatus } from "mendix";

import "./ui/CheckboxTriState.scss";

class CheckboxTriState extends Component<CheckboxTriStateContainerProps> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onEnterHandler = this.onEnterChange.bind(this);
    private readonly onLeaveHandler = this.onLeaveChange.bind(this);

    render(): ReactNode {
        return (
            <Checkbox
                value={this.getValue(this.props.attribute)}
                onChange={this.onChangeHandler}
                id={(this.props as any).id}
                disabled={this.props.attribute.readOnly}
                label={
                    this.props.labelCaption?.status === ValueStatus.Available
                        ? this.props.labelCaption.value
                        : undefined
                }
                validation={this.props.attribute.validation}
                onFocus={this.onEnterHandler}
                onBlur={this.onLeaveHandler}
            />
        );
    }

    private onChange(value: CheckState): void {
        this.props.attribute.setValue(value);
    }

    private onEnterChange() {
        this.executeAction(this.props.onEnterAction);
    }

    private onLeaveChange() {
        this.executeAction(this.props.onLeaveAction);
    }

    private getValue(attribute: EditableValue<string>): CheckState {
        const checked = ["checked", "_true", "true"];
        const unchecked = ["unchecked", "_false", "false"];
        const partial = ["partial", "mixed", "some", "indeterminate"];
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
        if (partial.indexOf(value) !== -1) {
            return "partial";
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
