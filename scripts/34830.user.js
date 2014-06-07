// ==UserScript==
// @name           orkut Force SSL
// @namespace      http://secure.orkut.com/orkutssl
// @description    This script rewrites all links to use the SSL enabled secure.orkut.com domain. This script is unfinished and does NOT rewrite all links and should still be considered a BETA. Additionally, when non-SSL orkut pages are visited, the browser will load the entire non-SSL page before being redirected to the SSL page. Please read the source code of this script before installing and check that all URLs are proper orkut URLs as tampered scripts can steal passwords.
// @include       https://*.orkut.com/*
// @include       http://*.orkut.com/*
// @include        http://orkut.com/*
// ==/UserScript==


// TODO: Fix to work with international orkut domains (e.g. orkut.cn)

// Check user is on SSL enabled domain, and if not, redirect to SSL domain
if (location.href.charAt(4) != "s" && location.href.indexOf("fuseaction") != -1) {
	var url = location.href.split("orkut.com");
	location.href = "https://secure.orkut.com" + url[1];
}

var lastchr = location.href.length -1;
// Redirect root (www.orkut.com)
if (location.href.charAt(lastchr) == "/" && location.href.charAt(4) != "s" && location.href.indexOf("www") != -1) {
	location.href = "https://secure.orkut.com";
}

// Loop through every link changing the domain to secure.orkut.com

var links = document.getElementsByTagName("a");

for ( var i = 0; i < links.length; ++i ) {
	// Update the link to SSL
	// Use switch to catch some exceptions
	switch (links[i].href) {
		case "http://www.orkut.com/":
			links[i].href = "https://secure.orkut.com/";
		break;

		case "http://film.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=film";
		break;

		case "http://blog.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=blog.mostPopular";
		break;

		case "http://forum.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=forums.home";
		break;

		case "http://groups.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=groups.categories";
		break;

		case "http://events.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=events";
		break;

		case "http://vids.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=vids.splash&placement=all";
		break;
		
		case "http://music.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=music";
		break;

		case "http://comedy.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=comedian.home";
		break;

		case "http://classifieds.orkut.com/":
			links[i].href = "https://secure.orkut.com/index.cfm?fuseaction=classifieds";
		break; 

		default:
		if (links[i].href.charAt(4) != "s" && links[i].href.indexOf("fuseaction") != -1) {
			var url = links[i].href.split("orkut.com");
			
			// Check for bad links without 'index.cfm' (e.g. forum link)
			if (url[1].substring(0,12) == "/?fuseaction") {
				url[1] = "/index.cfm" + url[1].substring(1);
			}

			//Rewrite link href
			links[i].href = "https://secure.orkut.com" + url[1];
		}
		break;
	}
}

// Loop through the forms and point them to the SSL domain (especially the login form)
var forms = document.getElementsByTagName("form");
for ( var i = 0; i < forms.length; ++i ) {
	if (forms[i].action.charAt(4) != "s" && forms[i].action.indexOf("cfm") != -1) {
		var url = forms[i].action.split("orkut.com");
		forms[i].action = "https://secure.orkut.com" + url[1];
	}
}