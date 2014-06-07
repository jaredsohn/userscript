// ==UserScript==
// @name         AnimeZone.pl Tweaks
// @description  Some css tweaks
// @version      0.1
// @namespace    userscripts.org/users/601753
// @author       peXu
// @include      /https?://(.*\.)?animezone\.pl/.*/
// @downloadURL  http://userscripts.org/scripts/source/408220.user.js
// @updateURL    http://userscripts.org/scripts/source/408220.meta.js
// @homepageURL  http://userscripts.org/scripts/show/408220
// @copyright    2013+, peXu (http://userscripts.org/users/601753)
// @license      http://creativecommons.org/licenses/by-nc-nd/4.0/
// @run-at       document-end
// ==/UserScript==

$("li.tlo-ogladane").find("div.box").attr("style","background-color:#DBEBFF !important; border: 1px solid #777 !important;");
$("span.pl").parents("li.tlo-ogladane").find("div.box").attr("style","background-color:#A2C4F0 !important; border: 1px solid #777 !important;");
$("div.likebox").parents("div.menu").css("display","none");
$("div#google-cont").parents("div.menu").css("display","none");