// ==UserScript==
// @name     Usuwanie blednego pytania
// @include  *first-impressions.nl*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/*--- Use the jQuery contains selector to find content to remove.
    Beware that not all whitespace is as it appears.
*/

var elmDeleted = document.getElementById("vraag2_HIDDEN");
elmDeleted.parentNode.removeChild(elmDeleted);

var elmDeleted = document.getElementById("vraag3_HIDDEN");
elmDeleted.parentNode.removeChild(elmDeleted);

//-- Or use badDivs.hide(); to just hide the content.