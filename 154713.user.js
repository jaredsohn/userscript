// ==UserScript==
// @name         No Redirects for Google Custom Search
// @namespace    http://userscripts.org/users/92143
// @version      2.1
// @description  Gets rid of Google tracking when you use Google Custom Search engines such as google-classic.com. 
// @include      /^https?://([^\.\/]+\.)?google\.[^\/]+\/cse\?/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

function removeRedirects() {
	$('a[href][data-cturl]').each(function() {
		var h = $(this).attr('href')
		if(h != $(this).attr('data-cturl')) {
			$(this).attr('data-cturl', h)
		}
	})
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver
if(MutationObserver) { 
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(mutation.target && 'gsc-control-wrapper-cse' == mutation.target.className) {
				removeRedirects()
			}
		})
	})
	if(1 == $('.gsc-control-wrapper-cse').length) {
		//tiny delay needed for firefox
		setTimeout(function() {
			observer.observe($('.gsc-control-wrapper-cse').get(0), {
				attributes: true
			})
			removeRedirects()
		}, 100)
	}
}
//for chrome v18-, firefox v14-, internet explorer v11-, opera v15- and safari v6-
else {
	setInterval(function() {
		removeRedirects()
	}, 500)
}
