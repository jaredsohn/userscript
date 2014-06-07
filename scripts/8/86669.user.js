// ==UserScript==
// @name           Üzenetgombok 1.65
// @namespace      Anatoxin
// @version        1.65
// @date           2011-01-11
// @description    Ogame.hu - szövetségi üzenetküldési lehetőség a Szövetség menűpont meletti ikon segitségével és link az üzenetekhez galaxisnézetből a parancsnokikonok melől.
// @include        http://*.ogame.*
// @exclude        http://uni101.ogame.hu/game/index.php?page=fleet1&*
// @exclude        http://uni101.ogame.hu/game/index.php?page=fleet2&*
// ==/UserScript==

(function ()
{
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	function lightPic (el, name, a)
	{
		if ((a == "a") && (el.parentNode.parentNode.nextSibling.nextSibling.className.indexOf ("selected") > -1))
			return;
		el.setAttribute ("src", "img/navigation/navi_ikon_" + name + "_" + a + ".gif");
	}
	function setIcon (page)
	{
		var menuTable = document.getElementById ("menuTable");
		if (menuTable == null)
			return;
		var lis = menuTable.getElementsByTagName ("li");
		for (var i = 0; i < lis.length; i++)
		{
			var thisLi = lis [i];
			var button = thisLi;
			var links = button.getElementsByTagName ('a');
			var session = document.location.href.match (/&session=([a-z0-9]{12})/) [1];
			for (var j = 0; j < links.length; j++)
			{
				var a, span, img;
				if (links [j].getAttribute ("href").match ("page=" + page + "&") != null)
				{
					a = document.createElement ("a");
					switch (page)
					{
						case "network":
						case "alliance":
							a.setAttribute ("target", "_self");
							a.setAttribute ("href", "index.php?page=networkkommunikation&session=" + session);
							break;
						case "research":
							a.setAttribute ("target", "_blank");
							a.setAttribute ("href", "index.php?page=globalTechtree&session=" + session);
							break;
					}
					span = button.getElementsByTagName ("span") [0];
					img = span.getElementsByTagName ("img") [0];
					a.appendChild (img);
					addEvent (img, "mouseover", function () { lightPic (img, page, "b"); });
					addEvent (img, "mouseout",  function () { lightPic (img, page, "a"); });
					span.appendChild (a);
					if (page == "trader")
					{
						var script = document.createElement ("script");
						script.innerHTML="tb_init ('#traderButton');";
						document.body.appendChild (script);
					}
					return;
				}
			}
		}
	}
	setIcon ("network");
	setIcon ("alliance");	// Stupid Redesign version 1.2.1...
	setIcon ("research");
	if (document.location.href.indexOf ("page=galaxy") > -1)
	{
		var envelope = document.getElementById ("message_alert_box");
		if (envelope == null)	// Handle the idiotism of version 1.5.0-xmas...
			envelope = document.getElementById ("message_alert_box_default");
		envelope.style.position = "absolute";
		envelope.style.left = "700px";
		envelope.style.top = "39px";
		var element = document.getElementById ("clearAdvice");
		element.parentNode.insertBefore (envelope, element);
	}
}
)();