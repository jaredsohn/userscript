// Block Facebook Ads 
// Version 1.2
// 7/6/08
// by Francois Venter, The ShadowGFX ( http://theshadowgfx.com )
// Released Under Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License
 
// ==UserScript==
// @name           Block Facebook Ad's
// @version 	   1.2
// @namespace      http://theshadowgfx.com
// @description    Blocks Facebook Ad's (Works on new facebook layout too), also remove's gift area from home and sponsored area's.
// @include        http://*facebook.com*
// ==/UserScript==


replacements = {
	
	"\\bAdvertise\\b": "",	
	"\\bMore Ads\\b": "",	

}; 

var openingNumber = 0;
window.addEventListener("load", function(e) {
	var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[@id='announce'] | //div[contains(@id, 'sponsor')] | //div[contains(@id, 'ssponsor')] | //div[contains(@class, 'invite')] | //div[contains(@id, 'gift')] | //div[contains(@id, 'sponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[@id='announce'] | //div[contains(@id, 'sponsor')] | //div[contains(@id, 'ssponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < elements.snapshotLength; i++) {
	var thisElement = elements.snapshotItem(i);
   thisElement.parentNode.removeChild(thisElement);
  }
}, false);
 
regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);
 
for (var i = 0; i < textnodes.snapshotLength; i++) { 
	
	node = textnodes.snapshotItem(i);
	s = node.data;
	
	for (key in replacements) {
		s = s.replace(regex[key], replacements[key]);
	}

	node.data = s;

} 

var paragraphs = document.getElementsByTagName( 'p' );

for ( var i = 0; i < paragraphs.length; i++ )
{

	var paragraph = paragraphs[i];
	paragraph.innerHTML = openings[openingNumber] + paragraph.innerHTML;
	openingNumber++;
	if ( openingNumber == openings.length ) openingNumber = 0;
 
}

