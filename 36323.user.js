// ==UserScript==
// @name           highlightLinks
// @namespace      jackysee_highlightLinks
// @description    Detect and highlight a group of links and show an group boxes
// @include        *
// ==/UserScript==

var siteList = GM_getValue("sites_to_watch");
if(typeof siteList == 'undefined'){
	siteList = setSites();
}
var sites = siteList.split(",");
var url = window.location.href;
var links = [];
for(var i=0; i<sites.length; i++){
	if(url.indexOf(sites[i])!=0){
		var xpath = "//a[starts-with(@href,'"+sites[i]+"')]";
        var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var j=0; j<res.snapshotLength; j++){
			var l = res.snapshotItem(j);
			if(l.href && l.href.indexOf(sites[i]) == 0){
				links.push(l);
				l.style.backgroundColor = "yellow";
				l.style.color = "red";
				l.style.fontWeight = "bold";
				l.name = "HIGHLIGHT_LINKS" + (links.length-1);
			}
		}
	}
}

if(document.body && links.length>0){
	document.body.innerHTML += '<div id="highlight_links_all" style="text-align:left;font-size:10px;padding-right:10px;">Links: </div>'
	var div = document.getElementById("highlight_links_all");
	div.style.backgroundColor = "yellow";
	div.style.maxWidth = "400px";
	div.style.width = "100px";
	div.style.padding = "3px";
	div.style.border = "1px solid black";
	div.style.position = "fixed";
	div.style.top = "30px";
	div.style.right = "0";
	div.style.zIndex = "99999";
	div.style.opacity = ".5";
	for(var i=0; i<links.length; i++){
		div.innerHTML += '<a href="#HIGHLIGHT_LINKS'+i+'">'+i+'</a>  ';
	}
	div.innerHTML += '<a href="#" style="display:block;position:absolute; top:0; right:0;padding:2px;text-decoration:none" onclick="document.getElementById(\'highlight_links_all\').style.display = \'none\';return false;">X</a>';
};

function setSites(){
	var str = prompt("Input sites url prefix you want to watch in the comma delimited list\r\n e.g. http://jacky.seezone.net,http://evazone.seezone.net") || "";
	GM_setValue("sites_to_watch", str);
	return str;
}