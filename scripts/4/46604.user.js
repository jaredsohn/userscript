// ==UserScript==
// @name          Megaupload Auto submit, No time , Auto download
// @namespace     Avindra + Descriptor + Goolcharan + #avg + Lesenus + Angelus76
// @version       1.1 
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

//---------------------------------------------------------------------------------
// Update by Angelus76 ;  auto-submit form after 4 char
//---------------------------------------------------------------------------------

var Captcha = document.getElementById('captchafield');
var action = 0;

if(Captcha){
Captcha.addEventListener( 'keyup', Go, true ) ;
}
function Go(){
	if(Captcha.value.length == 4 && action ==0){
		action = 1;
		document.getElementById('captchaform').submit();
	}
}

var TimeDownload=function(x) {return document.getElementById(x)},
    single=function(x,y) {return document.evaluate(x,y||document,null,9,null).singleNodeValue};

if(TimeDownload("downloadlink")){
 TimeDownload("downloadlink").style.display = "none";
 TimeDownload("downloadcounter").style.display = "none";
 location.href=single("./a",TimeDownload("downloadlink"));
}
else{
	Captcha.focus();
}