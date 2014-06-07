// ==UserScript==
// @name            NewsMaxiFoot
// @description     Modifie pub et apparence de ce tableau de news de foot
// @namespace       news.maxifoot.fr
// @version         7
// @icon			http://s3.amazonaws.com/uso_ss/icon/163187/large.png
// @include         http://news.maxifoot.fr/*

// @require        http://code.jquery.com/jquery-latest.min.js

// @require        http://userscripts.org/scripts/source/159301.user.js
// @resource  meta http://userscripts.org/scripts/source/163187.meta.js
// @versioninfo	   Mise à jour cadre de pub
// @interval       1
// ==/UserScript==

/*
History:

V7 - 24/12/2013
 - Mise à jour cadre de pub

V6 - 15/08/2013
 - Mise à jour cadre de pub

V5 - 14/08/2013
 - Mise à jour cadre de pub
 
V4 - 08/05/2013
 - Un cadre de pub ne partait plus
 
V3 - 30/03/2013
 - mise a jour des cadre de pub
 - Les pubs changent presque tous les jours, a force j'aurais fait le tour et il n'y aura plus de MAJ
 
V2 - 28/03/2013
 - UPDATE Code
 - Cadre de pub en bas du site
 - Icone
 
V1 - 27/03/2013
 - Mise en service
 - Augmentation de la taille du tableau, du texte
 - Supprime les cadres inutiles, pub etc...
 - Réangement...
 
 */

/* Cleaner PUB */
$('iframe').remove(); // cadre iframe
$('#ep468 div, #ep_468 div, #ep-468 div, #ep468b div, #ep468c div, #ep468z div, #ep468x15 div').parent().parent().remove(); //cadre pub en haut à droite
$('#ep300 div, #ep_300 div, #ep-300 div, #ep300b div, #ep300c div, #ep300z div').remove(); // cadre pub en bas a droite
$('#ep728 div').remove(); // cadre pub en bas
$('#USOUpdaterMenu div').remove(); // cadre pub en bas

/* Elargir/modifier size */
$('center table:eq(1)').attr('width','100%'); // article principal sur toute la largeur de la page
$('table:eq(0) tbody tr td:eq(1)').attr('valign','middle'); // titre mieux placer suite au remove de la pub
$('#lnews1').attr('style','display:block; width:450px; height:380px; overflow:hidden; overflow-x:hidden; overflow-y:auto;  overflow: -moz-scrollbars-vertical; border:2px solid #000000; border-top:0px;'); // taille listes articles

/* Taille texte */
$('table:eq(1) tbody tr td:eq(0) table:eq(0) tbody tr td:eq(0) table:eq(0) tbody tr td:eq(0) font:eq(0)').attr('style','font-size:18px;color:#FFFFFF;position:relative;top:-2px'); // titre article
$('table:eq(1) tbody tr td:eq(0) table:eq(0) tbody tr td:eq(0) table:eq(0) tbody tr:eq(1) td:eq(0) div:eq(0)').attr('style','font:17px/20px verdana;text-align:justify;border-bottom:2px solid #000;padding:2px 0 8px 0;'); // taille article
$('.listnews tbody tr td, .heure').attr('style','font-size:14px;'); // liste article

/* Mettre titre en bas à la place de la pub */
$('#ep468, #ep_468, #ep-468, #ep468b, #ep468c, #ep468z').parent().remove(); //cadre pub en haut à droite
$('table:eq(0)').attr('width','100%');
$('table:eq(0) tbody tr td').attr('align','center');
$('table:eq(0) tbody tr td').attr('width','100%');
$('table:eq(0) tbody tr td:eq(0)').attr('width','0');
// $('table:eq(0) tbody tr td:eq(1)').attr('width','0');
$('table:eq(0) tbody tr td:eq(1)').append($('a[target=_new]'));
$('table:eq(0) tbody tr td:eq(1) a div').attr('style','width:175px; height:65px; padding:0; background:url(http://newsimg.maxifoot.com/sprite_news2.gif) 0 0 no-repeat;margin:auto;');
$('#ep300, #ep_300, #ep-300, #ep300b, #ep300c, #ep300z').attr('style','width:300px;height:239px;overflow:hidden;'); 
$('#ep300, #ep_300, #ep-300, #ep300b, #ep300c, #ep300z').append($('table:eq(0)')); // cadre pub en bas a droite