// ==UserScript==
// @name			Twitter Add Replies Link To Profiles
// @author			Erik Vold
// @namespace		twitterAddRepliesLinkToProfiles
// @include			http*://twitter.com/*
// @include			http*://*.twitter.com/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-04
// @lastupdated		2009-09-05
// @description		This userscripts adds a replies link to all twitter profile pages.
// ==/UserScript==

var twitterAddRepliesLinkToProfiles={};
twitterAddRepliesLinkToProfiles.run=function(){
	var user=document.evaluate("//head/meta[@name='page-user-screen_name']",document,null,9,null).singleNodeValue;
	if(!user) return;
	user=user.getAttribute("content");
	var nav=document.getElementById('primary_nav');
	if(!nav) return;
	var newLi=document.createElement('li');
	newLi.id='profile_replies_tab';
	var newA=document.createElement('a');
	newA.setAttribute('accesskey','m');
	newA.href="http://twitter.com/#search?q=%40"+user;
	newA.innerHTML="@"+user;
	newLi.appendChild(newA);
	nav.insertBefore(newLi,nav.childNodes[0]);
	return;
}
twitterAddRepliesLinkToProfiles.run();