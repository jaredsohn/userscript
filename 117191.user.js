// ==UserScript==
// @name           AwfulYearbook
// @namespace      [url]http://www.titaniummantis.com/awfulyearbook[/url]
// @description    Greasemonkey script to integrate the SomethingAwful forums with AwfulYearbook
// @include        [url]http://forums.somethingawful.com/showthread.php?*[/url]
// ==/UserScript==
var il = document.evaluate('//table[contains(@class,"post")]/descendant::ul[@class="profilelinks"]/li/a[contains(@href,"member.php")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var i = il.iterateNext();
var profiles = new Array();
var profileIdExtractor = /member\.php\?action=getinfo\&userid=(\d+)/
while (i) { ni = il.iterateNext(); profiles.push(i); i = ni; }
for(var j = 0; j < profiles.length; j++) {
	profile = profiles[j];
	profileLi = profile.parentNode;
	url = document.evaluate('@href',profile,null,XPathResult.STRING_TYPE,null).stringValue;
	result = url.match(profileIdExtractor);
	userId = result[1]
      yearbookLi = document.createElement("li");
	yearbookSpace = document.createTextNode(" ");
	yearbookLink = document.createElement("a")
	yearbookLink.href = "http://www.awfulyearbook.net/user/"+userId;
	yearbookLi.appendChild(yearbookLink);
	yearbookText = document.createTextNode("Awful Yearbook");
	yearbookLink.appendChild(yearbookText);
	profileLi.parentNode.insertBefore(yearbookLi,profileLi.nextSibling);
	profileLi.parentNode.insertBefore(yearbookSpace,yearbookLi);
}