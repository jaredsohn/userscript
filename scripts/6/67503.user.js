// ==UserScript==
// @name			Gist UserScript Install Link
// @author			Erik Vold
// @namespace		gistUserScriptInstallLink
// @include			http://gist.github.com/*
// @include			https://gist.github.com/*
// @version			0.1.3
// @license			MPL 2.0
// @datecreated		2010-01-28
// @lastupdated		2013-07-14
// @homepageURL http://userscripts.org/scripts/show/67503
// @downloadURL http://userscripts.org/scripts/source/67503.user.js
// @description		This userscript will add an 'Install' link to all userscript files (which end with .user.js by necessity).
// ==/UserScript==

(function(doc){
	var userscripts = doc.evaluate("//a[contains(substring(@href,string-length(@href)-9),'.user.js') and text()='raw']",doc,null,6,null),
		userscript,raw;
	for(var i=userscripts.snapshotLength-1;i>-1;i--){
		userscript = userscripts.snapshotItem(i);
		userscript.innerHTML = 'install';
		raw = userscript.cloneNode(false);
		raw.innerHTML = 'raw';
		raw.href = "view-source:" + raw.href;
		userscript.parentNode.insertBefore(raw,userscript);
	}
})(document);
