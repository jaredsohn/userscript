// ==UserScript==
// @name           Yahoo Fantasy Football Smack Edit Fix
// @namespace      Yahoo
// @description    Fixes the smack edit on the match up window in linux.
// @include        *football.fantasysports.yahoo.com/*matchup*
// @author         Ray Logel
// ==/UserScript==

(function() {

for( var i = 1; i <= 2; i++)
{
    var widget = document.getElementById( 'smack' + i );
    if(widget != null)
    {
        widget.style.height = '72px';
        widget = document.getElementById( 'smackcontent' + i );
        widget.style.height = '70px';
    }
}

})();
