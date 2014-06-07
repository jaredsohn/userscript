// ==UserScript==
// @name           PDF/PPT Preview
// @include        http://*
// @description    Adds a dialog when clicking links to pdf or ppt to preview them in Google Docs
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (i=0; i<links.length; i++)
	if(re=links[i].href.match(/.*(\.pdf$)|(\.ppt$)/i))
	  links[i].setAttribute("onclick","if(!confirm('Do you want to preview it on Google Docs?\\nAccept: preview it\\nCancel: continue with download'))return true;window.open('http://docs.google.com/gview?embedded=true&url='+this.href,'gp','height=500,width=450');return false;");