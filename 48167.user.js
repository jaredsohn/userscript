// ==UserScript==
// @name          Forumwarz Extended Navigation Bar: Flamebate
// @description   Additional tabs for the Forumwarz navigation bar. Made by Bamse (http://www.nilsbakken.com) and modified for recent changes by Oleg Mordashov. 1280x1024 version.
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
//add Tubmail link
addTubmail();

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

    var linksHTML1 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/discussions/rp\"'+
                     'class=\"not_current community\"><span class=\'inner\'>Flamebate</span></a></li>'+
	                 '<li ><a href=\"http://www.forumwarz.com/discussions/topics/1612\"'+
                     'class=\"not_current community\"><span class=\'inner\'>Contests</span></a></li>'+
                     '<li ><a href=\"http://www.forumwarz.com/discussions/topics/465\"'+
                     'class=\"not_current community\"><span class=\'inner\'>FoW</span></a></li>'+
                     '<li ><a href=\"http://www.forumwarz.com/discussions/topics/464\"'+
                     'class=\"not_current community\"><span class=\'inner\'>CoS</span></a></li>'+
                     '<li ><a href=\"http://www.forumwarz.com/idc\"'+
                     'class=\"not_current community\"><span class=\'inner\'>IDC</span></a></li>'+
	                 '<li ><a href=\"http://www.forumwarz.com/spoilers\"'+
                     'class=\"not_current community\"><span class=\'inner\'>Wiki</span></a></li>';

    var linksHTML2 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/discussions/search_by_character/Oleg\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Oleg</span></a></li>'+
                     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/1337xxxlolololxxx1337\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>1337xxx</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/ANGRY%20HOBO\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>ANGRY HOBO</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/Fortunato\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Fort</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/handofg0d\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>h0g</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/Hobart%20Bliggity\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Hobart</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/Odalisque\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Oda</span></a></li>'+
				     '<li><a href=\"http://www.forumwarz.com/discussions/search_by_character/was\"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>was</span></a></li>';

	var linksHTML3 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/buy_stuff\"'+
                     'class=\"not_current buy_stuff\"><span class=\'inner\'>BP</span></a></li>';

    var lastLink, linksElem, multiTab, klansTab, flameTab; wikiTab; supportTab;

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

    lastLink = document.getElementsByTagName('li')[18];

    if (!lastLink) { return; }

	linksElem = document.createElement('li')
	linksElem.innerHTML = linksHTML3;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

	var multiTab = document.getElementById('multiplayer_tab');
    if (multiTab) {	multiTab.parentNode.removeChild(multiTab); }

	var klansTab = document.getElementById('klans_tab');
    if (klansTab) {	klansTab.parentNode.removeChild(klansTab); }

	var flameTab = document.getElementById('flamebate_tab');
	if (flameTab) {	flameTab.parentNode.removeChild(flameTab); }

	var wikiTab = document.getElementById('wiki_tab');
    if (wikiTab) { wikiTab.parentNode.removeChild(wikiTab); }

	var supportTab = document.getElementById('support_us__tab');
	if (supportTab) { supportTab.parentNode.removeChild(supportTab); }

}

// Add Tubmail link
function addTubmail() {

	var tubLink = ' | '+
	'<a href=\"/inbox/mail\">Tubmail</a>';

    var lastTub, linksTub;

    lastTub = document.getElementsByTagName('a')[2];

    if (!lastTub) { return; }

    linksTub = document.createElement('a');
    linksTub.innerHTML = tubLink;

    lastTub.parentNode.insertBefore(linksTub, lastTub.nextSibling);

}