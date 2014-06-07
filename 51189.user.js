// ==UserScript==
// @name           test
// @namespace      
// @description    Removes Recent Messages button
// @include        *.fantasysports.yahoo.com/*
// @author         
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==

(function() {
    
div recentmessages = document.getElementById( 'yspmainmodule' );

var lis = yspmainmodule.getElementsByTagName( 'recentmessages' );
lis[ 0 ].parentNode.removeChild( lis[ 0 ] );

})();