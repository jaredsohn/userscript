// ==UserScript==
// @name         Article Link Before Title for InoReader
// @namespace    http://userscripts.org/users/92143
// @version      0.8
// @description  Moves the rightmost external link of an article entry to the left of its title in InoReader. 
// @include      /^https?\:\/\/(www|beta)\.inoreader\.com(\/.*)?$/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

function addLink(insertedNode) {
	$(insertedNode).find('.article_header_text')
	.before($(insertedNode).find('.header_buttons').click(function(event) {
		event.stopPropagation()
	}))
}

$(document)
.on('DOMNodeInserted', '.ar.article_unreaded, .ar.article', function(event) {
	addLink(event.target)
})
$(document)
.on('DOMContentLoaded', function(event) {
	GM_addStyle('.header_buttons .am {right: auto !important;}')
	GM_addStyle('.header_buttons {padding: 1px 5px 0px 0px !important;}')
})
