// ==UserScript==
// @name        link hider changer
// @namespace   fm
// @version     1
// @grant       none
// ==/UserScript==

links = document.getElementsByTagName("a")

anon1 = "http://anonym.to/?" //original anonymizer base url to be changed
anon2 = "http://www.dereferer.org/?" //change to this anonymizer url
anon3 = "" //use only for anything that trails the anonymized url

for(var i = 0, l = links.length; i < l; i++) {
	if(links[i].href.match(anon1) != null)
		{
		links[i].href = links[i].href.replace(anon1, anon2) + anon3
		}
	}