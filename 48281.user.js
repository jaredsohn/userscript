// ==UserScript==
// @name          FWZ Navigation Bar ReDux
// @namespace     http://badassmonkey.org
// @description   Additional tabs for the forumwarz navigation bar, Made by Bamse (http://www.nilsbakken.com) modified for recent chanes by Echuu. Includes stores. MERCWITHMOUTH'S UPDATED VERSION: Also includes AuctionSite. NOW ALSO TUBMAIL. ALSO EVEN NOW HAS 'VANNILA HELPER' AND 'ITEM-BUILDER'
// @include       http://www.forumwarz.com/*
// @exclude       http://www.forumwarz.com/forums/battle/*
// ==/UserScript==

// Note more information available at http://userscripts.org/users/83206 along with other script downloads

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

    var linksHTML = 
'<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/go/71\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>KO</span></a></li>'+
                     '<li><a href=\"http://www.forumwarz.com/bookmarks/go/4\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>TM</span></a></li>'+                  

    		    '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/go/13\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>BB</span></a></li>'+
	            '<li ><a href=\"http://www.forumwarz.com/bookmarks/go/22\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>Pp</span></a></li>'+

				'<li class=\'indent\'><a href=\"http://www.forumwarz.com/incit\"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>In</span></a></li>'+
				'<li><a href=\"http://www.forumwarz.com/domination"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Dom</span></a></li>'+
				'<li><a href=\"http://www.forumwarz.com/forum_buildr"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Fb</span></a></li>'+
				'<li><a href=\"http://www.forumwarz.com/leaderboard/top_rankings"'+
                     'class=\"not_current gmtab\"><span class=\'inner\'>Lb</span></a></li>'+

'<li class=\'indent\'><a href=\"http://www.forumwarz.com/domination/vanilla"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>VH</span></a></li>'+
                     '<li><a href=\"http://www.forumwarz.com/item_buildr"'+
                    'class=\"not_current gmtab\"><span class=\'inner\'>ItB</span></a></li>';				

    var lastLink, linksElem;
    lastLink = document.getElementsByTagName('li')[8];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

}