// ==UserScript==
// @name        kotu
// @namespace   kotu
// @description kotu
// @include     http://www.erepublik.com/*/economy/market/*/12/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

// ==/UserScript==

if(parseFloat('0'+jQuery('sup').first().text().substring(0,3)) < 0.04){var amount = jQuery('.m_stock').eq(1).text().replace(/^\s+|,|\s+$/g,"");jQuery('.buyField').first().val(amount);jQuery('.buyOffer').first().click();} else {location.href=location.href;}