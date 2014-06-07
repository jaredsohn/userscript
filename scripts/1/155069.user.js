// ==UserScript==
// @name           Winter Village theme for Gmail
// @namespace      Gmail
// @description    Changes theme in Gmail to the Winter Village theme that was originally created for iGoogle (http://www.google.com/ig/directory?type=themes&url=skins/holidayvillage.xml)
// @include        https://mail.google.com/mail/u/0/*
// @updateURL      http://userscripts.org/scripts/source/155017.user.js
// @version        0.0.1
// @encoding       UTF-8
// ==/UserScript==

(function() {
	var timeWV = ['midnight','midnight','2am','2am', '4am','4am','6am','6am','8am','8am','10am','10am','noon','noon','2pm','2pm','4pm','4pm','6pm','6pm','8pm','8pm','10pm','10pm'];
	var dateWV = new Date();
	var minWV = 60 - dateWV.getMinutes();
	var hourWV;

	var changeThemeWV = function() {
		dateWV = new Date();
		hourWV = dateWV.getHours();
		var css = '.aAX {background: #fff url(http://www.google.com/ig/images/skins/holidayvillage/' + timeWV[hourWV] + '/header_tile.jpg) 50% 24px repeat-x !important;} #gbx1{background: none !important;}.G-atb, .G-as7-atb, .G-MI{margin-top: 9px !important;padding-bottom: 14px !important;}.w-asV.aiw{height: 142px !important;}.aki{padding-bottom: 29px !important;}.aAU {background: url(http://www.google.com/ig/images/skins/holidayvillage/' + timeWV[hourWV] + '/header_bg.jpg) 50% 24px no-repeat !important;} #gbx1{border-bottom: none !important;}#gbi4t{color: #EEEEEE !important;}.wl,.wq,.wp,.wo,.wn{display: none !important;}';
		var themeCssNode = document.getElementById('theme_css_WV');
		if (themeCssNode) {
			themeCssNode.parentNode.removeChild(themeCssNode);
		}
		themeCssNode = document.createElement('style');
		themeCssNode.type = 'text/css';
		themeCssNode.id = 'theme_css';
		document.getElementsByTagName('head')[0].appendChild(themeCssNode);
		if (themeCssNode.styleSheet) {
			themeCssNode.styleSheet.cssText = css;
		} else {
			var cssText = document.createTextNode(css);
			themeCssNode.appendChild(cssText);
		}
	};

	changeThemeWV();
	setTimeout(function() {
		changeThemeWV();
		setInterval(function() {
			changeThemeWV();
		}, 60 * 60 * 1000)
	}, minWV * 60* 1000);
})();