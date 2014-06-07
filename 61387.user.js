// ==UserScript==
// @name           Feedback Item Counter
// @namespace      ebay
// @description    Counts distinct items on eBay feedback pages
// @include        http://feedback.ebay.co.uk*
// ==/UserScript==

var d = document.getElementsByClassName("bot");
var dm = [];
for(var i = 0; i < d.length; i++)
	dm.push(d[i].children[1].innerHTML.split(" (#")[0].toUpperCase());
var dc = [];
for (var i = 0; i < d.length; i++)
{
	if(isNaN(dc[dm[i]]))
		dc[dm[i]] = 0;
	dc[dm[i]]++;
}
var det = document.createElement("div");
det.style.position = "absolute";
det.style.top = "0px";
det.style.left = "0px";
det.style.background = "#dddddd";
det.style.width = "98%";
det.style.fontSize = "9px"
var dco = [];
for(var i = 1; i < 200; i++)
{
	for(var x in dc)
		if(dc[x] == i)
			dco[x] = i;
}
for(var x in dco)
{
	det.appendChild(document.createElement("span"));
	det.children[det.children.length - 1].innerHTML = x + " <strong>" + dco[x].toString() + "</strong>&nbsp;&nbsp;<br/>";
}
document.body.appendChild(det);
unsafeWindow.cntDetails_dbg = det;
var mainpage = document.getElementsByClassName("pagewidth")[0];
mainpage.style.position = "absolute";
mainpage.style.top = det.offsetHeight.toString() + "px";