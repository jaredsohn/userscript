// ==UserScript==
// @name                iPredict: data table sorting and filtering
// @namespace	        http://lineham.co.nz/userscripts/ipredict/datatables
// @description	        Sorting and filtering for data tables on ipredict.co.nz
// @version             1.0
// @match		https://ipredict.co.nz/*
// @match		https://www.ipredict.co.nz/*
// @match		http://play.ipredict.co.nz/*
// ==/UserScript==

GM_log("datatables: running");

var tables = document.evaluate(
	"//table[@class='full-details-data']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < tables.snapshotLength; i++) {
	enhanceTable(tables.snapshotItem(i));
}

////

function enhanceTable(table) {
	setUpSorting(table);
	setUpFiltering(table);
}

function setUpSorting(table) {

	var headCells = document.evaluate(".//th",
		table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	// Add listeners
	for(var i = 0; i < headCells.snapshotLength; i++) {
		var th = headCells.snapshotItem(i);
		th.addEventListener('click', headingClicked, false);
	}
	
	// Do initial sort if an earlier script dropped a custom property
	var initialSortHeadingIdx = table.getAttribute("initialSortHeadingIdx");
	if(initialSortHeadingIdx) {
		//GM_log("datatables: Got initial sort heading index: "+initialSortHeadingIdx);
		sortTable(table, table.tHead.rows.item(0).cells.item(initialSortHeadingIdx), 1);
	}
}

function setUpFiltering(table) {
	
	var headerRow = table.tHead.firstElementChild;
	var filterRow = table.tHead.insertRow(-1);
	filterRow.style.backgroundColor = "#f5f5f5";
	//table.tHead.appendChild(filterRow);
	
	for(var i = 0, th; th = headerRow.cells[i]; i++) {
		var cell = filterRow.insertCell(-1);
		cell.style.padding="0px 0px 0px 0px";
		//filterRow.appendChild(cell);
		addFilterFor(th, cell);
	}
	
	///
	
	function addFilterFor(th, cell) {
		var origwidth = cell.scrollWidth;
		cell.innerHTML = "<input type='text' />";
		cell.firstElementChild.style.width = origwidth+"px";
		cell.firstElementChild.style.borderWidth = 0+"px";
		cell.addEventListener('keyup', filterChanged, false);
	}
}

function filterChanged() {
	var table = this.parentNode.parentNode.parentNode;
	//GM_log("datatables: filterChanged "+table);
	filterTable(table);
}

function headingClicked() {
	GM_log("datatables: headingClicked "+table+"\t"+this.textContent);
	var table = this.parentNode.parentNode.parentNode;
	var dir = 1;
	// Reverse the direction:
	if(table.getAttribute('sortHeading') == this.cellIndex)
		dir = table.getAttribute('sortDirection') * -1;
	
	sortTable(table, this, dir);
}

function filterTable(table) {
	var filterRow = table.tHead.lastElementChild;
	for(var i = 0, row; row = table.tBodies[0].rows[i]; i++) {
		// row is a body row to show/hide
		var show = 1;
		for(var i2 = 0, cell; cell = row.cells[i2]; i2++) {
			// compare each cell with the filter
			var filter = filterRow.cells[i2].firstElementChild.value;
			if(cell.textContent.indexOf(filter) == -1) {
				show *= 0;
				break;
			}
		}
		row.style.display = (show ? 'table-row' : 'none');
	}
	
}

function sortTable(table, heading, dir) {

	var col = heading.cellIndex;
	table.setAttribute('sortHeading', col);
	table.setAttribute('sortDirection', dir);

	var tbody = table.tBodies.item(0);

	// Get rows and convert to array so we can use sort()
	var rows = Array.prototype.slice.call(tbody.rows);
	//GM_log("sortTable "+rows.length+" rows col "+col+" dir "+dir);
	var expectedColumns = rows[0].cells.length; // for detecting footers later
	
	// Decide a sort function by peeking at the first row.
	if(looks_numeric(getCellText(rows[0], col))) {
		//GM_log("numeric");
		rows.sort(numeric_compare);
	} else {
		//GM_log("text");
		rows.sort(text_compare);
	}
	
	var footerRows = []; // temporarily hold rows that shouldn't be sorted
	
	for (var i=0, row; row = rows[i]; i++) {
	
		// if row has fewer cells than the first row, assume footer
		// e.g. "Cancel Selected" button on Active Orders
		//GM_log("row " +i+"\t"+row.cells.length+"\t"+expectedColumns);
		if(row.cells.length < expectedColumns)
			footerRows.push(row);
		else
			tbody.appendChild(row);
	}
	for(var i=0, row; row = footerRows[i]; i++) {
		tbody.appendChild(row);
	}
	
	// All the sort functions require col in scope as a,b are the TRs not
	// the actual values.

	// Text comparison and extraction
	function text_compare(a,b) {
		var vala = getCellText(a,col);
		var valb = getCellText(b,col);
		if(vala == valb) return 0;
		if(dir>0)
			return (vala>valb) ? 1 : -1;
		else
			return (vala<valb) ? 1 : -1;
	}

	// Numeric detection, comparison and extraction	
	function getCellText(row, col) {
		// Cell might not exist due to colspan
		if(row.cells.item(col))
			return(row.cells.item(col).textContent);
		else
			return null;
	}
	
	function numericRE() { return  /^([+-])?[$]?([0-9.]+).*$/; }  // TODO check on price-change extraneous chars
	function looks_numeric(a) {
		// TODO work on the whole cell and take hints from classes
		var ret;
		if(/^NC/.exec(a)) // TODO proper trim
			ret = true;
		else 
			ret = numericRE().exec(a);
		//GM_log("looks_numeric("+a+") "+ret);
		return ret;
	}
	function getCellNumeric(row, col) {
		var cell = row.cells.item(col);
		if(!cell)
			return null;
		var cellText = cell.textContent;
		if(/^NC/.exec(cellText)) // TODO proper trim
			return "0";
		var transformed = cellText.replace(numericRE(), "$1$2");
		var parsed = parseFloat(transformed);
		//GM_log("rowIndex "+row.rowIndex+"\tcol "+col+"\tval "+cell.textContent+"\t-> "+transformed+"\t-> "+parsed);
		return parsed;
		// TODO handle unsigned red/green cells as signed?
		// TODO return null for unexpected formats
	}
	function numeric_compare(a,b) {
		var vala = getCellNumeric(a,col);
		var valb = getCellNumeric(b,col);
		//GM_log(vala + "\t" + valb);
		if(vala == valb) return 0;
		if(dir>0)
			return vala - valb;
		else
			return valb - vala;
	}
}