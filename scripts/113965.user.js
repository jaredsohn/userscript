// ==UserScript==
// @author         pXqOpAt-G
// @name           PhazeDDL - Rainbow Table
// @namespace      PhazeDDL Rainbow Table
// @include        http://www.phazeddl.com/
// @include        http://www.phazeddl.com/page*.html
// @include        http://www.phazeddl.com/search*
// @include        http://www.phazemp3.com/*
// @include        http://www.phazeporn.com/*
// @include        http://www.phazeddl.com/pg/*
// ==/UserScript==

(function() {
	
	var table = document.getElementsByTagName("table")[2]; 
	var cells = table.getElementsByTagName("td"); 
	
	for(var i = 0; i < cells.length; i++)
	{
		curCell = cells[i];
		curHTML = curCell.innerHTML;		
		curCell.parentNode.className += " " + curHTML;
		
		i+=3;
	}
	
})();