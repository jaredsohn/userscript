// ==UserScript==
// @name           Amazon Price in RMB
// @namespace      http://www.thumbedthrough.com/
// @description    Add RMB (Chinese Yuan) price in product page
// @include        http://www.amazon.tld/*
// ==/UserScript==
function amazonGetPrice(){
return document.getElementsByClassName('priceLarge')[0].textContent.match(/([0-9.]+)/)[1];
}
usd = amazonGetPrice();
var queryUrl = "http://www.google.com/search?q=" + usd + "+usd+in+rmb&btnG=Search";
var cny = GM_xmlhttpRequest({
method: "GET",
url: queryUrl,
onload: function(x){
var cnyPrice = x.responseText.match(/([\s0-9]+\.[0-9][0-9])[0-9]+ Chinese yuan/)[1];
(function amazonTableInsertRow(value)
{
		var priceTable = document.getElementsByClassName('product')[0];
		var row = priceTable.insertRow(1);
		var labelCell = row.insertCell(0);
		labelCell.className = 'priceBlockLabel';
		var priceCell = row.insertCell(1);
		priceCell.className = 'price';
		var labelNode = document.createTextNode('CNY Price:');
		labelCell.appendChild(labelNode);
		var priceNode = document.createTextNode('\u00a5'+value);
		priceCell.appendChild(priceNode);
})(cnyPrice);
(function x() {
    var host="http://" + location.host + "/gp/product/";
    var tag="?ie=UTF8&tag=craetive-20&linkCode=xm2&camp=1789&creative=9325&creativeASIN=";
    var allLinks = document.links;
    for (var n=0; n < allLinks.length; n++) {
        link = allLinks[n];
        if (link.host.match(/amazon.com/) && link.hash==""){
            var asin = (function getASIN(href) {
  var asin;
  asin = href.match(/\/dp\/(\w{10})\/ref/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();
})(link.href);
if (asin) { link.href = host+asin+tag+asin; }}}})();
}});