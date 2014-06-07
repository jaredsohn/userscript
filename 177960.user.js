// ==UserScript==
// @name         Custom Tags Filter for MAL
// @namespace    http://userscripts.org/users/92143
// @version      0.5
// @description  Filters custom tags on MAL user lists while the user types. May not work with custom list layout. 
// @include      /^http\:\/\/myanimelist\.net\/animelist\/[^\/]+/
// @include      /^http\:\/\/myanimelist\.net\/mangalist\/[^\/]+/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      http://userscripts.org/scripts/source/164164.user.js
// @grant        GM_log
// ==/UserScript==

//increase KEY_DELAY to 1000 or greater should you have difficulty in typing fast
var KEY_DELAY = 500
//decrease BATCH_SIZE to 50 or less should you have a slow computer or 
//wish to observe page updating process
var BATCH_SIZE = 50000
var BATCH_DELAY = 10

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

function filter() {
	var includesText = $('#tagSearchInclude').val().toString()
	var excludesText = $('#tagSearchExclude').val().toString()
	if($('#tagSearchInclude').attr('hint') == $('#tagSearchInclude').val()) {
		includesText = ''
	}
	if($('#tagSearchExclude').attr('hint') == $('#tagSearchExclude').val()) {
		excludesText = ''
	}
	
	var $tablesWithTags = $('table:has("span[id^="tagLinks"]")')
	//initial values of batchElements, batchIndex and batchProcess do not make sense
	var batchElements = []
	var batchIndex = 0
	var batchProcess = function() {}
	if('' === includesText.trim() && '' === excludesText.trim()) {
		//user array
		batchElements = $tablesWithTags.toArray()
		batchIndex = 0
		batchProcess = function() {
			var count = BATCH_SIZE
			while(count-- && batchIndex < batchElements.length) {
				//start of user function
				if(batchElements[batchIndex].style && 
					'none' === batchElements[batchIndex].style.display && 
					'filtered' === batchElements[batchIndex].className) {
					batchElements[batchIndex].className = ''
					batchElements[batchIndex].style.display = ''
				}
				//end of user function
				batchIndex++
			}
			if (batchIndex < batchElements.length) {
				setTimeout(batchProcess, BATCH_DELAY)
			}
		}
		batchProcess()
	}
	else {
		var untrimmedIncludes = []
		if('' !== includesText.trim()) {
			untrimmedIncludes = includesText.toLowerCase().split(',')
		}
		var untrimmedExcludes = []
		if('' !== excludesText.trim()) {
			untrimmedExcludes = excludesText.toLowerCase().split(',')
		}
		//user array
		batchElements = $tablesWithTags.toArray()
		batchIndex = 0
		batchProcess = function() {
			var count = BATCH_SIZE
			while(count-- && batchIndex < batchElements.length) {
				//start of user function
				//ignore table elements hidden by other scripts
				if(batchElements[batchIndex].style && 
					'none' === batchElements[batchIndex].style.display && 
					'filtered' !== batchElements[batchIndex].className ) {
					batchIndex++
					continue
				}
				var tags = $('span[id^="tagLinks"]', batchElements[batchIndex]).text().toLowerCase().trim()
				//merge spaces; tabs are already reomved by MAL
				.replace(/\ \ +/g, ' ')
				var foundInclusion = 0
				var exclusionFound = false
				if ('' !== tags) {
					//"untrimmedIncludes.length = foundInclusion = 0" is considered
					for(var i = 0; i < untrimmedIncludes.length; i++) {
						var include = untrimmedIncludes[i].trim().replace(/\ \ +/g, ' ')
						if('' === include || tags.contains(include)) {
							foundInclusion++
						}
					}
					for(var j = 0; j < untrimmedExcludes.length; j++) {
						var exclude = untrimmedExcludes[j].trim().replace(/\ \ +/g, ' ')
						if('' !== exclude && tags.contains(exclude)) {
							exclusionFound = true
							break
						}
					}
					if(untrimmedIncludes.length === foundInclusion && !exclusionFound) {
						batchElements[batchIndex].className = ''
						batchElements[batchIndex].style.display = ''
					}
					else {
						batchElements[batchIndex].className = 'filtered'
						batchElements[batchIndex].style.display = 'none'
					}
				}
				else {
					if(0 === untrimmedIncludes.length) {
						batchElements[batchIndex].className = ''
						batchElements[batchIndex].style.display = ''
					}
					else {
						batchElements[batchIndex].className = 'filtered'
						batchElements[batchIndex].style.display = 'none'
					}
				}
				//end of user function
				batchIndex++
			}
			if (batchIndex < batchElements.length) {
				setTimeout(batchProcess, BATCH_DELAY)
			}
		}
		batchProcess()
	}
	
}

function addSearchBoxes() {
	
	$('<input id="tagSearchInclude" value="" hint="Include tags..."' + 
	'type="textbox" size="22" hasFocus="false" />')
	.insertAfter('#searchBox')
	$('<input id="tagSearchExclude" value="" hint="Exclude tags..."' + 
	'type="textbox" size="22" hasFocus="false" />')
	.insertAfter('#tagSearchInclude')
	
	$('#tagSearchInclude, #tagSearchExclude').each(function() {
		$(this).val($(this).attr('hint')).attr('style', 'float:left;font-size:12px;color:gray;')
		$(this).focus(function() {
			$(this).attr('hasFocus', 'true')
			if($(this).attr('hint') == $(this).val()) {
				$(this).val('').css('color', '')
			}
		}).blur(function() {
			$(this).attr('hasFocus', 'false')
			if('' == $(this).val()) {
				$(this).val($(this).attr('hint')).css('color', 'gray')
			}
			$(this).one('mouseenter', function() {
				if('false' == $(this).attr('hasFocus')) {
					$(this).focus().select()
				}
			})
		}).one('mouseenter', function() {
			if('false' == $(this).attr('hasFocus')) {
				$(this).focus().select()
			}
		}).delayedKeyup(function() {
			filter()
		}, KEY_DELAY)
	})
}

addSearchBoxes()
