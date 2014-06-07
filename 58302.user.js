// ==UserScript==
// @name           zap-rates
// @namespace      http://shmulik.zekar.co.cc/zap-rates
// @description    make the prices on Zap.co.il in USD.
// @include        http://zap.co.il/*
// @author         Shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs, For any questions please contact me by "sking.me@gmail.com".
// ==/UserScript==
var curRate = GM_getValue("rate", 4);
if (GM_getValue("updated", -1)!=new Date().getMonth() )
  updateRate();
else
  GM_registerMenuCommand("update usd rate now",updateRate);

var prices = document.evaluate(
    '//div[@class="price"]|//div[@class="price2"]|//div[@class="price3"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i=0;i<prices.snapshotLength;i++)
  prices.snapshotItem(i).innerHTML = dolit(prices.snapshotItem(i).innerHTML);
  
function dolit (q)
{
  var rtr = q.replace(/[0-9\.\,]+/g,function (n){ return addCommas(Math.round(n.replace(',','')/curRate));});
  rtr = rtr.replace('₪',"$");
  return rtr;
}



function addCommas(s)
{
	s += '';
	x = s.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



function updateRate(){
  GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.bankisrael.gov.il/heb.shearim/currency.php?curr=01",
    headers: {
      "User-Agent": navigator.userAgent
    },
    onload: function(response) {
     var parser = new DOMParser();
      if (!response.responseXML)
        response.responseXML = parser.parseFromString(response.responseText, "text/xml");
      var dom = parser.parseFromString(response.responseText,"application/xml");
      curRate = dom.getElementsByTagName("RATE")[0].textContent;
      GM_setValue("rate",curRate);
      GM_setValue("updated",new Date().getMonth());
      alert("USD rate just Updated!\n To make sure that you use the last rate please reload (or you'll get it just in the next page).");
    }
  });
};