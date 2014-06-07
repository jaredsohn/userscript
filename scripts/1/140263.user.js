// ==UserScript==
// @name        WF Formula Graph
// @namespace   http://www.war-facts.com/message.php?player=9972
// @description Graph for WF Science page
// @include     http://www.war-facts.com/science.php
// @version     1.1
// ==/UserScript==

var sciTbl = document.getElementById('scitable');
if ( !sciTbl ) {return;}

var stats=['I','A','M','P','P','P','C','M','W','D','C']
var skills = new Array();
for (i=1;i<12;i++) {
	skills[i] = new Array();
}

var scissors =  new Array();
scissors[-1] = "8<";
scissors[1] = "8=";
var o = 1;

function timer() {
	var snipper = document.getElementById('project').getElementsByTagName('table')[0].rows[3].cells[0];
	snipper.innerHTML = "Budget: <BR>" + scissors[o];
	o = o * -1;

	t=setTimeout(timer,500);
}

function insertSort(a, b, value) {
	if (a < 1) {
		skills[b][a] = value;
	}
	else {
		var v = a - 1
		while ( v!=-1 && skills[b][v] < value) {
			skills[b][v + 1] = skills[b][v];
			v = v - 1;
		}
		skills[b][v + 1] = value;
		
	}
}


window.addEventListener("load", function(e) {
  addStuff();
}, false);
 
function addStuff(){
var graph = document.createElement("table");
graph.id = "Graph";
graph.width = 350;

var newTr = document.createElement("tr");
newTr.vAlign = "bottom";
newTr.align = "center";

for (i=0; i<11; i++) {
	var newTd = document.createElement("td");
	var newDiv = document.createElement("div");
	newDiv.style.height = 0;
	newDiv.style.width = 20;
	newDiv.style.backgroundColor = "#00CC00";
	newTd.appendChild(newDiv);
	newTr.appendChild(newTd);
}
graph.appendChild(newTr);
newTr = document.createElement("tr");
newTr.align = "center";
for (i=0; i<11; i++) {
	var newTd = document.createElement("td");
	newTd.innerHTML = stats[i];
	newTr.appendChild(newTd);
}
graph.appendChild(newTr)

newTr = document.createElement("tr");
newTr.align = "center";
newTd = document.createElement("td");
newTd.colSpan = 11;
newTd.innerHTML = '<input id="graphButton" class="small" value="Refresh" type="button">';
newTr.appendChild(newTd);
graph.appendChild(newTr);
sciTbl.parentNode.insertBefore(graph, sciTbl);

addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("graphButton");
  button.addEventListener('click',refreshGraph,true);
}
 
function refreshGraph(){
	var TeamSize = 0;
	for (var i = 1; i < sciTbl.rows.length; i++) {

		if (sciTbl.rows[i].style.opacity == 0.5) {
			TeamSize = TeamSize + 1;
			for (var j = 2; j < 13; j++) {
				var solu = sciTbl.rows[i].cells[j];

				if (solu) {
					insertSort(TeamSize-1, j-1, parseInt(solu.innerHTML));

				}

			}
		}
	}
	var graph = document.getElementById("Graph");
	var bar = graph.firstChild.firstChild;
	var stat = graph.firstChild.nextSibling.firstChild;
	var total = 0;
	var highest = 0;
	for(i=1;i<12;i++) {
		total = 0;
		highest = 0;
		for(j=0;j<TeamSize;j++) {
			total = total + skills[i][j]/Math.pow(2,j)
			if (skills[i][j] > highest) { highest = skills[i][j] } 
		}
		total = Math.round(total*10)/10
		bar.firstChild.style.height = total;
		stat.innerHTML = stats[i-1] + "<BR>" + total + "<BR>(" + highest + ")" ;
		bar = bar.nextSibling
		stat = stat.nextSibling
	}
}

timer()