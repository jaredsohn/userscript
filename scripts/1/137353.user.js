// ==UserScript==
// @name           SFGate Single Page
// @description    Display articles on SFGate.com as a single page.  Removes links from article text.  Hides comments.
// @namespace      http://www.sfgate.com/singlePage
// @downloadURL    http://userscripts.org/scripts/source/137353.user.js
// @updateURL      http://userscripts.org/scripts/source/137353.meta.js
// @include        http://*.sfgate.com/cgi-bin/article.cgi*
// @include        http://www.sfgate.com/*/article/*.php*
// @include        http://blog.sfgate.com/*
// @include        http://insidescoopsf.sfgate.com/blog/*
// @version        0.5
// @grant          none
// ==/UserScript==

//---
// User settings:
//---

// Turn the whole article into one page?
var doSinglePage = true;

// Hide comments at the bottom? (link to dedicated comments page should
// still be avalible)
var doHideComments = true;

// Remove links from within article text?
var doRemoveLinks = true;

//---
// End user settings
//---

//
// Single page code
//
// This works on the new SFGate site.
// There is probably a better way, but this seems to work.
function showAllPages() {
	var i;
	var pagesWrapperDiv = document.getElementById('text-pages');
	if (pagesWrapperDiv) {
		var allDiv = pagesWrapperDiv.getElementsByTagName('DIV');
		for (i = 0; i < allDiv.length; i++) {
			var d = allDiv[i];
			if (d.className && d.className == 'page') {
				d.style.display = 'block';
			}
		}
		var navDiv = document.getElementById('nav');
		if (navDiv) {
			navDiv.innerHTML = '&laquo; <a href="http://userscripts.org/scripts/show/137353">Pagnation Removed</a> &raquo;';
		}
	}
}

if (doSinglePage) {
	window.addEventListener("load", showAllPages);
}


//
// Comment hidding code
//
function hideComments() {
	var i;
	var plunkCommentsContainer = document.getElementById('pluckCommentsContainer');
	if (plunkCommentsContainer) {
		var allCommentDivs = plunkCommentsContainer.getElementsByTagName('DIV');
		var viewAllDiv;
		// First, hide everything.
		for (i = 0; i < allCommentDivs.length; i++) {
			var div = allCommentDivs[i];
			if (div.className.toLowerCase().indexOf('viewall') > -1) {
				viewAllDiv = div;
			} else {
				div.style.display = 'none';
			}
		}
		// Now work up from the view all link to the parent, and only show what
		// is needed.
		if (viewAllDiv) {
			while (viewAllDiv != plunkCommentsContainer) {
				viewAllDiv.style.display = 'block';
				viewAllDiv = viewAllDiv.parentNode;
			}
		}
	}
	

	// 2013-10-27 - Updates for new comment system
	var vfCommentsDiv = document.getElementById('hdn-vf-comments');
	if (vfCommentsDiv) {
		if (vfCommentsDiv.innerHTML.trim() == '') {
			setTimeout(hideComments, 1500);
		} else {
			var commentThreads = vfCommentsDiv.getElementsByClassName('vf-comment-thread');
			for (i = 0; i < commentThreads.length; i++) {			
				commentThreads[i].style.display = 'none';
			}
			var showAllDivs = vfCommentsDiv.getElementsByClassName('vf-show-all-con');
			for (i = 0; i < showAllDivs.length; i++) {
				showAllDivs[i].style.display = 'block';
			}
		}
	}
}

if (doHideComments) {
	window.addEventListener("load", hideComments);
}


//
// Link removal code
//
// This function replaces many of the A elements within the article text with SPAN elements
function replaceArticleLinks() {
	var i;
	var pages = document.getElementById('text-pages');
	if (!pages) { return; }
	var allLinks = pages.getElementsByTagName('A');
	// If we go from 0 to length, only one link gets replaced.
	for (i = allLinks.length-1; i >= 0; i--) {
		var alink = allLinks[i];
		if ((alink.href.indexOf('/') == 0)
			|| (alink.href.indexOf('sfgate.com') > -1))
		{
			var newSpan = document.createElement('span');
			newSpan.innerHTML = alink.innerHTML;
			alink.parentNode.replaceChild(newSpan, alink);
		}
	}
}

if (doRemoveLinks) {
	window.addEventListener("load", replaceArticleLinks);
}