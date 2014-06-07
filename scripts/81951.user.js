// ==UserScript==
// @name           OGame Redesign: Switch to Name
// @description    Modifies the "Switch to" tooltip on the Overview page of moons and planets with a moon to show the planet/moon by name.
// @namespace      Vesselin
// @version        1.01
// @date           2010-07-24
// @include        http://*.ogame.*/game/index.php?page=overview*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=overview") == -1)
		return;
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ('\\b' + cl + '\\b');
		var elem = this.getElementsByTagName ('*');
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	var theA = document.getElementsByClassName ("planetlink active");
	if (theA.length == 0)
		theA = document.getElementsByClassName ("planetlink");
	if (theA.length < 1)
		return;
	var theLink = document.getElementById ("moon");
	var theLinks;
	if (theLink != null)
	{
		var allAs = theA [0].parentNode.getElementsByTagName ("a");
		if (allAs.length < 2)
			return;
		theLinks = theLink.getElementsByTagName ("a");
		if (theLinks.length < 1)
			return;
		theLinks [0].title = allAs [1].title.replace (/<[\/]*b>/i, "");
		return;
	}
	theLink = document.getElementById ("planet_as_moon");
	if (theLink != null)
	{
		theLinks = theLink.getElementsByTagName ("a");
		if (theLinks.length < 1)
			return;
		var theSpans = theA [0].getElementsByTagName ("span");
		if (theSpans.length < 1)
			return;
		theLinks [0].title += theSpans [0].textContent;
	}
}
) ();
