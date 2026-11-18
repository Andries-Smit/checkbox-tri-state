import { ReactElement } from "react";
import { ActionValue, EditableValue, ValueStatus } from "mendix";
import { Checkbox, CheckState } from "./components/Checkbox";

import { CheckboxTriStateContainerProps } from "../typings/CheckboxTriStateProps";

import "./ui/CheckboxTriState.scss";

const checkedValues = ["checked", "_true", "true", "all"];
const uncheckedValues = ["unchecked", "_false", "false", "none"];
const mixedValues = ["mixed", "partial", "some", "indeterminate"];

function getValue(attribute: EditableValue<string | boolean>): CheckState {
    const value = attribute.status === ValueStatus.Available ? String(attribute.value).toLowerCase() : undefined;
    if (!value) {
        return "unchecked";
    }
    if (checkedValues.includes(value)) {
        return "checked";
    }
    if (uncheckedValues.includes(value)) {
        return "unchecked";
    }
    if (mixedValues.includes(value)) {
        return "mixed";
    }
    return "unchecked";
}

function executeAction(action?: ActionValue): void {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
}

export function CheckboxTriState({
    attributePath,
    editabilityOverwrite,
    id,
    labelCaption,
    onChangeActionOverwrite,
    onEnterAction,
    onLeaveAction,
    tabIndex
}: CheckboxTriStateContainerProps): ReactElement {
    const disabled = editabilityOverwrite === "default" ? attributePath.readOnly : false;

    const onChange = (value: CheckState): void => {
        if (!attributePath.readOnly) {
            attributePath.setValue(value);
        } else if (editabilityOverwrite === "always") {
            executeAction(onChangeActionOverwrite);
        }
    };

    return (
        <Checkbox
            value={getValue(attributePath)}
            onChange={onChange}
            tabIndex={tabIndex}
            id={id}
            disabled={disabled}
            label={labelCaption?.status === ValueStatus.Available ? labelCaption.value : undefined}
            validation={attributePath.validation}
            onFocus={() => executeAction(onEnterAction)}
            onBlur={() => executeAction(onLeaveAction)}
        />
    );
}
