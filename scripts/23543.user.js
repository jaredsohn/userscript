// ==UserScript==
// @name          sape
// @namespace     sape
// @description   sape
// @include       http://www.sape.ru/site_links.php?site_id=128819
// ==/UserScript==

var table = document.getElementsByTagName("table");
for (var i = 0; i < table.length; i++) {
	tmp_table = table[i];
	if (tmp_table.className == 'data') {	
		for (var i2 = 2; i2 < tmp_table.length; i2++) {
			alert (tmp_table.childNodes[i2].innerHTML);
		}
	}
}

// ==/UserScript==