// ==UserScript==
// @name           Last.fm Quickfind
// @namespace      
// @description    Quickly and easily browse through your favourite artists on Last.fm.
// @include        http://www.last.fm/*
// ==/UserScript==

var textboxWidth = 250;
var dropdownLimit = 20;

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function sortFunction(b, a) {
	var curA = new Array();
	var curB = new Array();
	curA[0] = unescape(a[0]);
	curA[1] = a[1];
	curB[0] = unescape(b[0]);
	curB[1] = b[1];
	if (curA[1] < curB[1]) {
		return -1;
	}
	if (curA[1] > curB[1]) {
		return 1;
	}
	var aNoThe = curA[0];
	var bNoThe = curB[0];
	if (curA[0].indexOf("The ") == 0) {
		aNoThe = curA[0].substr(4);
	}
	if (curB[0].indexOf("The ") == 0) {
		bNoThe = curB[0].substr(4);
	}
	if (aNoThe == bNoThe) {
		return 0;
	}
	var sorted = new Array;
	sorted[0] = aNoThe;
	sorted[1] = bNoThe;
	sorted.sort();
	if (sorted[0] == aNoThe) {
		return 1;
	}
	return -1;
}

function addArtist(artist) {
	var commaArtists = GM_getValue("quickArtists", "");
	var equalArtists = commaArtists.split(",");
	var artists = new Array();
	for (var i = 0; i < equalArtists.length; i++) {
		artists[i] = equalArtists[i].split("=");
	}
	var match = 0;
	for (var i = 0; i < artists.length; i++) {
		if (unescape(artists[i][0]) == artist) {
			match = 1;
			artists[i][1]++;
			commaArtists = "";
			for (var j = 0; j < artists.length; j++) {
				commaArtists += (j == 0 ? "" : ",") + artists[j][0] + "=" + artists[j][1];
			}
			break;
		}
	}
	if (!match) {
		commaArtists += (commaArtists == "" ? "" : ",") + escape(artist) + "=1";
	}
	GM_setValue("quickArtists", commaArtists);
}

function reset(e) {
	GM_setValue("quickArtists", "");
	GM_setValue("lastQuickArtist", "");
	window.location.reload();
}

(function (){
	GM_registerMenuCommand("Reset Last.fm Quickfind", reset);
	var headline = xpath("//div[@id='LastHeadline']");
	if (headline.snapshotLength == 0) {
		return;
	}
	headline = headline.snapshotItem(0);
	var added = 0;
	if (location.href.match(/^http:\/\/www\.last\.fm\/music\/[^\/]+(?:\/|)$/)) {
		re = /http:\/\/www\.last\.fm\/music\/([^\/]+)\/?.*/;
		re.exec(location.href);
		var artist = xpath("//h1[@class='h1artist']/a").snapshotItem(0).innerHTML;
		addArtist(artist);
		var added = 1;
	}
	var scriptHTML = 'var quickArtists = new Array();';
	var commaArtists = GM_getValue("quickArtists", "");
	var equalArtists = commaArtists.split(",");
	var artists = new Array();
	for (var i = 0; i < equalArtists.length; i++) {
		artists[i] = equalArtists[i].split("=");
	}
	var anyArtists = (artists.length > 0 && artists[0][0] != "");
	if (anyArtists) {
		artists.sort(sortFunction);
	}
	scriptHTML +=	'function encodeURIComponent2(str) {var esc = plusify(escape(encodeURIComponent(str)));' +
					'while (esc.indexOf("%20") > -1) {esc = esc.replace("%20", "+");}' +
					'return esc;}' +
					'function plusify(str) {while (str.indexOf("%2520") > -1) {str = str.replace("%2520", "+");' +
					'} return str;}' +
					'function doArtist() {location.href="http://www.last.fm/music/"+' +
					'encodeURIComponent2(document.getElementById("textQuickArtist").value);}' +
					'function doArtistFromSelect() {document.getElementById("textQuickArtist").value = document.' + 
					'getElementById("selectQuickArtist").options[document.getElementById("selectQuickArtist")' +
					'.selectedIndex].text; doArtist();}';
	var head = document.getElementsByTagName("head")[0];
	var scriptEl = document.createElement("script");
	scriptEl.innerHTML = scriptHTML;
	head.appendChild(scriptEl);
	var html =	'<form style="display: inline" onsubmit="doArtist(); return false;">' +
				'<select style="width: ' + textboxWidth +
				'px; height: 17px; font-size: 11px;" id="selectQuickArtist" onchange="doArtistFromSelect();">';
	var selectedDone = 1;
	var lastArtist = GM_getValue("lastQuickArtist", "");
	if (anyArtists) {
		selectedDone = 0;
		if (artists.length > 1) {
			for (var i = 0; i < artists.length && i < dropdownLimit - 1; i++) {
				html +=	'<option' + (lastArtist == artists[i][0] ? ' selected="selected"' : '') + '>' +
						unescape(artists[i][0]) + '</option>';
				if (lastArtist == artists[i][0]) {
					selectedDone = 1;
				}
			}
			if (!selectedDone && lastArtist != "") {
				html += '<option selected="selected" width="100%">' + unescape(lastArtist) + '</option>';
			} else {
				if (i == dropdownLimit - 1 && artists.length > i + 1) {
					html +=	'<option' + (lastArtist == artists[i][0] ? ' selected="selected"' : '') + '>' +
							unescape(artists[i][0]) + '</option>';
				}
			}
		} else {
			html += '<option>' + unescape(artists[0][0]) + '</option>';
		}
	}
	html +=	'</select>' +
			'<input style="width: ' +
			(textboxWidth - 23) +'px; height: 13px; font-size: 11px; border: none; margin-right: 18px; margin-left: -' +
			(textboxWidth - 2) + 'px; padding-left: 2px;" type="text" id="textQuickArtist" value="' +
			(lastArtist == "" ? (typeof(artist) == "undefined" ? "" : artist) : unescape(lastArtist)) + '" ' + 'onfocus="this.select();" />' +
			'<input style="margin-left: 3px; height: 20px; font-size: 11px;" type="button" value="Go" onclick="doArtist();" /></form>';
	headline.innerHTML = "<div style=\"float: right; margin-top: 4px; margin-right: 187px;\">"+html+"</div>"+headline.innerHTML;
	if (added) {
		GM_setValue("lastQuickArtist", escape(artist));
	}
})();
