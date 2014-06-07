// ==UserScript==
// @name           Stamina rechg
// @namespace      regexmagic
// @include        http://www.lostpower.com/game/*
// ==/UserScript==


(function() {
 var textnodes, energy;

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

energy = textnodes.snapshotItem(37).data.replace(/%/g,'');
//ORIG: energy = textnodes.snapshotItem(i).data.replace(/%/g,'');
//stamina: energy = textnodes.snapshotItem(37).data.replace(/%/g,'');
	if (energy < 10){
	//alert(energy);
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/blackmarket.php'},
	method: 'GET',
	url: 'http://www.lostpower.com/game/blackmarket.php?spend=refillstamina',
    	});
	
      }
//	}
//}

})();

