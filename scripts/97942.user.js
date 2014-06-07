// ==UserScript==

// @name          Example Hider

// @description   An example Greasemonkey script that hides one line of text.

// @include       *

// ==/UserScript==




var trs = document.getElementsByTagName('tr');

for (i=0; i < trs.length; i++)

{

  trs[23].style.visibility = 'hidden';

}
