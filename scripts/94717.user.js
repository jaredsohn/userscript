// ==UserScript==
// @name           DansTonChat Note
// @namespace      Azenet
// @description    Remet la note des quotes sur danstonchat.com.
// @include        http://danstonchat.com/*
// ==/UserScript==

if(document.getElementsByClassName('voteplus')[0]) {
	var quoteInfos = document.getElementsByClassName('item-infos');
	for(var i=0;i<quoteInfos.length;i++) {
		var quoteId = quoteInfos[i].innerHTML;
		quoteId = quoteId.split('/');
		quoteId = quoteId[1];
		quoteId = quoteId.split('.ht');
		quoteId = quoteId[0];
		var plusValue = quoteInfos[i].getElementsByClassName('voteplus')[0].innerHTML;
		plusValue = plusValue.split(' ')[1];
		plusValue = parseInt(plusValue);
		var moinsValue = quoteInfos[i].getElementsByClassName('voteminus')[0].innerHTML;
		moinsValue = moinsValue.split(' ')[1];
		moinsValue = parseInt(moinsValue);
		var totalVotes = plusValue+moinsValue;
		var voteAll = plusValue-moinsValue;
		var note = plusValue/totalVotes*20;
		var note = Math.round(note);
		var note = note - 10;
		if (note >= 9) {
			note = "<span style='color:#5b5cc8'>"+note+"</span>";
		}
		else if (note < 0) {
			note = "<span style='color:#cc7273'>"+note+"</span>";
		}
		else {
			note = "<span style='color:#000'>"+note+"</span>";
		}
		var noteElement = '<a title="Lien permanent" href="/'+quoteId+'.html">#'+quoteId+'</a>  - Votez : <a class="voteplus" title="Voter pour (+)" href="/voteplus/'+quoteId+'">(+)</a> '+voteAll+'<span style="color:#999">/'+totalVotes+'/</span>'+note+'  <a class="voteminus" title="Voter contre (-)" href="/voteminus/'+quoteId+'">(-)</a>  <span class="item-notice"></span>';
		quoteInfos[i].innerHTML = noteElement		
		
	}
}