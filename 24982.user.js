// ==UserScript==
// @name           GBSFM Skipper
// @namespace      http://gbsfm.info
// @description    Skips dongs on GBS-FM
// @include        http://gbsfm.info/*
// ==/UserScript==

version="0.1"

html = "<a href=\"#\" onclick=\"listenswf(); setTimeout('listenswf()', dlen() - dpos()); return false;\" title=\"Skip this dong\">Skip This |>></a>";

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function ms_to_s(ms) { //convert minutes:seconds form to just seconds
len_split = new Array();
len_split = ms.split(":"); 
return (parseInt(len_split[0])*60 + parseInt(len_split[1]))*1000 ;
}

function dlen() { //get dong length
return ms_to_s(document.getElementById('playing-length').innerHTML); 
}

function dpos() { //get dong position
return ms_to_s((document.getElementById('playing-position').innerHTML)); 
}


	
rightstuff = document.getElementById('rightstuff');
rightstuff.innerHTML = html + rightstuff.innerHTML;
embedFunction(ms_to_s);
embedFunction(dlen);
embedFunction(dpos);
