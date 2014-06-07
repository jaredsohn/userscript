// ==UserScript==
// @id             page-navigation
// @name           Page navigation
// @version        1.0
// @namespace      
// @author         Tenno Seremel
// @description    
// @include        *
// @run-at         document-start
// @noframes
// @homepage http://userscripts.org/scripts/show/477132
// @updateURL http://userscripts.org/scripts/source/477132.user.js
// ==/UserScript==
(function(){

function on_keypress(e) {
	var target = e.target;
	if (target) {
		var target_name = target.nodeName.toLowerCase();
		if (
			(
				(target_name != "input") && (target_name != "textarea")
			) || (
				(target_name == "input") && (target.getAttribute("type").toLowerCase() == "submit")
			)
		) {
			var keys = [
				{key: KeyboardEvent.DOM_VK_RIGHT, rel: "next", ctrl: true, shift: false},
				{key: KeyboardEvent.DOM_VK_LEFT, rel: "prev", ctrl: true, shift: false},
				{key: KeyboardEvent.DOM_VK_LEFT, rel: "previous", ctrl: true, shift: false},
				{key: KeyboardEvent.DOM_VK_UP, rel: "up", ctrl: true, shift: false},
				{key: KeyboardEvent.DOM_VK_RIGHT, rel: "last", ctrl: true, shift: true},
				{key: KeyboardEvent.DOM_VK_LEFT, rel: "first", ctrl: true, shift: true},
			];
			for(var i=0, len=keys.length; i<len; ++i){
				var current = keys[i];
				if((e.keyCode == current.key) && (e.ctrlKey == current.ctrl) && (e.shiftKey == current.shift) && !e.altKey && !e.metaKey) {
					e.stopPropagation();
					e.preventDefault();
					var link = document.querySelector(':root > head > link[rel="' + current.rel + '"]');
					if (link !== null) {
						var link_value = link.getAttribute("href");
						if (link_value != "") {
							window.location = link_value;
							break;
						}
					}
				}
			}
		}
	}
}

document.addEventListener("keypress", on_keypress, false)

})();
