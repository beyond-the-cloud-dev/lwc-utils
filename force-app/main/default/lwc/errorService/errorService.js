/**
 * Copyright (c) 2025 Beyond The Cloud Sp. z o.o. (BeyondTheCloud.Dev)
 * Licensed under the MIT License (https://github.com/beyond-the-cloud-dev/lwc-utils/blob/main/LICENSE)
 **/

/*
import { reduceErrors } from 'c/errorService';

try {
   some code that may throw an error
} catch (error) {
    const errorMessage = reduceErrors(error);
}
*/
const reduceErrors = (errors) => {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return errors
        .filter((error) => !!error)
        .map((error) => {
            if (Array.isArray(error.body)) {
                return error.body?.map((e) => e.message);
            }

            if (error.body?.pageErrors && error.body?.pageErrors?.length > 0) {
                return error.body?.pageErrors?.map((e) => e.message);
            }

            if (error.body?.fieldErrors && Object.values(error.body?.fieldErrors)?.length > 0) {
                return Object.values(error.body?.fieldErrors).map((fieldErrors) => fieldErrors.map((e) => e.message).join(", "));
            }

            if (error.body?.output?.errors && error.body?.output?.errors.length > 0) {
                return error.body?.output?.errors?.map((e) => e.message);
            }

            if (error.body?.output?.fieldErrors && Object.values(error.body?.output?.fieldErrors).length > 0) {
                return Object.values(error.body?.output?.fieldErrors).map((fieldErrors) => fieldErrors.map((e) => e.message).join(", "));
            }

            return error.body?.message || error?.message || error?.statusText || error;
        })
        .reduce((previous, currentError) => previous.concat(currentError), [])
        .filter((error) => !!error)
        .join(", ");
};

export { reduceErrors };
