// ==UserScript==
// @name           ASCIImator FontSelector
// @namespace      OrigamiTech
// @include        http://asciimator.net/editor/asciimatorPro.php
// ==/UserScript==


//JUST CHANGE THIS BIT!!!
var Fonts = [
	"Comic Sans MS",
	"Times New Roman",
	"Trebuchet MS",
	"Verdana"
];


//DO NOT CHANGE BEYOND HERE!!!!!!!!!
var selectss = document.evaluate('//select[@id]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < selectss.snapshotLength; i++) 
{
	var selected = selectss.snapshotItem(i); 
	if(selected.id == "ff")
	{		
		selected.innerHTML = "<option value='courier'> courier </option><option selected='' value='courier new'> courier new </option><option value='lucida console'> lucida console </option>";
		for (var q in Fonts)
		{
			var j = Fonts[q];
			selected.innerHTML += "<option value='" + String(j) + "'>" + String(j);
			selected.innerHTML += "</option>";
		}
	}
}