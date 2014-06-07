// ==UserScript==
// @name           OGame Redesign: Images in Messages
// @namespace      Vesselin
// @description    Allows the inclusion of images in the in-game messages with a special tag
// @version        1.01
// @date           2011-11-08
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=showmessage") == -1)
		return;
	var theDiv = document.querySelector ("div.note");
	if (theDiv && theDiv.innerHTML.match (/\{img=(('|")(http|https):\/\/.+('|"))\}/i))
		theDiv.innerHTML = theDiv.innerHTML.replace (/\{img=(('|")(http|https):\/\/.+('|"))\}/ig, "<img src=$1>");
}
)();
