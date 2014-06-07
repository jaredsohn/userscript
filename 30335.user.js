// ==UserScript==
// @name           Tokyo Toshokan Cleaner v1.1 (Opera)
// @include        http://tokyotosho.com/*
// @include        http://www.tokyotosho.com/*
// ==/UserScript==

var last_sort = "time"; var last_sort_order = true;
var data_table = document.evaluate("//table[@class='listing']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var data = [];
var parsed_highls = []; getParsedHighls();

if(data_table) {
	get_data(data_table);

	var new_table = document.createElement("table"); new_table.className = "nl"; new_table.align = "center";
	new_table.innerHTML = build_table();
	data_table.parentNode.replaceChild(new_table, data_table);

	var aS = document.evaluate("//td[@class='__s']", new_table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var aL = document.evaluate("//td[@class='__l']", new_table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < aS.snapshotLength; i++) {
		var S = aS.snapshotItem(i);
		var L = aL.snapshotItem(i);
		var URL = data[i].details_url;
		get_sl(S, L, URL, i);
	}

	var HighlsDiv = document.createElement("div"); HighlsDiv.className = "HighlsDiv"; HighlsDiv.innerHTML = "";
	new_table.parentNode.insertBefore(HighlsDiv, new_table);
	
	var hform = document.createElement("form"); hform.className = "hform";
	var htext = document.createElement("input"); htext.type = "text";
	var hbutton = document.createElement("input"); hbutton.type = "button"; hbutton.value = "HIGHLIGHT";
	hform.appendChild(htext); hform.appendChild(hbutton);
	new_table.parentNode.insertBefore(hform, HighlsDiv);
	
	var sort_mark = document.createElement("span");
	sort_mark.className = "sort_mark"; sort_mark.innerHTML = "";
	document.getElementById("time").appendChild(sort_mark);
	
	listHighls();
	
	hbutton.addEventListener('click', function(e) {
		if(htext.value) {
			addHighl(htext.value);
			htext.value = "";
		}
	}, true);
	
	document.addEventListener('click', function(e) {
		if(e.target.className == "del_clickable") delHighl(e.target.previousSibling.innerHTML);
	}, true);	
	
	document.addEventListener('click', function(e) {
		switch(e.target.id) {
			case "c":
				if(last_sort == "c") {
					var types = 1;
					for(var i = 1; i < data.length; i++) if(data[i].category_type != data[i-1].category_type) { types++; i = data.length; }
					if(types > 1) {
						data.reverse();
						last_sort_order = !last_sort_order;
						new_table.innerHTML = build_table();
						document.getElementById("c").appendChild(sort_mark);
					}
				}
				else {
					data.sort(function(a, b){ return a.category_type - b.category_type; });
					last_sort_order = true;
					last_sort = "c";
					new_table.innerHTML = build_table();
					document.getElementById("c").appendChild(sort_mark);
				}
				break;
			case "file":
				if(last_sort == "file") {
					data.reverse();
					last_sort_order = !last_sort_order;
					new_table.innerHTML = build_table();
					document.getElementById("file").appendChild(sort_mark);
				}
				else {
					data.sort(sort_by_file);
					last_sort_order = true;
					last_sort = "file";
					new_table.innerHTML = build_table();
					document.getElementById("file").appendChild(sort_mark);
				}
				break;
			case "s":
				if(last_sort == "s") {
					data.reverse();
					last_sort_order = !last_sort_order;
					new_table.innerHTML = build_table();
					document.getElementById("s").appendChild(sort_mark);
				}
				else {
					data.sort(function(a, b){ var x, y; if(isNaN(a.s)) x = -1; else x = a.s; if(isNaN(b.s)) y = 0; else y = b.s; return y - x; });
					last_sort_order = false;
					last_sort = "s";
					new_table.innerHTML = build_table();
					document.getElementById("s").appendChild(sort_mark);
				}
				break;
			case "l":
				if(last_sort == "l") {
					data.reverse();
					last_sort_order = !last_sort_order;
					new_table.innerHTML = build_table();
					document.getElementById("l").appendChild(sort_mark);
				}
				else {
					data.sort(function(a, b){ var x, y; if(isNaN(a.l)) x = -1; else x = a.l; if(isNaN(b.l)) y = 0; else y = b.l; return y - x; });
					last_sort_order = false;
					last_sort = "l";
					new_table.innerHTML = build_table();
					document.getElementById("l").appendChild(sort_mark);
				}
				break;
			case "size":
				if(last_sort == "size") {
					data.reverse();
					last_sort_order = !last_sort_order;
					new_table.innerHTML = build_table();
					document.getElementById("size").appendChild(sort_mark);
				}
				else {
					data.sort(function(a, b){ return a.size - b.size; });
					last_sort_order = true;
					last_sort = "size";
					new_table.innerHTML = build_table();
					document.getElementById("size").appendChild(sort_mark);
				}
				break;
			case "time":
				if(last_sort == "time") {
					data.reverse();
					last_sort_order = !last_sort_order;
					new_table.innerHTML = build_table();
					document.getElementById("time").appendChild(sort_mark);
				}
				else {
					data.sort(function(a, b){ return b.milliseconds - a.milliseconds; });
					last_sort_order = false;
					last_sort = "time";
					new_table.innerHTML = build_table();
					document.getElementById("time").appendChild(sort_mark);
				}
				break;
		}
	if(last_sort_order) sort_mark.innerHTML = "&darr;";
	else sort_mark.innerHTML = "&uarr;";
	}, true);
}

function get_data(data_table) {
	var data_col1 = document.evaluate("//td[@class='desc-top']", data_table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var data_col2 = document.evaluate("//td[@class='desc-bot']", data_table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(var q = 0; q < data_col1.snapshotLength; q++) {
		var d1 = data_col1.snapshotItem(q);
		var d2 = data_col2.snapshotItem(q);
		data[q] = [];

		data[q].category_url = "/" + /(\?cat=\d+)$/.exec(d1.previousSibling.firstChild.href)[1];
		data[q].category_type = parseInt(/=(\d+)$/.exec(data[q].category_url)[1]);
		switch(data[q].category_type) {
			case 1:  data[q].category_name = "anime";		data[q].category_style = "green; color: white;"; break;
			case 2:  data[q].category_name = "music";		data[q].category_style = "#eee;"; break;
			case 3:  data[q].category_name = "manga";		data[q].category_style = "blue; color: white;"; break;
			case 4:  data[q].category_name = "hentai";		data[q].category_style = "red; color: white;"; break;
			case 5:  data[q].category_name = "other";		data[q].category_style = "#eee; color: #666;"; break;
			case 6:  data[q].category_name = "mwahaha";	data[q].category_style = "#eee"; break;
			case 7:  data[q].category_name = "raw";		data[q].category_style = "black; color: white;"; break;
			case 8:  data[q].category_name = "drama";		data[q].category_style = "#ba967b; color: white;"; break;
			case 9:  data[q].category_name = "m&minus;v";	data[q].category_style = "#eadc55;"; break;
			case 10: data[q].category_name = "n&minus;e";	data[q].category_style = "#eee;"; break;
			default: data[q].category_name = "?";			data[q].category_style = "#eee"; break;
		}
		
		data[q].torrent_original_name = d1.firstChild.innerHTML;
		data[q].torrent = nnorm(data[q].torrent_original_name);
		data[q].torrent_url = d1.firstChild.href; 

		if(d1.nextSibling.childNodes.length == 1) {
			data[q].details_url = d1.nextSibling.childNodes[0].href;
			data[q].website_url = null; }
		else if(d1.nextSibling.childNodes.length == 3) {
			data[q].details_url = d1.nextSibling.childNodes[2].href;
			data[q].website_url = d1.nextSibling.childNodes[0].href; }
		
		var raw_size = /size:\s([^\s]+)/i.exec(d2.innerHTML)[1];
		data[q].size = raw_size.substring(0, raw_size.length - 3);
		if(data[q].size > 10) data[q].size = Math.round(data[q].size);
		data[q].size_desc = raw_size.substr(-3, raw_size.length);
		
		var raw_date = /date:\s(.+)\sGMT/i.exec(d2.innerHTML)[1];
		if(/^\d{4}-/.test(raw_date)) {
			var parsed_date = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})/.exec(raw_date);
			data[q].date = new Date(parsed_date[1], parsed_date[2] - 1, parsed_date[3], parsed_date[4], parsed_date[5]); }
		else data[q].date = new Date(Date.parse(raw_date));
		data[q].milliseconds = data[q].date.getTime();
		data[q].formatted_date = format_date(data[q].date);
		
		data[q].comment = null;
		if(/comment:\s/i.test(d2.innerHTML))
			data[q].comment = /comment:\s(.+)$/i.exec(d2.innerHTML)[1];
		
		data[q].is_marker = false;
		if(d2.parentNode.nextSibling)
			if(d2.parentNode.nextSibling.firstChild.colSpan == 3 && d2.parentNode.nextSibling.firstChild.innerHTML == "<span style=\"display: none;\">&nbsp;</span>") data[q].is_marker = true;
			
		data[q].s = data[q].l = "&minus;";
		data[q].search = "";
	}
}

function build_table() {
	var nt = "";

	nt += "<tr id='header'><td id='c'>C.</td><td id='file'>File</td><td id='s'>S.</td><td id='l'>L.</td><td colspan='2' id='size'>Size</td><td>&nbsp;</td><td id='time'>Time</td></tr>";
	
	for (var d in data) {
		nt += "<tr>";
		nt += "<td><a class='c' style='background-color: " + data[d].category_style + "' href='" + data[d].category_url + "'>" + data[d].category_name + "</a></td>";
		
		nt += "<td class='torrent'>"
		if(data[d].torrent.parsed) {
			nt += "<a class='torrent' title='" + data[d].torrent_original_name + "' href='" + data[d].torrent_url + "'>" + data[d].torrent.parsed;
			if(data[d].torrent.ext) nt += "<span class='ext'>" + data[d].torrent.ext + "</span>";
			nt += "</a>";
			if(data[d].torrent.search) {
				var links = data[d].torrent.search.split("%");
				for (var l in links) nt += "<sup class='search'><a href='/search.php?terms=" + links[l] + "'>SEARCH</a></sup>";
			}
			if(data[d].torrent.meta) nt += "<br/><span class='meta'>" + data[d].torrent.meta + "</span>";
			
		}
		else {
			nt += "<a class='torrent' href='" + data[d].torrent_url + "'>" + data[d].torrent_original_name + "</a>";
			if(data[d].torrent.search) {
				var links = data[d].torrent.search.split("%");
				for (var l in links) nt += "<sup class='search'><a href='/search.php?terms=" + links[l] + "'>SEARCH</a></sup>";
			}
		}
		nt += "</td>";
		
		nt += "<td class='__s'>" + data[d].s + "</td>";
		nt += "<td class='__l'>" + data[d].l + "</td>";
		nt += "<td class='size'>" + data[d].size + "</td>";
		nt += "<td class='size_desc'>" + data[d].size_desc + "</td>";
		
		nt += "<td class='links'>";
		if(data[d].website_url) nt += "<a href='" + data[d].website_url + "'>WEBSITE</a><br/>";
		nt += "<a href='"+ data[d].details_url +"'>DETAILS</a></td>";
		
		nt += "<td class='time'><nobr>" + data[d].formatted_date + "</nobr></td>";
		
		nt += "</tr>";
		
		if(last_sort == "time") if(data[d].is_marker) nt += "<tr><td class='marker' colspan='8'></td></tr>"
	}
	
	return nt;
}

function nnorm(s) {
	var ns = [];
	var c = [];

	ns.parsed = ns.meta = ns.ext = "";

	var ohgod = s.split(" ");
	for(var z = 0; z < ohgod.length; z++) ohgod[z] = ohgod[z].replace(/\s+/g, "");
	s = ohgod.join(" ");
	
	s = s.replace(/\s+/g, " ");
	
	if(/\..{3,4}$/.test(s)) {
		ns.ext = /\..{3,4}$/.exec(s);
		s = s.replace(ns.ext, ""); }

	s = s.replace(/\s+/g, " ");
	s = s.replace(/^\s/, "");
	s = s.replace(/\s$/, "");
	
	while(c = /\[[^\]]*\]/.exec(s)) { // []-blocks
		s = s.replace(c[0], "");
		ns.meta += c[0];
	}

	while(c = /\([^\)]*\)/.exec(s)) { // ()-blocks
		s = s.replace(c[0], "");
		ns.meta += c[0];
	}
	
	while(c = /\{[^\}]*\}/.exec(s)) { // {}-blocks
		s = s.replace(c[0], "");
		ns.meta += c[0];
	}

	s = s.replace(/[\[\]\(\)\{\}]/g, "");
	
	s = s.replace(/\s+/g, " ");
	s = s.replace(/^\s/, "");
	s = s.replace(/\s$/, "");

	s = s.replace(/_+/, "_");
	s = s.replace(/\.+/, ".");

	if(s.search(" ") == -1) s = s.replace(/_/g, " ");
	
	s = s.replace(/^\s/, "");
	s = s.replace(/\s$/, "");

	if(s.search(" ") == -1) s = s.replace(/\./g, " ");

	s = s.replace(/^\s/, "");
	s = s.replace(/\s$/, "");
	
	if(s) ns.parsed = s;
	else if(ns.meta) { ns.parsed = ns.meta; ns.meta = ""; }
	
	ns = highlight(ns);

	ns.parsed = ns.parsed.replace(/\s-\s/g, " &mdash; ");
	ns.parsed = ns.parsed.replace(/(\d+)-(\d+)/g, "$1&ndash;$2");

	if(ns.meta) {
		ns.meta = ns.meta.replace(/(\d+)x(\d+)/, "<span class='resolution'>$1&times;$2</span>");
		ns.meta = ns.meta.replace(/([\[|\(|\{][abcdef0-9]{8}[\]|\)|\}])/i, "<span class='crc'>$1</span>"); }
	
	return ns;
}

function highlight(ns) {
	var s = escape(ns.parsed);
	var m = escape(ns.meta);
	var ss = "";
	
	for (var h in parsed_highls) {
		var hits = 0;
		var words = parsed_highls[h].length;
		var search = "";
		var wordsStr = parsed_highls[h];
		
		for (var w in wordsStr) {
			var reg = new RegExp(wordsStr[w], "i");
			var ind = s.search(reg);
			var m_ind = m.search(reg);
			
			if(ind > -1) {
				hits++;
				s = s.substring(0, ind) + "<b>" + s.substr(ind, wordsStr[w].length) + "</b>" + s.substr(ind + wordsStr[w].length, s.length);
				if(!search) search = wordsStr[w];
				else search += "+" + wordsStr[w];
			}
			if(m_ind > -1) {
				hits++;
				m = m.substring(0, m_ind) + "<big>" + m.substr(m_ind, wordsStr[w].length) + "</big>" + m.substr(m_ind + wordsStr[w].length, m.length);
				if(!search) search = wordsStr[w];
				else search += "+" + wordsStr[w];
			}
		}
		if(hits == words) {
			ns.parsed = unescape(s);
			ns.meta = unescape(m);
			if(!ss) ss = unescape(search);
			else ss += "%" + unescape(search);
			ns.search = ss;
		}
		else {
			s = escape(ns.parsed);
			m = escape(ns.meta);
		}
	}
	return ns;
}

function sort_by_file(a, b) {
    var x = a.torrent.parsed.toLowerCase();
    var y = b.torrent.parsed.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function format_date(date) {
	var months = [];
	months[0] = "Jan"; months[1] = "Feb"; months[2] = "Mar"; months[3] = "Apr"; months[4] = "May"; months[5] = "Jun";
	months[6] = "Jul"; months[7] = "Aug"; months[8] = "Sep"; months[9] = "Oct"; months[10] = "Nov"; months[11] = "Dec";
	var month = months[date.getMonth()];
	var day = date.getDate();
	var hours = date.getHours();
	var mins = date.getMinutes();
	if(hours < 10) hours = "0" + hours;
	if(mins < 10) mins = "0" + mins;
	return month + " " + day + ", " + hours + ":" + mins;
}

function get_sl(seedsObj, leechesObj, URL, i) {
	GM_xmlhttpRequest({ method: 'GET', url: URL, onload: function(response) {
		var s = new Array();
		var l = new Array();
		page = response.responseText;
		page = page.replace(/\n/gm, "");
		s = /seeders:<\/li><li class="detailsright shade">([^<]+)/im.exec(page);
		l = /leechers:<\/li><li class="detailsright">([^<]+)/im.exec(page);
		if(isNaN(s[1])) s[1] = "<small>:(</small>";
		if(isNaN(l[1])) l[1] = "<small>:(</small>";
		seedsObj.innerHTML = data[i].s = s[1];
		leechesObj.innerHTML = data[i].l = l[1];
	}});
}

function addHighl(s) {
	var hls = GM_getValue("highlights", "");
	if(hls) hls += "%" + s;
	else hls = s;
	GM_setValue("highlights", hls);
	
	listHighls();
	getParsedHighls();
}

function delHighl(s) {
	var hls = GM_getValue("highlights", "");
	var hlsA = hls.split("%");
	for(var r = 0; r < hlsA.length; r++) {
		if(hlsA[r] == s) hlsA.splice(r, 1);
	}
	hls = hlsA.join("%");
	GM_setValue("highlights", hls);
	
	listHighls();
	getParsedHighls();
}

function listHighls() {
	var hlsA = new Array();
	HighlsDiv.innerHTML = "";
	if(hlsA = getHighls()) for (var h in hlsA) {
		HighlsDiv.innerHTML += "<a href='/search.php?terms=" + hlsA[h].replace(/\s/g, "+") + "'>" + hlsA[h]/*.replace(/\s/g, "&nbsp;")*/ + "</a><sup class='del_clickable'>DEL</sup>";
	}
}

function getHighls() {
	var hls = GM_getValue("highlights", "");
	if(hls) return hls.split("%");
	else return false;
}

function getParsedHighls() {
	var hls = GM_getValue("highlights", "").split("%");
	for(var i = 0; i < hls.length; i++)
		parsed_highls[i] = escape(hls[i]).split("%20");
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(""
	+".nl { width: 100%; margin-right: -1px; font-family: arial; font-size: 10pt; border-spacing: 0 1px; background-color: #ddd; border: 1px solid #ddd; border-width: 0 1px; }"
	+".nl td.torrent { width: 100%; }"
	+".nl td { background-color: white; vertical-align: top; padding: 6pt; }"
	+".nl td.__s, .nl td.__l, .nl td.size, .nl td.size_desc, .nl td.links, .nl td.time { vertical-align: middle; }"
	+".nl td.size, .nl td.time { text-align: right; }"
	+".nl td.size { padding-right: 0; }"
	+".nl td.size_desc { padding-left: 2pt; padding-top: 8pt; font-size: 7pt; font-weight: bold; color: #222; }"
	+".nl td.links { font-size: 7pt; padding-left: 18pt; padding-right: 18pt; }"
	+".nl tr#header td { background-color: #eee; font-size: 12pt; color: #444; }"
	+".nl td#c:hover, .nl td#file:hover, .nl td#s:hover, .nl td#l:hover, .nl td#size:hover, .nl td#time:hover { background-color: #ddd; cursor: pointer; }"
	+".nl a.torrent { display: inline-block; margin-top: 1px; font-size: 12pt; }"
	+".nl td.torrent { padding-right: 18pt; }"
	+".nl span.ext { font-size: 7pt; font-weight: bold; text-transform: uppercase; }"
	+".nl span.meta { font-size: 10pt; color: #444; }"
	+".nl span.meta big { font-size: 12pt; font-weight: bold;}"
	+".nl span.crc { color: #ccc; }"
	+".nl span.resolution { color: black; }"	
	+".nl a.c { cursor: pointer; display: block; width: 57px; height: 23px; padding-right: 6px; font-size: 7pt; font-weight: bold; text-align: right; text-transform: uppercase; text-decoration: none; line-height: 21px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAXCAYAAAC8oJeEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXtJREFUeNrkmEFKxTAQhtsaRXBVUdy4KngA6Q2kPYLoSTyEB3HjDaTgCXIAN90oD0Sxq4f62r74/yUp7bMnmBkYmky7+fJPppnEDhbBmqb5rOv6GcNX+CaSZwfw8yzLrtI0PWEgJjzAv6y193mevyPW4qWTRg7GGI99cJ6B8w6Mx4YvoPgTVuQNgTWmTqDqEdgGscHZkhcLcGv8qqwQ/Baa7ruLkAB+xbEBOOF7jH81wFN98pLb+MAW3nG/K4Df87wz+I0S5ZN/8EgDVnnxyoNzUflWZdpjNVTBe95Z2qsoeOA0mtN+Eb7zLt26xWqvNu39nu8UwHe71d7hH88jbq8g7Xm0dVPlHQ77vQblPecc3v/7egVpvw33FYlv87KqqpKJ+iKdfOQk76A8m3w09tcYP5Rl+YK+/icUBGkNDeAPwXtBXnKHa6zIWvsBf8QHFvO1wEuMI/hlURQ3gD8d4f1eYDEI+0LiDc7wRGaP4xF+UhDEFrsAHexPgAEA0tAlhFAYgKYAAAAASUVORK5CYII%3D) no-repeat; color: black; }"
	+".nl td.marker { height: 1px; padding: 0; background-color: red; }"
	+".nl span.sort_mark { padding-left: 4pt; position: relative; top: -2pt; font-weight: bold; }"
	+".hform { margin: 8pt; }"
	+".hform input[type='button'] { font-size: 8pt; }"
	+".HighlsDiv { margin: 8pt; margin-bottom: 16pt; font-size: 12pt; }"
	+".HighlsDiv a { margin-left: 18pt; }"
	+".HighlsDiv a:first-child { margin-left: 0; }"
	+"sup.del_clickable { cursor: pointer; font-size: 7pt; font-weight: bold; }"
	+"sup.del_clickable:hover { color: red; }"
	+"sup.search { padding-left: 4pt; }"
	+"sup.search a { color: black; text-decoration: none; }"
	+"sup.search a:hover { color: red; }"
	+".nl td.marker { padding: 0; height: 1px; background-color: red; }"
);