// ==UserScript==
// @name           TaxRate Revealer
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @description    Tax Rates for GMs
// @include        http://ww*.erepublik.com/*/company/*
// ==/UserScript==

// Note: Only works if you are on the company owner's account(Organization).

//Does not work for embargoed countries.
var test = /taxes/i;

document.addEventListener('DOMNodeInserted', function(event) {
		//alert(event.target.className);


if(event.target.id == 'market_offers'){
var allElements, thisElement;
allElements = document.getElementsByTagName('input');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
if(thisElement.id.match(test)){
var junk = thisElement.id.split('_');
var stuff = 'td_no_products_'+junk[1];

if(document.getElementsByClassName(stuff)[0].innerHTML != '<span>'+ thisElement.value * 100 +'% Tax Rate</span>'){
document.getElementsByClassName(stuff)[0].innerHTML = '<span>'+ thisElement.value * 100 +'% Tax Rate</span>';
}

stuff = 'price_with_taxes_'+junk[1];
document.getElementById(stuff).title = thisElement.value * 100 +'% Tax Rate';


}

}

}


//var locate = document.getElementsByClassName("no");
//for(var a = 0; a < locate.length; a++){
//alert(locate[0].parentNode.nextSibling.nextSibling.nodeName);
//}


// <a class="vround-btn-core" title="" href="/en/market/country-23-industry-6-quality-0/1">Go to marketplace</a>

//var finder = event.target.getElementsByClassName("vround-btn-core");
//if(finder.length > 1){
//for(var a = 1; a < finder.length; a++){

//document.getElementsByClassName("no");

//var crap = finder[a].parentNode.parentNode.parentNode.parentNode;
//alert(crap.innerHTML);
//crap[0].innerHTML = '<a href="default.htm">' +crap[0].innerHTML+ '</a>';

//}
//}

}, false);
