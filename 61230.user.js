// ==UserScript==
// @name           Ogame Redesign: EventBox Anti-block
// @namespace      antikiller
// @description    Prevent EventBox on specified pages from being blocked with ABP
// @version        0.2
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function() {
	// List in square brackest all needed pages separated with comma
	// Example: var pages = ['overview','fleet1','messages'];
	var pages = ['overview'];
	
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	
	if ( typeof unsafe.initAjaxEventbox != "function" ) return;

	var page = document.body.id;
	if (!page) return;
	
	for (var i in pages)
		if ( pages[i] == page ) {

				unsafe.initAjaxEventbox = function()
				{
					unsafe.$.get(
						"index.php?pro=1&page=fetchEventbox&session="+unsafe.session+"&ajax=1",
						unsafe.reloadEventbox,
						"text"
					);
				}
				
				unsafe.initAjaxEventbox();
				
				break;
		}
	
})()