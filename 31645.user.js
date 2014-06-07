// ==UserScript==
// @name           Youtube High Quality
// @description    This script will automatically add "&fmt=18" to youtube URL if not already there, thus viewing videos in high quality.
// @namespace      http://kmad.homelinux.com/
// @include        http://www.youtube.com/watch*
// ==/UserScript==

var url = location.href;
var num = url.search("&fmt=18");
if(num == -1){
location.href=location.href + "&fmt=18";
}