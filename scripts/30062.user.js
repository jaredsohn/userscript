// ==UserScript==
// @name           Tokyo Toshokan Cleaner v0.7.7
// @include        http://tokyotosho.com/*
// ==/UserScript==

var Table = document.evaluate("//table[@class='listing']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

if(Table) {
	var NameHigh = new Array();
	NameHigh = getHighls();

	var CollD1 = document.evaluate("//td[@class='desc-top']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var CollD2 = document.evaluate("//td[@class='desc-bot']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	var Rows = CollD1.snapshotLength;
	var DetailsArray = new Array();
	
	var NewTable = ""
	+"<table class='ls' cellpadding='0' cellspacing='0' border='0' align='center'>";


	for(var i = 0; i < Rows; i++) {
		var D1 = CollD1.snapshotItem(i);
		var D2 = CollD2.snapshotItem(i);
		
		var CategoryURL = D1.previousSibling.firstChild.href;
		var CategoryName;
		var CategoryHTML;

		switch(parseInt(CategoryURL.split("=")[1])) {
			case 1: CategoryName = "anime"; break;
			case 2: CategoryName = "music"; break;
			case 3: CategoryName = "manga"; break;
			case 4: CategoryName = "hentai"; break;
			case 5: CategoryName = "other"; break;
			case 6: CategoryName = "mwahaha"; break;
			case 7: CategoryName = "raw"; break;
			case 8: CategoryName = "drama"; break;
			case 9: CategoryName = "m&minus;v"; break;
			case 10: CategoryName = "n&minus;e"; break;
			default: CategoryName = "?"; break;
		}
		

		CategoryHTML = "<a href='" + CategoryURL + "'>" + CategoryName + "</a>";
		
		var FileURL = D1.firstChild.href;
		var FileName = D1.firstChild.innerHTML;
		var File = nnorm(FileName);

		var DetailsURL;
		var DetailsHTML;
		var WebsiteHTML = "";

		if(D1.nextSibling.childNodes.length == 1) {
			DetailsURL = D1.nextSibling.childNodes[0].href;
		}
		if(D1.nextSibling.childNodes.length == 3) {
			DetailsURL = D1.nextSibling.childNodes[2].href;
			WebsiteHTML = "<a href='" +  D1.nextSibling.childNodes[0].href + "'>WEBSITE</a><br/>";
		}
		
		DetailsHTML = "<a href='" + DetailsURL + "'>DETAILS</a>";
		DetailsArray[i] = DetailsURL;

		var LinksHTML = "";
		if(WebsiteHTML) LinksHTML = WebsiteHTML + DetailsHTML;
		else LinksHTML = DetailsHTML;

		var M = D2.innerHTML;
		
		var Size = /size:\s([^\s]+)/i.exec(M)[1];
		var SizeT = Size.substr(-3, Size.length);
		Size = Size.substring(0, Size.length - 3);
		
		if(Size < 10 && File["ex"].toLowerCase() == ".iso") SizeT = "GiB";
		else {
			Size = Math.round(Size);
			SizeT += "&nbsp;";
		}
		
		NewTable += ""
		+"<tr>"
		+"<td class='category'>" + CategoryHTML + "</td>"
		+"<td class='torrent'>";
		
		if(File["parsed"]) {
			NewTable += "<a class='torrent' href='" + FileURL + "'>" + File["name"];
			if(File["ex"]) NewTable += "<small class='ex'>" + File["ex"] + "</small>";
			NewTable += "</a>";
			if(File["highl"]) NewTable += "<sup class='search'><a href='/search.php?terms=" + File["highl"] + "'>SEARCH</a></sup>";
			if(File["m"]) NewTable += "<br/><small>" + File["m"] + "</small>";
		}
		else {
			NewTable += "<a class='torrent' href='" + FileURL + "'>" + File["name"];
			NewTable += "</a>";
		}
	
		NewTable += ""
		+"</td>"
		+"<td class='__s'>&ndash;</td>"
		+"<td class='__l'>&ndash;</td>"
		+"<td class='size'>" + Size + "</td>"
		+"<td class='sizet'><small>" + SizeT + "</small></td>"
		+"<td class='links'><small>" + LinksHTML + "</small></td>"
		+"</tr>";
		
		if(D2.parentNode.nextSibling)
			if(D2.parentNode.nextSibling.firstChild.colSpan == 3) NewTable += "<tr><td class='marker' colspan='6'></td></tr>";
	}
	
	NewTable += "</table>";

	//document.getElementsByTagName('head')[0].innerHTML = "";

	addGlobalStyle(""
	+"a { color: blue; text-decoration: none; } a:hover { color: red; text-decoration: underline; } a:visited { color: #880088; }"
	
	+".ls { border-spacing: 0 1px; background-color: silver; font-family: arial, sans-serif; font-size: 10pt; border: 2px solid #dfdfdf; }"
	+".ls small, .ls sup { font-size: 8pt; }"
	+".ls sup { vertical-align: top; }"
	+".ls a.torrent { font-size: 12pt; }"
	+".ls td { padding: 6pt 12pt; background-color: white; vertical-align: top; }"
	+".ls td.category { padding-right: 2pt; border-left: 1px solid silver; text-align: right; text-transform: uppercase; font-family:; font-size: 8pt; }"
	+".ls td.category a { color: #444; }"
	+".ls td.torrent { padding-left: 2pt; }"
	+".ls td.torrent sup { padding-left: 2pt; }"
	+".ls td.torrent sup a { color: #444; }"
	+".ls td.size { text-align: right; padding-right: 2pt; }"
	+".ls td.sizet { padding-left: 0; }"
	+".ls td.links { border-right: 1px solid silver; }"
	+".ls .marker { padding: 0; height: 2px; background-color: #dfdfdf; }"
	);
	
	wrap = document.createElement("div");
	wrap.className = 'wrap';
	wrap.innerHTML = NewTable;
	Table.parentNode.replaceChild(wrap, Table);

	var aS = document.evaluate("//td[@class='__s']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var aL = document.evaluate("//td[@class='__l']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < aS.snapshotLength; i++) {
		var S = aS.snapshotItem(i);
		var L = aL.snapshotItem(i);
		var URL = DetailsArray[i];
		getSL(S, L, URL);
	}

	var HForm = document.createElement("form");
	var HText = document.createElement("input");
	HText.type = "text";
	var HButton = document.createElement("span");
	HButton.innerHTML = "Add a highlight";
	HButton.className = "button";
	HForm.appendChild(HText);
	HForm.appendChild(HButton);

	var HighlsDiv = document.createElement("div");	
	HighlsDiv.className = "highlights";

	var hwarp = document.createElement("div");
	hwarp.className = "hwarp";
	hwarp.appendChild(HForm);
	hwarp.appendChild(HighlsDiv);

	wrap.appendChild(hwarp);
	
	listHighls();

	HButton.addEventListener('click', function(e) {
		if(HText.value) { addHighl(HText.value); HText.value = ""; }
	}, true);
	
	document.addEventListener('click', function(e) {
		if(e.target.className == "del_button") delHighl(e.target.previousSibling.innerHTML);
	}, true);
}

function addHighl(s) {
	var hls = GM_getValue("highlights", "");
	if(hls) hls += "%" + s;
	else hls = s;
	GM_setValue("highlights", hls);
	
	listHighls();
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
}

function listHighls() {
	var hlsA = new Array();
	HighlsDiv.innerHTML = "";
	if(hlsA = getHighls()) for each(h in hlsA) {
		HighlsDiv.innerHTML += "<nobr><a href='/search.php?terms=" + h.replace(/\s/g, "+") + "'>" + h + "</a><span class='del_button'>DEL</span></nobr>";
	}
}

function getHighls() {
	var hls = GM_getValue("highlights", "");
	if(hls) return hls.split("%");
	else return false;
}

function nnorm(s) {
	var c = new Array();
	var m = "";
	var R = new Array(["name", ""], ["ex", ""], ["m", ""], ["highl", ""], ["parsed", 0]);

	var ohgod = s.split(" ");
	for(var z = 0; z < ohgod.length; z++) ohgod[z] = ohgod[z].replace(/\s/g, "");
	s = ohgod.join(" ");

	var backup = s;
	
	s = s.replace(/_/g, " ");

	while(c = /\[[^\]]*\]/.exec(s)) {
		s = s.replace(c[0], "");
		m += c[0];
	}

	while(c = /\([^\]]*\)/.exec(s)) {
		s = s.replace(c[0], "");
		m += c[0];
	}

	s = s.replace(/\.+/g, ".");

	if(c = /\....$/.exec(s)) {
		R["ex"] = c[0];
		s = s.replace(R["ex"], "");
	}
	else if(c = /\.....$/.exec(s)) { // .rmvb
		R["ex"] = c[0];
		s = s.replace(R["ex"], "");
	}

	s = s.replace(/\s+/g, " ");
	s = s.replace(/^\s/, "");
	s = s.replace(/\s$/, "");

	s = s.replace(/\s\-\s/g, " &ndash; ");
		
	var highl = "";
	var words = "";

	if(s) {
		for each(nh in NameHigh) {
			reg = new RegExp(nh, "i");
			ind = s.search(reg);
			if(ind > -1) {
				s = s.substring(0, ind) + "<b>" + s.substr(ind, nh.length) + "</b>" + s.substr(ind + nh.length, s.length);
				if(!words) words += nh;
				else words += "+" + nh;
			}
			if(words) R["highl"] = words.replace(/\s/g, "+");		
		}

		R["name"] = s;
		R["parsed"] = 1;
	}
	else R["name"] = backup;

	R["m"] = m;
	
	return R;
}

function getSL(seedsObj, leechesObj, URL) {
	GM_xmlhttpRequest({ method: 'GET', url: URL, onload: function(response) {
		var s = new Array();
		var l = new Array();
		page = response.responseText;
		page = page.replace(/\n/gm, "");
		s = /seeders:<\/li><li class="detailsright shade">([^<]+)/im.exec(page);
		l = /leechers:<\/li><li class="detailsright">([^<]+)/im.exec(page);
		if(isNaN(s[1])) s[1] = "<small>:(</small>";
		if(isNaN(l[1])) l[1] = "<small>:(</small>";
		seedsObj.innerHTML = s[1];
		leechesObj.innerHTML = l[1];
	}});
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

function addScript(js) {
    var head, js;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
	script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}