// ==UserScript==
// @name           Yahoo Football Projected Stats
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Fix display for projected stats page to default to the current week's projections instead of 'Season Total' (which is practically useless).
// @include        http://football.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 388 $
// $LastChangedDate: 2007-12-18 14:50:02 -0600 (Tue, 18 Dec 2007) $
// ==/UserScript==
(function() {

var projectedLink = document.evaluate("//ul/li/a[contains(@href,'&stat1=P')][contains(.,'Projected Stats')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( projectedLink.snapshotLength == 0 )
    return;
    
var projectedLink = projectedLink.snapshotItem( 0 );
projectedLink.href += '&stat2=PW';

})();