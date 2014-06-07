// ==UserScript==
// @name       FOK! Disable Zoomin
// @namespace  http://blablafokzoominzooi.nl
// @version    0.1
// @description  Disabled Zoomin onzin op FOK.nl
// @match      http://frontpage.fok.nl/
// @copyright  2012+, You
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

$('.rightColumnBlock').hide();
$("a[href='http://frontpage.fok.nl/page/videonieuws']").hide()