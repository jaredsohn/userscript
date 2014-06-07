// ==UserScript==
// @name           jubegraph
// @namespace      s
// @include        https://www.ea-pass.konami.net/contents/jubeat/knit/play_top.do*
// @match          https://www.ea-pass.konami.net/contents/jubeat/knit/play_top.do*
// ==/UserScript==

var param = location.search;
var fid;
if(param){
	var parray = param.replace('?','').split('&');
	for(var i = 0; i < parray.length ; i++){
		var n = parray[i].split('=');
		if(n[0] == "fid"){	fid = n[1];	}
	}
}

var tags = document.getElementsByTagName("td");
for(var i = 0 ; i < tags.length ; i++)
{
	if(tags[i].innerHTML == fid){
		tags[i].innerHTML = '<a href="http://jubegraph.dyndns.org/jubeat_knit/user/' + fid + '">' + fid + '</a>';
	}
}