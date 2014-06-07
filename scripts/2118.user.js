// ==UserScript==
// @name          Table Sort
// @namespace     http://matthieu.honel.free.fr/userscripts/
// @description   Sort HTML table by clicking on heading cells.
// @include       *
// ==/UserScript==


if (!GM_registerMenuCommand)
	alert('Please upgrade to the latest version of Greasemonkey.');
else
{
	var SORT_COLUMN_INDEX;

	window.chooseTable = function(event)
	{
		event.cancelBubble = true;
		var target = event.target;
		while (target)
		{
			if (target.nodeName != 'TABLE') target = target.parentNode;
			else break;
		}
		if (target == null)
		{
			alert('No table selected !');
			return false;
		}
		document.removeEventListener('click', window.chooseTable, true);
		if (target.id == '')
			var l = 5; while (l--) target.id += String.fromCharCode((65 + Math.floor(Math.random() * 24)));
		ts_makeSortable(target);
	}

	function TS_choose()
	{
		alert('Click on the table you want to sort');
		document.addEventListener('click', window.chooseTable, true);
	}

	GM_registerMenuCommand('Table Sort : Choose a table to sort', TS_choose);
	
	window.ts_makeSortable = function (table) {
		if (table.rows && table.rows.length > 0)
			var firstRow = table.rows[0];
		if (!firstRow) return;
		for (var i=0;i<firstRow.cells.length;i++) {
			var cell = firstRow.cells[i];
			var txt = ts_getInnerText(cell);
			cell.innerHTML = '<a href="#" class="sortheader" onclick="ts_resortTable(this);return false;">'+txt+'<span class="sortarrow">&nbsp;&nbsp;&nbsp;</span></a>';
		}
	}

	window.ts_getInnerText = function (el) {
		if (typeof el == "string") return el;
		if (typeof el == "undefined") { return el };
		if (el.innerText) return el.innerText;	//Not needed but it is faster
		var str = "";
		var cs = el.childNodes;
		var l = cs.length;
		for (var i = 0; i < l; i++) {
			switch (cs[i].nodeType) {
				case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
				case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
			}
		}
		return str;
	}

	window.ts_resortTable = function (lnk) {
		var span;
		for (var ci=0;ci<lnk.childNodes.length;ci++) {
			if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
		}
		var spantext = ts_getInnerText(span);
		var td = lnk.parentNode;
		var column = td.cellIndex;
		var table = getParent(td,'TABLE');

		if (table.rows.length <= 1) return;
		var itm = ts_getInnerText(table.rows[1].cells[column]);
		sortfn = ts_sort_caseinsensitive;
		if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)) sortfn = ts_sort_date;
		if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)) sortfn = ts_sort_date;
		if (itm.match(/^[Â£$]/)) sortfn = ts_sort_currency;
		if (itm.match(/^[\d\.]+$/)) sortfn = ts_sort_numeric;
		SORT_COLUMN_INDEX = column;
		var firstRow = new Array();
		var newRows = new Array();
		for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
		for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

		newRows.sort(sortfn);

		if (span.getAttribute("sortdir") == 'down') {
			ARROW = '&nbsp;&nbsp;&uarr;';
			newRows.reverse();
			span.setAttribute('sortdir','up');
		} else {
			ARROW = '&nbsp;&nbsp;&darr;';
			span.setAttribute('sortdir','down');
		}

		for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) table.tBodies[0].appendChild(newRows[i]);}
		for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}

		// Delete any other arrows there may be showing
		var allspans = document.getElementsByTagName("span");
		for (var ci=0;ci<allspans.length;ci++) {
			if (allspans[ci].className == 'sortarrow') {
				if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
				allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
				}
			}
		}

		span.innerHTML = ARROW;
	}

	window.getParent = function (el, pTagName) {
		if (el == null) return null;
		else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
		else
		return getParent(el.parentNode, pTagName);
	}
	window.ts_sort_date = function (a,b) {
		aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
		bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
		if (aa.length == 10) {
			dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
		} else {
			yr = aa.substr(6,2);
			if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
			dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
		}
		if (bb.length == 10) {
			dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
		} else {
			yr = bb.substr(6,2);
			if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
			dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
		}
		if (dt1==dt2) return 0;
		if (dt1<dt2) return -1;
		return 1;
	}

	window.ts_sort_currency = function (a,b) {
		aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
		bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
		return parseFloat(aa) - parseFloat(bb);
	}

	window.ts_sort_numeric = function (a,b) {
		aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
		if (isNaN(aa)) aa = 0;
		bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]));
		if (isNaN(bb)) bb = 0;
		return aa-bb;
	}

	window.ts_sort_caseinsensitive = function (a,b) {
		aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
		bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
		if (aa==bb) return 0;
		if (aa<bb) return -1;
		return 1;
	}

	window.ts_sort_default = function (a,b) {
		aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
		bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
		if (aa==bb) return 0;
		if (aa<bb) return -1;
		return 1;
	}
}


