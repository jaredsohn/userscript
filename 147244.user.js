// ==UserScript==
// @name        GitHub Total Downloads
// @namespace   http://userscripts.org
// @include     https://github.com/*/downloads
// @version     1
// ==/UserScript==

//http://www.mredkj.com/javascript/nfbasic.html
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

var $ = unsafeWindow.$;
var total = 0;

$(".download-stats > strong").each(function(){
total += parseInt(this.innerHTML.replace(/,/, ""), 10);
});

$("#manual_downloads").append("<li><span class='download-stats' style='margin-top: 2px'><strong>" + addCommas(total) + "</strong> download" + (total != 1 ? "s" : "") + "</span>Total</li>");