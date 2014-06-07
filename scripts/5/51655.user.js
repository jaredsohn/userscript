// ==UserScript==
// @name           TheBox icons
// @namespace      TheBox
// @description    Use the native sizes for the category icons
// @include        http://thebox.bz/browse.php*
// @include        https://thebox.bz/browse.php*
// @copyright      Matias Korhonen
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("img[src*='categories']").removeAttr("width");
    $("img[src*='categories']").removeAttr("height");
});
