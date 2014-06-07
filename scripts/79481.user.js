// ==UserScript==
// @name           Games Workshop auto country selector
// @namespace      blambi.chebab.com
// @description    Sets your language/country cookie so you don't have to select it every now and then.
// @include        http://www.games-workshop.com/*
// @include        http://games-workshop.com/*
// ==/UserScript==

// Set your country code (for example sweden is sv_SE, check your
// gws-user cookie)
var country = "sv_SE";

/* Copyright (C) 2010 Patrik Lembke

   Copying and distribution of this file, with or without modification,
   are permitted in any medium without royalty provided the copyright
   notice and this notice are preserved.  This file is offered as-is,
   without any warranty.
*/

/* version 0.2 */

function set_cookie()
{
    var date = new Date();
    date.setTime( date.getTime() + ( 24*60*60*1000 ) );
    document.cookie = "gws-user=" + country + "; expires=" +
        date.toGMTString() + "; domain=www.games-workshop.com; path=/;";
}

if( location.href.indexOf(
        'http://www.games-workshop.com/gws/globalLanding.jsp') >= 0 )
{
    /* Yepp just set the cookie and reload (why not let their
     * javascripts etc do all the work for us :) */
    set_cookie();
    window.location.reload();
}
else if( location.href == 'http://www.games-workshop.com/gws/' )
{
    /* just set the cookie and go home ;) */
    set_cookie();
    window.location.assign( 'http://www.games-workshop.com/gws/home.jsp' );
}
