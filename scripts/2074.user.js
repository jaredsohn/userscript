// ==UserScript==// @name          Hide Google Ads// @description   Google ads sux. Removes them all. Created by Nando Vieira - simplesideas.com.br.// @namespace     http://simplesideias.com.br/greasemonkey/googleads// @include       *// ==/UserScript==

(function() {
    var _iframes   = document.getElementsByTagName('iframe');
    
    if (!_iframes) return;
    
    var len        = _iframes.length;
    
    for (var i = len-1; i >= 0; i--) {
        var f = _iframes[i];

        if (f.name == 'google_ads_frame')
            f.parentNode.removeChild(f);
    }
})();

