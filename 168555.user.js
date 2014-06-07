// ==UserScript==
// @name       SongzaSK
// @namespace  http://twitter.com/iphone4life4
// @version    1.7
// @description  Unlimted skips on songza.com
// @match      http://songza.com/*
// @copyright  2013+, Manvir Singh
// @icon       https://dl.dropboxusercontent.com/u/19835281/icon.png
// ==/UserScript==
var $=unsafeWindow.jQuery;$("li.szi-skip-button.player-skip").live("click",function(){location.reload()});