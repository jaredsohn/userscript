// ==UserScript==
// @name          Forumwarz Extended Navigation Bar Light
// @description   Additional tabs for the Forumwarz navigation bar. Made by Bamse (http://www.nilsbakken.com) and modified for recent changes by FalCoN.
// @include       http://www.forumwarz.com/*
// @include       http://forumwarz.com/*
// @exclude       http://www.forumwarz.com/forums/battle/*
// @exclude       http://forumwarz.com/forums/battle/*
// @exclude       http://www.forumwarz.com/help
// @exclude       http://forumwarz.com/help
// @exclude       http://www.forumwarz.com/help/*
// @exclude       http://forumwarz.com/help/*

// ==/UserScript==

// Call style function
addGlobalStyle();
// Add general links
expandNavBar();

// Update stylesheet
function addGlobalStyle() {

    var css = 'div.tabs a.gmtab { background-position: 0px -378px;}'+
	      'div.tabs a.gmtab span.inner { background-position: 100% -378px; color: #000; }';

    var head, style;
    head = document.getElementsByTagName('head')[0];

    if (!head) { return; }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;

    head.appendChild(style);
}

// Add links to navigation bar
function expandNavBar() {

	var linksHTML1 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/by_type/forums\"'+
                     'class=\"not_current\"><span class=\'inner\'>Forums</span></a></li>'+
                     '<li><a href=\"http://www.forumwarz.com/bookmarks/community\"'+
                     'class=\"not_current\"><span class=\'inner\'>Community</span></a></li>'+
					 '<li><a href=\"http://www.forumwarz.com/domination/vanilla\"'+
                     'class=\"not_current\"><span class=\'inner\'>Vanilla</span></a></li>';

    var linksHTML2 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/go/13\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>BB</span></a></li>'+
	            	 '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/22\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>PS</span></a></li>'+
	           		 '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/71\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>K!</span></a></li>'+
                     '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/70\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>KCC</span></a></li>'+
				     '<li class=\'indent\'>';

    var linksHTML3 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/domination\"'+
                     'class=\"not_current meta\"><span class=\'inner\'>Domination</span></a></li>'+
					 '<li><a href=\"http://www.forumwarz.com/incit\"'+
                     'class=\"not_current meta\"><span class=\'inner\'>INCIT</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/forum_buildr\"'+
                     'class=\"not_current meta\"><span class=\'inner\'>FB</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/item_buildr\"'+
                     'class=\"not_current meta\"><span class=\'inner\'>IB</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/leaderboard\"'+
                     'class=\"not_current meta\"><span class=\'inner\'>LB</span></a></li>';

    var linksHTML4 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/idc\"'+
                     'class=\"not_current community\"><span class=\'inner\'>IDC</span></a></li>';
                     
    var linksHTML5 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/buy_stuff\"'+
                     'class=\"not_current buy_stuff\"><span class=\'inner\'>BP</span></a></li>';

    var lastLink, linksElem, multiTab, supportTab;

    lastLink = document.getElementsByTagName('li')[2];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML1;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[3];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML2;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[7];

    if (!lastLink) { return; }

	linksElem = document.createElement('li')
	linksElem.innerHTML = linksHTML3;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[21];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML4;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

	lastLink = document.getElementsByTagName('li')[26];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML5;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

	var bookmarksTab = document.getElementById('bookmarks_tab');
    if (bookmarksTab) {	bookmarksTab.parentNode.removeChild(bookmarksTab); }

	var multiTab = document.getElementById('multiplayer_tab');
    if (multiTab) {	multiTab.parentNode.removeChild(multiTab); }

	var supportTab = document.getElementById('support_us__tab');
	if (supportTab) { supportTab.parentNode.removeChild(supportTab); }

}