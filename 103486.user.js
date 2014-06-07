// ==UserScript==
// @name           Simplify Wikipedia tables
// @namespace      gawd.at
// @description    Double click on column moves it to the far right; double click on a cell removes all rows with that value
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==

window.gebc = function getElementsByClass(searchClass,node,tag) {
        var classElements = new Array();
        if ( node == null )
                node = document;
        if ( tag == null )
                tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                        classElements[j] = els[i];
                        j++;
                }
        }
        return classElements;
};

window.dblclick = function dblclick(event) {
	// var evt = window.event;
	node = event.target;
	nn = node.nodeName;
	row = node.parentNode;
	tbody = row.parentNode; // TBODY
	for (var i = 0; i < row.childNodes.length; i++) {
		if (node == row.childNodes[i]) {
			break;
		}
	}
	// i now contains the column we have to look for
	if (nn == "TH") {
		// header - we need to move the whole column to the end of the table
		rows = tbody.getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			col = rows[j].childNodes[i];
			rows[j].removeChild(col);
			rows[j].appendChild(col);
		}
		
	} else if (nn = "TD") {
		// cell - we need to find all cells with the same content and remove the 
		// corresponsing rows
		value = node.textContent;
		rows = tbody.getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			if (rows[j].childNodes[i].textContent == value) {
				tbody.removeChild(rows[j]);
				rows = tbody.getElementsByTagName("tr");
				j--;
			}
		}
	}
}

var tables = document.getElementsByTagName("table");
for (var i = 0; i < tables.length; i++) {
	tables[i].addEventListener("dblclick", window.dblclick, true);
}
