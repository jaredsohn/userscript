// ==UserScript==
// @name           Futariwa PreCure Episode List
// @namespace      http://userscripts.org/users/132233
// @description    Creates episode list for bangumi.tv
// @include        http://www.toei-anim.co.jp/tv/precure/episode/list/
// ==/UserScript==

var episodeListRowPath = '//tr[position()=1]/td[@class="f12"]/font';

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
		
	var epi, epm, dtm, epn;
	var iHT = '<div>';
	for (var i = elRows.snapshotLength - 1; i >= 0; i--) {
		epi = elRows.snapshotItem(i);
		
		epm = intMatcher.exec(epi.firstChild.textContent);
		dtm = dateMatcher.exec(epi.lastChild.textContent);
		epn = epi.firstElementChild.textContent.trim();
		
		iHT += epm[1] + '|' + epn + '|||' + dtm[1] + '-' + dtm[2] + '-' + dtm[3] + '<br/>';
	}
	iHT += '</div>';
	
	var pagetop = document.getElementsByTagName('table')[0];
	var listdiv = document.createElement('div');
	listdiv.innerHTML = iHT;
	pagetop.parentNode.insertBefore(listdiv, pagetop);
}

extract();
