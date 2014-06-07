// ==UserScript==
// @name			Reddit - open comments and article in new tabs
// @namespace		http://arvixx.blogspot.com
// @description	Adds a new button to each article that opens the comments and article in new tabs
// @include		http://reddit.com/*
// @include		http://*.reddit.com/*
// ==/UserScript==

/* http://www.gnu.org/copyleft/gpl.html */

function $x(xpath, root) { // From Johan Sundstr�m
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function createBylink(label, action) {
	var bylink = document.createElement('a');
	bylink.textContent = label;
	bylink.setAttribute('href', 'javascript: ;');
	bylink.setAttribute('class', 'bylink');
	bylink.addEventListener('click', action, true);
	return bylink;
}


var mode = 0; 
/*
0 = always open link and comments. 
1 = open link but only open comments if there are any comments. 
2 = don't show the link if there are no comments
*/

var articles = $x("//tr[@class='oddRow' or @class='evenRow']/td[@class='wide little']");
articles.forEach(function(v, i, a) {
	var articlelink = $x("./parent::*/preceding-sibling::tr[position()=1]//a[starts-with(@id, 'title')]", v)[0];
	var commentslink = $x("./a[contains(@href, 'comments') and @class='bylink']", v)[0];
	
	if (articlelink && commentslink) {	
		var ncomments = commentslink.textContent.match(/\d+ comment/);
	
		var lbl = 'comments & article';
		var f = function () {
			GM_openInTab(commentslink);
			GM_openInTab(articlelink);
		};
		var showlink = true;
		
		switch (mode) {
			case 1:
				if (!ncomments) {
					f = function() {
						GM_openInTab(articlelink);
					};
				}
				break;
				
			case 2:
				if (!ncomments) {
					showlink = false;
				}
				break;
		}
		
		if (showlink)
			v.appendChild(createBylink(lbl, f));
	}
});