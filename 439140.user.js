// ==UserScript==
// @name         Link Visited
// @namespace    http://userscripts.org/users/92143
// @version      1.0
// @description  Marks same-domain hyperlinks as visited (and whitens them if needed) through dragging or hovering without actually opening them. Useful for forum browsing. May not work with Opera.
// @include      /^http\:\/\//
// @exclude      /^https\:\/\//
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

/* Default Shortcuts: 
 * ALT+Q - Mark all links as visited. 
 * ALT+U - Whiten (and hide given a white background) visited links. 
 * Dragging and Releasing a Link with Mouse - Mark the link as visited. 
 */

//meta key
var META_KEY = 'altKey'		//possible values: 'altKey', 'ctrlKey' and 'metaKey'
//mark all links as visited. 
var MARK_ALL_KEY = 'Q'		//possible values: A-Z and 0-9
//whiten links visited. 
var HIDE_UNHIDE_KEY = 'U'		//possible values: A-Z and 0-9
//whether to collapse space taken up by hidden links
var COLLAPSES = false
//prompt before marking all links as visited
var ASKS_BEFORE_MARK_ALL = true
//increase this value if this script fails to work or freezes browser UI
var DELAY = 100
//ignore hidden links
var IGNORES_HIDDEN = true
//default color is white, as most forums use a light color as background
var MASK_COLOR = 'White'
//time spent hovering before marking a link as visited; default is 3 seconds
var HOVER_THRESHOLD = 3000

var linkSelector
if(IGNORES_HIDDEN) {
	linkSelector = 'a:visible[href]'
}
else {
	linkSelector = 'a[href]'
}
var originalHref = location.href
var originalHost = location.protocol + '//' + location.host
var isHidden = false
var hoverTimer = null

$(document).keydown(function(event) {
	if(event[META_KEY]) {
		var keyAsChar = String.fromCharCode(event.which)
		if(MARK_ALL_KEY == keyAsChar) {
			if(ASKS_BEFORE_MARK_ALL) {
				var response = confirm('Mark all links as visited? (May take a while to finish!)')
				if (false === response) {
					return
				}
			}
			
			var dictionary = {}
			dictionary[originalHref] = true
			$(linkSelector).each(function(i) {
				var h = this.href
				if (dictionary[h]) {
					return
				}
				else {
					dictionary[h] = true
					setTimeout(function() {
						virtualVisit(h)
					}, i * DELAY)
				}
			})
			setTimeout(function() {
				virtualVisit(originalHref)
			}, $(linkSelector).length * DELAY)
		}
		else if(HIDE_UNHIDE_KEY == keyAsChar) {
			if(isHidden) {
				isHidden = false
				removeVisitedLinkStyle()
				$('body').hide(0).show()
			}
			else {
				isHidden = true
				addVisitedLinkStyle()
				$('body').hide(0).show()
			}
		}
	}
})

$(document)
.on('dragend', linkSelector, function() {
	virtualVisit(this.href)
	setTimeout(function() {
		virtualVisit(originalHref)
	}, DELAY)
})
.on('mouseover', linkSelector, function() {
	var h = this.href
	hoverTimer = setTimeout(function() {
		virtualVisit(h)
		setTimeout(function() {
			virtualVisit(originalHref)
		}, DELAY)
	}, HOVER_THRESHOLD)
})
.on('mouseout', linkSelector, function() {
	clearTimeout(hoverTimer)
})

function virtualVisit(href) {
	if(href.slice(0, originalHost.length) != originalHost) {
		return
	}

	try {
		history.replaceState({}, '', href)
	}
	catch(securityError) {
		//do nothing in case of security error
	}
}

function addVisitedLinkStyle() {
	var css = 'a:visited[href] {' + 
		'background-color: '  + MASK_COLOR + ' !important; ' + 
		'color: ' + MASK_COLOR + ' !important;}'
	var style = document.createElement('style')
	style.type = 'text/css'
	style.id = 'link_visited_style'
	if (style.styleSheet){
		style.styleSheet.cssText = css
	} else {
		style.appendChild(document.createTextNode(css))
	}
	document.body.appendChild(style)
}

function removeVisitedLinkStyle() {
	var style = document.getElementById('link_visited_style')
	style.parentElement.removeChild(style)
}
