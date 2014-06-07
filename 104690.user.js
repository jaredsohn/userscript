// ==UserScript==
// @name           OGame Redesign: Move the Eventlist Up in Overview
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.01
// @date           2012-04-25
// @description    If the Eventlist is configured to show "below the content", it is moved above the contents added by other scripts like InfoCompte3
// @include        http://*.ogame.*/game/index.php?page=overview*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=overview') == -1)
		return;
	var eventList = document.getElementById ("eventboxContent");
	if (eventList == null)
		return;
	var inhalt = document.getElementById ("inhalt");
	if (inhalt == null)
		return;
	var contentBoxes = inhalt.querySelectorAll ("div.content-box-s");
	if (contentBoxes.length < 3)
		return;
	var lastBox = contentBoxes [2];
	if (lastBox.nextSibling)
		lastBox.parentNode.insertBefore (eventList, lastBox.nextSibling);
	else
		inhalt.appendChild (eventList);
}
)();
