// ==UserScript==
// @name           Travian - Extended Statistics
// @namespace      http://userscripts.org/users/85337
// @include        http://*.travian.*/statistiken.php*
// @version        1.4
// ==/UserScript==

var data = [];
var last_row = -1;
var timer = 0;
var current_row, column;

function xpath1(xpath, root)
{
	var nodes = document.evaluate(xpath, root || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return nodes.singleNodeValue;
}

function xpath(xpath, root)
{
	var nodes = document.evaluate(xpath, root || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var arr = [];
	for (var i = 0; node = nodes.snapshotItem(i); i++)
		arr.push(node);
	return arr;
}

function showDifference(base_row)
{
	var current = data[base_row][1];

	for (i in data) {
		var span = data[i][0];
		if (!span) continue;
		if (i == base_row) {
			span.textContent = "\xa0";
		} else {
			var diff = data[i][1] - current;
			span.textContent = (diff > 0 ? "+" : "") + diff;
		}
	}
}

function mouseEvent(event)
{
	timer = 0;

	var row = event.target;
	while (true) {
		var node_name = (row.nodeType == 1) ? row.nodeName.toUpperCase() : "";
		if (node_name == "TR") break;
		if (node_name == "TABLE") return;
		row = row.parentNode;
	}
	switch (event.type) {
		case "mouseover":
			var id = row.getAttribute("tes_row");
			if (!id) {
				id = current_row;
			} else {
				id = parseInt(id);
			}
			if (id == last_row) return;
			last_row = parseInt(id);
			showDifference(last_row);
			break;
		case "mouseout":
			last_row = -1;
			showDifference(current_row);
			break;
	}
}

function extendedStatistics()
{
	/*					1  4  5
	 * 0	player		4, 4, 4
	 * 2	villages	4, 4, 4
	 * 4	aliances	5, 5, 5
	 * 8	heroes		x, 5, 5
	 * 11	romans		x, x, 4
	 * 12	teutons		x, x, 4
	 * 13	gals		x, x, 4
	 * 31	off			5, 5, 5
	 * 32	def			5, 5, 5
	 * 41	ally off	x, 5, 5
	 * 42	ally def	x, 5, 5
	 */
	var table, rows, first_row, id = -1;
	switch (version) {
		case "3.4":
			rows = xpath("id('content')/table[contains(@class, 'statistic')]/tbody/tr");
			if (rows.length < 3) return;
			first_row = 1;
			table = rows[0].parentNode.parentNode;
			break;
		case "3.5":
			rows = xpath("//table[@id='player' or @id='villages' or @id='alliance' or @id='heroes' or @id='player_off' or @id='player_def' or @id='alliance_off' or @id='alliance_def']/tbody/tr");
			if (rows.length < 2) return;
			first_row = 0;
			table = rows[0].parentNode.parentNode;
			break;
		default:
			rows = xpath("id('lmid2')//form/table[1]//tr");
			if (rows.length < 4) return;
			var hidden_id = xpath1("id('lmid2')//form//input[@type='hidden' and @name='id']");
			if (hidden_id) id = parseInt(hidden_id.value);
			first_row = 2;
			table = rows[0].parentNode;
	}

	if (id == -1) {
		var match = location.search.match(/[?&]id=(\d+)/);
		if (match) id = parseInt(match[1]);
		else id = 1;
	}

	if (version == "3.1" && (id == 8 || id == 41 || id == 42)) return;
	if (version != "3.5" && (id == 11 || id == 12 || id == 13)) return;

	switch (id) {
		case 1:
		case 2:
		case 11:
		case 12:
		case 13:
			column = 3;
			break;
		case 4:
		case 8:
		case 31:
		case 32:
		case 41:
		case 42:
			column = 4;
			break;
		default:
			column = -1;
	}

	if (column == -1) return;

	current_row = first_row;
	for (var i = first_row; i < rows.length; i++) {
		if (version == "3.1") {
			if (rows[i].cells[0].className.indexOf("ou") != -1) {
				current_row = i;
			}
		} else if (version == "3.4") {
			if (rows[i].className == "highlight") {
				current_row = i;
			}
		} else {
			if (rows[i].className == "hl") {
				current_row = i;
			}
		}

		rows[i].setAttribute("tes_row", i);

		rows[i].cells[column].appendChild(document.createTextNode("\xA0"));

		var span = document.createElement("span");
		span.setAttribute("style", "font-size: xx-small; color: #aaa;");
		rows[i].cells[column].appendChild(span);

		data[i] = [span, parseInt(rows[i].cells[column].textContent)];
	}

	showDifference(current_row);

	table.addEventListener("mouseover", function(e){
		if (timer) clearTimeout(timer);
		timer = setTimeout(function(){ mouseEvent(e); }, 250);
	}, false);
	table.addEventListener("mouseout", function(e){
		if (timer) clearTimeout(timer);
		timer = setTimeout(function(){ mouseEvent(e); }, 250);
	}, false);
}

function getVersion()
{
	if (xpath1("id('header')")) {
		return xpath1("id('content')[@class='ingame']") ? "3.4" : "3.5";
	} else {
		return "3.1";
	}
}

var version = getVersion();
extendedStatistics();
