// ==UserScript==
// @name           Automatic Page Redirect
// @namespace      http://greasemonkey.kramers.ws/
// @description    Redirects your browser away from undesirable pages on any website. Simply edit this script, and add the offending URL and desired replacement URL to the "redirects" area! You'll never have to deal with that annoying page again. Included are some sample redirects: (1) PayPal login ad skip - takes you straight to the account page after login, no more offers for credit cards or "please wait" screens! (2) GrandCentral.com - Firefox doesn't save passwords for flash-based logins, so you'll be redirected straight to the traditional Firefox-friendly HTML-based login screen. (3) RedHotPawn.com - Skips non-subscriber advertisement screens (4) NetFlix.com - Jump straight to the login page
// @include        *
// ==/UserScript==

// Quickly add URLs here. Use "*" as a wildcard. No regular expressions!
var simpleRedirects = {
	//'example.com': 'http://greasemonkey.kramers.ws/',

	// NetFlix - Skip straight to the login screen
        'http://www.amazon.com/' : 'http://www.amazon.com/b?_encoding=UTF8&site-redirect=&node=468642&tag=mysharea-20&linkCode=ur2&camp=1789&creative=9325'
	//'http://www.netflix.com/': 'http://www.netflix.com/Login'
}

// Add more complex URLs here. These are regular expressions - beware!
var redirects = { // Don't forget to double-escape those regular expression literals!
	// PAYPAL: Skip advertisements and self-serving pages on PayPal.
	//'^http(s)?://(www\\.)?paypal\\.com/.*/webscr\\?cmd=_logout':                                                   'https://www.paypal.com/us/cgi-bin/webscr?cmd=_login-run',
	//'^http(s)?://(www\\.)?paypal\\.com/.*/webscr\\?cmd=_login-processing&login_cmd=_login-done&login_access=':     'https://www.paypal.com/us/cgi-bin/webscr?cmd=_account',

	// Grand Central
	//'^http://www.grandcentral.com/$': 'http://www.grandcentral.com/account/login',

	// REDHOTPAWN: Skips non-subscriber advertisement screens (thank you, davidbest)
	//'^http(s)?://(www\\.)?(redhotpawn|chessatwork|redhotchess|timeforchess)\\.com/.*subsnag\\.':                          'http://www.redhotpawn.com/core/playchess.php?nonag=true&'+location.search.substr(1)
};

// --- Do not edit below this line. ---

var needsEscape = '\\.|?()[]^$+';

// Convert simpleRedirects into regexp syntax
var needsEscapeLen = needsEscape.length;
for (var red in simpleRedirects) {
	var newRed = red;
	for (var x=0; x<needsEscapeLen; x++) {
		var chr = needsEscape.charAt(x);
		var regexp = new RegExp('\\'+chr, 'g');
		newRed = newRed.replace(regexp, '\\'+chr);
	}
	if (newRed.substr(0,4).toLowerCase() != 'http') newRed = 'http(s)?://'+newRed;
	newRed = newRed.replace((new RegExp('\\*', 'g')), '.*');
	newRed = '^'+newRed+'$';
	redirects[newRed] = simpleRedirects[red];
}
// Compare regexps and redirect accordingly
for (var reg in redirects) {
	if ((new RegExp(reg)).test(window.location.href)) {
		if (typeof(redirects[reg]) == 'function') {
			redirects[reg]();
		} else {
			window.location.href = redirects[reg];
		}
	}
}
