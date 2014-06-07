// ==UserScript==
// @name           AppTrackr rightclick fix
// @namespace      http://userscripts.org/users/160185
// @description    Fixes annoying rightclick behaviour
// @include        http://apptrackr.org/
// ==/UserScript==

(function($) {
	$(document).ready(function(e) {
		$(".appclick").die("click");
		
		$(".appclick").live("click", function(e) {
			if (e.button != 0) 
				return true;

			unsafeWindow.apptrackr.getPage('viewapp', {appid: $(this).attr("name")});
			return false;
		});
	});
})(unsafeWindow.jQuery);