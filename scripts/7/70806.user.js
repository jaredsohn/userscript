// ==UserScript==
// @name           OGame Redesign: Galaxy Icon Goes to Messages
// @namespace      n00bScriptWrite
// @version        1.0
// @date           2010-03-07
// @description    Links the Galaxy icon button to your inbox, so you can go straight from the Galaxy page to your messages.
// @include        http://uni6.ogame.de/game/index.php?page=galaxy*
// @include        http://uni42.ogame.org/game/index.php?page=galaxy*
// @include        http://a*.ogame.*/game/index.php?page=galaxy*
// @include        http://b*.ogame.*/game/index.php?page=galaxy*
// @include        http://c*.ogame.*/game/index.php?page=galaxy*
// @include        http://d*.ogame.*/game/index.php?page=galaxy*
// @include        http://e*.ogame.*/game/index.php?page=galaxy*
// @include        http://f*.ogame.*/game/index.php?page=galaxy*
// @include        http://g*.ogame.*/game/index.php?page=galaxy*
// @include        http://h*.ogame.*/game/index.php?page=galaxy*
// @include        http://i*.ogame.*/game/index.php?page=galaxy*
// @include        http://j*.ogame.*/game/index.php?page=galaxy*
// @include        http://k*.ogame.*/game/index.php?page=galaxy*
// @include        http://l*.ogame.*/game/index.php?page=galaxy*
// @include        http://m*.ogame.*/game/index.php?page=galaxy*
// @include        http://n*.ogame.*/game/index.php?page=galaxy*
// @include        http://o*.ogame.*/game/index.php?page=galaxy*
// @include        http://p*.ogame.*/game/index.php?page=galaxy*
// @include        http://q*.ogame.*/game/index.php?page=galaxy*
// @include        http://r*.ogame.*/game/index.php?page=galaxy*
// @include        http://sirius*.ogame.*/game/index.php?page=galaxy*
// @include        http://t*.ogame.*/game/index.php?page=galaxy*
// @include        http://ursa*.ogame.*/game/index.php?page=galaxy*
// @include        http://v*.ogame.*/game/index.php?page=galaxy*
// @include        http://w*.ogame.*/game/index.php?page=galaxy*
// @include        http://x*.ogame.*/game/index.php?page=galaxy*
// @include        http://y*.ogame.*/game/index.php?page=galaxy*
// @include        http://z*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==


//~~~VERY IMPORTANT~~~

//other than changing the icon affected and where it links to, THIS CODE IS IN NO WAY, SHAPE OR FORM, MINE.
//all credit should go to "Vess" on Userscripts.org
//Do NOT, credit ME.


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
	function lightPic (el, a)
	{
		el.setAttribute ("src", "img/navigation/navi_ikon_galaxy_" + a + ".gif");
	}
	var lis = document.getElementsByTagName ("li");
	for (var i = 0; i < lis.length; i++)
	{
		var thisLi = lis [i];
		if (thisLi.className == "menubutton_table")
		{
			var button = thisLi;
			var links = button.getElementsByTagName ('a');
			for (var j = 0; j < links.length; j++)
			{
				if (links [j].getAttribute ("href").match ("page=galaxy*") != null)
				{
					var a = document.createElement ("a");
					a.setAttribute ("target", "_self");
					a.setAttribute ("href", "index.php?page=messages&session=" + document.location.href.match (/&session=([a-z0-9]{12})/) [1]);
					var span = button.getElementsByTagName ("span") [0];
					var img = span.getElementsByTagName ("img") [0];
					a.appendChild (img);
					addEvent (img, "mouseover", function () { lightPic (img, "b"); });
					addEvent (img, "mouseout",  function () { lightPic (img, "a"); });
					span.appendChild (a);
					return;
				}
			}
		}
	}
}
)();
