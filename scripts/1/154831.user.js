// ==UserScript==
// @name        Decode HBH captcha
// @namespace   None
// @include     http://www.hellboundhackers.org/user/create.php
// @version     1.1
// ==/UserScript==

var hash = document.documentElement.innerHTML.match(/img_code=(.+)"/)[1];

GM_xmlhttpRequest({
	method: "POST",
	headers: {"Content-Type": "application/x-www-form-urlencoded"},
	url: "http://www.md5online.org/",
	data: "md5=" + hash + "&action=decrypt",
	onload: function(response) {
		var m = response.responseText.match(/Found : <b>(.+)<\/b>/);
		// if we can't decode it, refresh to try again
		// doesn't seem to be needed with this site, but whatever
		if (!m) 
			location.reload(true);
		document.getElementsByName('user_code')[0].value = m[1];		
	}
});
