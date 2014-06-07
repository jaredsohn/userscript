// ==UserScript==
// @name        MAL-CookieRemover
// @description	When the MyAnimeList.net login becomes invalid because the ip changed, this script deletes the cookies and redirects to the login page (and back to the previous page after login).
// @namespace   http://userscripts.org/users/524082
// @include     /^https?:\/\/(.*\.)*myanimelist.net\/.*$/
// @grant       none
// @version     1.0
// ==/UserScript==

function clearCookies() {
	// code from http://stackoverflow.com/questions/2194473/can-greasemonkey-delete-cookies-from-a-given-domain
	var domain      = document.domain;
	var domain2     = document.domain.replace (/^www\./, "");
	var domain3     = document.domain.replace (/^(\w+\.)+?(\w+\.\w+)$/, "$2");

	//listCookies (); //-- Optional, for information or debug...

	//--- Loop through cookies and delete them.
	var cookieList  = document.cookie.split (';');

	for (var J = cookieList.length - 1;   J >= 0;  --J) {
		var cookieName = cookieList[J].replace (/\s*(\w+)=.+$/, "$1");

		//--- To delete a cookie, set its expiration date to a past value.
		document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = cookieName + "=;path=/;domain=" + domain  + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = cookieName + "=;path=/;domain=" + domain2 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = cookieName + "=;path=/;domain=" + domain3 + ";expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	}

	//listCookies (); //-- Optional, for information or debug...

	//-- Optional function, for information or debug...
	function listCookies () {
		var cookieList  = document.cookie.split (';');

		for (var J = 0, numCookies = cookieList.length;   J < numCookies;  ++J) {
			console.log ("Cookie ", J, ": ", cookieList[J]);
		}
	}
}

if(document.body.innerHTML.contains("clear your cookies")) {
	clearCookies();
	if(!window.location.href.contains("login.php")) {
		localStorage.setItem("redirectURL", window.location.href);
		window.location.href = "http://" + document.domain + "/login.php";
	}
}

var redirectURL = localStorage.getItem("redirectURL");
if(redirectURL !== null && document.cookie.contains("Z=")) {
	localStorage.removeItem("redirectURL");
	window.location.href = redirectURL;
}