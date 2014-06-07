// ==UserScript==
// @name           Travian Stats
// @namespace      travianstats
// @description    Show statistics for players, allys and villages
// @include        http://*.travian*.*/karte.php*
// @include        http://*.travian*.*/spieler.php*
// @include        http://*.travian*.*/allianz.php*
// ==/UserScript==

var debugNum = 20;
var statsServer = 'http://travian.ping-timeout.de/';
var travianServer = getServerId();

window.addEventListener('DOMContentLoaded', main, false);
if (document.body) main();

function main() {
	GM_log(travianServer);

	var path = location.pathname;

	var typ;
	
	if (path == '/spieler.php') typ = 'uid';
	if (path == '/allianz.php') typ = 'aid';
	if (path == '/karte.php')   typ = 'vid';
	
	var id = getVarLocation(typ);
	if (hasStatistics()) addStatsTable(typ, id);
	
	function getVarLocation() {
		var var_id = typ;
		if (typ == 'vid') var_id = 'd';
		var href = location.search;
		if (href.indexOf(var_id + '=') == -1) return -1;
		return href.substring(href.indexOf(var_id + '=') + var_id.length + 1).split('&')[0];
	}

	function hasStatistics() {
		if (id == -1) return false;
		if (typ != 'vid') return true;
		var dom = new DOMUtils();
		var table = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]/div');
		if (!table) return false;
		var link = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[contains(@href, "spieler")]');
		if (!link) return false;
		link.href.match(/.*uid\=([0-9]*)[\S]*/);
		id = RegExp.$1 + ',' + id;
		return true;
	}
}

function addStatsTable(typ, id) {
	var dom = new DOMUtils();
	var set, table, tbody, tr, td;

	set = dom.id('lmid2');
	set.style.width = '506px';

	var tableHTML = '<tbody id="ts_stats">' +
			'<tr><td class="rbg">Statistics: (<a id="ts_show_stats" href="javascript:void(0)" typ="' + typ + '" vid="' + id + '">Show</a>)</td></tr>' +
//			'<tr></tr>' +
			'</tbody>';

	table = dom.cn('table', tableHTML);
	table.className = 'tbg';
	table.cellPadding = '2';
	table.cellSpacing = '1';
	if (typ == 'vid') {
		table.style.position = 'absolute';
		table.style.top = getDistanceTop();
	}

	set.appendChild(dom.cn('p'));
	set.appendChild(table);

	dom.id('ts_show_stats').addEventListener('click', getStats, false);
	GM_log('added');

	function getDistanceTop() {
		var table = dom.xs('//div[@class="map_details_actions"]/table');
		return (380 + table.offsetHeight) + 'px';
	}
}

function getStats() {
	var typ = this.getAttribute('typ');
	var id = this.getAttribute('vid');

	var src;
	if (typ == 'uid') {
		src = getUserPic(id);
	}
	else if (typ == 'aid') {
		src = getAllyPic(id);
	}
	else {
		getUserStats(id.split(',')[0]);
		return;
	}
	
	GM_log(src);
	drawPic(src);
}

function drawPic(src) {
	var dom = new DOMUtils();
	var tbody = dom.id('ts_stats');
	var row, td, img;
	
	row = dom.cn('tr');
	td = dom.cn('td');
	td.className = 's7';
	img = dom.cn('img');
	img.src = src;
	img.setAttribute('style', 'margin-left: -5px; margin-bottom: -3px;');
	td.appendChild(img);
	row.appendChild(td);
	tbody.appendChild(row);

	td = dom.id('ts_show_stats').parentNode;
	td.innerHTML = 'Statistics:';
}

function getUserStats(uid) {
	debug(10, 'getUserStats: ' + uid);
	loadPage(getUserPage(uid), procUserStats, failUserStats);

	function procUserStats(resp) {
		var dom = new DOMUtils(resp.responseText);
		var table = dom.xa('//div[@class="content"]/table')[1];
//		debug(19, table.innerHTML);
		var village = new Array();
		var arefs = dom.xa('//td/table//a[contains(@href, "dorfinformationen") and contains(@href, "uid") and contains(@href, "did")]');
		for each (var a in arefs) {
			a.href.match(/.*did\=([0-9]*)[\S]*/);
			var vid = RegExp.$1;
			var sdom = new DOMUtils(a.parentNode.parentNode.innerHTML);
			var trav = sdom.xs('//a[contains(@href, "karte.php")]');
			trav.href.match(/.*[d|z]\=([0-9]*)[\S]*/);
			var id = RegExp.$1;
//			debug(15, 'Village found: ' + id + ', stats in: ' + vid);
			village.push({id:id,vid:vid});
		}
		setUserStats({inf:table,village:village});
	}

	function failUserStats(resp) {
		debug(0, 'Failure loading: ' + resp.statusText);
	}
}

function setUserStats(data) {
	var dom = new DOMUtils();
	var id = dom.id('ts_show_stats').getAttribute('vid').split(',')[1];
	var vid = null;
	
	GM_log(data.inf);
	for each (var v in data.village) {
		if (v.id == id) vid = v.vid;
	}

	if (vid) drawPic(getVillagePic(vid));
}

/***** STATS ADDRESS *****/

function getServerId() {
	var server = location.hostname;
	server.match(/([a-z]+[0-9]*)\.travian\.?.*?\.([a-z|A-Z]+)/);
	var name = RegExp.$1;
	var loc = RegExp.$2;
	
	if (loc == 'de') return name;
	if (loc == 'at' || loc == 'ch' || loc == 'org') return loc;
	if (name == 'speed') return loc + name;
	return loc + name.substring(1);
}

function getUserPage(uid) {
	return statsServer + 'index.php?m=spielersuche&uid=' + uid + '&w=' + travianServer;
}

function getUserPic(uid) {
	return statsServer + 'graph/uid/' + travianServer + '/' + uid + '.jpg';
}

function getAllyPic(aid) {
	return statsServer + 'graph/aid/' + travianServer + '/' + aid + '.jpg';
}

function getVillagePic(vid) {
	return statsServer + 'statsgraph/stats_graph3.php?welt=' + travianServer + '&did=' + vid;
}

/***** UTILS *****/

function debug(num, txt) {
	if (num < debugNum) GM_log(txt);
}

function loadPage(addr, onOk, onFailure) {
	GM_xmlhttpRequest({
		method:  'GET',
		url:     addr,
		onload:  onOk,
		onerror: onFailure
	});
}

function DOMUtils(doc) {
	this.cn = function(tag, html) {
		var elem = this.document.createElement(tag);
		if (html) elem.innerHTML = html;
		return elem;
	}

	this.ct = function(text) {
		return this.document.createTextNode(text);
	}

	this.id = function(id) {
		return this.document.getElementById(id);
	}

	this.tag = function(tag) {
		return this.document.getElementsByTagName(tag);
	}

	this.xs = function(xpath, ctxt) {
		if (!ctxt) ctxt = this.context;
		var res = this.document.evaluate(xpath, ctxt, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}

	this.xa = function(xpath, ctxt) {
		if (!ctxt) ctxt = this.context;
		var arr = [];
		var xpr = this.document.evaluate(xpath, ctxt, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0? null: arr;
	}

	if (typeof doc == 'string') {
		this.context = document.createElement('div');
		this.context.innerHTML = doc;
		this.document = document.implementation.createDocument('', '', null);
	        this.document.appendChild(this.context);
	}
	else {
		if (!doc) doc = document;
		this.document = doc;
		this.context = doc;
	}
}
