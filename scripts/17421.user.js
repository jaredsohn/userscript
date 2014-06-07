// ==UserScript==
// @name           Skip Ads at RedHotPawn/ChessAtWork/RedHotChess/TimeForChess
// @namespace      http://greasemonkey.kramers.ws/
// @description    It's your web - skip those non-subscriber chess ads. (See http://userscripts.org/scripts/show/17415 for a script which does this and more on many different sites!)
// @include        *
// ==/UserScript==

// Quickly add URLs here. Use "*" as a wildcard. No regular expressions!
var simpleRedirects = {
	//'example.com': 'http://greasemonkey.kramers.ws/',

	// NetFlix - Skip straight to the login screen
	//'http://www.netflix.com/Register': 'http://www.netflix.com/Login'
}

// Add more complex URLs here. These are regular expressions - beware!
var redirects = { // Don't forget to double-escape those regular expression literals!
	// PAYPAL: Skip advertisements and self-serving pages on PayPal.
	//'^http(s)?://(www\\.)?paypal\\.com/.*/webscr\\?cmd=_logout':                                                   'https://www.paypal.com/us/cgi-bin/webscr?cmd=_login-run',
	//'^http(s)?://(www\\.)?paypal\\.com/.*/webscr\\?cmd=_login-processing&login_cmd=_login-done&login_access=':     'https://www.paypal.com/us/cgi-bin/webscr?cmd=_account',

	// Grand Central
	//'^http://www.grandcentral.com/$': 'http://www.grandcentral.com/account/login',

	// REDHOTPAWN: Skips non-subscriber advertisement screens (thank you, davidbest)
	'^http(s)?://(www\\.)?(redhotpawn|chessatwork|redhotchess|timeforchess)\\.com/.*subsnag\\.':                          'http://www.redhotpawn.com/core/playchess.php?nonag=true&'+location.search.substr(1)
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
	if (newRed.substr(0,4).toLowerCase() != 'http') newRed = '^http(s)?://'+newRed;
	newRed = newRed.replace((new RegExp('\\*', 'g')), '.*');
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