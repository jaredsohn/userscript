// ==UserScript==
// @name           Download Multiply Music
// @namespace      multiply.com
// @include        *multiply.com/music/item/*
// ==/UserScript==

try {
	if (typeof GM_xmlhttpRequest != 'function') {
		// do nothing
	}
	else {
		var playLink;
		var table, tableRows;
		var linkarr = document.getElementsByTagName('a');
		var tables = document.getElementsByTagName('table');
		for(i=0;i<linkarr.length;i++) {
			if(linkarr[i].innerHTML == "Play this playlist") {
				playLink = linkarr[i].href;
			}
		}
		for(i=0;i<tables.length;i++) {
			if(tables[i].className == "musictable") {
				table = tables[i];
			}
		}
		tableRows = table.getElementsByTagName('tr');
		GM_xmlhttpRequest({
			method:'GET',
			url:playLink,
			onload:function(responseDetails){
				linkarr2 = responseDetails.responseText.split("\n");
				for(i=0;i<linkarr2.length;i++) {
					currentHTML = tableRows[i].childNodes[0].innerHTML;
					newHTML = "<a href=" + linkarr2[i] + ">" + currentHTML + "</a>";
					tableRows[i].childNodes[0].innerHTML = newHTML;
					//alert(linkarr2[i]);
				}
			}
		});
	}
}
catch(e) {
	alert("script is messed up");
}
