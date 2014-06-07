// ==UserScript==
// @name           Popodeus DEAF - Diary Entry Annoyance Filter
// @namespace      http://popodeus.com
// @description    Be DEAF with this script. Mutes annoying diary entries.
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp*
// @include        http://www*.popmundo.com/Common/CharacterDiary.asp*
// @version        2
// ==/UserScript==

var MESSAGES_TO_HIDE = [
	'Was that a flash',
	'I managed to flee'
];

var version = 2;
var i, m;
if (location.href.indexOf('CharacterDetails.asp') >= 0) {
	var divs = document.evaluate(
			//'/html/body/table[3]/tbody/tr/td[1]/div[2]/table/tbody/tr/td[3]/table[1]/tbody/tr[2]/td[2]',
			'//div[@style]',
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; i<divs.snapshotLength; i++) {
		var div = divs.snapshotItem(i);
		if (div.style.paddingBottom == '5px') {
			for (m=0; m<MESSAGES_TO_HIDE.length; m++) {
				if (div.textContent.indexOf(MESSAGES_TO_HIDE[m]) >= 0) {
					//div.style.color = '#8EA8AF';
					div.parentNode.removeChild(div);
				}
			}
		}
	}
}

if (location.href.indexOf('CharacterDiary.asp') >= 0) {
	var rows = document.evaluate(
			'/html/body/table[3]/tbody/tr/td[1]/table/tbody/tr/td[2]',
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; i<rows.snapshotLength; i++) {
		var row = rows.snapshotItem(i);
		for (m=0; m<MESSAGES_TO_HIDE.length; m++) {
			if (row.textContent.indexOf(MESSAGES_TO_HIDE[m]) >= 0) {
				//row.style.color = '#BBB';
				row.parentNode.removeChild(row);
			}
		}
	}
}