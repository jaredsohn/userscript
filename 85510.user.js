// ==UserScript==
// @name           The-West Kasaba Profili
// @namespace      www.the-west.org
// @description    Her hangi bir kasabaya tıkladığınızda, açılan pencerede profil kısmı otomatik gizli konuma gelir.
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