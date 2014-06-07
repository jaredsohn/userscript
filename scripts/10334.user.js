// ==UserScript==
// @name         dailymotion.com video download link
// @namespace     http://www.digivill.net/~joykillr
// @description   Adds a download link to dailymotion.com so videos can be downloaded.  Works with and without javascript.
// @version        3.2
// @grant		   GM_xmlhttpRequest
// @include        http://*.dailymotion.com/*
// @include        http://dailymotion.com/*
// @include        https://*.dailymotion.com/*
// @include        https://dailymotion.com/*
// ==/UserScript==
//
//v 3.2

var detdsc, ldurl, sdurl, hdurl, autourl, videourl, videoid, scripts = document.getElementsByTagName("scripts");

function getDocument(url) {
    GM_xmlhttpRequest({
        method:"GET",
        url:url,
        headers:{
            "User-Agent":"Mozilla/5.0 (Windows NT 6.2; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
            "Accept":"application/xml,text/xml"
        },
        onload:function(details) {
			getURLs(JSON.parse(details.responseText));
        }
    });
}


function addLinks(x) {
	for (y=0; y<x.length; y++) {
		if (x[y]!=null&&x[y]!="") {
			strR = unescape(x[y]);
			var newlink = "", detdsc = "", detcdc = "";
			var newlink = document.createElement("a");
			try {detdsc = strR.match(/\d{1,4}x\d{1,4}/gi);} catch(err) {}
			if (strR.match(/\.flv/gi)) {detcdc = "FLV"} else if (strR.match(/\.on2/gi)) {detcdc = "ON2"}
			else if (strR.match(/\.mp4/gi)) {detcdc = "MP4"} else {detcdc = ""}
			newlink.setAttribute("href", strR);
			newlink.setAttribute("class", "icn_left  popup_ie_width width_500 button_green button action:popup button_small");
			newlink.textContent = "DL: " + detdsc + " " + detcdc;
			document.getElementById("video_title").parentNode.insertBefore(newlink, document.getElementById("video_title"));
		}
	}
}

function getURLs(data) {
	data = eval(data);
	var seq = data.sequence[0].layerList[0].sequenceList;
	for (var b=0; b< seq.length; b++) {
		if (seq[b].name.match(/main/i)) {
			var seq2 = seq[b].layerList;
			for (var c=0; c< seq2.length; c++) {
				//if (seq2[c].name.match(/video/i)) {
				if (seq2[c].name.match(/auditudeLoader/i)) {
					var seq3 = seq2[c];
					if (seq3.param.ldURL) {ldurl = seq3.param.ldURL;} else {ldurl = "";}
					if (seq3.param.sdURL) {sdurl = seq3.param.sdURL;} else {sdurl = "";}
					if (seq3.param.hdURL) {hdurl = seq3.param.hdURL;} else {hdurl = "";}
					//if (seq3.param.autoURL) {autourl = seq3.param.autoURL;} else {autourl = "";}
					if (seq3.param.externalTargetingParams.video_url) {videourl = seq3.param.externalTargetingParams.video_url;} else {videourl = "";}
					var links = [videourl, autourl,ldurl,sdurl,hdurl]
					addLinks(links);
					break;
				}
			}
		break;
		}
	}
}

for (var a=0; a<scripts.length; a++) {
	if (scripts[a].indexOf("DM_CurrentVideoXID")!=-1) {
		videoid = scripts[a].split("DM_CurrentVideoXID='")[1].split("'")[0];
		break;
	}
}

if (videoid==null||videoid=="") {
	videoid = document.location.href.split("/video/")[1].split("_")[0];
}

if (videoid!=null||videoid!="") {
	getDocument("http://www.dailymotion.com/sequence/full/"+videoid);
}
