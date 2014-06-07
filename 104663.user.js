// ==UserScript==
// @name           DisableGoogleInstant
// @namespace      http://www.darkyndy.com/
// @include        http://www.google.ro/
// @include        http://www.google.ro/search*
// @include        http://www.google.com/
// @include        http://www.google.com/search*
// @author         darkyndy
// @version        1.0
// ==/UserScript==

function DisableInstant(){
	jQuery(document).ready(function(){
		var testHtmlForSig = true;
		var gSig = "";
		
		//signature variable is window.google.loc.s
		if (window) {
			//console.log("window");
			if(window.google) {
				//console.log("google");
				if (window.google.loc) {
					//console.log("loc");
					if (window.google.loc.s) {
						//console.log("s");
						testHtmlForSig = false;
					}
				}
			}
		}
		//console.log(testHtmlForSig);
		
		if (testHtmlForSig) {
			var linkWithSig = "";
			function getSigFromHref(linkWithSig) {
				var sigReg = new RegExp("sig=([a-z0-9_\\-=%]+)&", "gmi");
				var linkSig = "";
				//console.log(linkWithSig);
				if(linkWithSig.match(sigReg)) {
					var rezSigReg = sigReg.exec(linkWithSig);
					//console.log(rezSigReg);
					linkSig = decodeURI(rezSigReg[1]);
					//console.log(linkSig);
				}
				return linkSig;
			}
			
			var $changeLang = jQuery("#addlang");
			//console.log("$changeLang.length: "+$changeLang.length);
			if ($changeLang.length > 0) {
				//console.log($changeLang.html());
				var $changeLangLinks = $changeLang.children("a[href*='sig']");
				//console.log("$changeLangLinks.length: "+$changeLangLinks.length);
				if ($changeLangLinks.length > 0) {
					linkWithSig = jQuery($changeLangLinks[0]).attr("href");
					gSig = getSigFromHref(linkWithSig);
				}
			}
			else {
				var $body = jQuery("body");
				//console.log("$body.length: "+$body.length);
				if ($body.length > 0) {
					var $sigLinks = $body.children("a[href*='sig']");
					if ($sigLinks.length > 0) {
						linkWithSig = jQuery($sigLinks[0]).attr("href");
						gSig = getSigFromHref(linkWithSig);
					}
				}
			}
		}
		else {
			gSig = window.google.loc.s;
		}
		//console.log(gSig);
		
		if (gSig.length > 25) {
			//should be 30
			//gSig = encodeURI(gSig);
			jQuery.ajax({
				url: window.location.protocol+"//"+window.location.host+"/setprefs?sig="+gSig+"&suggon=0"
			});
		}
	});
}
 
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
	//console.log(typeof unsafeWindow.jQuery);
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		//insert disable instant script
		insertScript(false, DisableInstant);
		//execute disable instant
		insertScript(false, "DisableInstant();");
	}
}

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		insertScript(true, "https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	}
	GM_wait();
})();