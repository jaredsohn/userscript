// KoL Bonus Honus
//
// ==UserScript==
// @name          Bonus Honus
// @description   Become truly infuriated.
// @include       *127.0.0.1:*/clan_rumpus.php*
// @include       *kingdomofloathing.com/clan_rumpus.php*
// @version 0.1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

var $jklimtog = jQuery.noConflict();

$jklimtog(document).ready(function() {
	$jklimtog('img[alt="An Infuriating Painting"]').attr('src','http://i.imgur.com/HjTjOvD.gif');
});