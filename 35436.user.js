// ==UserScript==
// @name           Moldymen Escaper
// @namespace      #aVg
// @version        0.2.1
// @description    Moldy Men is a disgusting site. this script will protect you if you come across it.
// @include        http://*moldymen.com/*
// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='SITE BLOCKED';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='You\'ve been led to MoldyMen.com!!!!\n Don\'t worry though! You are now safe :) Click the page to escape, or close this window';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:99px;border:medium inset grey;background:#CCCCCC;color:black;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://www.google.com/'");
}
document.body.appendChild(s);