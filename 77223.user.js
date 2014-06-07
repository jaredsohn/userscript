// ==UserScript==
// @name            TestScript
// @namespace       elexx.org
// @description     a disc
// @version         1.1
// @scriptsource    http://userscripts.org/scripts/show/77223
// @include         http://*.elexx.org/
// @include         http://*.elexx.org/?*
// ==/UserScript==


var DAS = {
	init : function () {
	
	},
	
	checkNewerVersion : function () {
		_get(DAS.Config.MetaUrl, this.compareVersions);
	},
	
	compareVersions : function (responseText) {
		var remoteVersion = responseText.match(/\/\/\s*@version\s*(\d.*)/);
		remoteVersion = (onSiteVersion===null) ? 0 : onSiteVersion[1];
		
		if (remoteVersion > DAS.Config.Version) {
			DAS._log(remoteVersion + ' | ' + DAS.Config.Version);
		}
	},
	
	_get : function (url, cb) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers:{
				'User-Agent': 'Firefox / GreaseMonkey / ' + DAS.Config.ScriptName
			},
			onload: function (xhr) {
				cb(xhr.responseText);
			}
		});
	},
	
	_log : function (text) {
		if (DAS.Config.debug) {
			console.log(text);
		}
	}
	
};

DAS.Config = {
	ScriptName : 'Deviant Statistics',
	Version : 1.1,
	UpdateUrl : 'http://userscripts.org/scripts/source/77223.user.js',
	MetaUrl : 'http://userscripts.org/scripts/source/77223.meta.js',
	debug : true
};

DAS.checkNewerVersion();