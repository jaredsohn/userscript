// ==UserScript==
// @name           CBS Sports Fantasy Baseball Roster Warning
// @namespace      http://glenncarr.com/greasemonkey/fantasybaseball
// @include        http://*.baseball.sportsline.com/teams/page*
// @description    Move the roster warning below the lineup to keep the lineup table from moving while making changes
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 428 $
// $LastChangedDate: 2008-04-11 09:17:56 -0500 (Fri, 11 Apr 2008) $
// ==/UserScript==
(function(){

var rosterWarning = document.getElementById( 'roster_warning' );
if ( rosterWarning == null )
    return;

var forms = document.getElementsByTagName( 'form' );
if ( forms.length == 0 )
    return;
    
forms[ forms.length - 1 ].parentNode.insertBefore( rosterWarning, forms[ forms.length - 1 ].nextSibling );

})();