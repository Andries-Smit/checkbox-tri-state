import { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";

export type CheckState = "checked" | "unchecked" | "mixed";

export interface CheckboxProps {
    value: CheckState;
    disabled?: boolean;
    id?: string;
    validation?: string;
    label?: string;
    tabIndex?: number;
    onChange?: (value: CheckState) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export function Checkbox({
    value,
    disabled,
    id,
    validation,
    label,
    tabIndex,
    onChange,
    onFocus,
    onBlur
}: CheckboxProps): ReactElement {
    const checked = value === "checked";
    const indeterminate = value === "mixed";
    const ariaChecked = value === "checked" ? "true" : value === "unchecked" ? "false" : "mixed";
    const accessibilityProps: InputHTMLAttributes<HTMLInputElement> | undefined = validation
        ? { "aria-invalid": true, "aria-describedby": id + "-error" }
        : undefined;

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(event.target.checked ? "checked" : "unchecked");
    };

    return (
        <>
            <input
                className="mx-widget-checkbox-tri-state"
                type="checkbox"
                id={id}
                disabled={disabled}
                value="checkboxValue"
                checked={checked}
                tabIndex={tabIndex}
                ref={el => {
                    if (el) {
                        el.indeterminate = indeterminate;
                    }
                }}
                onChange={onChangeHandler}
                onFocus={() => onFocus?.()}
                onBlur={() => onBlur?.()}
                aria-checked={ariaChecked}
                {...accessibilityProps}
            />
            {label ? (
                <label className="control-label" htmlFor={id}>
                    {label}
                </label>
            ) : null}
            {validation ? (
                <div className="alert alert-danger mx-validation-message" id={`${id}-error`} role="alert">
                    {validation}
                </div>
            ) : null}
        </>
    );
}
