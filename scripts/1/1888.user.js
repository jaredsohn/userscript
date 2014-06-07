// ==UserScript==
// @name          Torrentspy Cleaner
// @author        ankut
// @include	  http://torrentspy.com/*
// @include	  http://*.torrentspy.com/*
// @include	  http://ts.searching.com/*
// @description	  Cleans up Torrentspy.com by removing extraneous visual elements
// ==/UserScript==

GM_addStyle("#page, #container, body {background-position: 0px -95px ! important;}");
GM_addStyle("#container, #page, #header, #footer {width: 755px ! important;}");
GM_addStyle("#nav {margin-right: 5px ! important;}");

var ads = document.evaluate("//div[starts-with(@class,'adspace')] | //table[@class='list']/tbody/tr[count(child::td)=1] | //td/a[@target='_new'] | //div[@class='content']/iframe | //div[@class='content']/p/iframe | //div[@id='shirts' or @id='jobs' or @id='searchagent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < ads.snapshotLength; i++)
	ads.snapshotItem(i).parentNode.removeChild(ads.snapshotItem(i));

var right = document.getElementById("col-right");
if (right) right.parentNode.removeChild(right);

var form = document.getElementById("fiSearchForm");
if (form) form.parentNode.parentNode.removeChild(form.parentNode);

var dls = document.evaluate("//table[@class='list']/tbody/tr/td/a/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; i < dls.snapshotLength; i++)
	dls.snapshotItem(i).parentNode.href = dls.snapshotItem(i).parentNode.href.replace(/\/torrent\/([^\/]+)\/.*$/, "/download.asp?id=$1");

function makeSelect(name, opts, current) {	
	var sel = document.createElement("select");
	sel.setAttribute("name", name);
	sel.setAttribute("style", "font-size: 9px");
	var inner = "";

	for (var i = 1; i < opts.length; i++) {
		var op = opts[i].replace("Yes", 1).replace("No", 0);
		inner += "<option value=" + op + (op == current ? " selected" : "") + ">" + opts[0] + ": " + opts[i] + "</option>";
	}
	sel.innerHTML = inner;
	sel.addEventListener("change", function(e) {
		var cookie = document.cookie.match(/preferences=([^;]+)/)[1];
		cookie = cookie.replace(new RegExp("(" + e.target.name + "=)[^&]+"), "$1" + e.target.options[e.target.selectedIndex].value);
		document.cookie = "preferences=" + cookie;
		GM_xmlhttpRequest({
			method: 'POST', 
			url: 'http://www.torrentspy.com/preferences.asp', 
			headers: {'Content-type' : 'application/x-www-form-urlencoded'},
			data: cookie + "&submit=Submit%20Preferences",
			onload : function(r) { window.location.reload(); }
		});
	}, true);
	return sel;
}

var selects = ["pagesize", "sortby", "seederexcl", "detailed"];
var values =  [
		["Result Size", "50", "100", "200"], 
		["Sort by", "Name", "Date", "Category", "Seeders", "Downloaders"],
		["Exclude Dead", "No", "Yes"],
		["2 Line Result", "No", "Yes"]
	      ];

var cookies = document.cookie.match(/preferences=([^;]+)/);
if (cookies == null) {
	cookies = "pagesize=50&sortby=Name&seederexcl=0&detailed=0";
	document.cookie = "preferences=" + cookies;
} else {
	cookies = cookies[1];
}

var prefs = document.evaluate("//p[@class='meta']/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < prefs.snapshotLength; j++) {
	link = prefs.snapshotItem(j); 
	link.parentNode.replaceChild(makeSelect(selects[j], values[j], cookies.match(selects[j] + "=([^&]+)")[1]), link);
}
