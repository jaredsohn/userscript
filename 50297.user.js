// ==UserScript==
// @name           ASCIImator AnySizeSelector
// @namespace      OrigamiTech
// @include        http://asciimator.net/editor/asciimatorPro.php
// @include        http://asciimator.net/editor/asciimatorPro.php*
// ==/UserScript==

var selectss = document.evaluate('//select[@id]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < selectss.snapshotLength; i++) 
{
	var selected = selectss.snapshotItem(i); 
	if(selected.id == "fs")
	{		
		selected.innerHTML = "";
		for(var i=0;i<=100;i++)
		{
			selected.innerHTML += "<option value='"+String(i)+"'> "+String(i)+" </option>";
		}
	}
}

GM_addStyle("#tools .tool {width:160px;}");