// ==UserScript==
// @name           Zooomr OpenID Helper
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Makes the example OpenID URLs on the Zooomr OpenID login page function as clickable shortcuts
// @include        http://*.zooomr.com/login/openid/
// ==/UserScript==
(function() {
	
	// --- Customise Here ---
	var yourUserName = 'username';
	// -------- End ---------
	
	var loginID, urls;
	
	loginID = document.getElementById('openid_login_big');
	if (!loginID) {
		return;
	}
	
	urls = document.evaluate(
		'//li[@class="Key Black"]'
		, document
		, null
		, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
		, null);
		
	GM_log('urls.snapshotLength : '+ urls.snapshotLength);

	for (var i = 0; i < urls.snapshotLength; i++) {
		oldInnerHTML = urls.snapshotItem(i).innerHTML;
		url = urls.snapshotItem(i).textContent;
		url = url.substring(url.indexOf('http://'));
		url = url.replace('username',yourUserName);
		urls.snapshotItem(i).innerHTML = '<a href="#" onClick="document.getElementById(\'openid_login_big\').value = \'' + url + '\'; return false;">'
			+ oldInnerHTML + '</a>';
		
	}

})()
