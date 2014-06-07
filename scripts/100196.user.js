/* 
 * Author: Gaetan Janssens (plopcom.fr)
*/

// ==UserScript==
// @name          Generation-Trail Script
// @namespace     http://www.generation-trail.com/pure
// @description   Scripting is fun
// @include       http://www.generation-trail.com/index.php
// @include       http://www.generation-trail.com/accueil.php
// @include       http://www.generation-trail.com/trail-*/*
// @exclude       
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource      
// @version       0.1
// @icon          
// ==/UserScript==
var pathname = window.location.pathname;
if (pathname == "/index.php"){
   window.location.replace("/accueil.php");
}

$('object').hide();
$('#regiegauche').hide();
$('#regiedroite2').hide();
$('.dsR1249').html( ($('.dsR3187').html()) ? $('.dsR3187').html() : $('.dsR19').html() );
$('.dsR1249').css("padding","10px");
$('.dsR1249').css("text-align","left");
$('.dsR3219').css("width","400px");
$('.dsR3219').css("text-align","left");
$('.dsR3210').css("width","400px");
$('.dsR3210').css("text-align","left");
$('#logo').css("top","305");
