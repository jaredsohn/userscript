// ==UserScript==
// @name           Foursquare SU powertools
// @namespace      crispykangaroo.com
// @description    Provide a set of links and functionality to enable Foursquare SU's to work faster.
// @include        http://foursquare.com/*
// @include        https://foursquare.com/*
// @include        http://*.foursquare.com/*
// @include        https://*.foursquare.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

// Version:         	0.1.3
// Last updated:    	16/06/2011
// Author:          	Michael Harris
// Credits:		Thanks to Brock Adams from Stack Overflow for his assistance in constructing this script.

var SearchRezLinks  = $("div.searchResult div.name > a");

/*--- Link is like: <a href="/venue/6868983">Dumpling King</a>
    where 6868983 is venue ID.

    Want to add: <a href="/venue/venueid/edit">Manage venue</a>
    <a href="/edit_venue?vid=venueid">Edit venue</a>
*/
SearchRezLinks.each (function () {

    var jThis       = $(this);
    var venueID     = jThis.attr ('href').replace (/\D+(\d+)$/, '$1');
    jThis.parent ().append (' (' + venueID + ') ');
    jThis.parent ().append ('<a href="/venue/' + venueID + '/edit">Manage venue</a>');
    jThis.parent ().append ('<a href="/edit_venue?vid=' + venueID + '">Edit venue</a>');
} );


GM_addStyle ( (<><![CDATA[
    div.searchResult div.name > a + a
    {
        font-size:      0.7em;
        margin-left:    2em;
    }
]]></>).toString () );