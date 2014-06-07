// ==UserScript==
// @name         Wayback Google
// @namespace    http://userscripts.org/users/92143
// @version      0.2
// @description  Adds WayBackMachine (archive.org) links to Google search results and automatically redirects to WayBackMachine when the Google "Cached" link fails (e.g. 404 error). 
// @include      /^https?://www\.google\./
// @include      /^https?://webcache\.googleusercontent\./
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

//google search
if('webcache' != location.hostname.split('.')[0]) {
	//do not run in frames or iframes
	if (window.top == window.self) {
		function modifyGoogle() {
			//add wayback machine archive links
			$('.rc .l a, .rc .r a, a.l').each(function() {
				if(!$(this).hasClass('wayback')) {
					var $container = 
					$(this).addClass('wayback').closest('li, td').find('cite:first').parent()
					var leftMargin = '0px'
					if('crc' == $container.children(':last-child').attr('class')) {
						leftMargin = '12px'
					}
					$container
					.append(' ')
					.append(
						$('<a/>')
						.attr('href', 'http://web.archive.org/web/' + $(this).attr('href'))
						.html('Wayback').attr('class', 'fl wayback')
						.css('margin-left', leftMargin)
					)
					.after(' ')
				}
			})
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
}
//google cache
else {
	//cache miss
	if(1 === $('code:contains("/search?q=cache:")').length) {
		location.replace('http://web.archive.org/web/' + /\=cache\:\w*\:([^\+]+)/.exec(location.search)[1])
	}
}
