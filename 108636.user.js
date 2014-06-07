// ==UserScript==
// @name           IMDb hover images on title page
// @namespace      http://www.imdb.com/
// @description    Show an enlargened picture of actors' faces or other links on mouse over. Relies on jQuery.
// @include        http://www.imdb.com/title/*
// @include        http://finnish.imdb.com/title/*
// @require        http://jquery.com/src/jquery-latest.js
// ==/UserScript==

$("a img").hover(function() {
    var srcsplitted = $(this).attr('src').split('V1');
    var source = srcsplitted[0] + "V1._SX300_SY400,0,300,400_.jpg";
    $("#IMDb-title-hoverpic").css({
        'position': 'fixed',
        'top': '5px',
        'left': '5px',
        'border': '1px solid #ccc',
        'background': '#fff',
        'padding': '2px',
        'display' : 'block'
    });
    $("#IMDb-title-hoverpic").html('<img src="'+source+'" />');
}, function() {
    $("#IMDb-title-hoverpic").css({
        'display' : 'none'
    });
});

var popupdiv = document.createElement('div');
popupdiv.id = 'IMDb-title-hoverpic';
document.body.appendChild(popupdiv);