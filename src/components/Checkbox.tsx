import {
    ChangeEvent,
    Component,
    Fragment,
    ReactNode,
    DetailedHTMLProps,
    InputHTMLAttributes,
    createElement
} from "react";

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

export class Checkbox extends Component<CheckboxProps> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onFocusHandler = this.onFocus.bind(this);
    private readonly onBlurHandler = this.onBlur.bind(this);

    render(): ReactNode {
        const checked = this.props.value === "checked";
        const indeterminate = this.props.value === "mixed";
        const ariaChecked =
            this.props.value === "checked" ? "true" : this.props.value === "unchecked" ? "false" : "mixed";
        return (
            <Fragment>
                <input
                    className="mx-widget-checkbox-tri-state"
                    type="checkbox"
                    id={this.props.id}
                    disabled={this.props.disabled}
                    value="checkboxValue"
                    checked={checked}
                    tabIndex={this.props.tabIndex}
                    ref={el => el && (el.indeterminate = indeterminate)}
                    onChange={this.onChangeHandler}
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                    aria-checked={ariaChecked}
                    {...this.accessibilityProps()}
                />
                {this.getLabel()}
                {this.getValidation()}
            </Fragment>
        );
    }

    private accessibilityProps():
        | DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
        | undefined {
        if (this.props.validation) {
            return {
                "aria-invalid": true,
                "aria-describedby": this.props.id + "-error"
            };
        }
    }

    private getValidation(): ReactNode {
        if (this.props.validation) {
            return (
                <div
                    className="alert alert-danger mx-validation-message"
                    id={`${(this.props as any).id}-error`}
                    role="alert"
                >
                    {this.props.validation}
                </div>
            );
        }
        return null;
    }

    private getLabel(): ReactNode {
        if (this.props.label) {
            return (
                <label className="control-label" htmlFor={(this.props as any).id}>
                    {this.props.label}
                </label>
            );
        }
        return null;
    }

    private onChange(event: ChangeEvent<HTMLInputElement>): void {
        const value: CheckState = event.target.checked ? "checked" : "unchecked";
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    private onFocus(): void {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    private onBlur(): void {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }
}
