// ==UserScript==
// @name           Neopets : Shop Wizard : Buy Now
// @namespace      http://www.gamingire.com/
// @description    Adds a link so you can either buy one of that item or all of an item in the Shopwizard
// @include        http://www.neopets.com/market.phtml*
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56562.user.js
// ==/UserScript==
if(document.body.innerHTML.match('Searching for:'))
{
document.body.innerHTML = document.body.innerHTML.replace('<td class="contentModuleHeaderAlt" width="80"><div align="right"><b>Price</b></div></td>', '<td class="contentModuleHeaderAlt"><div align="right"><b>Price</b></div></td><td class="contentModuleHeaderAlt" width="80"><div align="right"><b>Buy Now</b></div></td>');
document.body.innerHTML = document.body.innerHTML.replace(/<\/b><\/td><\/tr>/g, '</b></td><td><buynow>Please wait</buynow></td></tr>');
var links = GBA(document.body.innerHTML, '/browseshop.phtml?', '"');
var e = document.getElementsByTagName('buynow');
cNumber = 0;
for(i=0;i<e.length;i++)
{
shopLink = "http://www.neopets.com/browseshop.phtml?"+links[i].replace(/&amp;/g,"&");
GM_xmlhttpRequest({
  method: "GET",
  url: shopLink,
  onload: function(response) {
strHTML = response.responseText;
buyLink = getBetween(strHTML,'buy_item.phtml?','"');
document.getElementsByTagName('buynow')[cNumber].innerHTML = '<div align="right"><a href="http://www.neopets.com/buy_item.phtml?'+buyLink+'"><b>[Buy Now]</b></a></div>';
cNumber = cNumber * 1 + 1;
  }
});
}

}


    function GBA(sMain, sStart, sFinish) {
        var sSplit = sMain.split(sStart);
        var out = new Array(sSplit.length);
        for (i=1;i<sSplit.length;i++) {
            var temp = sSplit[i].split(sFinish);
            out[i-1] = temp[0];
        }
        return out;
    }
	
		function getBetween(target_str, start_str, end_str, start_pos, include_str) {
	if (!start_pos) 0;
	if (!include_str) false;

	var result_str = target_str.substr(start_pos);
	result_str = result_str.substr(result_str.indexOf(start_str) + start_str.length);
	result_str = result_str.substr(0, result_str.indexOf(end_str));

	if (include_str == true) {
		result_str = start_str + result_str + end_str
	}

	return result_str;
}