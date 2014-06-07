// ==UserScript==
// @name            Force AutoComplete always on.
// @namespace       http://vliegendehuiskat.nl/
// @description     Turns on autocomplete on for all text and password fields.
// @why             Not autocompleting passwords is annoying and might even be less secure than storing them.
// @Note            You will store passwords on your computer by using this! Make sure it's protected properly!
// @version         1
// @license         MIT http://www.opensource.org/licenses/MIT
// @include         *

// ==/UserScript==

(function() {
    var form, input;
    form = document.getElementsByTagName('form');
    if(form) {
        for(i = 0; i < form.length; i++) {
            form[i].setAttribute('autocomplete', 'on');
        }
        input = document.getElementsByTagName('input');
        for(i = 0; i < input.length; i++) {
            if(input[i].type=='text' || input[i].type=='password') {
            input[i].setAttribute('autocomplete', 'on');
            }
        }
    }
}) ();
