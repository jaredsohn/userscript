// ==UserScript==
// @name           Keep Autoaccept Box Checked
// @include        https://www.mturk.com/mturk/*
// ==/UserScript==

var checkboxes = document.getElementsByName('autoAcceptEnabled');

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked=true;
}