// ==UserScript==
// @name           updater
// @namespace      gilly
// @include        http://uni60.ogame.de/game/index.php?page=trader*
// @version        0.01
// ==/UserScript==

checkVersion("abc",0.143);
function checkVersion(ScriptName,ScriptVersion){
	if( !ScriptName || !ScriptVersion ) return;	// ungueltige parameter
	var updateInterval = 60*1000; // 60sek
	var aktTs = (new Date()).getTime();
	var checkTs = parseInt( GM_getValue(ScriptName,0) );
	if( aktTs < checkTs ) return; // muss nix gecheckt werden, ist noch Zeit
	// remote version holen (url formen muss noch gemacht werden) + ssl und password muessen noch rein.
	var scriptUrl = "http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.user.js";
	GM_xmlhttpRequest({
		method: 'GET', url: scriptUrl,
		headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/ xml'},
		onload: function(responseDetails) { // responseDetails.responseText
			var remoteVersion=-1; 
			var loadedVersion = responseDetails.responseText.match(/\/\/ @version([ .0-9]*)/);
			if( loadedVersion ) remoteVersion = loadedVersion[1];
			if( parseFloat(remoteVersion) > parseFloat(ScriptVersion) ) window.location=scriptUrl;
			GM_setValue(ScriptName,""+(aktTs+updateInterval));
		}
	});
}