// ==UserScript==
// @name           Yahoo Fantasy League Header Remover
// @namespace      http://glenncarr.com/greasemonkey/fantasysports
// @description    Removes larger header at the top of Yahoo fantasy leagues
// @include        *fantasysports.yahoo.com*
// $LastChangedRevision: 105 $
// $LastChangedDate: 2007-06-03 08:06:34 -0500 (Sun, 03 Jun 2007) $
// ==/UserScript==

(function(){

e = document.getElementById( 'yspmh' );
if ( e )
	e.parentNode.removeChild( e );

})();