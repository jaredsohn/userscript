// ==UserScript==
// @name           ImdbPhoto
// @description    Make Imdb Photos and their links copyable. slighty modified to be available in other languages as well
// @namespace      http://userscripts.org/users/ocanal
// @version        0.2
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://www.imdb.*/media/*
// ==/UserScript==


function fixGallery() {
    var Image = document.getElementById ( "primary-img" );
	if ( Image ) {
		Image.setAttribute ( "oncontextmenu", "" );
		Image.setAttribute ( "onmousedown", "" );
		Image.setAttribute ( "onmousemove", "" );
		console && console.log ( 'fixGallery()' );
	}
}
fixGallery();