// Digg Comment Destroyer
// v1.9
// Copyright (c) 2006, 2007 Scott harmon
// Last updated: 12/21/2007
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Adapted from Joris Roovers' Digg Comment Threshold Fix
//
// ==UserScript==
// @name          Digg Hide Comments without Links
// @namespace     http://www.cis.ksu.edu/~harmon/
// @description   Hides comments in digg which contain no links
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==

var allLinks, thisLink;
var comment_id=Array();
var stories_to_hide=Array();
allLinks = document.evaluate('//li[@id]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if (thisLink.id[0]=="c") { // filter out all comments
		var len=thisLink.id.length-1;
		cid=thisLink.id.substr(4,len);//comment id
		comment_id.push(cid);
	}
}

for(j = 0; j < comment_id.length; j++) {
	if(document.getElementById('c-text-'+comment_id[j])) {
		var links = document.getElementById('c-text-'+comment_id[j]).getElementsByTagName('a');
		if (document.getElementById('c-reason'+comment_id[j]) == null) {
			good = false;
			for(h = 0; h < links.length; h++) {
				if (links[h].className == "user") {
					good = true;
					break;
				}
			}
			
			if (!good) {
				stories_to_hide.push(comment_id[j]);
			}
		}
	}
}

for(k = 0; k < stories_to_hide.length; k++) {
	// Lay-out adjustments to digg
	var element=document.getElementById('c-'+stories_to_hide[k]);
	element.className="c-head c-disabled";
	element=document.getElementById('c-diggs'+stories_to_hide[k]).parentNode;
	element.innerHTML="<span><span>[</span><span id=\"c-reason"+stories_to_hide[k]+"\">no link (broken)</span><span>,&nbsp;</span><a id=\"c-disabled"+stories_to_hide[k]+"\" class=\"c-dis-lnk\" href=\"#\">show comment</a><span>]&nbsp;</span></span>"+element.innerHTML;
	element=document.getElementById('c-wrap'+stories_to_hide[k]);
	element.className="c-wrap c-hide";
	element=document.getElementById('digg-'+stories_to_hide[k]);
	element.className="c-digg-inactive";
	element.setAttribute('src','/img/c-digg-off.png');
	element.setAttribute('alt','');
	element=document.getElementById('bury-'+stories_to_hide[k]);
	element.className="c-bury-inactive";
	element.setAttribute('src','/img/c-bury-off.png');
	element.setAttribute('alt','');
//	element=document.getElementById('colorthumbs'+stories_to_hide[k]);
//	element.setAttribute('style','display:none;');
//	element=document.getElementById('graythumbs'+stories_to_hide[k]);
//	element.removeAttribute('style');
//	element=document.getElementById('cshowlink'+stories_to_hide[k]);
//	element.removeAttribute('style');
//	element.innerHTML=element.innerHTML.replace(/comment buried/,"no link");
}