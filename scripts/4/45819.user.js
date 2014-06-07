// HIH Censor Removal
// c r e a t e d   b y   the eNeME
// 04/03/2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HIH Censor Removal", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           HIH Censor Removal
// @namespace      http://userscripts.org/users/68937/scripts
// @description    Removes all profanity censors from the High Impact Halo forums.
// @include        *highimpacthalo.org/forum/*
// ==/UserScript== 

var divs = document.getElementsByTagName('div');
for(var i = 0; i < divs.length; i++) {
	if(divs[i].id.match(/post_message_[0-9]*/)) {
		divs[i].innerHTML = divs[i].innerHTML.replace(/bisonskie/g,"bitch");
		divs[i].innerHTML = divs[i].innerHTML.replace(/froodlenutzkie/g,"fuck");
		divs[i].innerHTML = divs[i].innerHTML.replace(/\*\*\*\* bite/g,"cock bite");
		divs[i].innerHTML = divs[i].innerHTML.replace(/thunder\*\*\*\* /g,"thundercunt ");
		divs[i].innerHTML = divs[i].innerHTML.replace(/thunder \*\*\*\* /g,"thunder cunt ");
		divs[i].innerHTML = divs[i].innerHTML.replace(/\*\*\*\*\*\*/g,"faggot");
		divs[i].innerHTML = divs[i].innerHTML.replace(/\*\*\*\*/g,"dick");
		divs[i].innerHTML = divs[i].innerHTML.replace(/arsonskie/g,"asshole");
		divs[i].innerHTML = divs[i].innerHTML.replace(/schlapskie/g,"shit");
		}
}

//	   GTFO
//	 d[(**)]T
//	MAI SCRIPT