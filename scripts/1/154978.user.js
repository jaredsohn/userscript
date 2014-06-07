// ==UserScript==
// @name       Fortrabbi Resetter
// @namespace  http://userscripts.org/scripts/show/154978
// @version    0.0.2
// @description  Simply reset freeze time on Fortrabbi app page every hour
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @match      http*://*.fortrabbit.com/apps/*
// @copyright  2012+, Festum
// ==/UserScript==
(function () {
	setInterval ( function () {
		jQuery("#freeze-reset").trigger('click');
	}, 3600000);
})();
