// ==UserScript==
// @name           TBS News i continuous playback auto selector
// @namespace      http://d.hatena.ne.jp/saitamanodoruji/
// @description    randomly select 30 news titles on the page of TBS News i continuous playback
// @include        http://news.tbs.co.jp/3snewsi/*
// @author         saitamanodoruji
// @version        0.0.2.20110602
// ==/UserScript==

(function() {
	var cols = document.getElementById('CTGRLIST').childNodes;
	var newsIDs = [];
	var i, j;
	for ( i = 0; i < cols.length; i++ ) {
		if ( cols[i].className == 'left' || cols[i].className == 'right' ) {
			for ( j = 0; j < cols[i].childNodes.length; j++ ) {
				if ( cols[i].childNodes[j].nodeName == 'H3' ) {
					newsIDs.push(cols[i].childNodes[j].firstChild.getAttribute('id'));
				}
			}
		}
	}

	if ( newsIDs.length < 30 ) {
		newsIDs.forEach(function(id){
			document.location.href = 'javascript:togglePlay(\'' + id + '\')';
		});
	} else {
		for ( i = 0; i < 30; i++ ) {
			j = Math.floor(newsIDs.length * Math.random());
			document.location.href = 'javascript:togglePlay(\'' + newsIDs[j] + '\')';
			newsIDs.splice(j, 1);
		}
	}
})();

