// ==UserScript==
// @name            My Nokia Blog Troll Cleanser
// @version         0.1
// @namespace       MyNokiaBlog
// @description     Completely removes desired trolls from MyNokiaBlog comments.
// @include         http://*mynokiablog.com/*
// ==/UserScript==

var verifiedTrolls = ['Cod3rror'];	// comma separated list of trolls
var caseSensitive = false;		// should the script treat troll names as case-sensitive

removeTrolls(verifiedTrolls, caseSensitive);

 function removeTrolls(trolls, csensitive) {
	var i, c_clist;
	var c_trolls = trolls.slice();
	 if(!csensitive)
		c_trolls = c_trolls.join('<->').toLowerCase().split('<->');
	var c_ols = document.getElementsByTagName('ol');
	if(!c_ols || !c_ols.length)
		return;
	for(i=0; i<c_ols.length; i++) {
		if(c_ols[i].className == 'commentlist') {
			c_list = c_ols[i];
			break;
		}
	}
	if(!c_list)
		return;
	var c_cites = c_list.getElementsByTagName('CITE');
	if(!c_cites || !c_cites.length)
		return;
	for(i=0; i<c_cites.length; i++) {
		var c_cite = c_cites[i];
		var c_nick = csensitive ? c_cite.textContent : c_cite.textContent.toLowerCase();
		if(c_trolls.indexOf(c_nick) != -1) {
			while(true) {
				c_cite = c_cite.parentNode;
				if(!c_cite || !c_cite.parentNode)
					break;
				if(c_cite.tagName == 'LI') {
					c_cite.parentNode.removeChild(c_cite);
					break;
				}
			}
		}
	}
 }
