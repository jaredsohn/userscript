// ==UserScript==
// @name           fixLauncher
// @namespace      www.siricon.co.uk
// @description    Enable Apps Launcher in Fiefox 3.5 (Linux)
// @include        https://citrix.liv.ac.uk/Citrix/XenApp/*
// ==/UserScript==

function CCIGM_getParameters() {
    var hrefParts=fRef.split("?");
    if ( hrefParts[1] != "" ) {
		return hrefParts[1];
	} else {
		return "";
	}
}

function CCIGM_getServletName() {
    var hrefParts=fRef.split("?")[0].split("/");
    return unescape(hrefParts[6]);
}
fRef=window.location.href;
sName = CCIGM_getServletName();
if ( sName == "launcher.aspx" ) {
	Params = CCIGM_getParameters();
	window.location="https://citrix.liv.ac.uk/Citrix/XenApp/site/launch.ica?" + Params;
}