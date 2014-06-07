// Facebook Spam Exiler
// John Doppler Schiff - http://userscripts.org/users/78856
// Updated 26/Jan/2009 3:02
//
// Facebook Spam Exiler
//
// ==UserScript==
// @name             Facebook Spam Exiler
// @description     	Alerts users when they attempt to install a Facebook application that has been blacklisted for spamming or other unfriendly behavior.
// @include          *.facebook.com/tos.php*
// ==/UserScript==

function getURLParam(name) {
{
	// get a URL parameter
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )
		return "";
	else
		return results[1];
	}
}


function get(url, cback) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cback(xhr.responseText) }
  })
}

function showVerdict(resultString) {
	if (String(resultString).substring(0,2) == "OK") {
		// do nothing
	} else {
		document.getElementById('content').style.background = '#C00000';
		var outString = "Warning!\nA user has accused this application of spamming or other unfriendly behavior.  It is recommended that you do NOT install this application.  \n\n";
		outString = outString + resultString;
		outString = outString + "\n\nConsult http://www.macrocephalus.com/FB_Blacklist for more information.";
		alert(outString);
	}
}

(function () {
	// get the API Key for this application
	var apiKeyParam = getURLParam('api_key');

	// is this application's ID on the blacklist?
	get("http://www.macrocephalus.com/FB_Blacklist/FB_AppBlacklist.php?APIKEY=" + apiKeyParam, showVerdict);
})();

