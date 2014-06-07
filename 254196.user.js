// ==UserScript==
// @name        Price in Title of Steam Community Market Listings
// @namespace   tag:atmozzis
// @description It will show market price in individual item listings.
// @include     http://steamcommunity.com/market/listings/*
// @version     1
// ==/UserScript==
var itemname  = document.title.substring(39);
var itemprice = document.getElementsByClassName("market_listing_price market_listing_price_with_fee")[0].innerHTML;
document.title = itemprice + itemname;