// ==UserScript==
// @name           KOC Captcha Killer
// @version        20130125b
// @namespace      mat
// @author          Autobot1
// @homepage        http://userscripts.org/scripts/show/157532
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include        *facebook.com/dialog/feed*
// @exclude

// @description    Automated features for Kingdoms of Camelot

// ==/UserScript==

var contents = document.getElementById("contents");
var link;
if(contents){
if(contents.textContent.match('.*(Routine Check).*')){
link = contents.getElementsByTagName("a")[1].href;
setTimeout(Captcha,250);//use a delay

}
}
function Captcha(){
location.href = link;
}