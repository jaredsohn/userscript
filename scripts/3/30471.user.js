// ==UserScript==
// @name           Virtual Manager Stat-sum
// @namespace      http://www.mathemaniac.org
// @description    Giver summen af stats'ne for hver spiller.
// @include        http://www.virtualmanager.com/player/index.php*
// ==/UserScript==

(function(){
	var totalSum = GM_getValue('totalSum',1);
	GM_registerMenuCommand('Vis sum af alle stats ['+(totalSum > 0 ? 'x' : ' ')+']', function() { 
		GM_setValue('totalSum',GM_getValue('totalSum',1) ? 0 : 1); 
		window.location.reload();
	});
	var delSum = GM_getValue('delSum',1);
	GM_registerMenuCommand('Vis delsum af hver stat-gruppe ['+(delSum > 0 ? 'x' : ' ')+']', function() {
		GM_setValue('delSum',GM_getValue('delSum',1) ? 0 : 1); 
		window.location.reload();
	});
	
	if (totalSum || delSum) {
		var delSummer = Array(0,0,0);
		var i=0;
		var it = document.evaluate('//div[@class="box" and descendant::h2[text()="Egenskaber"]]//td[contains(@class,"right")]//span/text()', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		var stat;
		while (stat = it.iterateNext()) {
			delSummer[i++ % 3]+=parseInt(stat.nodeValue);
		}
		if (delSum) {
			var statTable = document.evaluate('//div[@class="box" and descendant::h2[text()="Egenskaber"]]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			var delSumTR = document.createElement('tr');
			for(var j=0; j<3; j++) {
				var delSumTDTitel = document.createElement('td');
				delSumTDTitel.setAttribute('style','font-weight: bold; background-color: #20882D; color: #FFF');
				delSumTDTitel.appendChild(document.createTextNode('Sum'));
				delSumTR.appendChild(delSumTDTitel);
				var delSumTDValue = document.createElement('td');
				delSumTDValue.setAttribute('style','font-weight: bold; background-color: #20882D; color: #FFF;');
				delSumTDValue.className = 'right';
				delSumTDValue.appendChild(document.createTextNode(delSummer[j]));
				delSumTR.appendChild(delSumTDValue);
			}
			statTable.appendChild(delSumTR);
		}
		if (totalSum) {
			var overskrift = document.evaluate('//h2[text()="Egenskaber"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
			overskrift.appendChild(document.createTextNode(" [Sum: "+(delSummer[0]+delSummer[1]+delSummer[2])+"]"));
		}
	}
	
})();