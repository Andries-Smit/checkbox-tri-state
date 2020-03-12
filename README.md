## Checkbox Tri State

Checkbox with three states; checked, unchecked and mixed.

## Features

An easy way to select and deselect a set of boolean attributes. And allowing you to indicated when only some of the
underling attributes are selected.

-   CSS styled checkbox, matching the standard checkbox.
-   Intermediated or mixed state, to indicated partial selected options.
-   Click on mixed state checkbox will change the value to checked.
-   Used on enumeration.
-   Accessibly with key navigation and screen readers.

## Usage

-   Place widget in a data view
-   Create a enumeration attribute, to identify the three states; `checked`, `unchecked`, `mixed`
-   In the `Checkbox Tri State` widget;
    -   Select the enumeration attribute
    -   Add an On change event nanoflow to update the state of the boolean attributes
-   In the correlated boolean widgets, add an On change event nanoflow to update set the mixed state
    `Checkbox Tri State` widgets enumeration attribute.

## Demo

![Checkbox tri state](./assets/checkbox-tri-state.gif)
