// ==UserScript==
// @name        TPB Ads Remover
// @namespace   http://userscripts.org/scripts/show/441880
// @description Removes ads on TPB
// @include     https://thepiratebay.se/*
// @include     http://thepiratebay.se/*
// @version     0.1
// @grant       none
// ==/UserScript==

(function(){
	var $tbp_ads_remover = {
		init : function() {
			this.remove_iframes()
		},
		
		remove_iframes : function(){
			var all_iframes = [].slice.call(document.getElementsByTagName('iframe'));
			for (var i = 0, k = all_iframes.length; i < k ; i++) {
				var el = all_iframes[i];
				el.parentNode.removeChild(el);
			}
		}
	
	};
$tbp_ads_remover.init();	
})();