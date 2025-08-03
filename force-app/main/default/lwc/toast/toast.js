/**
 * Copyright (c) 2025 Beyond The Cloud Sp. z o.o. (BeyondTheCloud.Dev)
 * Licensed under the MIT License (https://github.com/beyond-the-cloud-dev/lwc-utils/blob/main/LICENSE)
 **/

import LWCToast from 'lightning/toast';

import { reduceErrors } from 'c/errorService';

const VARIANT = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success'
};

const MODE = {
    DISMISSIBLE: 'dismissible',
    PESTER: 'pester',
    STICKY: 'sticky'
};

const VARIANT_TO_DEFAULT_LABEL = {
    [VARIANT.ERROR]: 'Error',
    [VARIANT.INFO]: 'Info',
    [VARIANT.SUCCESS]: 'Success',
    [VARIANT.WARNING]: 'Warning'
};
/*

import Toast from 'c/toast';

Toast.Builder(this).label('Success').message('This is a success message.').showSuccess();
Toast.Builder(this).label('Warning').message('This is a warning message.').showWarning();
Toast.Builder(this).label('Error').message('This is an error message.').showError();
Toast.Builder(this).label('Info').message('This is an info message.').showInfo();
*/

class Toast {
    static Builder(context) {
        class Builder {
            _context;
            _config = {
                label: '',
                message: '',
                variant: VARIANT.INFO,
                mode: MODE.DISMISSIBLE
            };

            constructor(context) {
                this._context = context;
            }

            label(label) {
                this._config.label = label;
                return this;
            }

            message(message) {
                this._config.message = reduceErrors(message);
                return this;
            }

            pester() {
                this._config.mode = MODE.PESTER;
                return this;
            }

            sticky() {
                this._config.mode = MODE.STICKY;
                return this;
            }

            messageLinks(messageLinks = {}) {
                this._config.messageLinks = messageLinks;
                return this;
            }

            labelLinks(labelLinks = {}) {
                this._config.labelLinks = labelLinks;
                return this;
            }

            showInfo() {
                this._setVariant(VARIANT.INFO);
                this._show();
            }

            showSuccess() {
                this._setVariant(VARIANT.SUCCESS);
                this._show();
            }

            showWarning() {
                this._setVariant(VARIANT.WARNING);
                this._show();
            }

            showError() {
                this._setVariant(VARIANT.ERROR);
                this._show();
            }

            _setVariant(variant) {
                this._config.label = this._config.label || VARIANT_TO_DEFAULT_LABEL[variant];
                this._config.variant = variant;
            }

            _show() {
                LWCToast.show(this._config, this._context);
            }
        }

        return new Builder(context);
    }
}

export default Toast;
