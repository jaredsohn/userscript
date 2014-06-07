// ==UserScript==
// @name       Rasian paska mainos
// @namespace  https://www.riemurasia.net
// @version    0.3
// @description   Rasian etusivun vittumaisen mainoksen poisto.
// @match      https://www.riemurasia.net/*
// @include    http://www.riemurasia.net/*
// @copyright  2013+, TamponinNaru
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
$('#container').parent().css({
    'background-image': 'none',
    'background-color': '#004789'
});
$('#takeover').hide('slow');