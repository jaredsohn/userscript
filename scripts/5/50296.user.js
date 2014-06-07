// ==UserScript==
// @name           ASCIImator SizeSelector
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
		selected.innerHTML  = "<option value='8'> 8 </option>";
		selected.innerHTML += "<option value='9'> 9 </option>";
		selected.innerHTML += "<option value='10'> 10 </option>";
		selected.innerHTML += "<option value='11'> 11 </option>";
		selected.innerHTML += "<option value='12'> 12 </option>";
		selected.innerHTML += "<option value='14'> 14 </option>";
		selected.innerHTML += "<option value='16'> 16 </option>";
		selected.innerHTML += "<option value='18'> 18 </option>";
		selected.innerHTML += "<option value='20'> 20 </option>";
		selected.innerHTML += "<option value='22'> 22 </option>";
		selected.innerHTML += "<option value='24'> 24 </option>";
		selected.innerHTML += "<option value='26'> 26 </option>";
		selected.innerHTML += "<option value='28'> 28 </option>";
		selected.innerHTML += "<option value='36'> 36 </option>";
		selected.innerHTML += "<option value='48'> 48 </option>";
		selected.innerHTML += "<option value='72'> 72 </option>";
	}
}

GM_addStyle("#tools .tool {width:160px;}");