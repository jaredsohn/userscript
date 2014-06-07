// ==UserScript==
// @name		TW Pro Extender version check
// @namespace		http://userscripts.org/scripts/show/94478
// @exclude *
// @description		Don't install this script!
// @description		It is used by TW Pro Extender (http://userscripts.org/scripts/show/93874)
// @description		to check latest online version
// ==/UserScript==
var version = 1.14;
if(typeof window.TWProExt != 'undefined' && typeof TWProExt.version != 'undefined'){
	if(parseFloat(TWProExt.version)<parseFloat(version)){
		alert(TWProExt.lang.YOUVERSION+TWProExt.version+"\n"+TWProExt.lang.LASTVERSION+version+"\n"+TWProExt.lang.URL);
	}
}
