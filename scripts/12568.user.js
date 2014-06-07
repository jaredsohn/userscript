// ==UserScript==
// @name           4ChanArchive/ThreadCloud - 
// @namespace      Manix
// @include        http://4chanarchive.org/brchive/threadcloud.php
// ==/UserScript==


GM_addStyle("A{white-space:nowrap}");
GM_addStyle("A:hover{color:#C33}");
GM_addStyle("A:visited{color:#AAA}");
GM_addStyle("A:visited:hover{color:#C88}");
GM_addStyle("B.on {color:#2A2;cursor:default}");
GM_addStyle("B.off{color:#666;cursor:pointer}");

var D = document, sortPanel = D.createElement('DIV'), sortId = 0;
sortPanel.style.cssText = "text-align:right;color:#888;cursor:default";
sortPanel.innerHTML = 'Sort by : <B id=sort0 class=on onclick="sortItems(0)">date</B> | '+
				'<B id=sort1 class=off onclick="sortItems(1)">name</B> | <B id=sort2 class=off onclick="sortItems(2)">size</B>';
D.body.insertBefore(sortPanel, D.body.childNodes[0]);
var initHTML = D.body.innerHTML;


unsafeWindow.sortItems = function(s) {
	if (s == sortId) return;
	
	// Update interface
	sortId = s;
	for (i=0; i<3; i++) D.getElementById('sort'+i).className = (i == s ? "on" : "off");
	
	// Sort
	if (s == 0) {
		D.body.innerHTML = initHTML;
	} else {
		var n = sortPanel, B = document.body, H = B.parentNode; items = [];
		H.removeChild(B);
		while (n) {
			var t = n, m = t.nodeName;
			n = n.nextSibling;
			if (m == "SPAN") items.push(t);
			if (m == "SPAN" || m == "#text" || m == "A" || m == "SCRIPT") t.parentNode.removeChild(t);
		}
		H.appendChild(B);
		if (s == 1) items.sort( function(a,b) { var x = a.textContent, y = b.textContent; return (x > y? 1 : (x < y? -1 : 0)); } );
		else        items.sort( function(a,b) { return parseInt(b.firstChild.style.fontSize) - parseInt(a.firstChild.style.fontSize); } );
		for (i=0; i<items.length; i++) {
			var t = items[i];
			t.insertBefore(D.createTextNode(","), t.firstChild);
			D.body.appendChild(t);
		}
	}
}

