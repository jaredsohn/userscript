// ==UserScript==
// @name       Marktplaats cleaner
// @namespace  http://eric.lammertsma.com/
// @version    0.1
// @description  Replaces useless items on Marktplaats with smaller placeholders. Replaced items include advertisements and items with the words "gezocht" or "zoek". The placeholders can be clicked to show the original items.
// @match      http://*marktplaats.nl/*
// @copyright  2013+, Eric Lammertsma
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==


// change this to true if you don't want placeholders and want items completely removed
var completelyRemove = false;

function removeDerp() {
  
    this.derpOriginal = $(this).html();
    
    $(this).click(function() {
      $(this).html(this.derpOriginal);
    });
    
    // add derped class
    $(this).addClass("derped");
    
    return completelyRemove?'':'<td colspan=5 style="text-align:center;color:#DDD;padding:3px;background-color:#FAFAFA;"><p>Herpty derp. Klik om te bekijken.</p></td>';

}

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// select useless elements but only select un-derped elements and remove them.
$('tr[class*="search-result"]:contains("zoek"),tr[class*="search-result"]:contains("gezocht"),tr[class*="bottom-listing"]').not('.derped').html(removeDerp);
