// ==UserScript==
// @name        Pharyngula Comment Renumbering Script
// @namespace   http://www.studiokagato.com/scripts/
// @description Renumbers article comments to their appropriate values when comments are paged; also copies the navigation controls above comments
// @include     http://freethoughtblogs.com/pharyngula/*
// @include     http://www.freethoughtblogs.com/pharyngula/*
// @version     1.0
// ==/UserScript==

try{
	pagesize=500;
	startnumber=1;
	// get the comment count element if present
	comments=document.getElementById('comments');
	if(comments) {
		// find out which page we're on
		pageid=document.URL.match(/comment-page-([0-9]*)/);
		if(pageid){
			// not the last page; just calculate from page number
			pageid=pageid[1];
			startnumber=((pageid-1)*pagesize)+1;
		}
		else{
			// latest page; calculate based on total number of comments
			count=comments.textContent.split(' ')[0].replace(/[^0-9]/g,'');
			startnumber=(Math.floor(count/pagesize)*pagesize)+1;
		}
		// set the starting number of the comment list
		document.getElementsByClassName('commentlist')[0].start=startnumber;
		
		// add a copy of the navigation controls above the comment list
		if(!document.getElementById('renumber_nav')){
			nav=document.getElementsByClassName('navigation');
			if(nav){
				newnav=nav[nav.length-1].cloneNode();
				newnav.id='renumber_nav';
				comments.parentNode.insertBefore(newnav,comments.nextSibling);
			}
		}
	}
}
catch(err){
	console.log("Error renumbering Pharyngula comments: "+err);
}