// ==UserScript==
// @name           Amazon and Google Integration
// @namespace      http://www.thumbedthrough.com/
// @description    Add useful information to Amazon related pages in Google results and more.
// @include        http://www.google.com/*
// ==/UserScript==
function getAmazonHrefInGoogleResults() {
    var amazonResults = [];
    // get all the search result links
    resultLinks = document.getElementsByClassName('l');
    for (var i = 0; i < resultLinks.length; i++) {
        var item = resultLinks[i];
        if (item.hostname.match(/amazon.com/)) {
            amazonResults.push(item);    }
    }
    return amazonResults;
}
function getASINfromUrl(href) {
  var asin = href.match(/\/dp\/(\w{10})/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { asin = href.match(/keywords=(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();
}
var amazonResults = getAmazonHrefInGoogleResults();
//alert(amazonResults.length); // works
//for ( var i =0; i < amazonResults.length; i++) {
for ( var i =0; i < 1; i++) {
    // right now, only show for one result item
    link = amazonResults[i];
    asin = getASINfromUrl(link.href);
    if (asin) {
    GM_xmlhttpRequest({
    method: "GET", url: link.href,
    onload: function(x){
        var aNode = document.createElement('div');
        aNode.innerHTML = x.responseText;
        var revuNrs = document.evaluate("//div[@id='customerReviews']//*[@class='tiny'][@align='right']",aNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        var avg = 0.0, reviews = 0;
        for (var r=0; r<5; r++) {
            var n = revuNrs.snapshotItem(r).firstChild.textContent.match(/[0-9,]+/)[0].replace(/,/,"") - 0;
            avg += (5-r) * n, reviews += n;   }
        avg /= reviews;
        color = rateColor(avg);
        //alert(avg);
        asin = getASINfromUrl(link.href);
        link.setAttribute('onmousedown',"");
        link.href = "http://www.amazon.com/gp/product/" + asin + "?ie=UTF8&tag=craetive-"
                + "20&linkCode=xm2&camp=1789&creative=9325&creativeASIN=" + asin;
        //var price = aNode.getElementsByClassName('priceLarge')[0].textContent.match(/([0-9.]+)/)[1];
        if (color) {
            rating = document.createElement('span');
            //"</span><span style='font-weight=bold;color:red'> Price: $" + (price||"Unknow") + 
            rating.innerHTML = reviews.toFixed(0) + " customers rated at </span>"+ "<span style='font-weight:bold;color:#" + color + "'>" + avg.toFixed(2) + "</span>" + "<br/>";
            link.parentNode.insertBefore(rating,link);
        }
}});}}
function rateColor(rate) {
    var red = Math.floor((rate-1)*(0x4A-0xFF)/4 + 0xFF).toString(16);
    var yellow = Math.floor((rate-1)/4 * 0xFF).toString(16);
    if (yellow == '0') yellow = '00';
    return red + yellow + '00'; }
