// ==UserScript==
// @name           Cleanup LogMeIn 
// @version        1.3
// @description    removes annoying crap from logmein page
// @include        https://secure.logmein.com/*
// @include        https://secure.logmein.com/Computers/Computers.aspx
// @include        https://secure.logmein.com/computers/Computers.aspx
// @include        https://secure.logmein.com/central/central.aspx
// @include        https://secure.logmein.com/central/Central.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @grant   GM_addStyle
// ==/UserScript==

GM_addStyle("#specialoffer { display:none; }");
GM_addStyle("#adcontainer { display:none; }");
GM_addStyle(".infobox { display:none; }");
GM_addStyle(".cubbyPopup { display:none !important; }");
GM_addStyle(".box { display:none !important; }");
GM_addStyle(".box.big { display:none !important; }");

$("input[name='chooseval'][value='FreeNoHlt']").attr ("checked", "checked");

var simpleRedirects = {
	// NetFlix - Skip purchase nag screen
	'https://secure.logmein.com/buy/purchase3.asp': 'https://secure.logmein.com/central/central.aspx'
}

var redirects = {
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