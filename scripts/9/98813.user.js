// ==UserScript==
// @name           Automatic Page Redirect
// @namespace      
// @description    NO PORN FOR YOU
// @include        *
// ==/UserScript==

// Quickly add URLs here. Use "*" as a wildcard. No regular expressions!
var simpleRedirects = {
}

// Add more complex URLs here. These are regular expressions - beware!
var redirects = { // Don't forget to double-escape those regular expression literals!

        //PORN
        'gmail': 'http://www.gmail.com',
        'breasts': 'www.youjizz.com',
        '^http://www.*sex*.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        '^http://www.*wank*.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        '^http://www.*pussy*.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        '^http://www.redtube.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        '^http://www.*lube*.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        '^http://www.tube8.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        '^http://www.facebook.com/*': 'http://www.youtube.com/watch?v=CD2LRROpph0',

        '^http(s)?://www.redtube.com/*': 'http://www.youtube.com/watch?v=EK2tWVj6lXw',
        
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