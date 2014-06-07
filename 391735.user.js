// ==UserScript==
// @name        Twitter image remove
// @namespace   http://twitter.com
// @description Hides images from the twitter timeline, replaces it by a link?
// @include     https://twitter.com*
// @version     5
// @grant       none
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


$(document).ready(function () {
    (function hideThemAnnoyingThings()
    {
         $('.is-preview').each(function () {
             $(this).children("img").hide();
             $(this).text("Open full tweet");
         });
         setTimeout(hideThemAnnoyingThings, 2000);
    })();
});
