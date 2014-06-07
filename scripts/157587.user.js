// ==UserScript==
// @id             delfi.lv-pageswitch
// @name           Delfi.lv faster page switching
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://*.delfi.lv/*.d?*
// @include        http://delfi.lv/*.d?*
// @run-at         document-end
// ==/UserScript==

window.pgw = function () {

	var $ = unsafeWindow.$;

	var $mw = $('#multipagewrap');

	if ($mw.length) {
		$mw.find('a').click(function () {
			if (this.pathname != document.location.pathname) {
				return true;
			}
			
			$.ajax(this.href, {
				complete : function ($xhr) {
					$mw.replaceWith($($xhr.responseText).find('#multipagewrap'));
					window.pgw();
				}
			});
			
			return false; 
		});
	}

}
window.pgw();