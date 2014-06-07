// ==UserScript==
// @name           Twitter Twits
// @namespace       http://www.porganized.com
// @description    Yells the identities of Twitter spammers to you
// @include        http://twitter.com/*
// ==/UserScript==

//version 1.0.3

var AcceptRatio = 0.2;

var Followers = document.getElementById('follower_count').innerHTML.replace(',','');
var Following = document.getElementById('following_count').innerHTML.replace(',','');
var FollowRatio = Followers/Following;


if (Following>20) {
	if (FollowRatio<AcceptRatio) {
		var allpars = document.getElementsByTagName('span');
		for(var i = 0; i < allpars.length; i++)	{
			if(allpars[i].className=='entry-content') {
				allpars[i].innerHTML="I'M A SPAMMER!!!";
			}
		}
	}
}