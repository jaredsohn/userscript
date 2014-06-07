// ==UserScript==
// @name           Find In My Local Library
// @namespace      http://www.thumbedthrought.com/
// @description    Search for the current book in my local library.
// @include        http://www.amazon.tld/*
// ==/UserScript==
function getISBN(href) {
  var isbn;
  isbn = href.match(/\/dp\/(\d{10})\/ref/i);
  if (!isbn) { isbn = href.match(/\/gp\/product\/(\d{10})/i); }
  if (!isbn) { return null; }
  return isbn[1];}
var isbn = getISBN(location.href);
if (isbn) {
    a = document.createElement('a');
    a.href = "http://www.worldcat.org/search?q=bn%3A"+isbn;
    a.target = "newwindow";
    aText = document.createTextNode('Find in My Local Library');
    a.appendChild(aText);
    a.className='availGreen';
    av = document.getElementsByClassName('availGreen')[0];
    av.parentNode.parentNode.insertBefore(a,null);}
(function(){var host="http://" + location.host + "/gp/product/";
    var tag="?ie=UTF8&tag=craetive-20&linkCode=xm2&camp=1789&creative=9325&creativeASIN=";
    var allLinks = document.links;
    for (var n=0; n < allLinks.length; n++) {
        link = allLinks[n];
        if (link.host.match(/amazon.com/) && link.hash=="")
        {   var asin = getASIN(link.href);
            if (asin) { link.href = host+asin+tag+asin; }}}})();
function getASIN(href) {
  var asin = href.match(/\/dp\/(\w{10})\/ref/i);
  if (!asin) { asin = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asin) { return null; }
  return asin[1].toUpperCase();}