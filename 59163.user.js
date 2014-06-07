// ==UserScript==
// @name           monospace-hudson
// @namespace      sondow
// @description    Eases coding on a Hudson job configure page, by enlarging text boxes and using monospace font
// @include        http://*/*job/*/configure
// @version        1.5
// ==/UserScript==

(function() {
    
    var insertAfter = function(newChild, refChild) { 
        refChild.parentNode.insertBefore(newChild,refChild.nextSibling); 
    };

    var canDataCellBeEnlarged = function(td) {
        return td.getAttribute('class') === 'setting-main' && td.tagName.toLowerCase() === 'td' && td.previousSibling;
    };

    var enlargeDataCell = function(td) {
        // Move all the nodes from the previous TD into the top of the current TD
        while (td.previousSibling.lastChild) {
            td.insertBefore(td.previousSibling.lastChild, td.firstChild);
        }
        td.setAttribute('colspan', '2');
        td.parentNode.removeChild(td.previousSibling);
    };

    var enlargeEmailBody = function() {
        var textareas, textarea, k, td;
        var seekingTextarea = true;
        textareas = document.getElementsByTagName('textarea');
        for (k = textareas.length - 1; k >= 0 && seekingTextarea; k--) {
            textarea = textareas[k];
            if (textarea.getAttribute('name') === 'project_default_content') {
                seekingTextarea = false;

                // Reorganize the table row that contains this textarea, to widen the textarea
                td = textarea.parentNode;
                if (canDataCellBeEnlarged(td)) {
                    enlargeDataCell(td);
                }
            }
        }
    };

    var enlargeEmailSubject = function() {
        var inputs, input, m, td, textarea, resizer;
        var seekingInput = true;
        inputs = document.getElementsByTagName('input');
        for (m = inputs.length - 1; m >= 0 && seekingInput; m--) {
            input = inputs[m];
            if (input.getAttribute('name') === 'project_default_subject' && input.getAttribute('type') === 'text') {
                seekingInput = false;
                // Replace text input with textarea to fit more visible code for dynamic subject line
                td = input.parentNode;
                if (canDataCellBeEnlarged(td)) {
                    // Create textarea
                    textarea = document.createElement('textarea');
                    textarea.value = input.value;
                    textarea.setAttribute('rows', '8');
                    textarea.setAttribute('class', input.getAttribute('class'));
                    textarea.setAttribute('name', input.getAttribute('name'));
                    td.replaceChild(textarea, input);

                    // Add a resizer control to the new textarea.
                    resizer = document.createElement('div');
                    resizer.setAttribute('class', 'textarea-handle');
                    insertAfter(resizer, textarea);

                    enlargeDataCell(td);
                }
            }
        }
    };

    var applyChanges = function() {
        var scripts, i, src;
        var seekingScript = true;
        scripts = document.getElementsByTagName('script');
        for (i = 0; i < scripts.length && seekingScript; i++) {
            src = scripts[i].getAttribute('src');
            if (src && src.indexOf('scripts/hudson-behavior.js') > -1) {
                seekingScript = false;
                GM_addStyle('textarea.setting-input, input.setting-input { font-family: monospace; }');
                enlargeEmailBody();
                enlargeEmailSubject();
            }
        }
    };

    applyChanges();

})();