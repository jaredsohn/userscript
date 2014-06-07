// ==UserScript==
// @name           XM Radio Logger Inner (and favorite station player)
// @author         Mark Husson (mhusson at gmail)
// @namespace      http://userscripts.org/people/99/
// @description    For a stale session of the XM Radio Online site, it logs you in and plays your favorite station
// @include        http://www.xmradio.com/player/*.action*
// ==/UserScript==

/* 
 * This GM Script is meant to be used in conjustion with a bookmarklet.
 * To install the bookmarklet go to any website, bookmark it and then 
 * modify that bookmark to this:
 * 
 * Name: XM (or whatever you want to call the bookmarklet)
 * Location: javascript:window.open("http://www.xmradio.com/player/listen/playerShell.action","gmpopup","menubar=0,resizable=1,width=945,height=590");window.close();
 * 
 * Now also install this script, modify the favoriteStation to be your 
 * favorite station number (leave as "0" if you don't want it to auto-play)
 * and you are all set.
 * 
 * If you don't want to use the browser's built in email/password saving, see below...
 * 
 */

var favoriteStation = "0";
/* If you don't want to use the browser's built in email/password saving, 
 * you can edit this script and add your own email/password here:
 */
var xmEmail    = "";
var xmPassword = "";

/* 
 *  If you see inactivity message or access denied, redirect to login page
 */
if((window.location.href == "http://www.xmradio.com/player/baseForward.action?pageName=not_authorized_redirect" || window.location.href == "http://www.xmradio.com/player/listen/playerShell.action") && window.name == "gmpopup"){
	if(document.body.innerHTML.indexOf("We're sorry. Due to inactivity, you will need to sign in again to listen to XM Radio Online.") > 0 || document.body.innerHTML.indexOf("We're sorry. You do not have access to the requested page.") > 0){
		window.location.href = "http://www.xmradio.com/player/home/xmhome.action";
	}
}

/* 
 *  Log in using (optionally) your browser's form autocomplete
 */
if(window.location.href == "http://www.xmradio.com/player/home/xmhome.action" 
	&& (document.referrer == "http://www.xmradio.com/player/baseForward.action?pageName=not_authorized_redirect" || document.referrer == "http://www.xmradio.com/player/listen/playerShell.action")){
	// If the browser's formfill has already filled in the login fields, just go ahead and log them in.
	if(document.getElementById("req-email").value.length > 0 && document.getElementById("req-password1").value.length > 0){
		document.getElementById("login").submit();
	}else if(xmEmail!="" && xmPassword!=""){
		// If you filled in an email/password yourself, use that
		document.getElementById("req-email").value = xmEmail;
		document.getElementById("req-password1").value = xmPassword;
		document.getElementById("login").submit();
	}
}

/*
 *  If this is the logged in page now (after logging in), redirect to player
 */
if(window.location.href == "http://www.xmradio.com/player/login/xmlogin.action" 
	&& window.name == "gmpopup"){
	document.body.innerHTML == "<br/><br/><br/><br/><center style='color:white'>re-launching xmro player.</center>";
	window.location.href = "http://www.xmradio.com/player/listen/playerShell.action";
}

/* 
 *  Set favicon (completely unnecessary but then again how can you not have a favicon to begin with? I mean, come on...)
 */
if(window.location.href == "http://www.xmradio.com/player/listen/playerShell.action"){
	// Set a favicon for a prettier window.
	var xmico = "data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAP///yMDDBUACAYCBA0ABwwFCQUAAwcCCAYACQYADwAAAwECBBUcBBYXDHp8H//+Q6+uQammMKakMkxLHNrSMfnoHP/wH8y+Ka+kLxwbDcW+Xs+8HP/sKuDOJbChHtC/LPLfOXRsHDw4EdPDPp+WO9XJULarR7evYe/VGO3UKYd6HGlgHdPBPtfHSODFKHFkFo59HJmJIW9iGKeVJdjCOmleIrSbHMisJoh1GtS4K29hHZJ6D7SXJNCxLIVxH7KYL9/CP4p4J9fBZSUeBCQdBcelJYtzHMCiOhsXCaCAFsefHc6rOBgUB9W1T3hdES4kCbmTKryZNmpXIHFfLRoTAWJICUk2CHRXEBYRBUo7F0AtARgRAnxZDYRiFRoSAlQ9DVhFHS8gBUQrAywcAjUnDwUDAGZFEyofDxALBEwqAG1EEhMLAhMOCSkUAC8bCSgWBykVBTQWAg0FACwSARULBiYaFCcNAR0HAA8DABkDABACABoCAA0BABACASwCABgBABwAAA8AAA0AAAsAAAkAAAcAAAQAAAMAAAIAAAEAAAMBAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIwALAAAAAAQABAAAAjPABkBAKBIzxkpTHzg+PEF0UCBAwmUALEDChkwPV6UGcgRwKIRVa7EkGGDi5Y2HTvCqHHkCRIJDFJ2rJMmkSJDcMx0TIKCSiA+LE7QEfHAz4AtE+womDPDBA0lKnLEcRFijCAgEKYU2EPIioULS/7wcGLkxpogHD4A6hNmSBQsLXSk6CLHQwcvaiqIKbJBiIAERDKQcHNoBYY7eCJQYIMmzwIEdbJoKDToTZMDBhw0SLmy5cuYMj+GHFnypEyJFC1i1Ciz4MGECxtyhChTJqOAADs=";
	var link = document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = xmico;
	
	document.getElementsByTagName('head')[0].appendChild(link);
}

/* 
 *  Quick Play of favorite Radio Station
 */
if(window.location.href == "http://www.xmradio.com/player/listen/xmPlayerFwrd.action?pageName=PlayMedia"){
	if(parent.name == "gmpopup" && favoriteStation != "0"){
		document.forms[0].getElementsByTagName("input")[0].value = favoriteStation;
		window.setTimeout("top.xms.quickTune(document.qt.qtinput.value)", 3000);
	}
}