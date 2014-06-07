// ==UserScript==
// @name           Fresh PreCure Episode List
// @namespace      http://userscripts.org/users/132233
// @description    Creates episode list for bangumi.tv
// @include        http://www.toei-anim.co.jp/tv/fresh_precure/episode/list/
// ==/UserScript==

var episodeListRowPath = '//table/tbody/tr/td[@class="title-a-l"]/parent::tr';

var intMatcher  = /(\d+)/;
var dateMatcher = /(\d{4})\/(\d{2})\/(\d{2})/;

function extract()
{
	var elRows = document.evaluate(
	  episodeListRowPath,
	  document,
	  null,
	  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	  null);
		
	var row, col1, epm, dm;
	var iHT = '<div>';
	for (var i = elRows.snapshotLength - 1; i >= 0; i--) {
		row = elRows.snapshotItem(i);
		col1 = row.firstElementChild;
		
		epm = intMatcher.exec(col1.firstChild.textContent);
		dm = dateMatcher.exec(row.lastElementChild.textContent);

		iHT += epm[1] + '|' + col1.firstElementChild.textContent + '|||'
		  + dm[1] + '-' + dm[2] + '-' + dm[3] + '<br/>';
	}
	iHT += '</div>';
	
	var pagetop = document.getElementById('container');
	var listdiv = document.createElement('div');
	listdiv.innerHTML = iHT;
	pagetop.parentNode.insertBefore(listdiv, pagetop);
}

extract();