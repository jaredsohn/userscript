// ==UserScript==
// @name         Google Input Focus
// @namespace    http://userscripts.org/users/92143
// @version      0.9
// @description  For users who have turned off Instant Search, adds a search box near the bottom of Google search results, sets focus in the top search box wherever you type, and selects all text when the cursor is hovering over an unselected search box. 
// @include      *://www.google.*/search?*
// @include      *://www.google.*/cse?*
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

var KEY_DELAY = 100
var isFocusInSearchBox = false
var isFocusInClonedSearchBox = false
var INSERT_AFTER_SELECTOR = '#cnt'
var INSERT_AFTER_SELECTOR_CSE = '#cse'
var clonedFormId = ''

;(function($) {
	$.fn.delayedKeyup = function(callback, delay) {
		var timer = null
		this.keyup(function() {
			clearTimeout(timer)
			timer = setTimeout(callback, delay)
		})
		return this
	}
})(jQuery)

setTimeout(main, 0)

function main() {

	$searchForm = $('form:first')
	$clonedSearchForm = $searchForm.clone().attr('id', function() {
		clonedFormId = $(this).attr('id') + "_1"
		$('#' + clonedFormId).remove()
		return clonedFormId
	})
	//resize
	.css('min-width', '537px').css('max-width', '656px')
	//add bottom padding and center
	.css('padding-bottom', '100px').css('margin', '0 auto')
	//resize input
	$clonedSearchForm.find('#gbqff').css('min-width', '377px').css('max-width', '496px')
	//remove search by voice and safe search options
	$clonedSearchForm.find('#gs_st0, #sfopt').remove()
	//add a search bar near the bottom; duplicate id's are error-prone, though
	$clonedSearchForm.insertAfter(INSERT_AFTER_SELECTOR)
	//google custom search is not fully supported and no bottom search box will be added
	//.insertAfter(INSERT_AFTER_SELECTOR + ', ' + INSERT_AFTER_SELECTOR_CSE)
	$searchBox = $('input[type="text"]:first', $searchForm)
	$clonedSearchBox = $('input[type="text"]:first', $('#' + clonedFormId))	

	$(document).keydown(function(event) {
		if(!isFocusInSearchBox && !isFocusInClonedSearchBox) {
			//event.metaKey may not work properly under linux
			if(event.ctrlKey || event.altKey || event.metaKey) {
				event.stopImmediatePropagation()
			}
			else {
				if (isKeyIgnored(event.which)) {
					event.stopImmediatePropagation()
				}
			}
		}
	})

	$(document).one('keydown',  function(event) {
		goToSearchBoxEnd($searchBox[0], event.which, event.target)
	})

	$searchBox.delayedKeyup(function() {
		$clonedSearchBox.val($searchBox.val())
	}, KEY_DELAY)
	$clonedSearchBox.delayedKeyup(function() {
		$searchBox.val($clonedSearchBox.val())
	}, KEY_DELAY)

	$searchBox.focus(function() {
		isFocusInSearchBox = true
	})
	.blur(function() {
		isFocusInSearchBox = false
		$(document).one('keydown',  function(event) {
			goToSearchBoxEnd($searchBox[0], event.which, event.target)
		})
		$(this).one('mouseenter', function() {
			if(!isFocusInSearchBox) {
				$(this).focus().select()
			}
		})
	})
	.one('mouseenter', function() {
		if(!isFocusInSearchBox) {
			$(this).focus().select()
		}
	})
	$clonedSearchBox.focus(function() {
		isFocusInClonedSearchBox = true
	})
	.blur(function() {
		isFocusInClonedSearchBox = false
		$(document).one('keydown',  function(event) {
			event.target.nodeName
			goToSearchBoxEnd($searchBox[0], event.which, event.target)
		})
		$(this).one('mouseenter', function() {
			if(!isFocusInClonedSearchBox) {
				$(this).focus().select()
			}
		})
	})
	.one('mouseenter', function() {
		if(!isFocusInClonedSearchBox) {
			$(this).focus().select()
		}
	})
	
	function goToSearchBoxEnd(searchBox, keycode, target) {

		if(isTargetEditable(target)) {
			return
		}
		if(!searchBox) {
			searchBox = $searchBox[0]
		}
		if(searchBox) {
			if (!isFocusInSearchBox && !isFocusInClonedSearchBox) {
				searchBox.value = searchBox.value.trim()
				//backspace and delete are exceptions; absence of keycode is permitted
				if(8 != keycode && 46 != keycode && '' != searchBox.value) {
					searchBox.value += ' '
				}
				searchBox.selectionStart = searchBox.value.length
				searchBox.focus()
			}
		}
		
	}

	function isKeyIgnored(keycode) {
		
		if (
			//delete is not ignored as it can be used to scroll to top search box without inputting any text
			//46 == keycode ||
			//print screen varies and is hence not considered
			//44 == keycode ||
			//shift is ignored as it cannot be used to scroll to top search box
			16 == keycode ||
			//space
			32 == keycode || 
			//enter
			13 == keycode || 
			//up
			38 == keycode ||
			//down
			40 == keycode || 
			//left
			37 == keycode || 
			//right
			39 == keycode || 
			//escape
			27 == keycode || 
			//tab
			9 == keycode ||
			//caps lock
			20 == keycode || 
			//windows option
			93 == keycode || 
			//home
			36 == keycode || 
			//end
			35 == keycode || 
			//insert
			45 == keycode || 
			//page up
			33 == keycode || 
			//page down
			34 == keycode || 
			//numlock
			144 == keycode || 
			//scroll lock
			145 == keycode || 
			//pause break
			19 == keycode || 
			//f1 - f12
			(111 < keycode && 124 > keycode)
		) {
			return true
		}
		return false
		
	}
	
	function isTargetEditable(target) {
		
		if(!target) {
			return false
		}
		var tag = target.nodeName
		if('INPUT' == tag || 
			'TEXTAREA' == tag || 
			'DATALIST' == tag || 
			target.isContentEditable) {
			return true
		}
		return false
		
	}

}
