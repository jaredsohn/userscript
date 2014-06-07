// ==UserScript==
// @name          Hold The Phone
// @namespace     forums.whirlpool.net.au
// @version       0.2
// @description   Moves the phone forum links to the bottom-right of the forums index page on http://forums.whirlpool.net.au
// @include       http://*.whirlpool.net.au/
// @include       http://whirlpool.net.au/
// @author        Johnny Bravo
// ==/UserScript==


if( document.location.href == 'http://forums.whirlpool.net.au/' || /whirlpool\.net\.au\/forum\.cfm/i.test(document.location.href) ) {
	var h3=document.evaluate('//DIV[@id="index"]/DIV[@class="column"]/DIV/H3[contains(text(), "Mobile")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var tb=document.evaluate('following-sibling::TABLE', h3, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
	h3.parentNode.appendChild(h3);
	tb.parentNode.appendChild(tb);
}