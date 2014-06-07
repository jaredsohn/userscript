// ==UserScript==
// @name Mark Links
// @description Styles logout links so you dont accidentally click one
// @include http://*.endoftheinter.net/showmessages.php*
// @include https://*.endoftheinter.net/showmessages.php*
// @include http://*.endoftheinter.net/message.php*
// @include https://*.endoftheinter.net/message.php*
// @include http://endoftheinter.net/showmessages.php*
// @include https://endoftheinter.net/showmessages.php*
// @include http://endoftheinter.net/linkme.php*
// @include https://endoftheinter.net/linkme.php*
// @include http://links.endoftheinter.net/linkme.php*
// @include https://links.endoftheinter.net/linkme.php*
// ==/UserScript==

var alllinks = document.getElementsByTagName("a");
for (var i = 1; i < alllinks.length; i++) {
	var thislink = alllinks[i];
	if (thislink.href.indexOf("endoftheinter.net/logout.php") != -1 && thislink.innerHTML != "Logout") {
		thislink.style.backgroundColor = "#EE8888";
		thislink.style.color = "#000000";
		thislink.title = "This link will log you out!";	
	}
}