// ==UserScript==
// @name           Amazon Average Rating
// @namespace      http://www.thumbedthrough.com/blog/
// @description    Compute a numeric average customer rating and show in title
// @include        http://www.amazon.tld/*
// ==/UserScript==
// v0.20: added color coding for different rating;
// v0.21: removed color coding on the divider lest it confused people as a minus sign;
// v0.22: corrected 2 minor bugs
// v0.25: corrected a bug when handling with products with thousands of reviews
function computeAvgRating()
{
    var revu = document.getElementById("customerReviews");
    var revuNrs = document.evaluate("//*[@class='tiny'][@align='right']",revu,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var avg = 0.0;
    var reviews = 0;
    for (var r=0; r<5; r++)
    {
        var n = revuNrs.snapshotItem(r).firstChild.textContent.match(/[0-9,]+/)[0].replace(/,/,"") - 0;
        avg += (5-r) * n;
        reviews += n;
    }
    avg /= reviews;
    return avg;
}
function getASIN(href) {
  var asin;
  asin = href.match(/\/dp\/(\w{10})\/ref/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();
}
function rateColor(rate) {
    var red = Math.floor((rate-1)*(0x4A-0xFF)/4 + 0xFF).toString(16);
    var yellow = Math.floor((rate-1)/4 * 0xFF).toString(16);
    if (yellow == '0') yellow = '00';
    return red + yellow + '00';
}
function updateLinks() {
    var host="http://" + location.host + "/gp/product/";
    var tag="?ie=UTF8&tag=craetive-20&linkCode=xm2&camp=1789&creative=9325&creativeASIN=";
    var allLinks = document.links;
    for (var n=0; n < allLinks.length; n++) {
        link = allLinks[n];
        if (link.host.match(/amazon.com/) && link.hash=="")
        {   var asin = getASIN(link.href);
            if (asin) { link.href = host+asin+tag+asin; }}}}
updated = updateLinks();
avg = computeAvgRating();
color = rateColor(avg);
if (avg && color)
{   var title = document.getElementById("btAsinTitle");
    oHtml = title.innerHTML;
    title.innerHTML = oHtml +" - " + "<span style='font-weight:bold;color:#" + color + "'>" + avg.toFixed(2) + "</span>";}