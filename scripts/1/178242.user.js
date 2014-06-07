// ==UserScript==
// @name         InoReader Linker Plus
// @namespace    http://userscripts.org/users/92143
// @version      1.8
// @description  Copies the rightmost external link of an article entry to its title, widens mark-as-read stripes, and suppresses expansion/collapse upon click on title in InoReader. 
// @include      /^https?\:\/\/www\.inoreader\.com(\/.*)?$/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

function addLink(insertedNode) {
	$(insertedNode).find('span[id^="at_"]').each(function() {
		var $this = $(this)
		var $linkButton = $(insertedNode).find('a[id^="aurl_"]')
		var $link = $('<a/>')
		//enable right click
		.attr('href', $linkButton.attr('href'))
		$this.wrap($link)
		.hover(function() {
			$this.css('text-decoration', 'underline')
		}, function() {
			$this.css('text-decoration', 'none')
		})
		//increase responsiveness and prospective compatibility with other scripts
		.click(function(event) {
			window.open($linkButton.attr('href'))
			event.stopPropagation()
			//cannot be omitted
			event.preventDefault()
			if($(this).closest('.ar').hasClass('article_unreaded')) {
				mark_read(this.id.substring('at_'.length))
			}
		})
	})
}

$(document)
.on('DOMNodeInserted', '.ar.article_unreaded, .ar.article', function(event) {
	addLink(event.target)
})
.on('DOMContentLoaded', function(event) {
	$('<style type="text/css" />').html(
		//widen mark-as-read stripes
		'.article_unreaded, .article {border-left-width: 12px !important}' + 
		'.article_stripe {width: 12px !important; left: -12px !important;}' + 
		'.article_footer {margin-left: 0px !important;}'
	).appendTo('body')
})
