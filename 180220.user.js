// ==UserScript==
// @name         Direct Google
// @namespace    http://userscripts.org/users/92143
// @version      0.3
// @description  Removes Google search redirects and exposes "Cached" links. 
// @include      /^https?://www\.google\./
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

//do not run in frames or iframes
if (window.top == window.self) {
	function modifyGoogle() {
		//remove redirects
		$('a[onmousedown^="return rwt("]').removeAttr('onmousedown')
		//expose cached links
		$('li.action-menu-item.ab_dropdownitem a[href^="http://webcache.googleusercontent."]').each(
			function() {
				$(this).closest('div.action-menu.ab_ctl').after(' ').after($(this))
			}
		)
	}

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver
	if(MutationObserver) { 
		var observer = new MutationObserver(function(mutations) {
			modifyGoogle()
		})
		//tiny delay needed for firefox
		setTimeout(function() {
			if(1 == $('#main').length) {
				observer.observe($('#main').get(0), {
					childList: true, 
					subtree: true
				})
			}
			modifyGoogle()
		}, 100)
	}
	//for chrome v18-, firefox v14-, internet explorer v11-, opera v15- and safari v6-
	else {
		setInterval(function() {
			modifyGoogle()
		}, 500)
	}
}
