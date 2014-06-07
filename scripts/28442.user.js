// ==UserScript==
// @name          	Google Search Cookie Cleaner
// @namespace           http://userscripts.org/scripts/show/6984
// @description  Clean your Google Cookie
// @include	http://www.google.*/search?*
// @include	http://google.*/search?*
// ==/UserScript==
(function(){
	var g2 = {
		DeleteCookies: function() {
			var domain = location.host.match(/google\..+$/)[0];
			document.cookie = 'SID=; domain=.'+domain+'; path=/';
			document.cookie = 'S=; domain=.'+domain+'; path=/';
			document.cookie = 'SS=; domain=.'+domain+'; path=/';
                        document.cookie = 'LSID=; path=/accounts';
			document.cookie = 'TZ=; domain=.'+domain+'; path=/';
			document.cookie = 'GoogleAccountsLocale_session=; domain=.'+domain+'; path=/accounts/';
			document.cookie = 'PREF=; domain=.'+domain+'; path=/';
		},
		init : function(){
			this.DeleteCookies();
		}
	}
	g2.init();	
})();

