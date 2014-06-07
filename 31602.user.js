// ==UserScript==
// @name           serials.ws ==> crap/ad/spam killer
// @namespace      #
// @description    Shows only the real search results and rewrites the link to open new box, turning this site into something nice.
// @version        0.2.7
// @include        http://*serials.ws/*
// ==/UserScript==
function single(A) {return document.evaluate("." + A, document.body, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove;}
function first(A) {return document.getElementsByTagName(A)[0];}
function loop(A, B) {
	A = document.evaluate("." + A, document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
if(location.pathname.indexOf("d.php")==1) {
	var t = first("textarea");
	t.style.width = "100%";
	t.value = t.value.replace(/\s*(?:your|registration)\s*/gi, "\n").replace(/\n{2,}/g, "\n");
	if(t.value.match(/(?:(?:nam|nombr)e)(?: is)?\s*:\s*(.+)\s*(?:s\/n|serial|code)(?: is)?\s*:\s*(.+)/i)) {
		function makeIn(t) {var z=document.createElement("input");z.value=t;z.setAttribute("style", "width:100%;");z.addEventListener("click", selector, false);return z;}
		var d = document.createElement("table");
		var r1 = d.insertRow(0), r2 = d.insertRow(-1);
		var c1 = r1.insertCell(-1), c2 = r1.insertCell(0), c3 = r2.insertCell(-1), c4 = r2.insertCell(0);
		c2.textContent = "Name:";
		c1.appendChild(makeIn(RegExp.$1));
		c4.textContent = "Serial:";
		c3.appendChild(makeIn(RegExp.$2));
		d.setAttribute("style", "background: white;color:black;font-weight:bold;width:100%;");
		document.body.appendChild(d);
	}
	for(var last = first("form"), crap = last.nextSibling, temp; crap; crap = temp) {
		temp = crap.nextSibling;
		remove(crap);
	}
} else {
	first("img").style.display = "block";
	first("table").style.width = "100%";
	remove(single("//b[text()='Last 20 referers:']/.."))(single("//b[text()='speed']/../../../.."))(single("//b[.='Last queries:']/../.."));
	loop("//a[starts-with(@href,'javascript')]", function() {
		if(!this.href.match(/(\d+)/)) return;
		this.href = "/d.php?n=" + RegExp.$1;
		this.target = "_blank";
	});
	loop("//hr", function() {
		remove(this);
	});
	for(var last = single("//b[.='Cracks']"), crap = last, temp; crap; crap = temp) {
		temp = crap.nextSibling;
		remove(crap);
	}
}