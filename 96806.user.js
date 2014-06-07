// ==UserScript==
// @name           Bypass Cacaoweb Facebook Authentication
// @namespace      com.jaymacdonald.scripts.cacaoweb.FacebookAuthBypass
// @include        http://local.cacaoweb.org:4001/*
// @include        http://localhost:4001/*
// @include        http://127.0.0.1:4001/*
// @include        http://content.cacaoweb.org/*
// ==/UserScript==
var Core = {};
Core.version = 1000;
Core.humanVersion = "1.0";
Core.alreadyRun = false;
Core.debug = false;
Core.Components = {};
Core.debugLog = function(logText) {
	if(Core.debug)
		alert(logText);
}
Core.bypassBootstrap = function() {
	if(Core.alreadyRun)
		return true;
	if(!unsafeWindow.FB)
		unsafeWindow.FB = {};
	unsafeWindow.FB.getSession = Core.Components.genericRtnTrue;
	Core.debugLog("Hooked FB.getSession()");
	unsafeWindow.facebookloginandplay = Core.Components.newFbPlay;
	Core.debugLog("Hooked facebookloginandplay(link)");
	try {
		document.getElementById('searchhints').innerHTML = document.getElementById('searchhints').innerHTML + "<br /><br /><small>Facebook Bypass " + Core.humanVersion + " by <a href='http://jaymac407.motd.org'>Jay MacDonald</a></small>";
	}
	catch(err) { }
	Core.alreadyRun = true;
	Core.debugLog("Facebook authentication bypassed.");
};
Core.Components.newFbPlay = function(link) {
	unsafeWindow.realplay(link);
};
Core.Components.genericRtnTrue = function() {
	return true;
}
window.addEventListener('load', Core.bypassBootstrap, true);