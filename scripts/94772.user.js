// ==UserScript==
// @name           Subforums on Top (Facepunch)
// @namespace      TurtleHax
// @description    This puts the Subforums back on the top of thread view, instead of at the bottom.
// @include        http://www.facepunch.com/forums/*
// @include        http://facepunch.com/forums/*
// ==/UserScript==

var Forums = document.getElementsByClassName('forums');
var PlaceToPut = document.getElementById('above_threadlist');

if ( Forums.length > 1 && PlaceToPut )
{
	PlaceToPut.parentNode.insertBefore( Forums[1], PlaceToPut );
	PlaceToPut.parentNode.removeChild( Forums[0] )
}