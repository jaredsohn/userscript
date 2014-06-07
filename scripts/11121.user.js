// ==UserScript==
// @name           Bitletr
// @namespace      iisonly (iisonly@gmail.com)
// @description    Open torrent files with bitlet.org
// @include        *
// ==/UserScript==

var linkscount = document.getElementsByTagName('a').length;
for(var i = 0; i < linkscount; i++){
	var url = document.getElementsByTagName('a')[i].href;
	var start = url.length-8;
	if(url.substr(start,8) == ".torrent" || url.substr(0,28) == "http://www.mininova.org/get/"){
		if(GM_getValue("confirm", true).toString()=="1") {
			document.getElementsByTagName('a')[i].href='javascript:if(confirm("Do you want to open it with bitlet.org?")){window.open("http://www.bitlet.org/download?torrent=' + encodeURIComponent(url) + '&referer=" + encodeURIComponent(location.href),\'\', \'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=140\'); }else{ location.href="'+ encodeURIComponent(url) +'";}void(0);';
		}else{
			document.getElementsByTagName('a')[i].href='javascript:window.open("http://www.bitlet.org/download?torrent=' + encodeURIComponent(url) + '&referer=" + encodeURIComponent(location.href),\'\', \'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=140\');void(0);';
		}

	}
}

function confirmtrue(){
	return GM_setValue("confirm", 1)
}

function confirmfalse(){
	return GM_setValue("confirm", 0)
}

function prompt_torrent(){
	var url = prompt("Insert torrent URL.", "");
	if(url!=null && url != ""){
		window.open("http://www.bitlet.org/download?torrent=" + encodeURIComponent(url) + "&referer=" + encodeURIComponent(location.href),'', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=140');
	}
	return null;
	}
GM_registerMenuCommand("Bitletr : confirm ON", confirmtrue);
GM_registerMenuCommand("Bitletr : confirm OFF", confirmfalse);
GM_registerMenuCommand("Bitletr : Insert URL", prompt_torrent);

