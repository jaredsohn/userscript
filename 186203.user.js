// ==UserScript==
// @name       hide chat note
// @namespace  http://www.whitebyte.info/
// @version    0.0.1
// @description  Hides the gmail chat note about invisibility
// @match      https://mail.google.com/*
// @copyright  2013+, Nick Russler
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==

waitForKeyElements('.ul[role="alert"]', function() {
   $('.ul[role="alert"]').hide();
});