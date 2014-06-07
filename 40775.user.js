// ==UserScript==
// @name           Waterbuyspam
// @namespace      regexmagic
// @include        http://www.lostpower.com/game/shops.php?shop=21
// ==/UserScript==

	GM_xmlhttpRequest({
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) msie',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	'Content-Type': 'application/x-www-form-urlencoded',
	'Referer': 'http://www.lostpower.com/game/shops.php?shop=21'},
	method: 'POST',
	url: 'http://www.lostpower.com/game/itembuy.php?ID=55',
	data: 'qty=999',
    	});

