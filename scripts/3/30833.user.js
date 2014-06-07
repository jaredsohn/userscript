// ==UserScript==
// @name           Sortable Box Score
// @namespace      http://www.goallinebliz.com
// @include        http://goallineblitz.com/game/game.pl?game_id=*
// @version        08.07.30
// ==/UserScript==

/*
 * pabst did this 07/30/08
 */
var tableName = ["Passing","Rushing","Receiving","Kicking","Punting",
                 "Kick/Punt Return","Offensive Line","Defense"];

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{a.push(els[i]);}
	}
	return a;
};
var tables = getElementsByClassName("nonalternating_color",document);

for each (t in tables) {
	if (t.innerHTML == null) continue;
	var title = t.innerHTML.split(">");
	title = title[1].split("<");
	title = title[0];
	
	var sibling = t;
	var rows = 0;
	for (var i=0; i<t.parentNode.childNodes.length; i++) {
		sibling = t.parentNode.childNodes[i];
		if (sibling == null) continue;
		
		var className = null;
		try {
			className = sibling.getAttribute("class");
			if (className.match("nonalternating_color2") != null) {
				sibling.addEventListener("click",sortEvent,true);
				rows++;
			}
		}
		catch (err) {
		}
		
		if (rows == 2) break;
	}
}

function isSortable(e) {
	var parent = e.parentNode();
	for each (var t in tableName) {
		if (e.firstChild.innerHTML.indexOf(t) != -1) {
			return true;
		}
	}
	return false;
}

function sortEvent(evt) {
	sortTable(evt.target.parentNode.parentNode,evt.target.cellIndex);
	return true;
}

function sortTable(table, column) {
	if (isSortable(table) == false) {
		return;
	}
	
	var rows = table.rows;
	var viz = table.getAttribute("style");	
	var i=2;

	table.setAttribute("style","visibility: hidden;");
	for (var i=2; i<rows.length-1; i++) {		
		if (rows[i+1].getAttribute("class").match("nonalternating_color") != null) {
			i += 1;
			continue;
		}
		var swap = i;
		for (var j=i; j<rows.length-1; j++) {
			if (rows[j+1].getAttribute("class").match("nonalternating_color") != null) {
				break;
			}
				
			var lrow = rows.item(swap);
			var lcell = lrow.cells.item(column);
			var rrow = rows.item(j+1);
			var rcell = rrow.cells.item(column);
			
			var left = parseFloat(lcell.innerHTML);
			var right = parseFloat(rcell.innerHTML);
			
			if (isNaN(left) || isNaN(right)) {
				left = lcell.firstChild.innerHTML.toLowerCase();
				right = rcell.firstChild.innerHTML.toLowerCase();
				if (left == right) {
					left = lcell.lastChild.innerHTML.toLowerCase();
					right = rcell.lastChild.innerHTML.toLowerCase();
				}
				
				if (left > right) {
					swap = j+1;
				}
			}
			else {
				if (left < right) {
					swap = j+1;
				}
			}
		}
		if (swap != -1) {
			var r = table.rows.item(swap);
			table.deleteRow(swap);
			var newRow = table.insertRow(i);
			newRow.setAttribute("class",r.getAttribute("class"));
			for (var x=0; x<r.cells.length; x++) {
				var cell = newRow.insertCell(x);		
				cell.setAttribute("class",r.cells.item(x).getAttribute("class"));
				cell.innerHTML = r.cells.item(x).innerHTML;
			}
		}
		var r = table.rows.item(i);
	}
	
	for (var i=2; i<table.rows.length; i++) {
		var r = table.rows.item(i);
		var attr = r.getAttribute("class");
		if (attr.indexOf("nonalternating_color") != -1) continue;
		attr = attr.slice(0,17) + ((i%2)+1) + attr.slice(18);
		r.setAttribute("class",attr);
	}
	
	table.setAttribute("style",viz);
}

