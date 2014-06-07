// ==UserScript==
// @name           OGame Redesign: Clickable "Events" Text
// @description    Makes the whole "Events" text clickable in the Event list.
// @namespace      Vesselin
// @version        1.00
// @date           2010-10-12
// @include        http://*.ogame.*/game/index.php?page=eventList*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=eventList") == -1)
		return;
	var eventHeaderDiv = document.getElementById ("eventHeader");
	if (eventHeaderDiv == null)
		return;
	var myH4 = eventHeaderDiv.getElementsByTagName ("h4");
	if (myH4.length < 1)
		return;
	var myA = myH4 [0].getElementsByTagName ("a");
	if (myA.length < 1)
		return;
	var theA = myA [0];
	var mySpan = document.createElement ("span");
	mySpan.appendChild (myH4 [0].lastChild);
	theA.appendChild (mySpan);
	theA.style.textDecoration = "none";
	theA.style.color = "#6F9FC8";
}
) ();
