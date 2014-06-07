// ==UserScript==
// @name      NO FACEBOOK ADS
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @include    http://apps.facebook.com/*
// @copyright  2011+, You
// ==/UserScript==

(function(){
unsafeWindow.hideAds = function()
    {
        document.getElementById('pagelet_ego_pane').style.visibility = 'hidden';
        document.getElementById('pagelet_ego_pane').style.display = 'none';
    }
setTimeout('hideAds();',5000);

})();

