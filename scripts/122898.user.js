// ==UserScript==
// @name           Onet.pl Video Ad Skipper
// @namespace      AmpliDude
// @description    Wyłącza reklamy występujące przed materiałem filmowym (akutalnie nie działa)
// @include        http://*.onet.pl/*
// @include        http://www.plejada.pl/*,wideo.html*
// @include        http://vod.pl/*
// @include        http://www.medonet.pl/wideo/*
// @version        1.0.9
// ==/UserScript==

/*
(function() {
	var check1 = 0;
	
	window.setTimeout(function(){delayedCheck1()}, 100);
	
	function delayedCheck1() {
		id = (document.querySelector("[id^='mvp:']") || { "id": "" }).id;
		m01 = typeof unsafeWindow.mvp != 'undefined';
		m02 = (m01 ? typeof unsafeWindow.mvp.PlayerFacade != 'undefined' : false);
		m03 = (m02 ? unsafeWindow.mvp.PlayerFacade.getInstance() : false);
		m04 = (m03 ? typeof m03.view.mediatorMap["PlayerMediator_" + id] != 'undefined' : false);
		if (m04) {
			m05 = m03.view.mediatorMap["PlayerMediator_" + id]._configuration.configurationVO;
			m05.enableAds = false;
		} else {
			if (check1 > 50) return;
			check1++;
			window.setTimeout(function(){delayedCheck1()}, 100);
		}
	}
})();
*/