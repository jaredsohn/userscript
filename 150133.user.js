// ==UserScript==
// @name        A-P Series name in failure removal confirmation
// @namespace   http://localhost
// @include     http://www.anime-planet.com/adminsec/stats_imports.php?*
// @version     1
// ==/UserScript==

function getElementByClassName(elementType, className, src)
{
	if (src == null)
	{
		src = document;
	}
	var tags = src.getElementsByTagName(elementType);
	var i;
	for (i = 0; i < tags.length; i++)
	{
		if (tags[i].className == className)
		{
			return tags[i];
		}
	}
	return null;
}

if (document.head.innerHTML != null)
{
	/*document.body.innerHTML = document.body.innerHTML.replace
	(
		"function checkhide(url){\n"+
		"	if(confirm(\"Are you sure you want to hide this?\")){ document.location = url; }\n"+
		"}\n"+
		"function checkdel(url){\n"+
		"	if(confirm(\"Are you sure you want to delete this?\")){ document.location = url; }\n"+
		"}",
		
		"function checkhide(url, name){\n"+
		"	if(confirm(\"Are you sure you want to hide \" + name + \"?\")){ document.location = url; }\n"+
		"}\n"+
		"function checkdel(url, name){\n"+
		"	if(confirm(\"Are you sure you want to delete \" + name + \"?\")){ document.location = url; }\n"+
		"}"
	);*/
	var script = document.createElement("script");
	script.innerHTML =
	"function checkhide(url, name){\n"+
		"	if(confirm(\"Are you sure you want to hide \" + name + \"?\")){ document.location = url; }\n"+
		"}\n"+
		"function checkdel(url, name){\n"+
		"	if(confirm(\"Are you sure you want to delete \" + name + \"?\")){ document.location = url; }\n"+
		"}";
	document.getElementsByTagName('head')[0].appendChild(script);
}

var table = getElementByClassName("table", "admintable");
if (table != null)
{
	var tableRows = table.getElementsByTagName("tr");
	for (var i = 1; i < tableRows.length; i++)
	{
		var name = tableRows[i].children[2].children[0].innerHTML;
		name = name.split('"').join("'");
		tableRows[i].children[3].children[0].href = tableRows[i].children[3].children[0].href.replace(')', ", \"" + name + "\")");
		tableRows[i].children[4].children[0].href = tableRows[i].children[4].children[0].href.replace(')', ", \"" + name + "\")");
	}
}

