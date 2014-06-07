// ==UserScript==
// @name           YouTube Top Rated Sorted Comments
// @namespace      YTRSC
// @description    Semi-sorts comments by 'Highest Rating'.
// @include        http://www.youtube.com/all_comments?v=*
// @include        https://www.youtube.com/all_comments?v=*
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @include        http://apis.google.com/*
// @include        https://apis.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        http://tinysort.googlecode.com/svn/trunk/web/scripts/jquery.tinysort.js
// @author         drhouse
// @version        15.14.14.0416
// @icon           http://aux.iconpedia.net/uploads/17865642501582948590.png
// ==/UserScript==

$(document).ready(function () {
    
    $('.g9').prepend('<a id="highest">Highest Rating</a> | <a id="name">Name</a></center> | <a id="something">?</a><br><hr>');
    
    var reviews = $('.pga > div');    
    
    $('#highest').click(function(){
        reviews.tsort('.uPc.bmd',{order:'desc'});
    });
    
    $('#name').click(function(){
        reviews.tsort('.ju',{order:'asc'});
    });
    
    $('#something').click(function(){
        reviews.tsort('.fr .bmd',{order:'desc'});
    });
    
});