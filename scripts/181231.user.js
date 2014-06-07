// ==UserScript==
// @author      BruceFeuillette
// @name        Dealabs - Mes deals actifs
// @description Ajouter un bouton pour accéder à tous les deals actifs du dealeur connecté
// @namespace   dealabs_mes_deals_actifs.js
// @version     1.01
// @grant       none
// @include     http://www.dealabs.com/*

// ==/UserScript==

if($('.menu_profil')!='undefined') {

var username = $('#newsletter_close').attr("href").split("/")[4].split("?")[0];
var link = $('<li><a class="parametres" href="http://www.dealabs.com/search/?look_where=in_deals&member='+username+'&look_member_where=in_deals&comments_bound=at_least&sort=relevance&sort_direction=desc&hide_expired=1">Mes deals actifs</a></li>');

$('.menu_profil ul').prepend(link);
}