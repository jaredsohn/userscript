// ==UserScript==
// @name           ek$i sözlük dogru ispiyon orani gosterme aparati
// @namespace      http://userscripts.org/users/62169
// @description    yapilan dogru ispiyon sayisini yüzde olarak gösterir.
// @include        http://sozluk.sourtimes.org/info.asp?*
// ==/UserScript==

infoDiv = document.getElementById('sb_ms');

if (infoDiv != null) {
	totalI = 0;
	faultyI = 0;
	
	infoRows = infoDiv.getElementsByTagName("tr");
	for (i = 0; i < infoRows.length; i++) {
		infoRow = infoRows[i];		
		if (infoRow.firstChild != null) {
			if (infoRow.firstChild.textContent == "yaptigi toplam ispiyon") {
				totalI = parseInt(infoRow.lastChild.textContent);
				totalRow = infoRow;
			}
			if (infoRow.firstChild.textContent == "yaptigi hatali ispiyon") {
				faultyI = parseInt(infoRow.lastChild.textContent);
			}
		}
	}
	
	if (totalI > 0) {
		ratioI = Math.round(1000 * (totalI - faultyI) / totalI) / 10;
		ratioRow = totalRow.cloneNode(true);
		ratioRow.firstChild.textContent = "dogru ispiyon orani";
		ratioRow.lastChild.textContent = '%' + ratioI;
		totalRow.parentNode.insertBefore(ratioRow, totalRow);
		// renkleri duzelt
		for (i = 0; i < infoRows.length; i++) {
			if (i % 2 == 0) {
				infoRows[i].className = 'highlight';
			}
			else {
				infoRows[i].className = '';
			}
		}
	}
}