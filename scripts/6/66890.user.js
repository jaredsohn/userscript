// ==UserScript==
// @name          Extended Navigation Bar Multiplayer
// @namespace     http://badassmonkey.org
// @description   Additional tabs for the forumwarz navigation bar, Made by Bamse (http://www.nilsbakken.com) modified for recent changes by Echuu. Also, Ricket did things.
// @include       http://www.forumwarz.com/*
// @include       http://forumwarz.com/*
// @exclude       http://www.forumwarz.com/forums/battle/*
// @exclude       http://forumwarz.com/forums/battle/*
// @exclude       http://forumwarz.com/help*
// @exclude       http://*.forumwarz.com/help*
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
var linksHTML1;

    if (location.href.substring(25,30) == "incit")

linksHTML1 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/incit\"'+
                    'class=\"not_current current\"><span class=\'inner\'>Incit</span></a></li>';
else 
	linksHTML1 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/incit\"'+
                    'class=\"not_current blue\"><span class=\'inner\'>Incit</span></a></li>';

if (location.href.substring(25,36) == "domination")
linksHTML1 += '<li><a href=\"http://www.forumwarz.com/domination\"'+
                     'class=\"not_current current\"><span class=\'inner\'>Domination</span></a></li>';
else
linksHTML1 += '<li><a href=\"http://www.forumwarz.com/domination\"'+
                     'class=\"not_current blue\"><span class=\'inner\'>Domination</span></a></li>';

if (location.href.substring(25,38) == "forum_buildr")

linksHTML1 += '<li><a href=\"http://www.forumwarz.com/forum_buildr\"'+
                     'class=\"not_current current\"><span class=\'inner\'>Forumbuildr</span></a></li>';
else

linksHTML1 += '<li><a href=\"http://www.forumwarz.com/forum_buildr\"'+
                     'class=\"not_current blue\"><span class=\'inner\'>Forumbuildr</span></a></li>';
			
if (location.href.substring(25,36) == "item_buildr")	
linksHTML1 += '<li><a href=\"http://www.forumwarz.com/item_buildr\"'+
                     'class=\"not_current current\"><span class=\'inner\'>itembuildr</span></a></li>';
else
linksHTML1 += '<li><a href=\"http://www.forumwarz.com/item_buildr\"'+
                     'class=\"not_current blue\"><span class=\'inner\'>itembuildr</span></a></li>';

if (location.href.substring(25,36) == "leaderboard")
linksHTML1 += '<li><a href=\"http://www.forumwarz.com/leaderboard/top_rankings\"'+
                     'class=\"not_current current\"><span class=\'inner\'>Leaderboards</span></a></li>';
else
linksHTML1 += '<li><a href=\"http://www.forumwarz.com/leaderboard/top_rankings\"'+
                     'class=\"not_current blue\"><span class=\'inner\'>Leaderboards</span></a></li>';

var linksHTML2 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/go/13\" class=\"not_current ';
if (location.href.substring(25,40) == "services/bruce")
	linksHTML2 += "current";
else
	linksHTML2 += "black";
linksHTML2 += '\"><span class=\'inner\'>Bruce Bear\'s</span></a></li>'+
	            '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/22\"'+
                    'class=\"not_current ';

if (location.href.substring(25,36) == "stores/ppwn")
	linksHTML2 += "current";
else
	linksHTML2 += "black";
linksHTML2 += '\"><span class=\'inner\'>Ppwn Shoppe</span></a></li>'+
				'<li class=\'indent\'>';
				

    var lastLink, linksElem, multiTab;
    lastLink = document.getElementsByTagName('li')[3];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML1;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[12];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML2;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    var multiTab = document.getElementById('multiplayer_tab');
    if (multiTab) {
	multiTab.parentNode.removeChild(multiTab); }
    var plusTab = document.getElementById('__tab');
    if (plusTab) {
	plusTab.parentNode.removeChild(plusTab); }


}
