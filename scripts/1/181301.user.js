// ==UserScript==
// @name        Amazon Fcfa
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace   http://sugu.fr
// @description Conversion de l'euro vers le Fcfa
// @include     http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started
// @include		http://amazon.com/*
// @include		http://*.amazon.com/*
// @include		https://*.amazon.com/*
// @include		https://amazon.com/*
// @include 	http://www.amazon.tld/*
// @version     1
// ==/UserScript==


// ********[SECTION 1] Convert Price********


var currency = 'FCFA ';

function convert(price){
	var priceRegex = /[(0-9)+.?(0-9)*]+/igm;
        price = parseFloat(priceRegex.exec(price));
	return price = price * 655.957;	
}



$('.price').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('.bld.lrg.red').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('.priceLarge').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('del.grey').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('.listprice').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('.hlb-price').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('.ourprice').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('.a-size-large.a-color-price.olpOfferPrice.a-text-bold').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('div.s9hl span.s9Price').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

$('div.s9hl span.newListprice.gry').each(function(){
var price = $(this).html();
$(this).html(currency + convert(price).toFixed(2));

});

// ********[END SECTION 1]********

// ********[SECTION 2] Remove unwated divs********

$('#leftNavContainer').remove();
$('#rhf').remove();
$('#nav-your-account').remove();
$('#nav-your-prime').remove();
$('#nav-cart').remove();
$('#nav-wishlist').remove();
$('#nav-cross-shop-links').remove();
$('#nav-ad-background-style').remove();
//$('div #sims-fbt .bucket').remove();
$('table.buyingDetailsGrid').remove();

// ********[END SECTION 2]********