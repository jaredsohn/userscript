// ==UserScript==
// @name         Programma gemist directe video link
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.7 - Uitzendinggemist.nl, rtl4.nl, rtl5.nl, rtl7.nl directe link naar breedband video's
// @include      http://*uitzendinggemist.nl/*
// @include      http://*omroep.nl/*
// @include      http://www.rtl.nl/*
// @include      http://*tvopjepc.nl/*
// @include      http://*rvu.nl/*
// @include      http://*bnn.nl/*
// @include      http://*delamas.nl/*
// @include      http://*vara.nl/*
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2007-03-17

*/

var omroepAsf = /http:\/\/cgi\.omroep\.nl\/cgi-bin\/streams\?\/(\w+\/)+bb\.[\w\.]+\.asf/;
var omroepPlayer  = /http:\/\/player\.omroep\.nl\/\?aflID=[0-9]+(&start=[0-9:]+)?&md5=[0-9a-z]+|http:\/\/portal\.omroep\.nl\/mplayer\?nav=[A-Za-z]+/;
var rtlAsf = /\(channel=[^,]+,progid=[^,]+,(zone=[^,]+,)?vm=[\/a-z0-9\._]+,ord='\+rnd\+'\)[\/a-z0-9\._]+(805|796)\.wvx/i;

GM_addStyle(".GM-video { position: absolute; left: -9999px; top: -9999px; }");

// RTL video's zoeken
if (document.location.host == "www.rtl.nl") {
	for (var i = 0, a; a = document.links[i]; i++) {
		if (handleRtlPlayer(a)) continue;
	}
}
// Omroep video's zoeken
else {
	for (var i = 0, a; a = document.links[i]; i++) {
		if (handleOmroepVideo(a, "href", omroepAsf)) continue;
		if (handleOmroepVideo(a, "onclick", omroepAsf)) continue;
		if (handleOmroepPlayer(a, "href")) continue;
		if (handleOmroepPlayer(a, "onclick")) continue;
	}
}

// Attributen met omroepvideo-url's afhandelen
function handleOmroepVideo(a, attr, videoExp) {
	if (a.hasAttribute(attr) && a.getAttribute(attr).match(videoExp)) {
		a.setAttribute("href", videoExp.exec(a.getAttribute(attr))[0]);
		a.removeAttribute("onclick");
		a.removeAttribute("target");
		return true;
	}
	else return false;
}

// Attributen met een link naar de omroep-player afhandelen
function handleOmroepPlayer(a, attr) {
	if (a.hasAttribute(attr) && a.getAttribute(attr).match(omroepPlayer)) {
		a.setAttribute("href", omroepPlayer.exec(a.getAttribute(attr))[0]);
		a.setAttribute("onclick", "return false");
		a.removeAttribute("target");
		a.addEventListener("click", omroepClickHandler, false);
		return true;
	}
	else return false;
}

// Probeer via omroep-player-url de video-url te achterhalen
function omroepClickHandler(evt) {
	var videoXml = evt.currentTarget.href.toString();
	videoXml = videoXml.replace(/^[^\?]+/, "http://player.omroep.nl/xml/metaplayer.xml.php");
	videoXml += "&md5=TODO";
	loadOmroepPlayer(videoXml);
}
function loadOmroepPlayer(mplayerUrl) {
	GM_xmlhttpRequest({
			method : "GET",
			url : mplayerUrl,
			headers : { "User-Agent":"monkeyagent", "Accept":"text/monkey,text/xml",
		},

		onload : function(s) {
			if (s.responseText.match(omroepAsf)) {
				startVideo(omroepAsf.exec(s.responseText));
			}
			else self.location.href = mplayerUrl;
		}
	});
}

// RTL-player links afhandelen
function handleRtlPlayer(a) {
	if (a.hasAttribute("onclick") && a.getAttribute("onclick").match(/\/system\/video\//)) {
		var playerUrl = a.getAttribute("onclick").replace(/^[^']+'/, "").replace(/','video'.*$/, "");
		a.setAttribute("href", playerUrl);
		a.setAttribute("onclick", "return false");
		a.removeAttribute("target");
		a.addEventListener("click", rtlClickHandler, false);
		return true;
	}
	else return false;
}

// Probeer via omroep-player-url de video-url te achterhalen
function rtlClickHandler(evt) {
	loadRtlPlayer(evt.currentTarget.href.toString());
}
function loadRtlPlayer(mplayerUrl) {
	GM_xmlhttpRequest({
			method : "GET",
			url : mplayerUrl,
			headers : { "User-Agent":"monkeyagent", "Accept":"text/monkey,text/xml",
		},

		onload : function(s) {
			if (s.responseText.match(rtlAsf)) {
				var asfUrl = rtlAsf.exec(s.responseText)[0];
				asfUrl = asfUrl.replace(/'\+rnd\+'/, new Date().getTime());
				asfUrl = "http://www.rtl.nl/" + asfUrl.replace(/^[^\(]+/, "(");
				startVideo(asfUrl);
			}
			else self.location.href = mplayerUrl;
		}
	});
}

if (document.location.host == "www.rtl.nl") {
	unsafeWindow.startMovie = function(movie) {
		if(movie == null || (movie == unsafeWindow.initialItem && !unsafeWindow.openInFileBrowser)){ return;}

		var new_movie = movie.getAttribute("rel");
		var new_movie_prestate = movie.parentNode.parentNode.getAttribute("rel").replace("videomenu.xml", "");

		loadRtlPlayer("http://www.rtl.nl/(vm=" + new_movie_prestate + ")/system/video/html" + new_movie);
	}
}

// Start video zonder wit scherm achter te laten
function startVideo(url) {
	var iframe = document.createElement("iframe");
	iframe.src = url;
	iframe.className = "GM-video";
	document.body.appendChild(iframe);
}

// Lama popup overrulen
if (self.location.hostname.match(/^lama\.bnn\.nl|(www\.)?delamas\.nl$/)) {
	unsafeWindow.openEmbeddedPlayer = function(soort, url) {
		self.location.href = "http://cgi.omroep.nl/cgi-bin/streams?/tv/bnn/"+ url;
	}
}

// Deze week vink voor uitzendinggemist.nl
if (self.location.href.match(/uitzendinggemist\.nl\/index\.php\/selectie/)) {
	if (markOldProgramms()) buildThisWeekUI();
}

function buildThisWeekUI() {
	var sortDiv = document.evaluate("//table[@id='content_table']//td[3]/div/table//div", document, null, 0, null);
	if (sortDiv) {
		sortDiv = sortDiv.iterateNext();
		var label = document.createElement("label");
		label.id = "GM-deze-week";

		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = GM_getValue("thisWeekOnly", true);
		checkbox.addEventListener("click", passThisWeekClick, false);
		handleThisWeekClick(checkbox);

		label.appendChild(checkbox);
		label.appendChild(document.createTextNode("deze week"));
		GM_addStyle("#GM-deze-week { margin-left: 0px; cursor: pointer; white-space: nowrap; }");
		GM_addStyle("#GM-deze-week input { width: 12px; height: 12px; margin-right: 4px; }");
		sortDiv.appendChild(label);

		return true;
	}
	else return false;
}

function markOldProgramms() {
	var now = new Date();
	var progTable = document.getElementById("tooltip_selectie");
	if (progTable) {
		progTable = progTable.parentNode;
		var row, splittedDate, td, progDate;
		var weekMSec = 1000 * 60 * 60 * 24 * 7;
		for (var i = progTable.rows.length - 1; i > 0; i--) {
			row = progTable.rows[i];
			td = row.getElementsByTagName("td")[2];
			splittedDate = td.textContent.split("-");
			progDate = new Date(splittedDate[2], splittedDate[1] - 1, splittedDate[0]);
			if (now - progDate > weekMSec) row.className += " old";
		}
		return true;
	}
	else return false;
}

function passThisWeekClick(event) {
	handleThisWeekClick(event.currentTarget);
}

function handleThisWeekClick(checkbox) {
	GM_setValue("thisWeekOnly", checkbox.checked);
	if (checkbox.checked) GM_addStyle("tr.old { display: none; }");
	else GM_addStyle("tr.old { display: table-row; }");
}
