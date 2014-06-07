// ==UserScript==
// @name           dxdy printall
// @namespace   http://dxdy.ru
// @include        http://dxdy.ru/*printall
// ==/UserScript==


const PPP = 15; //posts per page
var link = [];


function action(xpath, func) {
	var snapshot = document.evaluate(xpath, document, null, 7, null);
	for (var position = 0, element; element = snapshot.snapshotItem(position); position++)
		{
		func(element, position);
		}
}
/*=======================================*/

function remove(hr) {
hr.parentNode.removeChild(hr);
}


function reduce(header) {
[0, /*1,*/  2].forEach
	(
	function ()
	{
	var currentNode = header.rows[arguments[0]].cells[0];
	link[0] = currentNode.lastChild.textContent;
	currentNode.firstChild.innerHTML = currentNode.firstChild.innerHTML.link(link[0]);
	currentNode.removeChild(currentNode.lastChild);
	}
	);
link[0] = link[0].slice(0,-5);
link[1] = link[0].match(/\d+$/);
}


function upgrade(table, position) {

table.className = "tablebg"
table.cellSpacing = "1px";
table.style.marginLeft = "4px";

table.deleteRow(1);
var firstrow = table.rows[0];
firstrow.deleteCell(0);

	var oldcell = firstrow.cells[0];
	var newcell = document.createElement("td");
	newcell.setAttribute("class", "gensmall");

		var left = document.createElement("div");
		left.style.cssFloat = "left";
		left.appendChild(oldcell.firstChild);
		
		var right = document.createElement("div");
		right.style.cssFloat = "right";
		right.innerHTML =
		"<img src=\"http://dxdy.ru/styles/subsilver2/imageset/icon_post_target.gif\">".
		link("http://dxdy.ru/viewtopic.php?t=" + link[1] + "&start=" + position) +
		oldcell.lastChild.textContent.slice(2, -2);
		
	newcell.appendChild(right);
	newcell.appendChild(left);
	newcell.style.padding = "5pt";

firstrow.replaceChild(newcell, oldcell);
firstrow.setAttribute("class", "row" + (position%2 + 1));

var secondrow = table.rows[1];
secondrow.setAttribute("class", "row" + (position%2 + 1))
secondrow.cells[0].removeChild(secondrow.cells[0].firstChild);

secondrow.cells[0].style.padding = "5pt 5pt 15pt 5pt";

var spacer = table.insertRow(-1).insertCell(-1);
spacer.setAttribute("colspan", "2");
spacer.setAttribute("class", "spacer");

if (position%PPP == 0) {
	var page = document.createElement("table");
	page.insertRow(-1).insertCell(-1).innerHTML =
	("Страница " + (position/PPP + 1)).link(link[0] + (position ? "-" + position : "") + ".html");
	table.parentNode.insertBefore(page, table).setAttribute("class","nav");
}

}

/*=======================================*/

document.body.style.marginLeft = "4px";

action('//body/hr', remove);
action('//body/table[position()=1]', reduce);
action('//body/table[not(position()=1)]', upgrade);