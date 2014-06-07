// ==UserScript==
// @name          Slideshare a Better one
// @namespace     http://www.slideshare.com/better/one
// @description   Browsing Slideshare with pleasure
// @include       http://www.slideshare.net/*/*
// @author        wharsojo
// @version       0.1
// ==/UserScript==

(function() {
  $ = unsafeWindow.jQuery;
  $('#google_ads_div_slideview_right_1,.slideview_bottom2_fill,.banner,.ad_300x250').hide();
  $('#moreRelated,#relatedList,#moreList').css('height','800px');
}());
