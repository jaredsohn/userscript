// ==UserScript==
// @version       1.1
// @author        pXqOpAt-G
// @name          PhazeDDL - Regroup Table
// @namespace     PhazeDDL Regroup Table
// @description   Regroup rows with same data
// @include       http://www.phazeddl.com/
// @include       http://www.phazemp3.com/
// @include       http://www.phazeporn.com/
// @include       http://www.phazeddl.com/pg/*
// @include       http://www.phazeddl.com/page*.html
// @include       http://www.phazemp3.com/page*.html
// @include       http://www.phazeporn.com/page*.html
// @include       http://www.phazeddl.com/search/*
// @include       http://www.phazemp3.com/search/*
// @include       http://www.phazeporn.com/search/*
// ==/UserScript==

(function() {
	
	var table = document.getElementsByTagName("table")[2]; 
	var cells = table.getElementsByTagName("td"); 
	var lastHTML = "";
	var curHTML = "";
	var lastDate = "";
	var curDate = "";
	var chr = "&#183;";
	var same = false;
	var sameDate = false;
	var DateI = 2;
	var curCell = "";
	
	for(var i = 0; i < cells.length; i++)
	{
		curCell = cells[i];
		curHTML = curCell.innerHTML;
		curDate = cells[DateI].innerHTML;
		
		if(cells[i + 3].innerHTML == "^") { cells[i + 3].innerHTML = chr }
		
		if(lastDate == curDate) {
			cells[DateI].innerHTML = chr;
			sameDate = true;
		}
		else if(sameDate && lastDate == curDate) {
			cells[DateI].innerHTML = chr;
		}
		
		lastDate = curDate;
		DateI+=4;
		
		if(lastHTML == curHTML) {
			curCell.innerHTML = chr;
			same = true;
		}
		else if(same && lastHTML == curHTML) {
			curCell.innerHTML = chr;
		}

		lastHTML = curHTML;
		
		i+=3;
	}
	
})();