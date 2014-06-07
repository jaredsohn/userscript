// ==UserScript==
// @name          Megaupload NO TIME + AUTO DOWNLOAD = MU Bundle Final
// @namespace     Avindra + Descriptor + Goolcharan + #avg + Lesenus
// @version       1.0 Final
// @description   Don't waste your time to wait before download MU link
// @include       http://*.megaupload.com/?d=*
// ==/UserScript==
//---------------------------------------------------------------------------------
// LESENUS - My job was to fix all errors after compile to Firefox plugin, change interface to original and delete unnecessary scripts.
//---------------------------------------------------------------------------------
// 
// PREVERIOUS MESSAGES
//
// Like RS_Bundle, coded from scratch, but based off Descriptor's awesome scripts.
// This is the original MU_Bundle: http://userscripts.org/scripts/show/10420
// Fixed errors and interface from MU_Bundle - A Megaupload helper [Revived] [march 09]: http://userscripts.org/scripts/show/43390

//---------------------------------------------------------------------------------
//  Change $ to TimeDownload --> no errors after compilation (Lesenus)
//---------------------------------------------------------------------------------

var TimeDownload=function(x) {return document.getElementById(x)},
    single=function(x,y) {return document.evaluate(x,y||document,null,9,null).singleNodeValue};

var captcha=TimeDownload("captchafield");
if(captcha) {
//---------------------------------------------------------------------------------
//  DELETE BIG IMAGE AND ERROR SCRIPT, SHOW ORIGINAL SITE (Lesenus)
//---------------------------------------------------------------------------------
captcha.focus();
}

else {
 TimeDownload("downloadlink").style.display = "";
 TimeDownload("downloadcounter").style.display = "none";
 location.href=single("./a",TimeDownload("downloadlink"));
}