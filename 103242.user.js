// ==UserScript==
// @name Nicovideo highlight
// @namespace http://nicolive.m264.com/user.js/page/nicovideo_highlight
// @author m264(ryutaro)
// @version 1.11.pb
// @include http://www.nicovideo.jp/watch/*
// @exclude *.css
// @exclude *.js
// ==/UserScript==

(function() {
var body = document.getElementById('PAGETOP');
var grey = document.createElement('div');
grey.id = 'grey';
grey.innerHTML = "<div id=\"greywall\" ><span onclick=\"document.getElementById('greywall').style.cssText = 'display:none;';document.getElementById('ongrey').style.cssText = 'display:inline;color:#F00;position:fixed;top:0px;right:10px;z-index:10000;';document.getElementById('greyoff').style.cssText = 'display:none;';\" style=\"background-image:url('http://nicolive.m264.com/user.js/imgs/glayer.png');height:100%;position:fixed !important;top:0;width:100%;background-attachment:fixed;\" /></div><span id=\"greyoff\"style=\"color:#F00;position:fixed;top:0px;right:10px;z-index:10000;\" onclick=\"document.getElementById('greywall').style.cssText = 'display:none;';document.getElementById('ongrey').style.cssText = 'display:inline;color:#F00;position:fixed;top:0px;right:10px;z-index:10000;';document.getElementById('greyoff').style.cssText = 'display:none;';\" >×</span><span id=\"ongrey\" style=\"display:none;\" onclick=\"document.getElementById('greywall').style.cssText = 'display:inline;';document.getElementById('greyoff').style.cssText = 'display:inline;color:#F00;position:fixed;top:0px;right:10px;z-index:10000;';document.getElementById('ongrey').style.cssText = 'display:none;';\">○</span>"
body.appendChild(grey)
document.getElementById("flvplayer_container").style.cssText = 'height:512px; z-index:2525;';
   })();