// ==UserScript==
// @name        Autocomplete On
// @namespace   http://userscripts.org/scripts/show/7347
// @description Searches for autocomplete attributes in the page and sets the value to on.
// @include     *
// @version     10.0
// ==/UserScript==

location.replace('javascript:(' + function() {
    function enableAutocomplete()
    {
        /* Get all autocomplete attributes */
        var nodeSnapshot = document.evaluate('//*[@autocomplete]', document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
            numNodeValues = nodeSnapshot.snapshotLength - 1,
            focusedAndBlurred = false,
            formNode = null,
            numFormElements = 0,
            scrollX = window.pageXOffset,
            scrollY = window.pageYOffset,
            activeElement = document.activeElement;
        /* Loop through all the attributes found in the snapshot */
        for (var i = numNodeValues; i >= 0; i--) {
            /*
                Get the attribute snapshot object and
                Change the attribute value to "on"
            */
            nodeSnapshot.snapshotItem(i).setAttribute('autocomplete', 'on');
            /* If element is of type text and autocomplete is set, it's probably the username */
            if (nodeSnapshot.snapshotItem(i).getAttribute('type') == 'text') {
                /*
                    Blurring and focusing allows gecko to make suggestions
                    immediately when double clicking username
                */
                nodeSnapshot.snapshotItem(i).focus();
                nodeSnapshot.snapshotItem(i).blur();
                focusedAndBlurred = true;
            }
            /* Remember the form node if autocomplete was set on it */
            if (nodeSnapshot.snapshotItem(i).nodeName.toLowerCase() == 'form') {
                formNode = nodeSnapshot.snapshotItem(i);
                numFormElements = formNode.elements.length - 1;
            }
        }
        /*
            If formNode was set and username was not focused and blurred,
            then autocomplete was only set on the form node
        */
        if (formNode != null && ! focusedAndBlurred) {
            for (var i = numFormElements; i >= 0; i--) {
                /* Blur and focus every text field in the form ending with the first field */
                if (formNode.elements[i].getAttribute('type') == 'text') {
                    formNode.elements[i].focus();
                    formNode.elements[i].blur();
                    focusedAndBlurred = true;
                }
            }
        }
        /*
            If form fields were focused and blurred, return to the original
            scroll position and refocus the active element
        */
        if (focusedAndBlurred) {
            activeElement.focus();
            window.scrollTo(scrollX, scrollY);
        }
    }
    function newSubmit()
    {
        enableAutocomplete();
        if (this._submit !== undefined) {
            this._submit();
        }
    }
    /* Override DOM submit */
    HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = newSubmit;
    /* Run enable on form submit and page load */
    window.addEventListener('submit', newSubmit, true);
    window.addEventListener('load', enableAutocomplete, false);
} + ')()');