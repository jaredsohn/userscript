// ==UserScript==
// @name           EnergyRefill
// @namespace      regexmagic
// @include        http://www.lostpower.com/game/gym.php*
// @exclude	   http://www.lostpower.com/game/itemuse.php*
// @exclude	   http://www.lostpower.com/game/attack*
// ==/UserScript==



(function() {
 var textnodes, energy;

var mywaterid="20949614";
var mysnacksid="21168014";

textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

energy = textnodes.snapshotItem(29).data.replace(/%/g,'');
	if (energy < 20){
	//alert(energy);
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mysnacksid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=49&ID=' + mysnacksid,
    	});
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mywaterid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=20&ID=' + mywaterid,
    	});
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mywaterid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=20&ID=' + mywaterid,
    	});
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mywaterid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=99&ID=' + mywaterid,
    	});
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mywaterid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=99&ID=' + mywaterid,
    	});
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mywaterid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=20&ID=' + mywaterid,
    	});
	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092510 Ubuntu/8.04 (hardy) Firefox/3.0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/itemuse.php?ID=' + mywaterid},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itemuse.php',
	data: 'amount=20&ID=' + mywaterid,
    	});
      }
//	}
//}

})();
