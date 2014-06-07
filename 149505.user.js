// ==UserScript==
// @name           Letitbit Master
// @description    Helper for letitbit.net
// @version        1.1.2
// @date           2013-06-17
// @author         ReklatsMasters
// @homepageURL    http://userscripts.org/scripts/show/149505
// @updateURL      https://userscripts.org/scripts/source/149505.meta.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include        http://letitbit.net/download*
// @include        http://*.letitbit.net/download*
// @icon           http://images.letitbit.net/favicon.ico
// ==/UserScript==

(function(window){
	
	function main () {
		// удаляем фон
		document.body.className = '';

		if (location.pathname != '/download3.php') {
			// удаляем ссылки на рекламу
			var content = document.getElementsByClassName('page-content')[0];
			content.removeChild(content.lastChild);
			content.removeChild(content.lastChild);
			content.removeChild(content.lastChild);

			var unpack_detect = setInterval(function() {
				var free = $('#ifree_form')
					, ifree = free.find("input[type=hidden]")
					, count_inputs = ifree.length
				;

				if (count_inputs < 50) {
					clearInterval(unpack_detect);
					ifree.filter('[name=is_skymonk]').val('1');
					free.attr('action', '/download3.php').submit();
				}

			}, 100);
		}
	}

    window.addEventListener('DOMContentLoaded', main, false);
})(window);