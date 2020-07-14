import { CheckboxTriStatePreviewProps } from "../typings/CheckboxTriStateProps";
import { hideProperty, Problem, Properties } from "./piw-utils/src/index";

export function getProperties(values: CheckboxTriStatePreviewProps, defaultProperties: Properties): Properties {
    // console.log(JSON.stringify(defaultProperties));
    if (values.sourceType !== "enum") {
        hideProperty<CheckboxTriStatePreviewProps>("attributeEnum", defaultProperties);
    }
    if (values.sourceType !== "dataSource") {
        hideProperty<CheckboxTriStatePreviewProps>("attributeDS", defaultProperties);
        hideProperty<CheckboxTriStatePreviewProps>("attributeDsBool", defaultProperties);
    }
    if (values.sourceType !== "context") {
        hideProperty<CheckboxTriStatePreviewProps>("attributeList", defaultProperties);
    }

    return defaultProperties;
}

export function check(values: CheckboxTriStatePreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.sourceType === "enum" && !values.attributeEnum) {
        errors.push({
            property: "attributeEnum",
            severity: "error",
            message: "Data type 'Enumeration' requires 'Attribute (path)' to be selected"
        });
    }
    if (values.sourceType === "dataSource" && !values.attributeDS) {
        errors.push({
            property: "attributeDS",
            severity: "error",
            message: "Data type 'Data source' requires 'Data source' to be selected"
        });
    }

    if (values.sourceType === "dataSource" && !values.attributeDsBool) {
        errors.push({
            property: "attributeDsBool",
            severity: "error",
            message: "Data type 'Data source' requires 'Attribute (path)' to be selected"
        });
    }

    if (values.sourceType === "context" && values.attributeList.length === 0) {
        errors.push({
            property: "attributeDsBool",
            severity: "error",
            message: "Data type 'Context' requires selected attribute in the list 'Attributes'"
        });
    }
    return errors;
}
