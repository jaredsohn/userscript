// ==UserScript==
// @name           Tokyo Toshokan Cleaner v0.5
// @include        http://tokyotosho.com/*
// @include        http://www.tokyotosho.com/*
// ==/UserScript==

var get_details = false;
var get_details_onload = true;
var hide_details_onmouseout = false;

if(get_details && get_details_onload) get_details = false;

var do_highlight = false;

var highlight = new Array(
"berserk",
"death note",
"lucky star",
"nagasarete airantou"
);

for(x in highlight) highlight[x] = highlight[x].replace(/\s/g, ".*");

style = document.createElement('style'); style.type = 'text/css';
style.innerHTML = ("a:visited { text-decoration: none; } .icon, img { margin: 6px 2px; } .desc-top { padding: 6px 2px 4px 0; } td { vertical-align: top; } .high { font-weight: bold; font-size: 1.2em; color: #000; }");
document.getElementsByTagName('head')[0].appendChild(style);

var link_cells = document.evaluate('//td[@class="desc-top"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(i = 0; i < link_cells.snapshotLength; i++) {
	var link = link_cells.snapshotItem(i).childNodes.item(0);
	var s = link.innerHTML;
	
	link.title = link.innerHTML;

	var s = link.innerHTML;
	var crap = new Array();
	var meta = "";

	s = s.replace(/_/g, " ");
	s = s.replace(/\s\-\s/g, " &mdash; ");
	
	while(crap = /\[[^\]]+\]/.exec(s)) {
		s = s.replace(crap[0], "");
		meta += crap[0];
	}

	while(crap = /\([^\]]+\)/.exec(s)) {
		s = s.replace(crap[0], "");
		meta += crap[0];
	}

	var end;
	if(end = s.lastIndexOf("."))	{
		var tmp = s.substring(end);
		s = s.substring(0, end);
		s = s.replace(/\./g, " ");
		s += tmp;
	}

	if(meta && s) {
		s = s.replace(/^\s+/, "");
		s = s.replace(/\s+\./, ".");
		s = s.replace(/([\s]+^\s)/g, " ");
		
		if(do_highlight)
			for(x in highlight)
				s = s.replace(new RegExp("("+highlight[x]+")", "i"), "<span class='high'>$1</span>");

		link.innerHTML = s + "<small style='padding-left: 1.4em; color: #222;'>" + meta + "</small>";
	}
	else
		link.innerHTML += "<small style='padding-left: 1.4em; color: #faa;'>[UNPARSED]</small>";
		
	if(get_details_onload)
		get_info(link);
}


if(get_details)
document.addEventListener('mouseover', function(event) {
var t = event.target;
if(t.parentNode.className == "desc-top") {
	if(!t.className) {
		t.className = "500";	
		get_info(t);
	}
}
}, true);



if(hide_details_onmouseout)
document.addEventListener('mouseout', function(event) {
var t = event.target;
if(t.parentNode.className == "desc-top") {
	if(t.className == "500" && t.nextSibling) {
		t.className = "";
		t.nextSibling.style.display = "none";
	}
}
}, true);


function get_info(t) {
	if(!t.nextSibling) {
		var seeders = new Array();
		var leechers = new Array();
		var compl = new Array();
	
		var details_link;
		if(t.parentNode.nextSibling.childNodes.length == 3)
			details_link = t.parentNode.nextSibling.childNodes[2].href;
		else
			details_link = t.parentNode.nextSibling.childNodes[0].href;
			
		GM_xmlhttpRequest({ method: 'GET', url: details_link, onload: function(response) {
			var page = response.responseText;
			page = page.replace(/\n/gm, "");
			
			seeders = /Seeders:<\/li><li class="detailsright shade">([^<]+)</.exec(page);
			leechers = /Leechers:<\/li><li class="detailsright">([^<]+)</.exec(page);
			compl = /Completed:<\/li><li class="detailsright shade">([^<]+)</.exec(page);
			
			t.parentNode.innerHTML += "<small class='500' style='background-color: #efefef; border: 1px #ccc solid; padding: 2px 4px; margin-left: 1.6em; color: #000;'><b>S: </b>" +seeders[1]+ "; <b>L: </b>" +leechers[1]+ "; <b>C: </b>" +compl[1]+ "</small>";
		}});
	}
	else {
		t.className = "500";
		t.nextSibling.style.display = "inline";
	}
}