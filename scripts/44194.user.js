// ==UserScript==
// @name Guerra de Pandillas - Ratio Territorio
// @description get ratio of price and gains
// @description with getting the ratio of the price of territory and the gains you get from having it, you can
// @description evaluate what territory you should invest on to maximize your hourly gains. Less the ratio, best investment.
// @author        	usersXcript
// @version             v1.00
// @include http://apps.new.facebook.com/guerra-de-pandillas/property.php
// @include http://apps.facebook.com/guerra-de-pandillas/property.php
// ==/UserScript==

function formatNumber(num){
	return num.toFixed(0).toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1,').split('').reverse().join('').replace(/^[\,]/,'');
}

//Thanks to biete.com
function getRatio(){
	var allDivs, thisDiv, text, node, price, gain, money;

	var Territorio = new Array(
	'Esquina',
	'Tienda',
	'Ciber-café',
	'Gimnasio',
	'Bar',
	'Restaurante',
	'Discoteca',
	'Prostíbulo',
	'Centro comercial',
	'Hotel',
	'Casino'
	);

	allDivs = document.evaluate('//div[@class="profilebox_item"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < allDivs.snapshotLength; i++) {
		if (allDivs.snapshotItem(i).innerHTML.indexOf('Dinero') != -1) {
			thisDiv = allDivs.snapshotItem(i);
			for (var j = 0; j < thisDiv.childNodes.length; j++) {
				node = thisDiv.childNodes[j];
				if (node.nodeName == 'SPAN') {
					if (node.textContent.indexOf('$') != -1) {
						money = node.textContent.substring(node.textContent.indexOf('$') + 1);
						money = money.replace(/,/g,'');
					}
				}
			}
		}
	}

	allDivs = document.evaluate('//div[@class="mod_info"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < allDivs.snapshotLength; i++) {
		for (var x = 0; x < Territorio.length; x++) {
			if (allDivs.snapshotItem(i).innerHTML.indexOf(Territorio[x]) != -1) {
				thisDiv = allDivs.snapshotItem(i);
				for (var j = 0; j < thisDiv.childNodes.length; j++) {
					node = thisDiv.childNodes[j];
					if (node.nodeName == 'SPAN') {
						if (node.textContent.indexOf('(') != -1) {
							gain = node.textContent.substring(1,node.textContent.indexOf('('));
							gain = gain.replace(/,/g,'');
						}
						else {
							price = node.textContent.substring(1);
							price = price.replace(/,/g,'');
							node.innerHTML = node.innerHTML + '<br/><br/>' + '<font color=yellow>Ratio: ' + eval (price + ' / ' + gain) + '</font><br/><font color=red>' + 'Faltan: $' + formatNumber(eval(price + ' - ' + money)) + '</font>' ;
						}
					}
				}
			}
		}
	}
}
getRatio();
