// ==UserScript==
// @name           OGame Redesign: Show Statistics Differences
// @namespace      Vesselin
// @version        1.03
// @date           2009-10-01
// @description    Shows the deltas on the Statistics page in the text, so that you don't have to hover with the mouse, in order to see them.
// @include        http://uni6.ogame.de/game/index.php?page=statistics*
// @include        http://uni42.ogame.org/game/index.php?page=statistics*
// @include        http://a*.ogame.*/game/index.php?page=statistics*
// @include        http://b*.ogame.*/game/index.php?page=statistics*
// @include        http://c*.ogame.*/game/index.php?page=statistics*
// @include        http://d*.ogame.*/game/index.php?page=statistics*
// @include        http://e*.ogame.*/game/index.php?page=statistics*
// @include        http://f*.ogame.*/game/index.php?page=statistics*
// @include        http://g*.ogame.*/game/index.php?page=statistics*
// @include        http://h*.ogame.*/game/index.php?page=statistics*
// @include        http://i*.ogame.*/game/index.php?page=statistics*
// @include        http://j*.ogame.*/game/index.php?page=statistics*
// @include        http://k*.ogame.*/game/index.php?page=statistics*
// @include        http://l*.ogame.*/game/index.php?page=statistics*
// @include        http://m*.ogame.*/game/index.php?page=statistics*
// @include        http://n*.ogame.*/game/index.php?page=statistics*
// @include        http://o*.ogame.*/game/index.php?page=statistics*
// @include        http://p*.ogame.*/game/index.php?page=statistics*
// @include        http://q*.ogame.*/game/index.php?page=statistics*
// @include        http://r*.ogame.*/game/index.php?page=statistics*
// @include        http://sirius*.ogame.*/game/index.php?page=statistics*
// @include        http://t*.ogame.*/game/index.php?page=statistics*
// @include        http://ursa*.ogame.*/game/index.php?page=statistics*
// @include        http://v*.ogame.*/game/index.php?page=statistics*
// @include        http://w*.ogame.*/game/index.php?page=statistics*
// @include        http://x*.ogame.*/game/index.php?page=statistics*
// @include        http://y*.ogame.*/game/index.php?page=statistics*
// @include        http://z*.ogame.*/game/index.php?page=statistics*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=statistics') == -1)
		return;
	function showStatDiffs ()
	{
		if (document.getElementById ("send") == null)
			return;
		var spans = document.getElementsByTagName ("span");
		for (var i = 0; i < spans.length; i++)
		{
			var thisSpan = spans [i];
			if ((thisSpan.className == "overmark") || (thisSpan.className == "undermark"))
			{
				var title = thisSpan.getAttribute ("title");
				if ((title != "*") && (thisSpan.firstChild.nodeValue == title))
					return;
				thisSpan.firstChild.nodeValue = title;
			}
		}
	}
	setInterval (showStatDiffs, 1000);
}
)();
