// ==UserScript==
// @name           Buy direct from mall
// @namespace      KoLSchik
// @description    Adds links to buy stuff from the mall
// @include        http://127.0.0.1:*/searchmall.php*
// @include        http://*.kingdomofloathing.com/searchmall.php*
// ==/UserScript==
(function() {
	var body = document.getElementsByTagName("body")[0].innerHTML;
    if(body.indexOf("Search Results:") == -1) {
		return;
    }
    var pwdexp = /pwd=([0-9a-fA-F]+)/;
	var pwd = pwdexp.exec(body);
	if (null == pwd) {
		return;
	}
	pwd = pwd[1];
    var elems = document.getElementById('searchresults').getElementsByTagName('tr');
    var elem;
    for(elem in elems) {
		if (undefined != elems[elem].childNodes && undefined != elems[elem].childNodes[1]) {
			var href = elems[elem].childNodes[1].firstChild.href;
			var rgx = /whichstore=(\d+).*searchitem=(\d+).*searchprice=(\d+)/;
			var p = rgx.exec(href);
			if (null != p) {
				var store = p[1];
				var item = p[2];
				var price = p[3];
				var dest = elems[elem].childNodes[5];
				if (dest.innerHTML == "&nbsp;") {
					var len = price.toString().length;
					var which = item + '0000000000'.substr(0, 9-len) + price;
					dest.innerHTML = '[<a href="mallstore.php?buying=1&quantity=1&whichitem='+which+"&ajax=1&pwd="+pwd+'&whichstore='+store+'" class="buyone">buy</a>]&nbsp;[<a href="#" rel="mallstore.php?buying=1&whichitem='+which+'&ajax=1&pwd='+pwd+'&whichstore='+store+'&quantity=" class="buysome">buy&nbsp;some</a>]&nbsp;*';
				}
			}
		}
    }
}) ();
