// ==UserScript==
// @name           Yahoo Fantasy Sort Team Dropdown
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Sort the list of teams in the dropdown list
// @include        *.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 338 $
// $LastChangedDate: 2007-09-25 09:55:00 -0500 (Tue, 25 Sep 2007) $
// ==/UserScript==
/*
    Updates:
    25-Sep-2007 - Fixed to work on team log page
*/

(function(){

var select = document.getElementById( 'otherteamnavselect' );
if ( !select )
    select = document.getElementById( 'midselect' );
if ( !select )
    return;

var newOptions = new Array();
for ( var i = 0; i < select.options.length; i++ )
    newOptions.push( { value:select.options[ i ].value, text:select.options[ i ].text, selected:(select.options[ i ].selected) } );

newOptions.sort( sortOptions );

select.innerHTML = '';
for ( var i = 0; i < newOptions.length; i++ )
    select.innerHTML += '<option value="' + newOptions[ i ].value + '"' + (newOptions[ i ].selected ? ' selected' : '' ) + '>' + newOptions[ i ].text + '</option>';

function sortOptions( a, b )
{
    if ( a.text.toLowerCase() < b.text.toLowerCase() )
        return -1;
    if ( a.text.toLowerCase() > b.text.toLowerCase() )
        return 1;
    return 0;
}

})();