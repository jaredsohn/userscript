// ==UserScript==
// @name           rapidshare links open_in_new_tab
// @namespace      smk
// @description    converts all links to open in new tab
// @include        *
// ==/UserScript==

var sites=["rapidshare.com/files","megaupload.com/files"];
var match="";

sites.forEach(function(e){
		match+='contains(.,"'+e+'") or ';
	});
match=match.substr(0,match.length-3);
var links=document.evaluate('//a[@href['+match+']]',document,null,6,null);
for(var i=links.snapshotLength-1;i>=0;i--) links.snapshotItem(i).target="_blank";