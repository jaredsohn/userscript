// ==UserScript==
// @name        Marktplaats opschoner (customized)
// @namespace   Arnold123
// @include     http*://*marktplaats.*/*
// @grant       none
// @version     1.5
// @description Schoont Marktplaats.nl op, dmv verwijderen van onzin/reclame.
// @description Kuddo's: http://userscripts.org/scripts/show/171473
// @description Feuture list: 
// @description Kuddo's: http://userscripts.org/scripts/show/171473

// @description Feuture list: 
// @description -Block Top en Dagtopper advertenties.
// @description -Block Adsense, Admarkt en Cookie notice.
// @description -Block advertenties met de woorden "zoek" en "gezocht".
// @description -Block advertenties waarvan wordt beweert "Bezorgt in XXXX, XX", welke gewoon weg altijd doorverkopers zijn.
// @description -Auto focus op de Zoek balk, net zoiets als bij Ebay.
// @description -Verwijderd de "suggested search box", welke leeg is?
// @description -Block Service/Reparatie advertenties, ook de reviewbare met duimen etc.

// @description Wat is er nieuw aan de Customized versie?
// @description - Het blokkeren van ook Dagtopper advertenties.
// @description - Advertenties van meestal doorverkopers blokkeren door middel van het controleren op "Bezorgt in XXXX, XX".
// @description - Auto focus voor de Zoek balk.
// @description - Blokkeren van Service/Reparatie advertenties
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

//Zet autofocus op de Zoekbar van Marktplaats.
document.getElementById('query').focus(function() {
});

// Topadvertentie Hider (by bezoeker) - http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
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

// DagTopper Hider (by bezoeker, small edited by Arnold123)
var priority_spans = document.querySelectorAll("td .mp-listing-priority-product");
var i, parent;
for (i=0; i<priority_spans.length; i++){
  if (priority_spans[i].textContent.indexOf("Dagtopper")>-1){
    parent = priority_spans[i];
    while (parent.nodeName != "TR"){
      parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}

//Doorverkoper Hider (by Arnold123 (modded from bezoeker))
var location_seller = document.querySelectorAll("td .location-block span, .location-name");
var i, parent;
for (i=0; i<location_seller.length; i++){
    if (location_seller[i].textContent.indexOf("Bezorgt in")>-1){
    parent = location_seller[i];
    while (parent.nodeName != "TR"){
    parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}

//Service/Reparatie Hider (by Arnold123 (modded from bezoeker))
var location_service = document.querySelectorAll("td .location-block div, .seller-link");
var i, parent;
for (i=0; i<location_service.length; i++){
    if (location_service[i].textContent.indexOf("Bezoek website")>-1){
    parent = location_service[i];
    while (parent.nodeName != "TR"){
    parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}

//Service/Reparatie Hider 2 (review duimen) (by Arnold123 (modded from bezoeker))
var location_service2 = document.querySelectorAll("td .column-date span, .votes");
var i, parent;
for (i=0; i<location_service2.length; i++){
    if (location_service2[i].textContent.indexOf("0x") === -1){
    parent = location_service2[i];
    while (parent.nodeName != "TR"){
    parent = parent.parentNode;
    }
    parent.style.display = "none";
  }
}

// remove cookie notice footer (black bar)
var CookieFoetsie = document.getElementById('layover-target');
CookieFoetsie.parentElement.removeChild(CookieFoetsie);

// Suggested by Validimus:
// removes the Admarkt divider
var BotListDiv = document.getElementById('bottom-listings-divider');
BotListDiv.parentElement.removeChild(BotListDiv);

// Removes the suggested search box (which is empty?)
var sugSearch = document.getElementById('suggested-searches');
sugSearch.parentElement.removeChild(sugSearch);

// Removes adsense top
var adSenseTop = document.getElementById('adsenceContainerTop');
adSenseTop.parentElement.removeChild(adSenseTop);

// Removes adsense bottom
var adSense = document.getElementById('adsenceContainer');
adSense.parentElement.removeChild(adSense);

// removes the 4 Admarkt ads
if (document.getElementsByClassName('bottom-group-0 search-result bottom-listing')
&& document.getElementsByClassName('bottom-group-1 search-result bottom-listing'))
{
deleteRow0grp0 = document.getElementsByClassName('bottom-group-0 search-result bottom-listing')[0];
deleteRow1grp0 = document.getElementsByClassName('bottom-group-0 search-result bottom-listing')[1];
deleteRow0grp1 = document.getElementsByClassName('bottom-group-1 search-result bottom-listing')[0];
deleteRow1grp1 = document.getElementsByClassName('bottom-group-1 search-result bottom-listing')[1];

if(deleteRow0grp0.parentNode)
deleteRow0grp0.parentNode.removeChild(deleteRow0grp0);
if(deleteRow1grp0.parentNode)
deleteRow1grp0.parentNode.removeChild(deleteRow1grp0);
if(deleteRow0grp1.parentNode)
deleteRow0grp1.parentNode.removeChild(deleteRow0grp1);
if(deleteRow1grp1.parentNode)
deleteRow1grp1.parentNode.removeChild(deleteRow1grp1);
}

// Marktplaats cleaner (by Smooshieus)
// Removes ads with "gezocht" and "zoek"
// Fix @grant conflict
this.$ = this.jQuery = jQuery.noConflict(true);

function removeDerp() {
  
    this.derpOriginal = $(this).html();
    
    $(this).click(function() {
      $(this).html(this.derpOriginal);
    });
    
// add derped class
    $(this).addClass("derped");
    
    return ''

}

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// select useless elements but only select un-derped elements and remove them.
$('tr[class*="search-result"]:contains("zoek"),tr[class*="search-result"]:contains("gezocht"),tr[class*="bottom-listing"]').not('.derped').html(removeDerp);