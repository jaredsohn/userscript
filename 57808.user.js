// ==UserScript==
// @name           The-west city profile
// @namespace      www.the-west.pl
// @description    Script toggle city profile
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

document.getElementById( "windows" ).addEventListener( "DOMNodeInserted", nodeInserted, false );

function nodeInserted( event )
{
    if ( div = document.querySelector( "div.city_profile" ) ) 
    {
        div.style.display = "none";
        div = document.querySelector( "div.profile_reopen" );
        div.style.display = "block";
    }
}