// ==UserScript==
// @name Metafilter - Hide profile favorites
// @description Blanks "Favorites" and "Favorited by others" on the profile.
// @include     http://www.metafilter.com/user/*
// @include     https://www.metafilter.com/user/*
// @version     1
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant	none // <-- people called grant not welcome
// ==/UserScript==

$('a[href^="/favorites/"],a[href$="/favorited/"]').each( function( index ) {
	$(this).text( "" );
} );