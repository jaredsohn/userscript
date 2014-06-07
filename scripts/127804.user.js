// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name kaskus beta full width by sandi_okta
// @namespace http://diveintogreasemonkey.org/download/
// @description memperpanjang lebar postingan
// @include http://livebeta.kaskus.co.id/thread/*
// @include http://livebeta.kaskus.co.id/post/*
// @include http://livebeta.kaskus.co.id/post_reply/*
// ==/UserScript==

//- */

var Swidth = screen.width;
var SSwidth;
var CBwidth;
if (Swidth == 800){
	SSwidth = '600px';
        CBwidth = '750px';
}else if (Swidth == 1024){
	SSwidth = '700px';
	CBwidth = '950px';
}else if (Swidth == 1280){
	SSwidth = '910px';
	CBwidth = '1200px';
}else{
	SSwidth = '910px';
	CBwidth = '1200px';
}

if (document.getElementById('content-wrapper') != undefined){
	document.getElementById('content-wrapper').style.margin ="2px";
	document.getElementById('content-wrapper').style.left="20px";
}

if (document.getElementById('content-body') != undefined){
	document.getElementById('content-body').style.width=CBwidth;
}



//-var SSwidth = parseInt(screen.width / 2);

for(var i=0;i<document.getElementsByTagName('*').length;i++){
	if(document.getElementsByTagName('*')[i].className == 'entry-content'){
		document.getElementsByTagName('*')[i].setAttribute('style','width:'+SSwidth+';padding-bottom:50px;padding-left:10px');
	}

}


//-alert(SSwidth);