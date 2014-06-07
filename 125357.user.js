// ==UserScript==
// @name            HF Script - HF Post Helper
// @namespace       xerotic/hfposthelper
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.2
// ==/UserScript==
test

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;