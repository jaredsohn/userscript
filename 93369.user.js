// ==UserScript==
// @name           Cleanup Dumpert
// @namespace      http://userscripts.org/users/107427
// @description    Remove the top bar and navigation from dumpert so it displays the things you're there for...
// @include        http://*.dumpert.nl/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

// Not sure why I use a function here.
// I don't know what happens if you don't use addblock
(function() {
 // Remove some frame cluttering stuff
 $('#header').remove();
 // Move the rest up.
 $('#filmcontainer').css('top', '50px');
 $('#fotocontainer').css('top', '50px');
 $('#audiocontainer').css('top', '50px');
 $('#top5container').css('top', '50px');
 // Leave some space for the title.
 $('#iteminfo').css('top', '90px');
 $('#playercontainer').css('top', '90px');
  $('#tagcontainer').css('top', '50px');
 //remove bottom
 $('#uploadcontainer').remove();
 $('div:last').remove();
}) ();