// ==UserScript==
// @name            _Square away foursquare
// @include         http://foursquare.com/*
// @include         https://foursquare.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

var SearchRezLinks  = $("div.searchResult div.name > a");

/*--- Link is like: <a href="/venue/6868983">Dumpling King</a>
    where 6868983 is venue ID.

    Want to add: <a href="/venue/venueid/edit">Manage venue</a>
    <a href="/edit_venue?vid=venueid">Edit venue</a>
*/
SearchRezLinks.each (function () {

    var jThis       = $(this);
    var venueID     = jThis.attr ('href').replace (/\D+(\d+)$/, '$1');
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