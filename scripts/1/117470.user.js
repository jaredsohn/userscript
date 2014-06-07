// ==UserScript==
// @author         Gazonk Foo
// @name           Autohide Battle Windows
// @namespace      eAutohideBattleWindows
// @description    automatically hide windows shown in battle
// @version        0.0.1
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$j = unsafeWindow.jQuery; letsJQuery();
	}
}

GM_wait();

function letsJQuery() {
	if (typeof unsafeWindow == 'undefined') {
		unsafeWindow = window;
	}
	
	unsafeWindow.battleFX.pop = function(target, width) {
		if (target == "enemy_defeated") {
			setTimeout(function() {
					unsafeWindow.closeAddDamagePopup();
				}, 500
			);
		} else if (target == "collection_complete") {
			setTimeout(function() {
					$j('#pvp').unblock();
				}, 500
			);
		} else {
			if (typeof(width) == 'undefined' || typeof(width) == undefined) {
				width = '396px';
			}
			
			var useTarget = $j('#'+target)[0];
			$j('#pvp').block({
				message: useTarget,
				overlayCSS: {
					backgroundColor: '#000207',
					opacity: 0.5
				},
				css: {
					width: width
				}
			});
		}
		
		return false;
	}
}