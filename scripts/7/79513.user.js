// ==UserScript==
// @name           iGoogle Addstuff / Footer Remove
// @namespace      http://www.google.com
// @description    Removes the "Add stuff' links and the entire footer from iGoogle
// @include        http://www.google.com/ig*

// ==/UserScript==

var addstuff = document.getElementById('addstuff');
addstuff.style.display='none';

var footerwrap = document.getElementById('footerwrap');
footerwrap.style.display='none';