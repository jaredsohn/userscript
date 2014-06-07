// ==UserScript==
// @name		   Localize iTunes pages to local store
// @description	   Redirects iTunes store pages to the store in your country.
// @match		   http://ax.itunes.apple.com/*
// @match		   http://itunes.apple.com/*
// @require		   http://userscripts.org/scripts/source/49700.user.js
// @require		   http://userscripts.org/scripts/source/50018.user.js
// @version		   0.0.1
// ==/UserScript==

function main() {

	var STORE_CODE = "nz";
	document.body.setAttribute("onload", "");
	
	if (location.pathname.substr(0,4) !== "/" + STORE_CODE + "/") {
	
		var store_code_pattern = new RegExp("(\/[a-z]{2}\/)");
	
		var pathname = location.pathname;
	
		if ( store_code_pattern.test(pathname) ) {
			pathname = pathname.replace(store_code_pattern, "/" + STORE_CODE + "/");
		} else {
			pathname = "/" + STORE_CODE + pathname;
		}
	
		var redirectTo = window.location.protocol + 
						"//" + location.host + 
						pathname +
						location.search ;
			
		//alert (redirectTo);
		console.log("Redirecting to local iTunes Store page...", redirectTo);
		window.location = redirectTo;
	}
}

main();