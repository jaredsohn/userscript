// ==UserScript==
// @name           Google Video Download Linker
// @namespace      http://www.digivill.net/~joykillr
// @description    A video download linker.  Provides a download link on any google video page.  Javascript not needed, no 3rd-party sites used.
// @include        http://video.google.com/*
// @include        http://video.google.co.uk/*
// @include        http://video.google.ca/*
// @include        http://video.google.de/*
// @include        http://video.google.tld/*
// ==/UserScript==

//v0.9b - update
//v0.9 - bugfix
//v0.8 - google changed stuff
//v0.7 - google changed stuff
//v0.6 - better handing of capitalized I in docId
//v0.5 - updated to work for not just video.google.com

var z, j = window.content.location.href.toString(), k = window.content.location.host.toString();

function getDat(x) {
	GM_xmlhttpRequest({
		method:"GET",
		url:x,
		headers:{
			"User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5",
			"Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
		},
		onload:function(details) {
			var URLstring = new String(details.responseText);
			if (URLstring) {
				var l = isolate(URLstring);
				addDLLink(l);
				}
			
			}
		});
	}

function isolate(u){
	if (u.indexOf("insertFlashHtmlOnLoad")!=-1) {
		u = u.split("function\ insertFlashHtmlOnLoad\(\)")[1].split("\}")[0];
		if (u.indexOf("&videoUrl")!=-1) {
			u = u.split("\&videoUrl")[1].split("http")[1].split("http")[0];
		} else if (u.indexOf("videoUrl\\")!=-1) {
			u = u.split("videoUrl\\")[1].split("http")[1].split("http")[0];
		}
		if (u.indexOf("thumbnailUrl")!=-1) {
			var spt = u.indexOf("thumbnailUrl")-3;
			u = u.substring(0,spt);
		}
		return unescape("http"+u);
	} else if (u.indexOf("download_url\:")!=-1) {
		u = u.split("download_url:")[1];//.split("\}")[0];
		var u2 = u.charAt(0);
		u = u.split(u2)[1].split(u2)[0];
		u = u.replace(/\\x3d/gmi,"=").replace(/\\x26/gmi,"&");
		//return unescape(u);
		return u;
	} else if (u.indexOf("preview_url\:")!=-1) {
	u = u.split("preview_url:")[1];
	u = u.split("googleplayer.swf?videoUrl")[1];
	u = u.replace(/\\x3d/gmi,"=").replace(/\\x26/gmi,"&");
	var u2 = u.charAt(0);
	if (u2!="h") {
		u = u.split(u2)[1].split(u2)[0];
	}
	return unescape(u);
	}
}

function parseL(j) {
	if (j.search("docid")!=-1) {z=j.split("docid=")[1].split("&")[0];}
	else if (j.search("docId")!=-1) {z=j.split("docId=")[1].split("&")[0];}
	return z;
}

function addDLLink(l) {
	var nn = document.createElement("div");
	nn.setAttribute("id","dlink");
	nn.innerHTML = '\<a\ href\=\"'+l+'\"\ style=\"z-index:1000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	nn.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(nn,document.body.firstChild);
}
			
function run1(j,k) {
	z = parseL(j);
	if (z) {
		getDat("http\:\/\/"+k+"\/videohosted\?docid\="+z);
	}
}

if ((j.search("docid")!=-1)||(j.search("docId")!=-1)) {
	run1(j,k);
}
