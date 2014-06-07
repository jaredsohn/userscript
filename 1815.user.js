// ==UserScript==
// @name Gamespot LastReply fix
// @author Horst Gutmann
// @namespace http://zerokspot.com
// @version 1.0
// @description This is more or less a semantical fix of the last-reply link displayed
//              after each post in the forum view of the gamespot board. The link
//              should IMO also redirect the user to the anchor of the last post
//              so it's a fix as well as an enhancement.
// @include http://forums.gamespot.com/gamespot/show_topics.php*
// ==/UserScript==

/*
 * This script is granted to the Public Domain
 */
 
(function(){
	var links = document.getElementsByTagName("a");
	for(var i = 0 , link ; link = links[i] ; i++){
		var target = link.getAttribute("href");
		var match = target.match(/show_messages\.php\?(.*?)&message=(.*?)/);
		if (match){
			var anchor = target.split("message=")[1];
			links[i].setAttribute("href",target+"#M"+anchor);
		}
	}
})();
