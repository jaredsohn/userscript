// ==UserScript==
// @name       Infamous to Unfamous
// @namespace  http://megaviews.net/
// @version    0.1
// @description  Allows you to change the Infamous to the Unfamous one
// @include      *hackforums.net*
// @exclude     *x.hackforums.net*
// @exclude     *hackforums.net:8080*
// @require      http://code.jquery.com/jquery-1.10.2.min.js
// @copyright  2013, 1n9i9c7om
// ==/UserScript==

$(document).ready(function() {
    $("img[src='http://x.hackforums.net/images/blackreign/groupimages/english/infamous.gif']").each(function() {
        $(this).attr("src", "http://i.imgur.com/hqEtryR.png");
    });

    $("img[src='http://x.hackforums.net/images/modern_pl/groupimages/english/infamous.gif']").each(function() {
        $(this).attr("src", "http://i.imgur.com/hqEtryR.png");
    });

    $("img[src='http://x.hackforums.net/images/modern_bl/groupimages/english/infamous.gif']").each(function() {
        $(this).attr("src", "http://i.imgur.com/hqEtryR.png");
    });
});