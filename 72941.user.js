// ==UserScript==
// @name           OGame Rediseño:Lunas a la derecha
// @namespace      inox-bass
// @version        1.01
// @date           2010-03-30
// @description    Makes the icon of the moon larger and to the right for easier clicking.
// @include        http://uni6.ogame.de/game/index.php?page=*
// @include        http://uni42.ogame.org/game/index.php?page=*
// @include        http://a*.ogame.*/game/index.php?page=*
// @include        http://b*.ogame.*/game/index.php?page=*
// @include        http://c*.ogame.*/game/index.php?page=*
// @include        http://d*.ogame.*/game/index.php?page=*
// @include        http://e*.ogame.*/game/index.php?page=*
// @include        http://f*.ogame.*/game/index.php?page=*
// @include        http://g*.ogame.*/game/index.php?page=*
// @include        http://h*.ogame.*/game/index.php?page=*
// @include        http://i*.ogame.*/game/index.php?page=*
// @include        http://j*.ogame.*/game/index.php?page=*
// @include        http://k*.ogame.*/game/index.php?page=*
// @include        http://l*.ogame.*/game/index.php?page=*
// @include        http://m*.ogame.*/game/index.php?page=*
// @include        http://n*.ogame.*/game/index.php?page=*
// @include        http://o*.ogame.*/game/index.php?page=*
// @include        http://p*.ogame.*/game/index.php?page=*
// @include        http://q*.ogame.*/game/index.php?page=*
// @include        http://r*.ogame.*/game/index.php?page=*
// @include        http://sirius*.ogame.*/game/index.php?page=*
// @include        http://t*.ogame.*/game/index.php?page=*
// @include        http://ursa*.ogame.*/game/index.php?page=*
// @include        http://v*.ogame.*/game/index.php?page=*
// @include        http://w*.ogame.*/game/index.php?page=*
// @include        http://x*.ogame.*/game/index.php?page=*
// @include        http://y*.ogame.*/game/index.php?page=*
// @include        http://z*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function ()
{
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ("\\b" + cl + "\\b");
		var elem = this.getElementsByTagName ("*");
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=") == -1)
		return;
	var moons = document.getElementsByClassName ("moonlink tips reloadTips");
	for (var i = 0; i < moons.length; i++)
	{
		var thisMoon = moons [i];
		thisMoon.style.left = "115px";
		thisMoon.style.top  =  "20px";
		var img = thisMoon.getElementsByTagName ("img") [0];
		img.removeAttribute ("width");
		img.removeAttribute ("height");
		img.style.width  = "30px";
		img.style.height = "30px";
		img.setAttribute ("src", img.getAttribute ("src").replace (/small/, "3"));
	}
	var wrenches = document.getElementsByClassName ("constructionIcon tips reloadTips");
	for (var i = 0; i < wrenches.length; i++)
	{
		var thisWrench = wrenches [i];
		thisWrench.style.left = "105px";
		thisWrench.style.top  =  "22px";
	}
	var alerts = document.getElementsByClassName ("alert tips reloadTips");
	for (var i = 0; i < alerts.length; i++)
	{
		var thisAlert = alerts [i];
		thisAlert.style.left = "132px";
		thisAlert.style.top  =   "0px";
	}
}
)();
