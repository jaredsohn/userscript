// ==UserScript==
// @name            Auto Submit
// @namespace       auto submit
// @include         *
// ==/UserScript==
var button = (document.getElementsByName("continue")||document.getElementsByName("btnSubmit"))[0];
if(button) button.click();