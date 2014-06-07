// ==UserScript==
// @name           Money
// @namespace      Money
// @description    keeps track of money
// @include        http://www.torn.com*
// @include        http://www.torncity.com*
// ==/UserScript==
fontmatch = document.getElementsByTagName('font')
var points = fontmatch[5].innerHTML.split("<")[0]
var pointsmoney = (points*50000)+parseInt(money)

pointsmoney += ''
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


if (document.body.innerHTML.match("insomniak1530") != null) {
fontmatch[4].innerHTML += '<BR></font><font color="black">Available: </font>$<font color="#000066">'+addCommas(pointsmoney)+'</font><br>'
}
