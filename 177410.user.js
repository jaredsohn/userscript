// ==UserScript==
// @name         InoReader Linker
// @namespace    http://userscripts.org/users/92143
// @version      0.9
// @description  Copies the rightmost external link of an article entry to its title in InoReader. 
// @include      /^https?\:\/\/(www|beta)\.inoreader\.com(\/.*)?$/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-start
// ==/UserScript==

function addLink(insertedNode) {
	$(insertedNode).find('span[id^="at_"]').each(function() {
		var $this = $(this)
		var $linkButton = $(insertedNode).find('a[id^="aurl_"]')
		var $link = $('<a/>')
		//enable right click
		.attr('href', $linkButton.attr('href'))
		//increase responsiveness
		.click(function(event) {
			event.preventDefault()
		})
		$this.wrap($link)
		.hover(function() {
			$this.css('text-decoration', 'underline')
		}, function() {
			$this.css('text-decoration', 'none')
		})
		//increase responsiveness and prospective compatibility with other scripts
		.click(function() {
			window.open($linkButton.attr('href'))
		})
	})
}

$(document)
.on('DOMNodeInserted', '.ar.article_unreaded, .ar.article', function(event) {
	addLink(event.target)
})
