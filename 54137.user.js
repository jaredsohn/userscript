// ==UserScript==
// @name           NZ SC Free Land & Sorting
// @namespace      NZ
// @author      MJ
// @description    Adds a 'Free Land' column to Statistics Central and allows sorting with table headers
// @include        http://*nukezone.*/clanstatistics.asp
// @include        http://*nukezone.*/clanstatistics.asp?Z=*
// @include        http://*nukezone.*/clanstatistics.asp?X=Military*
// ==/UserScript==

//oh yeah opera handles textnodes differently!
function firstNode(node){
	var first = node.firstChild;
	while(first.nodeType != 1 && first.nextSibling) first = first.nextSibling;
	return first;
}
function lastNode(node){
	var last = node.lastChild;
	while(last.nodeType != 1 && last.previousSibling) last = last.previousSibling;
	return last;
}
function nextNode(node){
	var next = node.nextSibling;
	while(next.nodeType != 1 && next.nextSibling) next = next.nextSibling;
	return next;
}
function previousNode(node){
	var previous = node.previousSibling;
	while(previous.nodeType != 1 && previous.previousSibling) previous = previous.previousSibling;
	return previous;
}
function childNodes(node){
	var nodes = node.childNodes;
	var childs = new Array();
	for(var i = 0; i < nodes.length; ++i) if(nodes[i].nodeType == 1) childs.push(nodes[i]);
	return childs;
}

var locationString = new String(window.location.href);
var tables = document.getElementsByTagName("table"); //oh yeah table design sucks
for(var i = 0; i < tables.length; ++i){
	if(tables[i].className == 'content') {
		var tbody = firstNode(tables[i]);
		var rows = tbody.childNodes;
		if(locationString.search(/X=Military/) != -1) {
			var select = document.getElementsByTagName("select");
			select = select[0];
			
			var sort = false, asc = false;
			
			var newoption = document.createElement('option');
			var index = (new Number(lastNode(select).value) + 1);
			newoption.innerHTML = "Land Free"; newoption.value = index;
			if(locationString.search(new RegExp("Z=" + index)) != -1) {
				newoption.selected = "selected"; 
				sort = true;
				if(locationString.search(/Q=1/) != -1) asc = true;
			}
			select.appendChild(newoption);

			if(sort){
				var order = new Array();
				var newtbody = tbody.cloneNode(false);
			}
			for(var j = 0; j < rows.length; ++j){
				var row = rows[j];
				if(row.nodeType == 1) {
					if(row.className == "header"){
						if(j < 2) {
							var lastCol = lastNode(row);
							var refCol = previousNode(lastCol);
							var landFreeCol = document.createElement('td');
							landFreeCol.innerHTML = "Land&nbsp;Free";	
							row.insertBefore(landFreeCol, refCol);
						}
						else firstNode(row).colSpan += 1;
					}
					else{
						var lastCol = lastNode(row);
						var refCol = previousNode(lastCol);
						var buildCol = previousNode(previousNode(previousNode(lastCol)));
						var landCol = previousNode(buildCol);
						var landUsed = buildCol.innerHTML * 20;
						var land = parseInt(landCol.innerHTML.replace(new RegExp('\\D', 'g'),''));
						var landFree = land - landUsed;
						var landFreeCol = document.createElement('td');
						landFreeCol.align = "right";
						landFreeCol.innerHTML = landFree + "&nbsp;m&sup2;";
						row.insertBefore(landFreeCol, refCol);
						if(sort) order.push(new Array(landFree, j));
					}		
				}
			}
	
			if(sort){
				function sortProvince(a, b){
					return b[0] - a[0];
				}
				order.sort(sortProvince);
				if(asc) order.reverse();
				newtbody.appendChild(firstNode(tbody).cloneNode(true));
				for(var k = 0; k < order.length; ++k) newtbody.appendChild(rows[order[k][1]].cloneNode(true)); 
				newtbody.appendChild(lastNode(tbody).cloneNode(true));
				tables[i].removeChild(tbody);
				tables[i].appendChild(newtbody);
			}
		}

		//general code
		var tab = "";
		if(locationString.search(/X/) != -1 ){
			if(locationString.search(/&/) != -1) tab = locationString.slice(locationString.search(/X/),locationString.search(/&/)+1);
			else tab = locationString.slice(locationString.search(/X/)) + "&";
		}

		var row = firstNode(firstNode(tables[i]));
		var cols = childNodes(row);
		var end = (locationString.search(/X=Military/) != -1) ? cols.length - 2 : cols.length; //last two colums of military don't sort
		for(var w = 1; w < end; ++w) { //first is member level
			var col = cols[w];
			col.style.cursor = "pointer";
			var z = w - 1; // offset for first col
			var q = (locationString.search(new RegExp("Z=" + z)) != -1 && locationString.search(/Q=0/) != -1 || locationString.search(/Z/) == -1 && !z) ? 1 : 0;
			var link = '/clanstatistics.asp?' + tab + 'Z=' + z +'&Q=' + q;
			col.setAttribute('onclick',"window.location='" + link + "'");					
		}
	}
}
