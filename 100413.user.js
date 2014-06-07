// ==UserScript==
// @name           Aljazeera English Flash Replacer
// @namespace      ajz-noflash@aykevanlaethem@gmail.com
// @include        http://english.aljazeera.net/watch_now/
// ==/UserScript==

// get encapsulating div
var div = document.getElementsByClassName('DetailedSummary')[0].childNodes[5];

var stream = 'rtmp://livestfslivefs.fplive.net/livestfslive-live/ playpath=aljazeera_en_veryhigh?videoId=747084146001&lineUpId=&pubId=665003303001&playerId=751182905001&affiliateId= pageURL=http://english.aljazeera.net/watch_now/ app=aljazeeraflashlive-live?videoId=747084146001&lineUpId=&pubId=665003303001&playerId=751182905001&affiliateId= swfUrl=http://admin.brightcove.com/viewer/us1.24.04.08.2011-01-14072625/federatedVideoUI/BrightcovePlayer.swf swfVfy=true live=true';

// original height: 440px
var style = 'width: 680px; height: 467px;'
var autostart = false;

// replace HTML
div.innerHTML = '<object style="'+style+'" type="application/x-totem-plugin" src="'+stream+'"><param name="ShowControls" value="true"><param name="autostart" value="true" /><object type="application/x-vlc-plugin" style="'+style+'" data="'+stream+'"><param name="ShowControls" value="true"><param name="autostart" value="true" /></object></object>';

