// ==UserScript==
// @name           Title Hasher
// @namespace      name.jameswilson.scripts
// @description    Puts the title of the page (and optionally can try to remove the site name) in the URL. Example: http://www.youtube.com/watch?v=Yu_moia-oVI#Rick_Astley_-_Never_Gonna_Give_You_Up. This is helpful for easy sending to friends, finding the title later in logs where it normally wouldn't be available such as IM or email. One option in the script to specify removal of site name based on domain or special characters in the title (or disable this feature completely).  
// @include        *
// @exclude        http*://mail.google.com/*
// @exclude        http://www.gotapi.com/*
// @exclude        http://*doubleclick.net/*
// @exclude        http://*googlesyndication.com/*
// @exclude        http://*reddit.com/*
// @exclude        http://*etherpad.com/*
// ==/UserScript==


//domain, title, or blank to disable;
var removeSiteName = "title";

if (window != top) {
	return;
}

function titleIsNotInURL() {
	if(location.pathname.length<=1) {
		return true;
	}
	var cleanTitle = document.title;
	var firstSep = cleanTitle.search(/:|\-|\|/);
	if (firstSep > 0) {
		cleanTitle = cleanTitle.substring(0, firstSep);
	}
	cleanTitle = cleanTitle.replace(/[^a-zA-Z 0-9]/g, '').toLowerCase();
	var cleanURL = location.pathname.replace(/[^a-zA-Z 0-9]/g, '')
			.toLowerCase();
	if (cleanTitle.indexOf(cleanURL) > -1 || cleanURL.indexOf(cleanTitle) > -1) {
		return false;
	} else {
		return true;
	}
}

if (titleIsNotInURL()) {
	if (location.hash.length === 0 && location.href.slice(-1) != "#") {
		var newHash = document.title;
		var siteName = location.hostname.split(".").slice(-2, -1);
		var siteNameTLD = location.hostname.split(".").slice(-2).join(".");
		if (removeSiteName == "domain") {
			var re = new RegExp("(" + siteName + "|" + siteNameTLD
					+ ")( )?[:|\\-|\\|]( )?", "gi");
			newHash = newHash.replace(re, "");
		} else if (removeSiteName == "title") {
			var firstSep = newHash.search(/:|\-|\|/);
			if (firstSep > 0) {
				if (newHash.toLowerCase().substring(0, firstSep).indexOf(
						siteName) == -1) {
					newHash = newHash.substring(0, firstSep);
				} else if (newHash.toLowerCase().substring(firstSep + 1)
						.indexOf(siteName) == -1) {
					newHash = newHash.substring(firstSep);
				}
			}
		}
		newHash = escape(newHash).replace(/%[0-9A-F][0-9A-F]/g, "_");
		newHash = newHash.replace(/^[_|\-| ]+|[_|\-| ]+$/g, "");
                location.replace(location.href+'#'+newHash);
	}
}