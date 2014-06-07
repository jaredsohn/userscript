// ==UserScript==
// @name           Actors Access
// @namespace      Zer0Nin3r
// @description    Hides the Submission Instructions on the Actors Access website.
// @include        http://www.actorsaccess.com/projects/*
// ==/UserScript==

var SubIn = document.getElementById('message');
if (SubIn) {
    SubIn.parentNode.removeChild(SubIn);
}
