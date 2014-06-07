// ==UserScript==
// @name        Google Slim Header
// @namespace   gsh
// @description Slim down the Google Header to allow more space for apps.
// @include     http://*.google.com/*
// @include     https://*.google.com/*
// @version     1
//
// @grant None Example
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==


// adjust styles on the wrapper to make it not suck
$( "#gbzw" ).css( "width", "100%" ).css( "margin", "0px" );
// delete unnecessary chrome
$( "#gbx1" ).remove();
// tweak heights and settings
$( "#gb" ).css( "height", "30px" );
$( "#gbx3" ).css( "height", "30px" );

// the main bar we'll be working with
var blackBar = $( "#gbz" );
// basic style tweaks to make the rest work
blackBar.css( "position", "relative" );

// move the logo inside the bar
var logo = $( "#gbql, #gbqld" );
logo.css( "float", "left" );
blackBar.prepend( logo );



var activeLink = blackBar.find( ".gbz0l" ).parent();
var moreLink = blackBar.find( ".gbt:last" );
var moreMenu = $( "#gbmm" );
var navItems = $( "#gbzw .gbt:not(:last)" );
var navLinks = $( "#gbzc" );


// add a divider between the top-level elements we've migrated and the old menu contents
moreMenu.prepend( "<li class='gbmtc'><div class='gbmt gbmh'></div></li>" );
// move the nav items into the More menu
moreMenu.prepend( navItems );
// adjust their classes for proper display
navItems.removeClass( "gbt" ).addClass( "gbmtc" );
navItems.find( ".gbzt" ).removeClass( "gbzt" ).addClass( "gbmt" );
navItems.find( ".gbtb2" ).remove();
navItems.find( ".gbts" ).removeClass( "gbts" );

// swap the text in the active link out for the More menu
moreLink.find( "#gbztms1" ).html( activeLink.find( "span" ).html() );
activeLink.remove();

// move the search bar and user controls
var search = $( "#gbqfw" );
search.css( "float", "left" );
blackBar.append( search );

var controls = $( "#gbvg" );
controls.css( "float", "right" ).css( "background-color", "#FFF" ).css( "padding", "0px 15px" );
// adjust image sizes, as some apps have larger profile pictures
controls.find( "#gbi4i" ).attr( "height", "27" ).attr( "width", "27" );
blackBar.append( controls );

// adjust floats
navLinks.css( "float", "left" );