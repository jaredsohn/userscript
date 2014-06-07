// ==UserScript==
// @name           enti's annoying DIV remover
// @namespace      http://entrecamos.uw.hu
// @description    Blokkolja a reklám és egyéb zavaró div-eket az nCore és TvStore torrent oldalakon, könnyen bovítheto más oldalakhoz is.
// @source         http://userscripts.org/scripts/show/35641
// @author         enti
// @version        1.15
// @include        http://ncore.*/*
// @include        https://ncore.*/*
// @include        http://tvstore.*/*
// @include        https://tvstore.*/*
// ==/UserScript==

// -----------------------------------------------------------------------------
// ChangeLog
// 2012.10.26 - 1.15 - ncore-on also banner torlese a letolto oldalon
// 2012.02.10 - 1.14 - Igazodas az ncore oldal valtozasahoz
// 2011.06.05 - 1.13 - https is, BitGate helyett TvStore, site ki/be kapcsolok a GM menuben
// 2010.09.21 - 1.12 - Opera 10.60 kompatibilitas javitva
// 2010.09.20 - 1.11 - Fokusz a kereses mezore
// 2010.09.19 - 1.10 - Lenyito ful torlese
// 2010.09.19 - 1.9  - Javitas az uj ncore oldal tobb funkcios mukodese miatt
// 2010.09.18 - 1.8  - Ujabb ncore letolto oldal
// 2009.10.28 - 1.7  - Hibas Xpath syntax javitva
// 2009.10.27 - 1.6  - Ujabb igazitas a megvaltozott ncore letolto oldalhoz
// 2009.06.29 - 1.5  - Igazitas a megvaltozott ncore letolto oldalhoz
// 2008.11.27 - 1.4  - autoupdate
// 2008.11.25 - 1.3  - Operaban is mukodik a stilus valtoztatas
// 2008.11.25 - 1.2  - BitGate oldalsav eltuntetes
// 2008.10.18 - 1.1  - ncore barmely TLD-jere mukodik es minden oldalon leszedi a fadeinbox-ot
// 2008.05.22 - 1.0  - Elso valtozat
// -----------------------------------------------------------------------------
//
var SCRIPT = {
	name: "enti's annoying DIV remover",
	url: 'http://userscripts.org/scripts/source/35641.user.js',
	version: '1.15'
};

var no_tvstore = false;
var no_ncore =  false;

try {
	no_tvstore = GM_getValue('no_TvStore', false);
	no_ncore = GM_getValue('no_nCore', false);
	GM_registerMenuCommand(SCRIPT.name + ": nCore   - " + (no_ncore ? 'aktiválás': 'letiltás'), function() {
			GM_setValue('no_nCore', !no_ncore);
			document.location.reload();
	});
	GM_registerMenuCommand(SCRIPT.name + ": TvStore - " + (no_tvstore ? 'aktiválás': 'letiltás'), function() {
			GM_setValue('no_TvStore', !no_tvstore);
			document.location.reload();
	});
	GM_registerMenuCommand(SCRIPT.name + ": Frissítés keresése", checkupdate);
} catch (ex) {
}

function checkupdate(auto) {
	try {
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
			onload: function(result) {
				if (result.status != 200) { 
					if(!auto) window.alert('Hibás url - ' + SCRIPT.url);
					return;
				}
				if (!result.responseText.match(/@version\s+([\d.]+)/)) {
					if(!auto) window.alert('Hibás fájl tartalom - ' + SCRIPT.url);
					return;
				}
				var newVersion = RegExp.$1;
				if (parseFloat(newVersion) <= parseFloat(SCRIPT.version)) {
					if(!auto) window.alert('Nincs újabb verzió.');
					return;
				}
				var myRE = new RegExp('- ' + newVersion + ' - (.+)');
				var change = result.responseText.match(myRE);
				if (change) {
					change = ' (' + change[1] + ')';
				}
				if (window.confirm('Megjelent az "' +
					SCRIPT.name + '" GreaseMonkey szkript új verziója.\n\nTelepített verzió: '
					+ SCRIPT.version + '\nÚj verzió: ' + newVersion + change + '\n\nFrissíted most?\n')) {
					GM_openInTab(SCRIPT.url);
				}
			}
		});
		GM_setValue('LAST_CHECKED', now.toString());
	} catch (ex) {
	}
}

function autoupdate() {
	try {
		if (!GM_getValue) return;
		var isChecking = GM_getValue('CHECKING', null);
		var now = new Date().getTime();
		GM_setValue('CHECKING', now.toString());
		if (isChecking && (now - isChecking) < 30000) return;

		var lastChecked = GM_getValue('LAST_CHECKED', null);
		var ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
		if (lastChecked && (now - lastChecked) < ONE_WEEK) return;
		checkupdate(true);
	} catch (ex) {
	}
}

function $(id) {
	return document.getElementById(id);
}

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

function remove(element) {
	if(!element) return;
	element.parentNode.removeChild(element);
}

function display(element, style) {
	if(!element) return;
	element.style.display = style;
}

function my_addStyle(css) {
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css.replace(/;/g,' !important;'));
	} else if (typeof addStyle != "undefined") {
		addStyle(css.replace(/;/g,' !important;'));
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.innerHTML = css.replace(/;/g,' !important;');
			heads[0].appendChild(node); 
		}
	}
}

function getquery() {
	var qKeys = {};
	var re = /[?&]([^=]+)(?:=([^&]*))?/g;
	var matchInfo;
	while(matchInfo = re.exec(location.search)){
		qKeys[matchInfo[1]] = matchInfo[2];
	}
	return qKeys;
}

function deleteColumn(tbl) {
	var allRows = tbl.rows;
	for (var i=0; i<allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
}

autoupdate();

var thisdomain = window.location.host;

if(!no_ncore && thisdomain.match('ncore\.')) {
	var thispath = window.location.pathname;
	if (thispath == '/torrents.php') {
		var args = getquery();
                if (typeof(args.action) == 'undefined') {
			display($('kategoriak'), 'block');
			remove($('panel_stuff'));
			remove($('div_body_space'));
			$('mire').focus();
			var n = $('torrents2');
			do n = n.nextSibling; while (n && n.nodeType != 1);
			if (n.nodeName == 'CENTER') remove(n);
		}
	}
}

if(!no_tvstore && thisdomain.match('tvstore\.')) {
	var thispath = window.location.pathname;
	if (thispath != '/login.php') {
		deleteColumn($x('id("div_head")/table')[0]);
		deleteColumn($x('id("div_content")/table')[0]);
		my_addStyle(
			'body {background:#000;}' +
			'#div_container, td.center table.content, table.head {width:720px;}' +
			'td.foot {background-position:center top;}'
		);
	}
}
