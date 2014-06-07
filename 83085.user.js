// ==UserScript==
// @name           DisableTwitterRecommendations
// @namespace      Twitter
// @description    Disable the twitter recommendation feature
// ==/UserScript==
var recuser = document.getElementById('recommended_users');
if(recuser)
{
	recuser.parentNode.removeChild(recuser);
}
var checkTab = document.getElementById('twitter-suggests-tab');
if(checkTab)
	checkTab.parentNode.removeChild(checkTab);