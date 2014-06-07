// ==UserScript==
// @name           OGame Redesign: Message envelope in Galaxy view
// @namespace      camber (original code by Vesselin)
// @version        1.00
// @date           2011-12-15
// @description    Adds a clickable message envelope next to Ogame logo in galaxy view.
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

(function ()
{
	var envelope = document.getElementById ("message_alert_box");
	if (envelope == null)
		envelope = document.getElementById ("message_alert_box_default");
	envelope.style.position = "absolute";
	envelope.style.left = "2px";
	envelope.style.top = "-60px";
	var element = document.getElementById ("inhalt");
	element.appendChild (envelope);
	envelope = document.getElementById ("attack_alert");
	envelope.style.position = "absolute";
	envelope.style.left = "600px";
	envelope.style.top = "0px";
	element.appendChild (envelope);
}
)();
