// ==UserScript==
// @name        3zng Reeject
// @namespace   http://mp3.zing.vn/*
// @include     http://mp3.zing.vn/*
// @version     1
// ==/UserScript==

(function(a){	
	var s = a.createElement('script');
	s.innerHTML = 'void((function(d){d.Ads.removeBanner();d.Common.detectBannerAds()})(window))';
	a.body.appendChild(s);
})(document);
