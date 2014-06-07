// ==UserScript==
// @name       TradeMe Image helper
// @namespace  http://www.jaredklopper.com
// @version    0.1
// @description Displays auction listing previews on the search results on trademe, rather then displaying the camera icon thumbnail.

// @match      http://*.trademe.co.nz/*
// @match      http://www.trademe.co.nz/*
// @match      https://trademe.co.nz/*
// @match      https://www.trademe.co.nz/*

// @copyright  2014+, Jared Klopper
// @require http://code.jquery.com/jquery-2.1.0.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {
    $('img[src*="hasPhoto_"]').each(function (index, element) {
        $.get(element.parentElement.href, function (result) {
            var pageData = $(result);
            var actualImage = $("#mainImage", pageData)[0];
            element.style.maxWidth = "160px";
            element.style.maxHeight = "120px";
            element.src = actualImage.src;
        });
    });
});