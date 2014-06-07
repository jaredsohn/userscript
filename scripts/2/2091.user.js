// ==UserScript==
// @name           Helgon.net toolbar
// @namespace      http://henrik.nyh.se
// @description    Displays toolbar with shortcuts to presentation, guestbook and gallery (edit the code for diary and friends as well) when hovering over a Helgon.net userlink.
// @include        http://*helgon.net/*
// @exclude        http://*helgon.net/frameset/*
// ==/UserScript==

// TODO: Fixed position in image corners, fixed position over usernames, on hover?

var userlinks = "//a[@target='helgonmain'][contains(@href, '?ID=')] | //a[starts-with(@href, '../UserInfo/UserInfo.aspx?ID=')]/img/.. | //a[contains(translate(@href, 'QUICKSEARCH', 'quicksearch'), 'quicksearch')]";

GM_addStyle("#GM_toolbar { position:absolute; display:none; border:1px solid #000; font-size:10px; padding:2px 5px; background:#000; opacity:0.8; -moz-border-radius: 0.5em; }");

var timer, toolbar_timeout = 1500;  // milliseconds
var cache = {};

// Set up toolbar

var helgon_toolbar = document.createElement('div');
helgon_toolbar.id = "GM_toolbar";
helgon_toolbar.addEventListener('mouseover', showToolbar, true);
helgon_toolbar.addEventListener('mouseout', hideToolbar, true);
document.body.appendChild(helgon_toolbar);


with_each(userlinks, function(link) {
	var linkedImg = link.getElementsByTagName("img")[0];
	if (linkedImg) link.title = linkedImg.title;  // Set title of link to title of user image, if linked image
	
	var id = link.href.match(/\?ID=(\d+)/);
	if (id) link.id = id[1];  // Set id of link to id of user, if not a QuickSearch link

	link.addEventListener('mouseover', createToolbar, true);
	link.addEventListener('mouseout', hideToolbar, true);
});


/* Specific functions */

function getURL(link, section) {
	var urls = ['', '/UserInfo/UserInfo', '/GuestBook/Guestbook', '/Diary/Diary', '/Friends/Friends', '/Gallery2/Gallery'];
	if (link.id)  // ID based
		return urls[section] + '.aspx?ID=' + link.id;
	else  // QuickSearch
		return link.href + '.' + section;
}

function createToolbar(e) {

	if (!cache[this.href]) {
		// Full toolbar
		//cache[this.href] = '<a href="' + getURL(this, 1) + '">P</a> | <a href="' + getURL(this, 2) + '">GB</a> | <a href="' + getURL(this, 3) + '">DB</a> | <a href="' + getURL(this, 4) + '">Po</a> | <a href="' + getURL(this, 5) + '">G</a>';
		// Only presentation, guestbook and gallery
		cache[this.href] = {
			html: '<a href="' + getURL(this, 1) + '">P</a> | <a href="' + getURL(this, 2) + '">GB</a><br /><a href="' + getURL(this, 5) + '">G</a>',
			title: (this.title ? this.title : this.innerHTML.replace(/<.*?>/g, ''))
		};
	}
	helgon_toolbar.innerHTML = cache[this.href].html;
	helgon_toolbar.title = cache[this.href].title;

	helgon_toolbar.style.left = (e.clientX + window.scrollX - 9) + "px";
	helgon_toolbar.style.top = (e.clientY + window.scrollY - 9) + "px";

	showToolbar();
}

function showToolbar() {
	helgon_toolbar.style.display = 'block';
	clearTimeout(timer);
}

function hideToolbar() {
	timer = setTimeout(function() {
			helgon_toolbar.style.display = 'none';
	}, toolbar_timeout);
}


/* General functions */

function $x(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function with_each(query, cb, root) {
	var results = $x(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}
