// ==UserScript==
// @name       Text Message LOL Signup Removal
// @version    0.5
// @description  Deletes Facebook Login splash page.
// @include      /^https?://(www.)?textmessagelol.com/
// @include      /^https?://(www.)?sofunnyhahapictures.com/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  Yiffy Trippy Jackyl 2013, http://twitter.com/yiffyjackyl
// ==/UserScript==

//<div id="simplemodal-container" class="simplemodal-container" style="position: fixed; z-index: 1002; height: 320px; width: 740px; left: 271.5px; top: 57px;">

$(document).ready(function() {
    $("#simplemodal-overlay").fadeOut("slow", function() { $(this).remove(); });
    $("#simplemodal-container").fadeOut("slow", function() { $(this).remove(); });
});