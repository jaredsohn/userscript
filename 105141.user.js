// ==UserScript==
// @name           GoogleLogout
// @description    Logout from google services
// @namespace      http://www.darkyndy.com/projects/googleLogout
// @include        *
// @author         darkyndy
// @version        1.0
// ==/UserScript==

function GoogleLogout(){
	var googleHosts = ["google"];
	
	//execute script
	jQuery(document).ready(function(){
		
		var hostname = window.location.hostname;
		
		for (var i=0, ghL = googleHosts.length; i< ghL; i=i+1) {
			if (hostname.indexOf(googleHosts[i]) >=0) {
				var $logoutLink = jQuery("body").find("a[href*='ClearSID']");
				if ($logoutLink.length > 0) {
					window.location = $logoutLink.attr("href");
				}
				else {
					$logoutLink = jQuery("body").find("a[href*='accounts/Logout']");
					if ($logoutLink.length > 0) {
						window.location = $logoutLink.attr("href");
					}
				}
				//console.log($logoutLink);
				break;
			}
		}
	});
};
 
 //START insert script
/**
 * Insert Script Function
 * @param byUrl Boolean - insert script by url
 * @param scriptContent string - url or script content
 */
function insertScript(byUrl, scriptContent){
	var insertInto = document.getElementsByTagName('head')[0];
	if (!insertInto) {
		insertInto = document.getElementsByTagName('body')[0];
		if (!insertInto) { return; }
	}

	var script = document.createElement('script');
	script.type = 'text/javascript';
	if (byUrl === undefined || byUrl === null) {
		byUrl = true;
	}
	if (byUrl === true) {
		script.src = scriptContent;
	}
	else {
		var scriptFunction = scriptContent.toString();
		script.textContent = scriptFunction.replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");
	}
	insertInto.appendChild(script);
};
//END insert script


// Check if jQuery's loaded
function GM_wait() {
	//console.log("u "+typeof unsafeWindow.jQuery);
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		//insert script
		insertScript(false, GoogleLogout);
		//execute script
		insertScript(false, "GoogleLogout();");
	}
}

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		insertScript(true, "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	}
	GM_wait();
})();