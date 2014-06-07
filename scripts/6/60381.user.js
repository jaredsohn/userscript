// ==UserScript==
// @name           Amazon Rating in Google Books
// @namespace      http://www.thumbedthrough.com/
// @description    Show average Amazon rating for the current book in Google Books
// @include        http://books.google.com/*
// ==/UserScript==
function getAmazonHrefInGoogleBooks() {
    storeCells = document.getElementById('buy_v').getElementsByTagName('td');
    for (var i = 0; i < storeCells.length - 1; i++) {
        var store = storeCells[i];
        if (store.textContent.match(/Amazon/)) {
            //amazonStore = store;
            return store.getElementsByTagName('a')[0].href;  }
    }
}
function getASINfromGBUrl(href) {
  var asin = href.match(/\/dp\/(\w{10})/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { asin = href.match(/keywords=(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();
}
var asin = getASINfromGBUrl(getAmazonHrefInGoogleBooks());
GM_xmlhttpRequest({
method: "GET", url: "http://www.amazon.com/dp/" + asin,
onload: function(x){
    var aNode = document.createElement('div');
    aNode.innerHTML = x.responseText;
    var revuNrs = document.evaluate("//div[@id='customerReviews']//*[@class='tiny'][@align='right']",aNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var avg = 0.0, reviews = 0;
    for (var r=0; r<5; r++) {
        var n = revuNrs.snapshotItem(r).firstChild.textContent.match(/[0-9,]+/)[0].replace(/,/,"") - 0;
        avg += (5-r) * n, reviews += n;   }
    avg /= reviews;
    storeCells = document.getElementById('buy_v').getElementsByTagName('td');
    for (var i = 0; i < storeCells.length - 1; i++) {
        if (storeCells[i].textContent.match(/Amazon/)) {
            color = rateColor(avg);
            amazonStore = storeCells[i].getElementsByTagName('a')[0];
            amazonStore.innerHTML = "<a href='http://www.amazon.com/gp/product/" + asin + "?ie=UTF8&tag=craetive-"
            + "20&linkCode=xm2&camp=1789&creative=9325&creativeASIN=" + asin + "'> Amazon.com </a>";
            if (color) {
                amazonStore.parentNode.innerHTML = amazonStore.parentNode.innerHTML + "<br/>" + "<span>" + reviews.toFixed(0) + " customers rated at </span>"
                + "<span style='font-weight:bold;color:#" + color + "'>" + avg.toFixed(2) + "</span>";  }
        }
    }
}});
function rateColor(rate) {
    var red = Math.floor((rate-1)*(0x4A-0xFF)/4 + 0xFF).toString(16);
    var yellow = Math.floor((rate-1)/4 * 0xFF).toString(16);
    if (yellow == '0') yellow = '00';
    return red + yellow + '00'; }
