// ==UserScript==
// @name           Beoue.com - Arrange List By Count 1.1
// @namespace      Manix
// @include        http://www.beoue.com/
// ==/UserScript==

var D = document, allTD = D.getElementsByTagName('TD'), p, t, n = [];
for (var i=0; i<allTD.length; i++) if (allTD[i].parentNode.parentNode.parentNode.align == "center") { p = allTD[i]; t = p.childNodes; break }
for (var i=0; i<t.length; i++) {
	var c = t[i];
	if (c.nodeName == "FONT") n.push(c);
	p.removeChild(c);
}
p.style.cursor = "default";
n.sort( function (a, b) {return b.size-a.size} );
for (var i=0; i<n.length; i++) {
	var h = n[i].textContent, d = n[i].size;
	h = n[i].textContent = h.substr(0, h.indexOf("(")-1);
	if (d > 262) n[i].style.fontWeight = "bold"; // 262 = 255+7
	if (d > 7) {
		var t = Math.round(Math.pow((262-d)/255,3)*255);
		n[i].style.color = "rgb(255,"+t+","+t+")";
	}
		var a = D.createElement('A');
		a.href = h;
		a.appendChild(n[i]);
			var s = D.createElement('SUP');
			s.appendChild(D.createTextNode(" "+d));
		a.appendChild(s);
	p.appendChild(a);
	p.appendChild(D.createTextNode(" | "));
}
GM_addStyle("A {text-decoration:none}");
GM_addStyle("SUP {color:#FF8}");

