// ==UserScript==
// @name           wikitables for GLB forums
// @namespace      pbr/wt
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        11.01.24
// ==/UserScript==

window.setTimeout( function() {
	main();
}, 1000);

function main() {
	for (var i=0; i<document.getElementsByClassName("post_content_inner").length; i++) {
		var posts = document.getElementsByClassName("post_content_inner");
		rep(posts[i]);
	}

	try {
		makeSortable();
	}
	catch (e) {
		console.log(e);
	}

}

var newText;

function rep(post) {
//	console.log(post.textContent);
//	console.log(post.textContent.split("\n").length);
	if (post.textContent.indexOf("wikitable") == -1) return;

	var text = post.innerHTML.replace(/<br>/g,'\n');
	var lines = text.split("\n");

	post.innerHTML = "<div>Processing Table ...</div>";

	newText = "";
	process(lines, 0);	
	post.innerHTML = newText;
}

function process(lines, idx) {
	while (idx < lines.length) {
//		console.log(idx);
		if (lines[idx].indexOf("{| class='wikitable") == 0) {
			idx = processTable(lines, idx);
		}
		else {
			newText += lines[idx] + "<br>";
			idx++;
		}
	}
}

function processTable(lines, idx) {
	var rows = 1;
	var rowActive = false;
	while (idx < lines.length) {
		if ((lines[idx].indexOf("{| class=") == 0) && (lines[idx].indexOf("wikitable") == 10)) {
//			console.log("start table");
			newText += "<table style='width:850px' class='bscTable'>";
		}
		else if (lines[idx].indexOf("|}") == 0) {
			if (rowActive == true) {
//				console.log("row end");
				newText += "</tr>";
			}
			rowActive = !rowActive;

//			console.log("end table");
			newText += "</table>";
			rows = 1;
		}
		else if (lines[idx].indexOf("|-") == 0) {
			if (rowActive == true) {
//				console.log("row end");
				newText += "</tr>";
			}
			rowActive = !rowActive;

//			console.log("row start");
			newText += "<tr class='alternating_color"+((rows%2)+1)+"'>";
			rows++;
		}
		else if (lines[idx].indexOf("|") == 0) {
			var c = 0;
			var data = lines[idx].slice(1);
			for each (var d in data.split("||")) {
				c++;
				newText += "<td>"+d.replace("{{msym}}",'-')+"</td>";
			}

//			console.log("cells ("+c+")");
		}
		else if (lines[idx].indexOf("!") == 0) {
			var c = 0;
			var data = lines[idx].slice(1);
			for each (var d in data.split("!!")) {
				c++;
				newText += "<th style='text-align:center'>"+d+"</th>";
			}

//			console.log("headers ("+c+")");
		}
		else {
			console.log("not a table ("+idx+" -- "+lines[idx].length+")");
			break;
		}
		idx++;
	}

	return idx;
}

function makeSortable() {
	var tables = document.getElementsByClassName("bscTable");
	for (var i=0; i<tables.length; i++) {
		var head = tables[i].getElementsByTagName("th");
		for (var j=0; j<head.length; j++) {
			head[j].addEventListener("click", sort, false);
		}
	}
}

function merge(a, b, sortidx) {
	if (a.length == 0) return b;
	if (b.length == 0) return a;

	var output = new Array();
	var idx = 0, aidx = 0, bidx = 0;

	while ((aidx < a.length) && (bidx < b.length)) {
		if (isNaN(parseFloat(a[aidx].cells[sortidx].textContent)) == false) {
			if (parseFloat(a[aidx].cells[sortidx].textContent) > parseFloat(b[bidx].cells[sortidx].textContent)) {
				output.push(a[aidx++]);
			}
			else {
				output.push(b[bidx++]);
			}
		}
		else {
			if (a[aidx].cells[sortidx].textContent < b[bidx].cells[sortidx].textContent) {
				output.push(a[aidx++]);
			}
			else {
				output.push(b[bidx++]);
			}
		}
	}	

	for (; aidx<a.length; aidx++) {
		output.push(a[aidx]);
	}
	for (; bidx<b.length; bidx++) {
		output.push(b[bidx]);
	}

	return output;
}

function sortColumn(data, sortidx) {
	if (data.length == 1) return data;

	var center = Math.round(data.length/2);

	var left = data.slice(0,center);
	left = sortColumn(left, sortidx);

	var right = data.slice(center);
	right = sortColumn(right, sortidx);

	var output = merge(left, right, sortidx);
	return output;
}

function sort(event) {
	var tbl = event.target.parentNode.parentNode;

	var idx = event.target.cellIndex;
	if (idx == -1) return;

	tbl.style.visibility = "hidden";

	var stime = new Date();
	var results = sortColumn(getArray(tbl.rows), idx);
	var time = new Date() - stime;
    console.log("sort time : "+time.toFixed(0)+"ms");

	var stime = new Date();
	while (tbl.rows.length > 1) {
		tbl.deleteRow(1);
	}
	var time = new Date() - stime;
    console.log("delete time : "+time.toFixed(0)+"ms");

	var stime = new Date();
	for (var i=0; i<results.length; i++) {
		results[i].setAttribute("class","alternating_color"+(i%2+1));
		tbl.appendChild(results[i]);
	}
	results = null;
	var time = new Date() - stime;
    console.log("append time : "+time.toFixed(0)+"ms");

	tbl.style.visibility = "visible";
}

function getArray(list) {
	var output = new Array();
    for(var i=1, len = list.length; i < len; i++) {
        output.push(list[i]);
    }
    return output;
}; 


