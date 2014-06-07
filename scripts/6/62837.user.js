// ==UserScript==
// @name	   Bugzilla: SUSE product search
// @namespace      http://www.ucw.cz/
// @description    Replace the Classification list with a table of SUSE products
// @include	   https://bugzilla.novell.com/query.cgi*
// ==/UserScript==

function funcToHTML()
{
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	var str = "";
	for (var i = 0; i < arguments.length; i++) {
		str += arguments[i].toString() + "\n";
	}
	script.innerHTML = str;
	return script;
}

function createLink(text, onclick)
{
	var link = document.createElement("a");
	link.appendChild(document.createTextNode(text));
	link.setAttribute("href", "javascript:" + onclick);
	return link;
}

function addLinks()
{
	var label = document.evaluate(
		"//div[@class = 'bodyHead' and contains(., 'lassification')]",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
		null).singleNodeValue;
	if (!label) {
		return;
	}
	while (label.childNodes.length) {
		label.removeChild(label.childNodes[0]);
	}
	label.appendChild(funcToHTML(initData,
		findClassList, findProdList, findTD,
		displayClassList, displayTable,
		clickAllProducts, clickSUSEProducts,
		clickTable, clickField, selectProducts));
	label.appendChild(createLink("All Products", "clickAllProducts()"));
	label.appendChild(document.createTextNode(" | "));
	label.appendChild(createLink("SUSE Products", "clickSUSEProducts()"));
}

function addTable()
{
	var list = findClassList();
	if (!list) {
		return;
	}
	var container = list.parentNode;
	var labels = initData().table;
	var table = document.createElement("table");
	for (var y = 0; y < labels.length; y++) {
		var tr = document.createElement("tr");
		for (var x = 0; x < labels[y].length; x++) {
			var td = document.createElement("td");
			var link = createLink(labels[y][x] || "x",
					"clickTable(" + x + ", " + y + ")");
			link.style.display = "block";
			td.appendChild(link);
			td.setAttribute("id", "suse-table-" + x + "-" + y);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	table.setAttribute("id", "suse-table");
	table.setAttribute("border", "1");
	table.style.display = "none";
	container.appendChild(table);
}

/* used inside the page */
function initData()
{
	var data = {};
	var table = [
		["SUSE",    "CODE9", "CODE10", "CODE11"],
		["openSUSE", null,   null,     null    ],
		["SLE",      null,   null,     null    ],
		["SLES",     null,   null,     null    ],
		["SLED",     null,   null,     null    ]];
	var selected = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	var classifications = {
		"openSUSE": [ "openSUSE" ],
		"SLES": [ "SUSE Linux Enterprise Server" ],
		"SLED": [ "SUSE Linux Enterprise Desktop" ]
	}
	classifications["SLE"] =
		[].concat(classifications["SLES"], classifications["SLED"]);
	classifications["SUSE"] = 
		[].concat(classifications["openSUSE"], classifications["SLE"]);

	var products = {
		"openSUSE": {
			"CODE9": [
				"SUSE LINUX 9.1 Professional",
				"SUSE LINUX 9.2 Professional",
				"SUSE LINUX 9.3",
				"SUSE LINUX 10.0"
			],
			"CODE10": [
				"SUSE Linux 10.1",
				"openSUSE 10.2",
				"openSUSE 10.3",
				"openSUSE 11.0"
			],
			"CODE11": [
				"openSUSE 11.1",
				"openSUSE 11.2"
			]
		},
		"SLES": {
			"CODE9": [
				"SUSE LINUX Enterprise Server 9",
				"SUSE LINUX Enterprise Server 9 SP1",
				"SUSE LINUX Enterprise Server 9 SP2",
				"SUSE LINUX Enterprise Server 9 SP3",
				"SUSE Linux Enterprise Server 9 SP4"
			],
			"CODE10": [
				"SUSE LINUX Enterprise Server 10",
				"SUSE Linux Enterprise Server 10 SP1",
				"SUSE Linux Enterprise Server 10 SP2",
				"SUSE Linux Enterprise Server 10 SP3"
			],
			"CODE11": [
				"SUSE Linux Enterprise Server 11",
				"SUSE Linux Enterprise HAE 11"
			]
		},
		"SLED": {
			"CODE9": [
				"Novell Linux Desktop 9",
				"Novell Linux Desktop 9 SP4"
			],
			"CODE10": [
				"SUSE LINUX Enterprise Desktop 10",
				"SUSE Linux Enterprise Desktop 10 SP1",
				"SUSE Linux Enterprise Desktop 10 SP2",
				"SUSE Linux Enterprise Desktop 10 SP3"
			],
			"CODE11": [
				"SUSE Linux Enterprise Desktop 11"
			]
		}
	}
	products["SLE"] = {
		"CODE9": [].concat(products["SLES"]["CODE9"],
				products["SLED"]["CODE9"]),
		"CODE10": [].concat(products["SLES"]["CODE10"],
				products["SLED"]["CODE10"]),
		"CODE11": [].concat(products["SLES"]["CODE11"],
				products["SLED"]["CODE11"])
	}

	data.table = table;
	data.selected = selected;
	data.classifications = classifications;
	data.products = products;
	return data;
}

function findClassList()
{
	return document.getElementById("classification");
}

function findProdList()
{
	return document.getElementById("product");
}

function findTD(x, y)
{
	return document.getElementById("suse-table-" + x + "-" + y);
}

function displayTable(how)
{
	var table = document.getElementById("suse-table");
	table.style.display = how;
}

function displayClassList(how)
{
	var list = document.getElementById("classification");
	var filter = document.getElementById("classification-filter");
	list.style.display = how;
	if (filter) {
		filter.style.display = how;
	}
}

function clickAllProducts()
{
	displayClassList("block");
	displayTable("none");
}

function clickSUSEProducts()
{
	displayClassList("none");
	displayTable("block");
}

function clickTable(X, Y)
{
	if (!window.data)
		window.data = initData();
	data = window.data;
	
	for (var y = 0; y < data.selected.length; y++)
		for (var x = 0; x < data.selected[y].length; x++)
			data.selected[y][x] = 0;
	clickField(X, Y);
	var classifications = {}, products = {};
	for (var y = 0; y < data.selected.length; y++) {
		for (var x = 0; x < data.selected[y].length; x++) {
			if (data.selected[y][x]) {
				var td = findTD(x, y);
				td.setAttribute("bgcolor", "#5689be");
				var name = data.table[y][0];
				var ver = data.table[0][x];
				var cls = data.classifications[name];
				for (var i = 0; i < cls.length; i++) {
					classifications[cls[i]] = 1;
				}
				var prods = data.products[name][ver];
				for (var i = 0; i < prods.length; i++) {
					products[prods[i]] = 1;
				}
			} else {
				var td = findTD(x, y);
				td.removeAttribute("bgcolor");
			}
		}
	}
	var options = findClassList().options;
	for (var i = 0; i < options.length; i++) {
		if (classifications[options[i].value]) {
			options[i].selected = true;
		} else {
			options[i].selected = false;
		}
	}
	onProductSelection('classification');
	data.selectedProducts = products;
	selectProducts();
}

function selectProducts()
{
	var prodlist = findProdList();
	if (prodlist.disabled) {
		// wait for the product list to load
		setTimeout("selectProducts();", 100);
		return;
	}
	var products = window.data.selectedProducts;
	var options = prodlist.options;
	for (var i = 0; i < options.length; i++) {
		if (products[options[i].value]) {
			options[i].selected = true;
		} else {
			options[i].selected = false;
		}
	}
	onProductSelection('product');
}

function clickField(x, y)
{
	var data = window.data;

	if (x == 0) {
		for (x = 1; x < data.table[y].length; x++) {
			clickField(x, y);
		}
		return;
	}
	if (y == 0) {
		for (y = 1; y < data.table.length; y++) {
			clickField(x, y);
		}
		return;
	}
	data.selected[y][x] = 1;
}

addTable();
addLinks();
