## Checkbox Tri State

Checkbox with three states; checked, unchecked and mixed.

## Features

An easy way to select and deselect a set of boolean attributes. And allowing you to indicated when only some of the
underling attributes are selected.

-   CSS styled checkbox, matching the standard checkbox.
-   Intermediated or mixed state, to indicated partial selected options.
-   Click on mixed state checkbox will change the value to checked.
-   Use enumeration a data source.
-   Accessible with key navigation and screen readers.
-   The change of the checkbox does only effect the enumerattion attribute and does not automatically reflect to its dependents, it requires an `On change` action.

When Mendix 8.12 has support for editable data source we can add more flexibilty to this widget.

## Usage

-   Place the widget in a context, for example a data view or a list view
-   Create a enumeration attribute, to identify the three states; `checked`, `unchecked`, `mixed`
-   In the `Checkbox Tri State` widget;
    -   Select the enumeration attribute, the enumeration should have values with the name:
        - For checked; "checked", "_true" or "true".
        - For unchecked; "unchecked", "_false" or "false".
        - For mixed; "mixed", "partial", "some" or "indeterminate".
    -   Add an `On change` event nanoflow to update the state of the correlated boolean attributes
-   In the correlated boolean widgets, add an `On change` event nanoflow to update the `Checkbox Tri State` widgets enumeration attribute.

## Demo

![Checkbox tri state](./assets/checkbox-tri-state.gif)
