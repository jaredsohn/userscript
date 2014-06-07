// ==UserScript==
// @name       Remove stories from Bennet Haselton from /. frontpage
// @namespace  http://mclearn.ca
// @version    0.1
// @description Remove the stories which are from BH's blog. Repurpose to remove any specific article. Not written for anything except Chrome; I am not a JS programmer.
// @match      http://slashdot.org/*
// @match      http://*.slashdot.org/*
// @copyright  2014, Greg McLearn
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $( "div.p:contains('Bennett Haselton writes')" ).addClass('bennethaselton');
    var bh = $( "article.article" ).has("div.bennethaselton");
    // Fix up the article count in the title but flag as altered.
    if( bh.length > 0 )
         document.title = document.title.replace( /\d+/, ((document.title.match( /\d+/ )) - bh.length) + '*' );
    // Nuke all articles from BH from orbit
    bh.remove();
});
