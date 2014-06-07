// ==UserScript==
// @name		9GAG Social Media Free
// @description	removes the annoying social media buttons
// @copyright	Mordred666
// @version		1.0
// @include		http://9gag.com*
// @include		https://9gag.com*
// @include		http://www.9gag.com*
// @include		https://www.9gag.com* 
// ==/UserScript==


remove("share");
remove("badge-twitter-share badge-evt badge-track btn-share twitter");
remove("badge-facebook-share badge-evt badge-track btn-share facebook");
remove("badge-more-share-button more");

function remove(classname)
{
	var shit = document.getElementsByClassName(classname);
	for(var i = 0; i < shit.length ; i++)
	{
		shit[0].parentNode.removeChild(shit[0]);
	}
}
