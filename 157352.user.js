// ==UserScript==
// @name          Drexel co-op listing readable descriptions
// @description   Reformat Drexel University’s co-op position description pages so the descriptions have separate paragraphs as they are supposed to. Also warns you of unpaid positions.
// @namespace     roryokane.com
// @include       https://banner.drexel.edu/pls/duprod/hwczkslib.P_StudentJobDisplay?*
// @grant         none
// @version       1.0.1
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min.js
// ==/UserScript==

var $ = jQuery.noConflict()
var _ = _.noConflict()


var combineFunctions = function(functions) {
	// unlike _.compose, this executes functions in order of the original array
	return _.compose.apply(undefined, functions.reverse())
}

var reformatPlaintextSourceElement = function($element) {
	// replace the field’s text with its HTML text including whitespace
	var rawHtml = $element.html()
	
	// leave the whole HTML alone if we detect that the current HTML actually has HTML tags
	var rawHtmlContainsLessThan = rawHtml.search(/</) !== -1
	var htmlIsPlainText = ! rawHtmlContainsLessThan // plain text would have '&lt;', not '<'
	if (!htmlIsPlainText) {
		return // HTML is already formatted; no reformatting needed
	}
	
	var improveHtml = combineFunctions([
		function(html) {
			// merge each line with the previous, only if it starts with a lower-case letter
			// If it starts with a capital letter, it may be a new paragraph or a heading.
			// If it starts with a symbol, it may be a bullet or other ad hoc formatting.
			return html.replace(/\n(?=[a-z])/g, ' ')
		},
		function(html) {
			var htmlForNewLine = '<br/>'
			return html.replace(/[\n]/g, htmlForNewLine)
		}
	])
	var betterHtml = improveHtml.call(undefined, rawHtml)
	
	$element.html(betterHtml)
}

var reformatDescriptions = function() {
	var misformattedFieldSelector = '.smallertext:nth-child(1)'
	var $misformattedFields = $(misformattedFieldSelector)
	$misformattedFields.each(function(index, misformattedField) {
		var $misformattedField = $(misformattedField)
		reformatPlaintextSourceElement($misformattedField)
	})
}


var highlightUnpaidPositions = function(callbackForUnpaidPosition) {
	var unpaidPositionStatusSelector = "span.bluesmallertext:contains('Unpaid Position:') + .smallertext"
	var $unpaidPositionStatus = $(unpaidPositionStatusSelector)
	
	var unpaidPositionText = $unpaidPositionStatus.text()
	if (unpaidPositionText === "Yes") {
		callbackForUnpaidPosition.call(undefined, $unpaidPositionStatus)
	}
}

var alertUnpaidStatus = function($unpaidPositionStatus) {
	alert('WARNING: This is an *unpaid* position.')
}

var applyAllCss = function(styles, $element) {
	_(styles).each(function(value, key) {
		$element.css(key, value)
	})
}

var highlightUnpaidStatus = function($unpaidPositionStatus) {
	var warningStyles = {
		'background-color': 'red',
		'color': 'white',
		'font-size': '200%'
	}
	applyAllCss(warningStyles, $unpaidPositionStatus)
}


reformatDescriptions()
highlightUnpaidPositions(alertUnpaidStatus)
