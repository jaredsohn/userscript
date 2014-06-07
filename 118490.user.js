// ==UserScript==
// @name           আমার-রেপু-লুকাও
// @namespace      Mokadd.im/gmscripts/Projanmo
// @description    আমার রেপু লুকাও, কারণ এটা নিয়ে আমি ভাবি না
// @include        /^https?://(www\.)?forum\.projanmo\.com/(viewtopic|topic|post|viewpost).*/
// @version        1.0.0
// @icon           http://forum.projanmo.com/extensions/reputation/plus.gif
// ==/UserScript==

var _$ = unsafeWindow.jQuery;
var p="uid="+_$("#navprofile > a").attr("href").match(/(\d+)\.html/)[1];
_$("a[href$='"+p+"']").parent().parent().hide();


