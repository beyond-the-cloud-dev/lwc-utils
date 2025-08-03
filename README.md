# LWC Utilities

This repository contains a collection of utility modules for Lightning Web Components.

## Error Service (`c/errorService`)

The `reduceErrors` function simplifies error handling by converting various Salesforce error formats into a single, user-friendly string.

### Usage

```javascript
import { reduceErrors } from 'c/errorService';

try {
    // some code that may throw an error
} catch (error) {
    const errorMessage = reduceErrors(error);
    // Now you can display `errorMessage` to the user.
}
```

## Toast Service (`c/toast`)

A convenient builder-pattern utility for displaying toast notifications.

### Usage

To show a toast, import the `Toast` module and use the `Builder`.

```javascript
import Toast from 'c/toast';

// Show a success toast
Toast.Builder(this)
    .label('Success')
    .message('Record saved successfully!')
    .showSuccess();

// Show an error toast with a reduced error message from the error service
someApexMethod()
    .then(result => {
        // ...
    })
    .catch(error => {
        Toast.Builder(this).message(error).showError(); // The label will default to 'Error'
    });
```

### Builder Methods

-   `.label(string)`: Sets the toast's title. Defaults based on variant (e.g., 'Error' for `showError`).
-   `.message(string | object | object[])`: Sets the toast's message. It automatically reduces Salesforce errors via `c/errorService`.
-   `.pester()`: Sets the mode to 'pester' (the toast remains on screen until the user dismisses it).
-   `.sticky()`: Sets the mode to 'sticky' (the toast remains on screen until the user dismisses it, and it isn't automatically dismissed).
-   `.showSuccess()`: Shows a success toast.
-   `.showInfo()`: Shows an info toast.
-   `.showWarning()`: Shows a warning toast.
-   `.showError()`: Shows an error toast.

# License notes:

- For proper license management each repository should contain LICENSE file similar to this one.
- each original class should contain copyright mark: © Copyright 2025, Beyond The Cloud Dev Authors
