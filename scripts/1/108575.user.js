// ==UserScript==
// @name           Imgur Url Changer and pics/funny comment link subreddit remover
// @namespace      http://omgmog.net
// @description    Simply replaces imgur urls with filmot and removes subreddit from comment links on pics and funny subreddits
// @include        http://www.reddit.com/*
// @version        1.0
// ==/UserScript==


function get_anchors(){
       var anchors = new Array();
       var elms = document.getElementsByTagName('a');
       for(var i=0; i<elms.length; i++){
            if(elms[i].href) anchors.push(elms[i]);
       }
       return anchors;
    }

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
	
	// change imgur links to filmot
    if (thisLink.href.match('imgur.com')) {
		thisLink.href = thisLink.href.replace('imgur.com', 'filmot.com');
	}
	
	// remove subreddit from 'funny' comment links
	if(thisLink.href.match('r/funny/comments')){
		thisLink.href = thisLink.href.replace('r/funny/','');
		}
	// remove subreddit from 'pics' comment links
	if(thisLink.href.match('r/pics/comments')){
		thisLink.href = thisLink.href.replace('r/pics/','');
		}
}