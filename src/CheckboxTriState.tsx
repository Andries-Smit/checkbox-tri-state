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
                value={this.getValue(this.props.attributePath)}
                onChange={this.onChangeHandler}
                tabIndex={this.props.tabIndex}
                id={(this.props as any).id}
                disabled={this.disabled()}
                label={
                    this.props.labelCaption?.status === ValueStatus.Available
                        ? this.props.labelCaption.value
                        : undefined
                }
                validation={this.props.attributePath.validation}
                onFocus={this.onEnterHandler}
                onBlur={this.onLeaveHandler}
            />
        );
    }

    private disabled(): boolean {
        if (this.props.editabilityOverwrite === "default") {
            return this.props.attributePath.readOnly;
        }
        return false;
    }

    private onChange(value: CheckState): void {
        if (!this.props.attributePath.readOnly) {
            this.props.attributePath.setValue(value);
        } else if (this.props.editabilityOverwrite === "always") {
            this.executeAction(this.props.onChangeActionOverwrite);
        }
    }

    private onEnterChange(): void {
        this.executeAction(this.props.onEnterAction);
    }

    private onLeaveChange(): void {
        this.executeAction(this.props.onLeaveAction);
    }

    private getValue(attribute: EditableValue<string | boolean>): CheckState {
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
