// ==UserScript==
// @name        CA_BZ_stuff
// @namespace   t7koCeloxis
// @description CA_BZ_stuff
// @include     https://dev.cardaccess-inc.com/bugzilla/*
// @version     1
// @grant       none
// ==/UserScript==



// Highlight public bugs with pinkish color.
if (!document.getElementById("group_17").checked)
    {
        document.body.style.background = '#FFCBBA';
        document.getElementById("group_17").nextElementSibling.style.background = '#FFCBBA';
    }