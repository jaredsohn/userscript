// ==UserScript==
// @name           The West - Fort Profile
// @namespace      http://userscripts.org/scripts/show/112929
// @description    Hide the profile of the Fort
// @license        GNU Lesser General Public License (LGPL)
// @author         dikamilo
// @release        CWalter
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

document.getElementById( "windows" ).addEventListener( "DOMNodeInserted", nodeInserted, false );

function nodeInserted( event )
{
    if ( div = document.querySelector( "div.fort_profile" ) ) 
    {
        div.style.display = "none";
        div = document.querySelector( "div.profile_reopen" );
        div.style.display = "block";
    }
}