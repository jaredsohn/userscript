// ==UserScript==
// @name           YouTubed Already
// @namespace      none
// @include        http://www.youtube.com/*
// ==/UserScript==

// script to highlight visited links which youtube prevents for some mysterious reason

(function(){

/* replaced with new code below
//strip featured video links of this non-essential param (&amp;feature=fvw)
//so we can see if we've been there before (added 8/23/10): 
var vidlist
vidlist = document.getElementsByTagName("a")
for( i = 0; i <vidlist.length; i++) {
	if(vidlist[i].href.indexOf("watch?v=") > 0) {
	if(vidlist[i].href.indexOf("&feature=") > 0) {
		vidlist[i].href = vidlist[i].href.substr(vidlist[i].href,vidlist[i].href.indexOf("&feature="))
	}}
	//else break
}
*/

// strip non-essential arguments to normalize links for increased site-wide link consistency,
// i.e.: http://www.youtube.com/watch?v=aKWPht3fU-o != http://www.youtube.com/watch?v=aKWPht3fU-o&featured=fvw 
// credit to papercl1p for the xpath code:
var cleanlink, dirtylink, i, x, aXpath;
aXpath = new Array(7);
aXpath[0] = '//a[contains(@href, "feature=related")]';
aXpath[1] = '//a[contains(@href, "feature=relmfu")]';
aXpath[2] = '//a[contains(@href, "feature=g-")]';
aXpath[3] = '//a[contains(@href, "feature=b-")]'; // &feature=b- all browse 
aXpath[4] = '//a[contains(@href, "/user/")]';
aXpath[5] = '//a[contains(@href, "/videos")]';    // search 
aXpath[6] = '//a[contains(@href, "&list")]';	  // playlists

for(x in aXpath) {
	dirtylink = document.evaluate(aXpath[x], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < dirtylink.snapshotLength; i++) {
		cleanlink = dirtylink.snapshotItem(i);
		switch (x){
		case 6:
                    cleanlink.href = cleanlink.href.replace(/\&feature(.*)/,"").replace(/\&index(.*)/,"");
		    break;
		case 4:
		case 5:
		    cleanlink.href = cleanlink.href.replace(/\?(.*)/,"");

		    break;
		default :
		    cleanlink.href = cleanlink.href.replace(/\&(.*)/,"");
                }
	}
}


// highlight visited video links sitewide:
GM_addStyle('.video-entry a:visited { color:red !important; } ');
// again for "Most Popular" section:
GM_addStyle('.title a:visited { color:red !important; } ');
GM_addStyle('.video-title a:visited { color:red !important;}');
//ads-description section of search screen:
GM_addStyle('.ads-description a:visited { color:red !important; padding-left: 18px; background: url(http://s.ytimg.com/yt/favicon-vfl86270.ico) left no-repeat;}');
//class used on "view all comments" screen:
GM_addStyle('.vtitle a:visited { color:red !important; padding-left: 18px; background: url(http://s.ytimg.com/yt/favicon-vfl86270.ico) left no-repeat;}');


//added 8/23/10 to highlight the entire block with red background, favicon placed on right:
GM_addStyle('.video-list-item a:visited { background-color: #FFAAAA} ');
//added 5/19/12 to highlight the entire block with red background, favicon placed on right:
GM_addStyle('.video-list-item a:visited { background-color: #FFAAAA !important;} ');

// to change the behavior to highligting the link in red only:
// comment out the 2 AM_addStyle lines above and uncomment the next line 
//GM_addStyle('.video-list-item a:visited .title { color: red !important; } ');
//thanks to user "effington" for this mod; personally, I like the bg color change
//because it is visible from a distance and shows even when title is off screen

// for search results page, make entire block have a gray background:
//GM_addStyle('.result-item a:visited { color: red !important;} ');
//above works only on the embedded links, not the title links, so....
GM_addStyle('.result-item-main-content a:visited { background-color: #FFAAAA !important;} ');


})(); 