// ==UserScript==
// @name            Enter email address on double click
// @namespace       http://zoopzoop.net/projects/greasemonkey_scripts/enter_email_address_on_doubleclick
// @description     Fills in an email address into an empty input field when the user doubleclicks on it
// @include         *
// ==/UserScript==

var string = 'myemail@address.com';

document.addEventListener('dblclick', 
    function(event) {
        if (event.target.nodeName.toLowerCase() == 'input' && event.target.value == '') {
            event.target.value = string;
        }
    }, true);