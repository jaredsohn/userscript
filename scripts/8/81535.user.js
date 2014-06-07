// ==UserScript==
// @name           Kill out.php on Hpics.com
// @namespace      LlubNek
// @description    Rewrites album URLs on Hpics.com to point directly at the album, not an ad script.
// @include        http://hpics.com/
// @include        http://www.hpics.com/
// ==/UserScript==

var a = document.getElementsByTagName("a");
//var a2 = new Array();

for (var i = a.length; i--; )	{
	// weed out anchors
	if (typeof a[i].href != "undefined")	{
		// select only out.php links
		var href = a[i].href;
		if (href.search(/cjoverkill\/out.php\?/i) != -1)	{
			var p = href.search(/url\=/i);
			if (p != -1)	{
				href = href.substr(p+4);
				if (href.substr(0, 3) == "../")	{
					href = href.substr(3);
//					a2.push(href);
				}
				a[i].href = href;
			}
		}
	}
}

//alert(a2.join("\n"));
