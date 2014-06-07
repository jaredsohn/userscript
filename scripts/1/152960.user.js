// ==UserScript==
// @name        Marktplaats topadvertentie, adsense, admarkt en dienstverlening Hider 2
// @namespace   Bezoeker, Validimus Jefferson Scher thanks 
// @include     http*://vernieuwd.marktplaats.nl/*
// @version     2
// @grant       none
// @description blocks  marktplaats layout 11-2011 topadvertenties adsense admarkt and dienstverlening
// ==/UserScript==

var priority_spans = document.querySelectorAll("td .mp-listing-priority-product");
var i, parent;
for (i=0; i<priority_spans.length; i++){
  if (priority_spans[i].textContent.indexOf("Topadvertentie")>-1){
    parent = priority_spans[i];
    while (parent.nodeName != "TR"){
      parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}
// Removes adsense bottom
var adSense = document.getElementById('adsenceContainer');
adSense.parentElement.removeChild(adSense);

// removes the 4 Admarkt ads
if (document.getElementsByClassName('group-0 search-result bottom-listing')
&& document.getElementsByClassName('group-1 search-result bottom-listing'))
{
deleteRow0grp0 = document.getElementsByClassName('group-0 search-result bottom-listing')[0];
deleteRow1grp0 = document.getElementsByClassName('group-0 search-result bottom-listing')[1];
deleteRow0grp1 = document.getElementsByClassName('group-1 search-result bottom-listing')[0];
deleteRow1grp1 = document.getElementsByClassName('group-1 search-result bottom-listing')[1];

if(deleteRow0grp0.parentNode)
deleteRow0grp0.parentNode.removeChild(deleteRow0grp0);
if(deleteRow1grp0.parentNode)
deleteRow1grp0.parentNode.removeChild(deleteRow1grp0);
if(deleteRow0grp1.parentNode)
deleteRow0grp1.parentNode.removeChild(deleteRow0grp1);
if(deleteRow1grp1.parentNode)
deleteRow1grp1.parentNode.removeChild(deleteRow1grp1);
}

// removes the dienstverlening ads
var priority_spans = document.querySelectorAll("td .votes");
var i, parent;
for (i=0; i<priority_spans.length; i++){
  if (priority_spans[i].textContent.indexOf("x")>-1){
    parent = priority_spans[i];
    while (parent.nodeName != "TR"){
      parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}