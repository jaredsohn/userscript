// ==UserScript==
// @name           Sort Incomings
// @namespace      Tribalwars
// @include        http://ae*.tribalwars.ae/game.php*screen=info_command*
// ==/UserScript==

/*javascript:*/

function main() {
	newRows.sort(sortBy);
	for ( i = 0; i < newRows.length; i++) {
		table.rows[i + 1].innerHTML = newRows[i].innerHTML;
	}
}

function sortSent(a, b) {
	aid = getParam(a.cells[0].getElementsByTagName('a')[0].href, 'id');
	bid = getParam(b.cells[0].getElementsByTagName('a')[0].href, 'id');
	if (asc)
		return aid - bid;
	else {
		return bid - aid;
	}
}

function getParam(url, pName) {
	var start = url.indexOf(pName + "=") + pName.length + 1;
	if (pName.length == start)
		return null;
	var end = url.indexOf('&', start);
	if (end > 0)
		return url.substring(start, end);
	else {
		return url.substring(start);
	}
	return null;
}

function sortOrigin(a, b) {
	valA = a.cells[2].childNodes[0].innerHTML.toLowerCase();
	valB = b.cells[2].childNodes[0].innerHTML.toLowerCase();
	r = sortString(valA, valB);
	if (r == 0)
		r = sortArrival(a, b);
	return r;
}

function sortAttackName(a, b) {
	valA = a.getElementsByTagName('span')[1].innerHTML;
	valB = b.getElementsByTagName('span')[1].innerHTML;
	r = sortString(valA, valB);
	if (r == 0)
		r = sortArrival(a, b);
	return r;
}

function sortArrival(a, b) {
	valA = a.cells[4].childNodes[0].innerHTML.split(':');
	valB = b.cells[4].childNodes[0].innerHTML.split(':');
	r = 0;
	for ( i = 0; i < 3 && r == 0; i++) {
		r = valA[i] - valB[i];
	}
	if (!asc)
		r *= -1;
	if (r == 0)
		r = sortSent(a, b);
	return r;
}

function sortString(a, b) {
	r = new Number(a > b);
	if (r == 0)
		r--;
	if (valA == valB)
		r = 0;
	if (!asc)
		r = r * -1;
	return r;
}

var doc = (window.frames.length > 0) ? window.main.document : window.document;
if ( typeof (table) == 'undefined')
	var table = null;
if ( typeof (asc) == 'undefined')
	var asc = true;
if ( typeof (sortBy) == 'undefined')
	var sortBy = sortArrival;
if ( typeof (newRows) == 'undefined')
	var newRows = null;
if (!table) {
	ths = doc.getElementsByTagName('th');
	for ( i = 0; i < ths.length && !table; i++) {
		if (ths[i].innerHTML.match(/Command/)) {
			table = ths[i].parentNode.parentNode;
		}
	}
	if (table) {
		newRows = [];
		rows = table.rows;
		for ( i = 1; i < rows.length - 1; i++) {
			newRows.push(rows[i].cloneNode(true));
		}
		menu = doc.createElement('table');
		menu.className = 'vis';
		menu.insertRow(0);
		row = menu.rows[0];
		title = doc.createElement('th');
		title.innerHTML = 'Order By:';
		menu.rows[0].appendChild(title);
		row.insertCell(1);
		row.cells[1].innerHTML = '<label onclick=\'asc=true\'><input type=radio name=order checked=true />Ascending </label>';
		row.insertCell(2);
		row.cells[2].innerHTML = '<label onclick=\'asc=false\'/><input type=radio name=order />Decending </label>';
		menu.insertRow(1);
		row = menu.rows[1];
		row.insertCell(0);
		row.cells[0].innerHTML = '<th>Sort By:</th>';
		row.insertCell(1);
		row.cells[1].innerHTML = '<label onclick=\'sortBy=sortArrival\'><input type=radio name=sort checked=true />Arrival Time </label>';
		row.insertCell(2);
		row.cells[2].innerHTML = '<label onclick=\'sortBy=sortSent\'/><input type=radio name=sort />Sent Time </label>';
		row.insertCell(3);
		row.cells[3].innerHTML = '<label onclick=\'sortBy=sortOrigin\'/><input type=radio name=sort />Player Name </label>';
		row.insertCell(4);
		row.cells[4].innerHTML = '<label onclick=\'sortBy=sortAttackName\'/><input type=radio name=sort />Attack Name </label>';
		row.insertCell(5);
		row.cells[5].innerHTML = '<label onclick=\'sortBy=sortDestination\'/><input type=radio name=sort />Destination </label>';
		menu.insertRow(2);
		menu.rows[2].innerHTML = '<td><input type="button" value="Sort" onClick="main();void(0);"/></td>';
		table.parentNode.parentNode.insertBefore(menu, table.parentNode);
		table.parentNode.parentNode.insertBefore(doc.createElement('br'), table.parentNode);
	} else {
		alert('the script could not find the appropriate table.\nMake sure you\'re on the right page.');
	}
}
void (0);
