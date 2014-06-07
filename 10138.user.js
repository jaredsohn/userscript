// ==UserScript==
// @name           Tokyo Toshokan Cleaner v0.4
// @include        http://tokyotosho.com/*
// @include        http://www.tokyotosho.com/*
// ==/UserScript==

var get_details = true; // change to `false' to get rid of seeders/leechers info

style = document.createElement('style'); style.type = 'text/css';
style.innerHTML = (".icon, img { margin: 6px 2px; } .desc-top { padding: 6px 2px 4px 0; } td { vertical-align: top; }");
document.getElementsByTagName('head')[0].appendChild(style);

var link_cells = document.evaluate('//td[@class="desc-top"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(i = 0; i < link_cells.snapshotLength; i++) {
	var link = link_cells.snapshotItem(i).childNodes.item(0); var s = link.innerHTML;
	
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
	
	if(meta && s) {
		var e = 0;
		if(e = s.lastIndexOf("."))	{
			var tmp = s.substring(e);
			s = s.substring(0, e);
			s = s.replace(/\./g, " ");
			s += tmp;
		}
		s = s.replace(/^\s+/, "");
		s = s.replace(/\s+\./, ".");
		link.innerHTML = s + "<small style='padding-left: 1.4em; color: #222;'>" + meta + "</small>";
	}
	else
		link.innerHTML += "<small style='padding-left: 1.4em; color: #faa;'>[UNPARSED]</small>";
}


if(get_details)
document.addEventListener('mouseover', function(event) {
var t = event.target;
if(t.parentNode.className == "desc-top") {
	if(!t.className) {
		t.className = "500";	

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
			
			seeders = /seeders:<\/li><li class="detailsright shade">([^<]+)</im.exec(page);
			leechers = /leechers:<\/li><li class="detailsright">([^<]+)</im.exec(page);
			compl = /completed:<\/li><li class="detailsright shade">([^<]+)</im.exec(page);
			
			t.parentNode.innerHTML += "<small class='500' style='background-color: #ffffe1; border: 1px #888 solid; padding: 2px 4px; margin-left: 1.4em; color: #000;'><b>S: </b>" +seeders[1]+ "; <b>L: </b>" +leechers[1]+ "; <b>C: </b>" +compl[1]+ "</small>";
		}});
	}
}
}, true);