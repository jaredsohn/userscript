// ==UserScript==
// @name           verycd_ed2k_finder
// @namespace      www.raphael-go.com
// @include        http://www.verycd.com/files/*
// ==/UserScript==

function find_ed2k_link()
{
	var i, a, links=[];
	i = document.getElementsByTagName("INPUT");
	a = document.getElementsByTagName("A");
	
	for (n=0; n<i.length; n++) {
		if (i[n].name.indexOf("ed2k")==0)
			links.push(i[n].name);
	}
	for (n=0; n<a.length; n++) {
		if (a[n].href.indexOf("ed2k")==0)
			links.push(a[n].href);		
	}
	
	if (links.length) {
		var t = document.createElement("textarea");
		t.style.position = "absolute";
		t.style.left = t.style.top = "10px";
		t.style.width = "500px";
		t.style.height = "300px";
		t.appendChild(document.createTextNode(links.join("\r\n\r\n")));
		document.body.appendChild(t);
	}
}

find_ed2k_link();