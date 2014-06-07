// ==UserScript==
// @name       Infamous to Unfamous
// @namespace  http://fury.pw
// @version    0.1
// @description  Allows you to change the Infamous userbar to the Unfamous one
// @include      *hackforums.net*
// @exclude     *x.hackforums.net*
// @exclude     *hackforums.net:8080*
// @require      http://code.jquery.com/jquery-1.10.2.min.js
// @copyright  2013, Harlem
// ==/UserScript==

$("img[src^='http://x.hackforums.net'][src*='infamous.gif']").attr("src", "http://i.imgur.com/hqEtryR.png");