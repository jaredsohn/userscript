// ==UserScript==
// @name           WinWhatAuto Link Creator
// @namespace      What.CD
// @author         blubbablubb / modified by mlapaglia
// @description    Automatically Generates WinWhatAuto Download Links
// @include        http*://*what.cd/*
// @include        http*://*broadcasthe.net/*
// @version        0.0.37
// @date           2013-04-30
// ==/UserScript==

// EDIT THE FOLLOWING LINE WITH YOUR HOST (OR IP) + PORT WHICH YOU HAVE SET UP IN THE APPLICATION
var weblink = "http://mlapaglia.com:799/?Password=PutYourPasswordHere";

if (/https?.*?what\.cd.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+)(?:&[^&]*)?(?:&[^&]*)?$/i;
	var devider = ' | ';
	var site = "WCD";
} else if (/https?.*?broadcasthe\.net.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?authkey=.*?torrent_pass=[^=]*$/i;
	var devider = ' | ';
	var site = "BTN";
}else {
	alert("You have found a bug. Go and tell blubba!");
}

alltorrents = new Array();
for (var i=0; i < document.links.length; i++) {
		alltorrents.push(document.links[i]);
}

var name = "";
for (var i=0; i < alltorrents.length; i++) {
	if (linkregex.exec(alltorrents[i])) {
		id = RegExp.$1;
		createlink(alltorrents[i],id,name);
	}
}

function createlink(linkelement,id,name) {
	var link = document.createElement("WWA");
	link.appendChild(document.createElement("a"));
	link.firstChild.appendChild(document.createTextNode("WWA"));
	link.appendChild(document.createTextNode(devider));
	if (name) {
		link.firstChild.href=weblink+"&Command=Download&name="+name+"&site="+site+"&id="+id;
	} else {
		link.firstChild.href=weblink+"&Command=Download&Site="+site+"&TorrentID="+id;
	}
	link.firstChild.target="_blank";
	link.firstChild.title="Direct Download to WinWhatAuto";
	linkelement.parentNode.insertBefore(link, linkelement);
}