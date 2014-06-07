// ==UserScript==
// @name       Wareziens Hide Membre Choice
// @version    0.1
// @description  Cacher le post des membres en fonction de son pseudo.
// @include     http*://*wareziens.*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @copyright  2013+, Shaion
// ==/UserScript==

//Tableau des membres à cacher.
//Pour ajouter un pseudo après Shaion par exemple
//il vous suffit d'ajouter , "Pseudo"
//Ce qui donnera
//var members =new Array( "BarracudaXT", "Shaion", "Pseudo" );
var members = new Array( "BarracudaXT", "Shaion" );
//Code ou se trouve le pseudo
var html = $('.postleft strong span');

//Boucle si plusieurs posts d'un membre sur un topic.
$(html).each(function(i){
    //Si membre dans le tableau
    if($.inArray($(this).text(), members)!= -1 ){
        //On récupère l'id de la div à cacher
        var id = $(this).parents('div.blockpost').attr('id');
        //et on cache la div box pour garder une div visible
        $('#'+id+' .box').hide();
    }
 });