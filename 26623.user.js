// ==UserScript==
// @author		Dwoo & Ben
// @namespace	http://userscripts.org/
// @name		Travian Sort Villages
// @description	Allow to sort your villages in Travian
// @include		http://s*.travian.*/*
// @include		http://s*.travian3.*/*
// @include		http://welt*.travian.*/*
// @exclude		http://forum.travian.*
// @exclude		http://www.travian.*
// @version		1.5
// ==/UserScript==

var prefix, villageTable;

function evalNodes(path, context) {
	return document.evaluate(path, ((context == null)?document:context), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function evalNode(path, context) {
	return evalNodes(path, context).snapshotItem(0);
}

function createElement(type, attributes, listener) {
	var element = document.createElement(type);
	for (var i in attributes) {
		element.setAttribute(i, attributes[i]);
	}
	(listener?element.addEventListener('click', listener, true):null);
	return element;
}

function getValue(key, defaultValue) {
	return GM_getValue(prefix + key, defaultValue);
}

function setValue(key, value) {
	return GM_setValue(prefix + key, value);
}

function init() {
	villageTable = evalNode('//div[@id="lright1"]/table/tbody');
	if (villageTable) {
		prefix = document.location.href.split(/\/\/?/)[1] + ":" + evalNode('//td[@class="menu"]/a[contains(@href, "spieler.php")]').getAttribute('href').match(/uid=(\d+)/)[1] + "|";
		sort();
		addButtons();
	}
}

function consolidateOrder() {
	var rows = evalNodes('.//a[contains(@href, "newdid")]', villageTable);
	var order = new Array();
	for (var i = 0; row = rows.snapshotItem(i); i++) {
		order.push(row.href.match(/newdid=(\d+)/)[1]);
	}
	setValue('order', order.join(':'));
}

function sort() {
	var order = getValue('order', '-').split(':');
	var row;
	for (var i = order.length-1; i >= 0; i--) {
		row = evalNode('./tr[descendant::a[contains(@href, "newdid='+order[i]+'")]]', villageTable);
		if (row)
			villageTable.insertBefore(row, villageTable.firstChild);
	}
}

function moveUp() {
	var row = this.parentNode.parentNode;
	if (row.rowIndex != 0) {
		row.parentNode.insertBefore(row, row.parentNode.rows[row.rowIndex-1]);
		consolidateOrder();
	}
}

function moveDown() {
	var row = this.parentNode.parentNode;
	if (row.rowIndex != row.parentNode.rows.length-1) {
		row.parentNode.insertBefore(row, row.parentNode.rows[row.rowIndex+2]);
		consolidateOrder();
	}
}

function addButtons() {
	if (!(/dorf3\.php/).test(document.location.href)) return;

	var clearLink = createElement('img', {src: "img/un/a/del.gif", style: "cursor:pointer;"}, cleanData);
	var table = villageTable.parentNode;
	table.parentNode.insertBefore(document.createTextNode(" "), table);
	table.parentNode.insertBefore(clearLink, table);

	var rows = evalNodes('./tr', villageTable);
	for (var i = 0; row = rows.snapshotItem(i); i++) {
		var upLinkCell = row.insertCell(0);
		var upLink = createElement('img', {src: "data:image/gif;base64,R0lGODlhCwAJAIAAAJmZmf///yH5BAEHAAEALAAAAAALAAkAAAIRjAOnBr3cnIr00AuvfLz7UwAAOw==", style: "cursor: pointer;"}, moveUp);
		upLinkCell.appendChild(upLink);

		var downLinkCell = row.insertCell(1);
		var downLink = createElement('img', {src: "data:image/gif;base64,R0lGODlhDQAJAIAAAJmZmf///yH5BAEHAAEALAAAAAANAAkAAAIRjI8Jy4wNFQTJxGoXfrv7VAAAOw==", style: "cursor: pointer;"}, moveDown);
		downLinkCell.appendChild(downLink);
	}
}

function cleanData() {
	var response = confirm("Are you sure you want to reset the order of the villages to the defalut?");
	if (response) {
		setValue('order', '');
		document.location = document.location;
	}
}

init();