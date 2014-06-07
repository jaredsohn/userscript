// ==UserScript==

// @name          BH - SearchFocus
// @description   Set the focus on the search field
// @include       http://bithumen.ath.cx/browse.php

// ==/UserScript==



var myTextFields = document.getElementsByName('search');
myTextFields[0].focus();
