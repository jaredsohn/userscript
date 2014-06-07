// ==UserScript==
// @name        The Redirector v4
// @namespace   somini
// @include     *
// @version     4.2.5
// @downloadURL	https://userscripts.org/scripts/source/149940.user.js
// @updateURL   https://userscripts.org/scripts/source/149940.meta.js
// @require		https://github.com/derek-watson/jsUri/raw/master/Uri.js
// @grant       none
// @run-at		document-start
// @description	Redirects from mobile sites
// @description	Removes tracking UTM_*
// @description	Cleans up some URLs, like NYT, YouTube, Cracked and more
// ==/UserScript==

the_redirector_name = 'somini_the_redirector_span';

// **************************************************************
// Options and Customization
// **************************************************************

/*
Mobile hosts to ignore
Object format => String Regex array
*/
var mobileExceptions = [];
mobileExceptions.push("m\.economico\.sapo\.pt");

/*
Query parameters to remove, correspond to trackers
https://support.google.com/analytics/bin/answer.py?hl=en&answer=1033867
Object Format => String array
*/
var trackers = [];
trackers.push("utm_source");
trackers.push("utm_medium");
trackers.push("utm_term");
trackers.push("utm_content");
trackers.push("utm_campaign");
trackers.push("ref_"); //IMDb, among others
trackers.push("rel");
trackers.push("at"); //Kickstarter, among others
trackers.push("ref"); //Kickstarter, among others

/*
Query Parameters to keep
Object Format => [0:regex_host, 1:regex_path, 2:array_string_queries]
*/
var keepers = [];
keepers.push([ "youtube\.com" , "/watch" , ["v","list"] ]);
keepers.push([ "nytimes\.com" , "\.html$" , ["pagewanted"] ]);
keepers.push([ "cracked\.com" , ".*" , [""] ]);
keepers.push([ "guardian\.com" , ".*" , [""] ]);
keepers.push([ "gdata\.youtube\.com" , "/feeds/base/users/.*/uploads" , ["alt","orderby"] ]); //YouTube RSS Feeds

/*
Special, page-specific redirects, stored in objects
MUST have an "active" boolean parameter
Object Format => Object array, with several parameters
*/
var redirs = new Object();
	/** Cracked.com
	 * Cracked redirects to first page only on the first time.
	 * Uses a cookie to allow access to the next pages
	 * Works best with Autopager
	 ** Parameters
	 * timeout: Time after which all requests are redirected to the first page
	*/
	redirs.cracked_pages = new Object();
	redirs.cracked_pages.active = true;
	redirs.cracked_pages.timeout = 30;
	/** Youtube.com Prevent Autoplay with Youtube Center
	 * Removes the #t=0 that autoplays videos even with Youtube Center installed
	*/
	redirs.youtube_autoplay = new Object();
	redirs.youtube_autoplay.active = true;
	redirs.youtube_autoplay.anchor_regex = /t=0/;
	/** Económico no Sapo
	 * Redirecciona para a versão de PC
	*/
	redirs.economico = new Object();
	redirs.economico.active = true;
	/* TPB
	 * Redirects ThePirateBay to the domain name du-jour
	*/
	redirs.tpb = new Object();
	redirs.tpb.active = true;
	redirs.tpb.activeHost = "thepiratebay.se";
	redirs.tpb.oldHost_regex = /^thepiratebay\.(sx|is|gl|org|com|ac|pe|gy)$/;

// **************************************************************
// Function Helpers
// **************************************************************

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

// **************************************************************
// Main Code
// **************************************************************

if (window.top == window.self ) { //only on the top window

	var oldURL = new Uri(window.location.href);
	var newURL = oldURL.clone();
	
	// Mobile redirection ***************************************
	var mobileHost = /^(.*\.)?(mobile|m)\.(.*)$/.exec(oldURL.host());
	var redirMobile = (null != mobileHost);
	for (var i=0;i<mobileExceptions.length && redirMobile;i++) { //HACK: Not what FOR is for
		redirMobile = ( redirMobile && !new RegExp(mobileExceptions[i]).test(oldURL.host()) );
	}
	if (redirMobile) {
		var h = (mobileHost[1] == null) ? mobileHost[3] : mobileHost[1] + mobileHost[3];
		newURL.host(h);
	}
	newURL.deleteQueryParam("m");
	
	// Trackers *************************************************
	for (var i=0;i<trackers.length;i++) {
		newURL.deleteQueryParam( trackers[i] );
	}
	
	// Keepers **************************************************
	for (var i=0;i<keepers.length;i++) {
		if (new RegExp(keepers[i][0]).test(oldURL.host())) {
			//if (keepers[i][1] == oldURL.path()) {
			if (new RegExp(keepers[i][1]).test(oldURL.path())) {
				newURL.query('');
				for (var i2=0;i2<keepers[i][2].length;i2++) {
					var par = keepers[i][2][i2];
					var val = oldURL.getQueryParamValue(par);
					if (val != null && val != "") {
						newURL.addQueryParam(par,val);
					}
				}
			}
		}
	}
	
	// Special **************************************************
	/** Cracked.com */
	if ( redirs.cracked_pages.active && /cracked\.com/.test(oldURL.host()) ) {
		var R_Cracked_Pages = /^(.*)_p.*(\.html)$/.exec(oldURL.path());
		if (null != R_Cracked_Pages && readCookie(the_redirector_name) == '' ) {
			newURL.path( R_Cracked_Pages[1]+R_Cracked_Pages[2] );
			writeCookie(the_redirector_name, "REDIRECTED",redirs.cracked_pages.timeout);
		}
	}
	/** Económico no Sapo */
	if ( redirs.economico.active && /m\.economico\.sapo\.pt(.*)/.test(oldURL.host()) ) {
		if (/[0-9]*$/.test(oldURL.path())) {
			newURL.query("versaoPC");
		}
	}
	/** Youtube.com Prevent Autoplay with Youtube Center */
	if ( redirs.youtube_autoplay.active && /youtube\.com/.test(oldURL.host()) ) {
		if (redirs.youtube_autoplay.anchor_regex.test(oldURL.anchor())) {
			newURL.anchor("");
		}
	}
	/* TPB */
	if ( redirs.tpb.active && redirs.tpb.oldHost_regex.test(oldURL.host())) {
		newURL.host( oldURL.host().replace(redirs.tpb.oldHost_regex,redirs.tpb.activeHost) );
	}
	
	// **********************************************************
	if ( newURL.toString() != oldURL.toString() ) {
		window.location.replace(newURL.toString());
	}
}