// ==UserScript==
// @name          Discogs Block Seller
// @description   One of most requested features on discogs.com is to have the ability to block sellers. This script will hide items listed for sale from these blocked sellers.
// @include       http://www.discogs.com/sell/mywants*
// @include       http://www.discogs.com/sell/list?release_id=*
// V1.0 July 2010 by iamdek
// V1.1 June 2011 - skips blank pages
// ==/UserScript==


// EDIT THE LINE BELOW WITH THE SELLERS YOU DON'T WISH TO SEE --------

var sellerList = new Array("seller1", "seller2", "seller3");

//////////////////////////////////////////////////////////////////////


// Get the current page we are viewing 

var pg = 1;
var maxpg = 1;
if (window.location.search)
{
  var p = window.location.search.substring(1).split("&");
  for (var i = 0; i < p.length; i++) 
  { 
    q = p[i].split("="); 
    if (q[0] == 'page') { pg = q[1]; break; } 
  }
}

// Get the total number of pages

var tp = document.evaluate("//A[@class='pagelink']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
maxpg = parseInt(tp.snapshotItem(tp.snapshotLength - 1).innerHTML);

// Find out how many items shoud be on this page

var ipp = document.evaluate("//B",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ic = 25; //default
for (var i = ipp.snapshotLength - 1; i >= 0; i--) 
{
  var ii = ipp.snapshotItem(i);
  if((parseFloat(ii.innerHTML) == parseInt(ii.innerHTML)) && !isNaN(ii.innerHTML)) { ic = ii.innerHTML; break; } 
}

// Hide all blocked sellers

var hs = 0;

for (var sl = sellerList.length - 1; sl >= 0; sl--)
{ 
  var killBadSellers = document.evaluate("//A[(@href='/seller/"+sellerList[sl]+"')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = killBadSellers.snapshotLength - 1; i >= 0; i--) 
  {
    var sellerLink = killBadSellers.snapshotItem(i);
    var tempParent = '';
    do
    {
      tempParent = sellerLink.parentNode.nodeName;
      sellerLink = sellerLink.parentNode;
    }
    while (tempParent != 'TR')
    sellerLink.style.display = 'none';
    hs += 1;
  }
}

// Check for blank page & force refresh to next page 


if ((hs == ic) && (pg < maxpg))
{
  location.href = 'http://www.discogs.com/sell/mywants?page='+(parseInt(pg)+1);
}