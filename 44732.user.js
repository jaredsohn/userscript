// ==UserScript==
// @name           PlanetRomeo Forum Thread Readable
// @namespace      http://my.guys4men.com
// @include        http://www.gayromeo.com/*/forum_thread.php*
// @include        http://www.planetromeo.com/*/forum_thread.php*
// @include        http://83.98.143.20/*/forum_thread.php*
// ==/UserScript==


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
var css = 
'.userRow td { background-color: #eeeeff !important;  ' +
'   padding-top: 10px !important; } ' +
'.userRow a { color: #0000AA !important;  ' +
'   font-size: 11pt !important; } ' +
'.userRow .col0 { font-size: 9pt !important;  ' +
'   color: black !important; } ' +
'.userRow .col1 { color: black !important; } ' +
'.textRow td { background-color: white !important; } ' +
'.textRow .col0 { background-color: white !important; } ' +
'.textRow .col1 { font-size: 11pt !important;  ' +
'   font-family: Georgia,"Times New Roman",Times,serif !important; ' +
'   line-height: normal !important; ' +
'   padding-left: 15px !important; ' +
'   color: black !important; } ' +
'.tableAll {  } ' +
'';
	
addGlobalStyle(css);

function beautifyUserRow(row) {
    row.className = 'userRow';
	var cols = row.childNodes;
	cols[0].className = 'col0';
	cols[1].className = 'col1';
}

function beautifyTextRow(row) {
    row.className = 'textRow';
	var cols = row.childNodes;
	cols[0].className = 'col0';
	cols[1].className = 'col1';
}

//GM_log("start");
var t_row = document.evaluate(
	'//tr[count(*)=2]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
//GM_log("td count: " + t_row.snapshotLength);
for (var i = 0; i < t_row.snapshotLength; i++) {
	var row = t_row.snapshotItem(i);
	if (i % 2 == 0) {
	  beautifyUserRow(row);
	} else {
	  beautifyTextRow(row);
	}
}

var tables = document.getElementsByTagName("table");
if (tables.length == 1) {
	tables[0].className = 'tableAll';
} 

//GM_log("end");