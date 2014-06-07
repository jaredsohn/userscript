// Give Newzbin SABnbzd header frame
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Modified for frame use, using "SABFrame" for the target frame
// --------------------------------------------------------------------
// ==UserScript==
// @name          Give Newzbin SABnbzd header frame
// @namespace     Yarble's scripts
// @description   Replaces top level Newzbin pages with a frameset including SABnzbd Header
// @include       http://www.newzbin.com/*
// @include       http://v3.newzbin.com/*



// ==/UserScript==


(function (){
	if(self == top && document.title != 'Newzbin & SabnzbD'){
    	var oNewDoc = document.open("text/html", "replace");
    	var sMarkup ='<html><head><title>Newzbin & SabnzbD</title></head>';
    	sMarkup +='<frameset rows="110,*" frameborder="YES" border="1" framespacing="0">';
    	sMarkup +='<frame src="http://127.0.0.1:8080/sabnzbd" name="SABFrame" >';
    	sMarkup +='<frameset cols="*,100%" frameborder="NO" border="0" framespacing="0">';
    	sMarkup +='<frame src="about:blank" name="SABblank" scrolling="NO">';
    	sMarkup +='<FRAME SRC="' + unescape(location.href) + '" name="bottomFrame">';
    	sMarkup +='<\/FRAMESET>';
    	sMarkup +='<\/FRAMESET>';
    	sMarkup +='<\/HTML>';
    	oNewDoc.write(sMarkup);
    	oNewDoc.close();
	}
})();



