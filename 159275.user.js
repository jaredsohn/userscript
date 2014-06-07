// ==UserScript==
// @name        Bitbucket: Download commits as zip
// @description Adds a link to each commit in the commit list to download a zip-file of the repository state at that commit.
// @include     https://bitbucket.org/*/commits/all
// @version     1
// ==/UserScript==

var hashes = document.getElementsByClassName("hash");
for (var i = 0; i < hashes.length; i++)
//for (var td in document.getElementsByClassName("hash"))
{
	var div = hashes[i].getElementsByTagName("div")[0];
	if (div != null)
	{
		var a = div.getElementsByTagName("a")[0];
		if (a != null)
		{
			var href = a.href;
			div.innerHTML += '<a href="'+href.replace("commits", "get")+'.zip">(zip)</a>';
		}
	}
}

document.getElementsByTagName("head")[0].innerHTML +=
	'<style type="text/css">td.hash{width:100px !important}</style>';
