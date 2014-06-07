// ==UserScript==
// @name     _Remove Boost Post from Facebook
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/*--- Use the jQuery contains selector to find content to remove.
    Beware that not all whitespace is as it appears.
*/
var badDivs = $("div div:contains('Boost Post')");

badDivs.remove ();

//-- Or use badDivs.hide(); to just hide the content.
