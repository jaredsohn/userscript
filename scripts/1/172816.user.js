// ==UserScript==
// @name        Auto-comment Close Reasons on Stack Exchange
// @description Automatically adds a comment when voting to close a question
// @version     1.2.0
// @match       http://*.askubuntu.com/*
// @match       http://*.mathoverflow.net/*
// @match       http://*.onstartups.com/*
// @match       http://*.serverfault.com/*
// @match       http://*.stackapps.com/*
// @match       http://*.stackexchange.com/*
// @match       http://*.stackoverflow.com/*
// @match       http://*.superuser.com/*
// ==/UserScript==

// Idea of creating a script element and adding then removing it shamelessly stolen from http://userscripts.org/scripts/review/125051

var sEl = document.createElement('script')
sEl['textContent' in sEl ? 'textContent' : 'text'] = '(' +function() {
    $(document).on('click', '.popup-submit', function() {
        // Pull up the comment box if it's not there already
    	$('.question').find('.comments-link').click()
        // Get the text to put in the comment (the reason)
        var commentText = $('.action-selected').find('[class^=action-]').last().html()
        // Convert HTML to markdown (this is very ugly :/ )
        commentText = commentText.replace(/<span.*class="bounty-indicator-tab.*<\/span>/, '')
                                 // Also, trim the string
                                 .trim()
                                 .replace(/<\/?b>/g, '**').replace(/<\/?i>/g, '*')
                                 .replace(/<a href="(.*?)".*?>(.*?)<\/a>/g, '[$2]($1)')
        // Set the comment box's text to the text we want it to be
        $('.question').find('textarea').text(commentText)
    })
} + ')()'
document.head.appendChild(sEl)
sEl.parentNode.removeChild(sEl)