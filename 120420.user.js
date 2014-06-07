// ==UserScript==
// @name        HappyEzPublish
// @description Add some happyness to eZ Publish Back-Office
// @id          me.zilliox.HappyEzPublish
// @homepageURL http://userscripts.org/scripts/show/120420
// @supportURL  http://userscripts.org/scripts/discuss/120420
// @updateURL   http://userscripts.org/scripts/source/120420.meta.js
// @version     2012.02.18
// @author      tzilliox
// @namespace   http://zilliox.me
// @include        *
// ==/UserScript==

(function(){
	var execute = function(){
		if (typeof window.jQuery !== 'undefined') {
			var $ = window.jQuery;
			if ( $('#header a[href*="/content/dashboard"][title^="eZ Publish"]').length > 0 ) {
				$('#header').css({background: "url('http://zilliox.me/resource/greasmonkey/happy_ez_background.png')"});
			}
		}
	};
	var script = document.createElement("script");
	script.innerHTML = '(' + execute.toString() + ')();';
	document.head.appendChild(script);
})();