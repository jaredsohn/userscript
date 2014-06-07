// ==UserScript==
// @name           Yahoo Fantasy Football Ad Remover
// @namespace      Yahoo
// @description    Removes Ads that are above Score board
// @include        *football.fantasysports.yahoo.com/*
// @author         Ray Logel
// ==/UserScript==

(function() {

var ids = ['yspadLREC', 'yspadREC', 'yspadSKY'];
    
for( var i = 0; i < ids.length; i++)
{
    var widget = document.getElementById( ids[i] );
    if(widget != null)
    {
        widget.parentNode.removeChild( widget );
    }
}

})();
