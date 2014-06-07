// ==UserScript==
// @name           CBS Sportsline Remove Ads
// @namespace      http://glenncarr.com/greasemonkey/cbssportsline
// @description    Remove ads from sportsline.com
// @include        *.baseball.sportsline.com*
// $LastChangedRevision: 429 $
// $LastChangedDate: 2008-05-22 07:58:04 -0500 (Thu, 22 May 2008) $
// ==/UserScript==
(function(){

var towerAd = document.evaluate( '//table[@width="980"]/tbody/tr/td[@width="160"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( towerAd.snapshotLength == 0)
    return;

var towerAd = towerAd.snapshotItem( 0 );
towerAd.parentNode.removeChild( towerAd );

})();