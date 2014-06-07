// ==UserScript==
// @name        MingPao JUMP Fix
// @namespace   http://jump.mingpao.com
// @include     http://jump.mingpao.com/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function(){var a={start:function(){var b=window.location.href.toLowerCase();-1===b.indexOf("cfm")?a.fixHome():a.enableRightClick()},fixHome:function(){window.location.href="http://jump.mingpao.com/cfm"},enableRightClick:function(){$("style").remove(),$("head > script:not([src])").remove(),document.oncontextmenu=function(){}}};a.start()})();