// ==UserScript==
// @name           	Tradera Unrated Seller
// @version        	0.2
// @namespace      	http://tradera.com/unrated-sellers-and-banner-removal
// @description    	Hilite all auctions from unrated sellers on Tradera
// @include        	http://www.tradera.com/*
// @include        	http://*.tradera.com/*
// @require  		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

window.setTimeout(function(){
    
    var bxs = $x("//div[@class='boxbody']/div[@class='picture']/div[@class='infoHolder']/div[@class='sellerRating']/a[@class='DSRMedium' and contains(., \"Ej bedömd\")]/../../../..");                         
    bxs.forEach(function(bx) { with (bx) { setAttribute('style','background-color:#fdd;'); } });                         
    
    $('[id^="bannerTop"]').remove();
    $('[id^="bannerSkyscraper"]').remove();
    $('[id^="adform-adbox-"]').remove();
    
    $('[class^="topBanner"]').remove();
    $('[class^="sideBanner"]').remove();
    
    $('[id^="ph_adnxs_tag_"]').remove();
    $('[id^="div_adnxs_tag_"]').remove();
},2000);


function $x(path, root) {
    if (!root) root = document;
    var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}                         
