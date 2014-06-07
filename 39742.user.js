// ==UserScript==
// @name	Reddit fixer
// @description	Clean up Reddit pages to be a little nicer, like old Reddit
// @include	http://reddit.com/*
// @include	http://*.reddit.com/*
// ==/UserScript==

// Reddit fixer
// version 1.2 (2010-02-08)
// Copyright (c) Dan Fenwick, licensed under BSD

var unwanted = (['infobar', 'side', 'footer-parent', 'midcol', 'rank',
		'thumbnail', 'tagline', 'organic-listing', 'promotedlink',
		'arrow up','arrow down','searchpane raisedbox','description',
		'expando-button', 'expando'
		]); // some of these are often duplicates, but not always

var delete_count = 0;

function xpath(exp) {
	// build, count, kill elements in XPath result set
	var i, item;
	var result = document.evaluate(exp,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

	for (i = 0; item = result.snapshotItem(i); i++) {
		item.parentNode.removeChild(item);
		delete_count++;
	}
}

function killClass(classes) {
	// generic by-class XPath search
	var i, len;

	// seek string ' TARGET ' in ' FULL CLASSNAME '
	for (i = 0, len = classes.length; i < len; i++) {
		xpath('//*[contains(concat(" ", @class, " "), " '
			+ classes[i] +
			' ")]');
	}
}

function commentToggle() {
	// show/hide '# comments' links by posts
	location.href = "javascript:void($('li.first').toggle());";
}

function selfPostToggle() {
	GM_setValue('hideSelfPosts', ! GM_getValue('hideSelfPosts'));
}

function footerExtras(selfs) {
	// add info to the footer: may include link to /reddits/,
	// 'comments' show/hide, and selfpost status
	var href = window.location.href;
	var comment = false;
	var reddits = false;
	var nextprev, link, comments, note;

	if (href.match(/\/r\/.+\/comments/)) {
		comment = true;
	}

	if (href.match(/\/reddits\//)) {
		reddits = true;
	}

	nextprev = document.getElementById('siteTable').parentNode.lastChild;

	if (! comment) {
		nextprev.appendChild(document.createTextNode('\n|\n'));
	}

	link = document.createElement('a');
	link.setAttribute('href', '/reddits/');
	link.appendChild(document.createTextNode('/reddits/'));
	nextprev.appendChild(link);

	if (! comment & ! reddits) {
		nextprev.appendChild(document.createTextNode('\n|\n'));

		comments = document.createElement('a');
		comments.setAttribute('href', 'javascript:void()');
		comments.setAttribute('onclick', '$("li.first").toggle();');
		comments.appendChild(document.createTextNode('comments'));
		nextprev.appendChild(comments);
	}

	if (GM_getValue('hideSelfPosts') & (! reddits) & (! comment)) {
		if (selfs == 1) {
			note = " self post removed";
		} else {
			note = " self posts removed";
		}

		nextprev.appendChild(
			document.createTextNode('\n|\n ' + selfs + note));
	}
}

// collapse the three-line block elements into an inline run-on via CSS
GM_addStyle("p.title, p.nextprev, p.titlerow, ul.flat-list, a.comments \
	{display:inline !important; margin-left:0; margin-right:0.5em;} \
	div.md p + p {margin-top: 1px !important;} \
	.midcol, .tagline {display: none !important;} \
	.entry div .buttons li {display: none !important;}");

// register link, 'shared' links, and reddits header
xpath('//div[@id = "header-bottom-right"]/*');
xpath('//ul[@class = "flat-list buttons"]/li[not(@class = "first")]');
xpath('//div[@id = "sr-header-area"]');

if (GM_getValue('hideSelfPosts')) {
	// kill the div.thing ancestor of a link with text containing 'self.'
	var selfs = delete_count;
	xpath('//span[@class="domain"]/\
			a[contains(text(), "self.")]/\
			ancestor::div[contains(@class, "thing")]');
	selfs = delete_count - selfs;
}

footerExtras(selfs);

// move search box
document.getElementById('header-bottom-right').appendChild(
		document.getElementById('search'));

killClass(unwanted);

// add mouse-over "# deleted" to reddit image in top left corner
document.getElementById('header-img').title = delete_count + " deleted";

commentToggle();

GM_registerMenuCommand('Show/hide comment links', commentToggle, '', '', 'c');
GM_registerMenuCommand('Toggle self post removal', selfPostToggle, '', '', 's');
