// ==UserScript==
// @name           Pirate Bay ad remover
// @namespace      http://henrik.nyh.se
// @description    Removes ads from The Pirate Bay. Can expand content to fit entire width of viewport (cool but jumpy) - see option in "Tools > User Script Commands" when on thepiratebay.org.
// @include        http://*thepiratebay.org/*
// ==/UserScript==

// Set full width options

var fullWidthForContent = GM_getValue('fullWidthForContent', false);  // Default is false, i.e. not full width

GM_registerMenuCommand('TPB ad remover: '+ (fullWidthForContent ? "Don\'t u" : "U") +'se full width for content', function() {
	GM_setValue('fullWidthForContent', !fullWidthForContent);
	location.reload();
});


// Expand content

if (fullWidthForContent) {

	var mc = document.getElementById('main-content');
	if (mc) mc.style.margin = '0';
	
	var of = document.getElementById('detailsouterframe');
	if (of) of.style.width = '100%';

}

// Hide ad divs

var ads = document.evaluate("//DIV[starts-with(@class, 'ad')] | //DIV[contains(@id, 'banner')] | //DIV[@class='spons-link']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < ads.snapshotLength; i++)
	ads.snapshotItem(i).style.display = 'none';
	
// Get rid of bottom ad without uglying stuff up

var nb = document.evaluate("//DIV[@class='noborder']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (nb) {
	nb.innerHTML = '';
	nb.style.marginTop = nb.style.marginBottom = '-5ex';
}

// Restore donate links - they're OK

var don = document.getElementById('fbanners');
if (don) don.style.display = 'block';
