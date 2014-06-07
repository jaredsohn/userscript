// ==UserScript==
// @name           IPB killfile
// @namespace      http://glorkle.frogomatic.org/greasemonkey
// @include        http://www.dextroverse.org/forums/*
// ==/UserScript==

var asshats =
[
 	"some boring asshole",
	"some other boring asshole"
];

// change this to 1 if you want to not see that the user posted at all
var do_complete_kill = 1;

function checkit(node)
{
	var namelink = node.getElementsByTagName("a")[0];
	if (namelink && namelink.firstChild)
	{
	    var username = namelink.firstChild.nodeValue;
	    if (username.match(asshats.join("|"), "i"))
	    {
			var h = namelink.parentNode.parentNode.parentNode;
			if (do_complete_kill != 0)
			{
				h.style.display = "none";
			}
			h = h.nextSibling.nextSibling;
			h.style.display = "none";
			h = h.nextSibling.nextSibling;
			h.style.display = "none";
		}
	}
}


var foo = document.getElementsByTagName("span");
for (var i=0; i<foo.length; i++)
{
	if (foo[i].className == "normalname")
	{
		checkit(foo[i]);
	}
}
return;

