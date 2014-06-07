// ==UserScript==
// @name           highlightnewPosts
// @namespace      peters-webcorner.de
// @description    highlight new forum posts for help colorblind people
// @include        http://www.teamhb.org/index.php?page=community&subpage=viewf&f=*
// @include        http://teamhb.org/index.php?page=community&subpage=viewf&f=*
// @include 	   http://www.teamhb.org/index.php?page=community&subpage=forum&section=*
// @include 	   http://teamhb.org/index.php?page=community&subpage=forum&section=*
// @include	   http://www.teamhb.org/index.php?page=community&subpage=forum
// @include	   http://teamhb.org/index.php?page=community&subpage=forum
// @include	   http://www.teamhb.org/index.php?page=community
// @include	   http://teamhb.org/index.php?page=community
// @version	   0.0.0.1
// ==/UserScript==

var timeout = 100;

window.setTimeout( function(){
	var thisPost, allPosts;
//"border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px solid rgb(170, 170, 170); padding-top: 2px; padding-bottom: 2px;"
	allPosts = document.evaluate(
	    '//td[@style="border-bottom: 1px solid rgb(170, 170, 170); border-left: 1px solid rgb(170, 170, 170); padding-top: 2px; padding-bottom: 2px;"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var k = 0; k < allPosts.snapshotLength; k++) {
		thisPost = allPosts.snapshotItem(k);
		if((thisPost.innerHTML.indexOf('ico_newposts') > 0) || (thisPost.innerHTML.indexOf('sticky_newposts') > 0) || (thisPost.innerHTML.indexOf('announce_newposts') > 0)) {
			thisPost.style.background="lightgreen";
		}
	}
	allPosts = document.evaluate(
	    '//td[@rowspan="3"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    
	for (var k = 0; k < allPosts.snapshotLength; k++) {
		thisPost = allPosts.snapshotItem(k);
		if(thisPost.innerHTML.indexOf('ico_newposts') > 0) {
			thisPost.style.background="lightgreen";
		}
	}
},timeout);