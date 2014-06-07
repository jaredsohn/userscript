// ==UserScript==
// @name         Message Remover for MAL
// @namespace    http://userscripts.org/users/92143
// @version      0.4
// @description  Helps delete messages on myanimelist.net. 
// @include      /^http\:\/\/myanimelist\.net\/mymessages\.php/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// ==/UserScript==

var GET_DELAY = 1000
var POST_DELAY = 10
var PAGE_CAPACITY = 20
var POST_PAGE_DELAY = 2000

$deletePageElement = $('<a href="javascript:void(0)">Delete Shown</a>')
.click(function() {
	var response = confirm('Are you sure you want to delete all messages \n' + 
	'on this page?')
	if (true === response) {
		deletePage()
	}
})
$deleteAllElement = $('<a href="javascript:void(0)">All</a>')
.click(function() {
	var response = confirm('Are you sure you want to delete all messages \n' + 
	'in this box?')
	if (true === response) {
		deleteAll()
	}
})
$('.mym_actions_header').after(
	$('<span id="message_remover">&nbsp;</span>').append($deletePageElement)
	.append(document.createTextNode(' / ')).append($deleteAllElement)
)

var messageType, getPrefix
if(-1 !== location.href.indexOf('go=sent')) {
	messageType = 2
	getPrefix = 'mymessages.php?go=sent&show='
}
else {
	messageType = 1
	getPrefix = 'mymessages.php?go=&show='
}
var crawlerRegex = new RegExp('\\d+(?=\\,' + messageType + '\\)\\"\\>Delete\\<\\/a\\>)', 'g')

function deletePage() {
	
	$('#message_remover').html('&nbsp;Status: Deleting...')
	$('a[onclick^="delMessage("]').click()
	setTimeout(function() {
		location.reload()
	}, POST_PAGE_DELAY)
	
}

function deleteAll() {
	
	$('#message_remover').html('&nbsp;Status: Loading...')
	var pagesFetched = 0
	var maxPages
	var m = $('.total_messages').text().match(/Pages\ \((\d+)\)/)
	if(m && m[1]) {
		maxPages = parseInt(m[1])
	}
	if(isNaN(maxPages)) {
		maxPages = 1
	}
	var messageArray = []
	
	pageCrawler(getPrefix + ((maxPages - 1) * PAGE_CAPACITY))
	var countdown = maxPages
	while(--countdown) {
		;(function(offset) {
			setTimeout(function() {
				pageCrawler(getPrefix + offset)
			}, GET_DELAY)
		})((countdown - 1) * PAGE_CAPACITY)
	}
	
	function pageCrawler(url) {
		$.get(url, function(data) {
			$('#message_remover').html('&nbsp;Status: ' + ++pagesFetched + ' page(s) loaded')
			messageArray = messageArray.concat(data.match(crawlerRegex))
			if(maxPages <= pagesFetched) {
				deleteArray(messageArray)
			}
		})
	}
	
	function deleteArray(messageArray) {
		if(!messageArray) {
			$('#message_remover').html('&nbsp;Status: MAL is busy. Please retry.')
			return
		}
		$('#message_remover').html('&nbsp;Status: Deleting...')
		var arrayMessagesDeleted = 0
		var index = messageArray.length
		while(index--) {
			var messageId = parseInt(messageArray[index])
			if(messageId) {
				;(function(id) {
					setTimeout(function() {
						$.post('/includes/ajax.inc.php?t=75', {id: id, box: messageType}, function(data) {
							$('#message_remover').html('&nbsp;Status: ' + ++arrayMessagesDeleted + ' deleted')
							if(messageArray.length <= arrayMessagesDeleted) {
								location.href = getPrefix
							}
						})
					}, POST_DELAY)
				})(messageId)
			}
		}
	}
	
}
