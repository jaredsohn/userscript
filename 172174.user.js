// ==UserScript==
// @name       E24 remove job ads
// @namespace  http://res.no
// @version    2013-07-05
// @description  Remove job ads and some other related content
// @match      http://www.e24.no/*
// @match      http://e24.no/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(document).ready(function () {
    // hide job ad content front page
    $("div.df-auto-container.row-6").attr('style','display:none');
    $("div.df-auto-container.row-7").attr('style','display:none');
    $(".jobStripe").parent().attr('style','display:none').prev('.clearer').attr('style','display:none');
    $('#scrollbar').attr('style','display:none');
    $('#companyFrontModule').closest('.df-auto-container').attr('style','display:none');
    // hide job ad content in articles
    $('#jobHighlight').attr('style','display:none');
    $('#sliderJobb').parent().parent().attr('style','display:none');
    $('.header.jobRotation').parent().attr('style','display:none');
    $('.jobAd').closest('.element').attr('style','display:none');
    $('#ww_jobbsok_front').attr('style','display:none');
});