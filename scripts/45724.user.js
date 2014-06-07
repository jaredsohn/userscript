// ==UserScript==
// @name          Extended Navigation Bar Multiplayer
// @namespace     http://badassmonkey.org
// @description   Additional tabs for the forumwarz navigation bar, Made by Bamse (http://www.nilsbakken.com) updated by tubs
// @include       http://www.forumwarz.com/*
// @include       http://forumwarz.com/*
// @exclude       http://www.forumwarz.com/forums/battle/*
// @exclude       http://forumwarz.com/forums/battle/*
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

    var linksHTML = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/job_board\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Jobs</span></a></li>'+
	'<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/go/13\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Bruce</span></a></li>'+	
	            '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/22\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Ppwn</span></a></li>'+
                    '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/71\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Kyoubai</span></a></li>'+
		    '<li class=\'indent\'><a href=\"http://www.forumwarz.com/incit\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Incit</span></a></li>'+
		    '<li><a href=\"http://www.forumwarz.com/domination"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Dom</span></a></li>'+
		    '<li><a href=\"http://www.forumwarz.com/forum_buildr"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Fb</span></a></li>'+
                    '<li><a href=\"http://www.forumwarz.com/item_buildr"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Ib</span></a></li>'+
                    '<li><a href=\"http://www.forumwarz.com/leaderboard/top_rankings"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>LB</span></a></li>';
                    
				

    var lastLink, linksElem;
    lastLink = document.getElementsByTagName('li')[8];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

}