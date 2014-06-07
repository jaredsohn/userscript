// ==UserScript==
// @name       Enlarge PHP Online Editor
// @namespace  http://writecodeonline.com/php/
// @version    0.1
// @description  enlarge editor
// @match      http://writecodeonline.com/php/*
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at document-end
// ==/UserScript==
var $ = unsafeWindow.jQuery || $;
$(".CodeMirror-scrollbar").css("height" , "500px");
$(".CodeMirror-gutter").css("height" , "500px");
$(".CodeMirror-scroll.cm-s-default").css("height" , "500px");
$("#run-button-wrapper").css("top", "430px");