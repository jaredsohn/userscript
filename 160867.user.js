// ==UserScript==
// @name        Adchieve - MacroFilterTest
// @namespace   https://secure.adchieve.com/
// @include     https://secure.adchieve.com/account/45/macro/
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @version     1
// ==/UserScript==
 $(document).ready(function() {
   var hide_me = $("tr:contains("Kitchen")");
hide_me.hide();
 });
