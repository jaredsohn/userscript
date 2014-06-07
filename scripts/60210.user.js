// ==UserScript==
// @name           emule
// @namespace      emule
// @description   
// @include        *verycd.com/*
// @include        *.ppcn.net/*
// @include        *ied2k.com/*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     0.3.1
// ==/UserScript==
//alert(location);
//<a ed2k="ed2k://|file|%5B%E9%9B%A8%E8%A1%80%5Dv1.06.rar|129190789|a50cddb65e821c7e3e2e71c1a5bd98ab|h=TABCQ56MJAGJD555VAMSOXOPZ5QAOBT6|/" href="ed2k://|file|%5B%E9%9B%A8%E8%A1%80%5Dv1.06.rar|129190789|a50cddb65e821c7e3e2e71c1a5bd98ab|h=TABCQ56MJAGJD555VAMSOXOPZ5QAOBT6|/">[雨血]v1.06.rar</a>

var allLinks;
function go(){
	allLinks = document.evaluate(
		'//a[starts-with(@href, "ed2k")]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		//'//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var thisLink = allLinks.snapshotItem(i);
		//GM_log(thisLink.href);
		var hash = thisLink.href.match(/\|(\d+)\|(\w{32})\|/);
		//GM_log(hash);
		if(hash){
			//http://www.power-portal.to/ed2kstats/ed2k?hash=A50CDDB65E821C7E3E2E71C1A5BD98AB
			//http://stat.verycd.com/counters/files/3cb037ccaf458a381b5509cc6a342f27735385600
			//http://stat.verycd.com/counters/files/87ce159bc0d9a8ad88293e25c111d4f9732702720
			//http://ed2k.shortypower.dyndns.org/?hash=55fd5417080b6efedea3d143cfbebd8b
			href = 'http://stat.verycd.com/counters/files/' + hash[2]+ hash[1];
			//href = 'http://ed2k.shortypower.dyndns.org/?hash=' + hash[2];
			//GM_log(href);
			GM_xmlhttpRequest({method: 'GET',url: href,onload: onreport});
		}
		//break;
	}
	
}
function onreport(responseDetails){
	//GM_log(responseDetails.responseText);
	
	//var ht = responseDetails.responseText.match(/<th>(\d+)<\/th>/g);
	
	
	//verycd
	//{"total_finished":"5851","total_start":"8946","week_finished":"510","week_start":"2925"};
	var finished = responseDetails.responseText.match(/"total_finished":"(\d+)"/);
	var start = responseDetails.responseText.match(/"total_start":"(\d+)"/);
	//VeryCD.Files.Count._3cb037ccaf458a381b5509cc6a342f27735385600
	var hash = responseDetails.responseText.match(/VeryCD.Files.Count._(\w{32})/);
	
	
	//<title>ed2k stats - 63CE09D74458A72DFC93845D1E5EB887</title>
	//ed2k::55FD5417080B6EFEDEA3D143CFBEBD8B
	//var hash = responseDetails.responseText.match(/ed2k::(\w{32})/);
	//GM_log(starts);
	//GM_log(hash);
	if(hash){
		if(finished && start){
			keyong = start[1] - finished[1];
			if(keyong<0)
				keyong=0
			finished = finished[1];
		}else{
			keyong = '0';
			finished = '0';
		}
		//GM_log(ht);
		hash = hash[1];
		for (var i = 0; i < allLinks.snapshotLength; i++) {
			var thisLink = allLinks.snapshotItem(i);
			//GM_log(hash);
			//GM_log(thisLink.href);
			if(thisLink.href.match(new RegExp(hash,"i"))){
				//GM_log('ok');
				newElement = document.createElement('a');
				//var downloading = starts - finished;
				newElement.innerHTML = '<strong>['+keyong+':'+finished+']</strong>';
				newElement.title = '下载源数:'+keyong+'  完成来源:'+finished+'';
				newElement.href = 'http://share.sourceforge.net/emulelink.php?hash=' + hash;
				newElement.target = "_blank";
				//GM_log(newElement.innerHTML);
				thisLink.parentNode.insertBefore(newElement, thisLink.nextSibling);
				break;
			}
		}
	}
}
go();