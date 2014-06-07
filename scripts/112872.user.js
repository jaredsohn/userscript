// ==UserScript==
// @name           Form AutoComplete On
// @namespace      http://userscripts.org/scripts/edit_src/112872
// @description    Turns On Auto-Completes on Login Inputs
// @include        http*
// @grant        none
// ==/UserScript==

"use strict";

function fix_passwd_form() {
    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++)
    {
        var input = inputs[i];
        input.setAttribute('autocomplete', 'on');
    }
}

fix_passwd_form();