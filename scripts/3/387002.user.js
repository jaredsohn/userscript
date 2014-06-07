// ==UserScript==
// @name                 qq红米f码
// @namespace            http://www.himno.com
// @description          fffff
// ==/UserScript==

define(["lib/jquery"], function(require){
	var $ = require("lib/jquery");
	var foo = {
		init: function(){

			var $item2 = $("#J_GetCode");
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if(! $item2.hasClass('mod_btn_dis')) {
						$item2.click();
						observer.disconnect();
					}
				});
			});
			
			observer.observe($item2.get(0), {
				'attributes': true,
				'attributeOldValue': true,
				'attributeFilter': ['class']
			});

		}

});