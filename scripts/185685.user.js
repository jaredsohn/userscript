// ==UserScript==
// @name        No Ads on Flash About Page
// @namespace   FlashAboutWithoutAds
// @description Disable ads frame on Flash About page
// @include     http://*.adobe.com/software/flash/about/*
// @include     https://*.adobe.com/software/flash/about/*
// @version     2.0
// @datecreated		2013-02-02
// @lastupdated		2013-12-08
// @author			Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var no_ads_func=function (){
	callopenX=null;
	window.callopenX=null;
	delete callopenX;
	delete window.callopenX;
	window.callopenX = function (){ return false; };
	// Set a fake timeout to get the highest timeout id
	var highestTimeoutId = window.setTimeout("",1000);
	for (var i = 0 ; i <= highestTimeoutId ; i++) {
		window.clearTimeout(i);
	}
	var el=document.getElementById("content-banner");
	window.el_backup=el.innerHTML;
	if ( !(/ADVERTISEMENT/i.test(el.innerHTML)) ) { // we got backup without ads.
		el.addEventListener("DOMSubtreeModified", 
			function(){
				var el=document.getElementById("content-banner");
				if (/ADVERTISEMENT/i.test(el.innerHTML)) { // we have advertisement.
					el.innerHTML=window.el_backup;
				}
			}, 
			false
		);
	}
}
var no_ads_script=String(no_ads_func);
no_ads_script = no_ads_script.replace(/^\s*function +[^(]*\([^)]*\) ?\{/i, "");
no_ads_script = no_ads_script.replace(/\}\s*$/i, "");

setTimeout(function(){addScript(document.body, no_ads_script);},100);

/*
################################################
#   INTERNAL USERSCRIPT FUNCTIONS
################################################
*/

// Function : addScript()
// Source: http://userscripts.org/groups/51

function addScript(body, js, link) {
	if (!body){
		var body = document.body; 
	}
	script = document.createElement('script');
    if (!body) return;
    script.type = 'text/javascript';
	if ( (js=='') && (link!='') ){
		script.src = link;
	} else {
		script.textContent = js;
	}
    body.appendChild(script);
	//return script;
}

