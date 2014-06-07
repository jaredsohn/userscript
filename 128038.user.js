// ==UserScript==
// @name          mouseless
// @namespace     http://www.userscripts.org
// @description   Browse internet without mouse (for Google Chrome only).
// @include       *
// @exclude       https://mail.google.com/*
// @exclude       https://www.google.com/*
// @version       0.92
// @updateURL     https://github.com/bvk/mouseless/raw/master/mouseless.user.js
// ==/UserScript==

// Some global variables. FIXME: Global variables are bad.
var keyZero = 48
var keyNine = 57
var keyReturn = 13
var keyShift = 16
var keyControl = 17
var highlightColor = '#49A8FF' // Color that Matches with default Chrome theme.

var keysCaptured = ""

var linkSelected = null
var linkBackgroundColor = null

function log(message) {
    // GM_log(message)
}

// Perform a click on an link.
function clickAnchor(anchor) {
    try {
        anchor.focus()
        anchor.click()
    } catch (ex) {
        // If click() method doesn't work!
        var event = document.createEvent("MouseEvents")
        event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                             false, false, false, false, 0, null)
        anchor.dispatchEvent(event)
    }
}

// Check if the link element is eligible for keyboard navigation.
function goodLink(anchor) {
    if (!anchor.href || anchor.href.length == 0)
        return false
    return true
}

// Update the stylesheet so that current selection is highlighted.
function highlightLink() {
    var anchors = document.body.getElementsByTagName("a")
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i]
        if (!goodLink(anchor))
            continue

        var linkIndex = anchor.getAttribute('linkIndex')
        if (!linkIndex)
            continue

        if (linkIndex == parseInt(keysCaptured)) {
	    if (linkSelected)
		linkSelected.style.backgroundColor = linkBackgroundColor
	    linkSelected = anchor
	    linkBackgroundColor = anchor.style.backgroundColor
	    anchor.style.backgroundColor = highlightColor
	    log("highlighted " + anchor.href + " to red")
	    return
	}
    }
}

// Reset the state.
function reset() {
    if (linkSelected)
	linkSelected.style.backgroundColor = linkBackgroundColor
    linkSelected = null
    linkBackgroundColor = null
    keysCaptured = ""
}

// Return True if 'elem' needs keystrokes as its input.
function inputElement(elem) {
    if (elem.disabled)
	return false

    var tag = elem.tagName.toUpperCase()
    if (tag == "TEXTAREA")
	return true

    if (elem.type) {
	var type = elem.type.toUpperCase()
	if (tag == "INPUT" && (type == "TEXT" || type == "PASSWORD"))
	    return true
    }

    return false
}

// Capture keyboard events and take action if necessary.
function captureKey(event) {
    // If any editable input element has the focus, do not handle keyboard
    // events.
    var elem = document.activeElement
    if (inputElement(elem)) {
	reset()
	log("Editable element has the focus; resetting mouseless state")
        return
    }

    if (event.keyCode == keyReturn && keysCaptured.length != 0) {
        if (keysCaptured == "0") {
            log("Back to the old page.")
            history.back()
            return
        }

	if (!linkSelected) {
	    log("No link is currently selected.")
            return
	}

        event.preventDefault()
        event.stopPropagation()
	if (event.ctrlKey) {
	    log("Opening link " + linkSelected.href + " in a new window")
	    window.open(linkSelected.href)
            if (event.shiftKey)
                self.focus()
            reset()
            return
	}
	log("Opening link " + linkSelected.href)
        clickAnchor(linkSelected)
    } else if (event.keyCode >= keyZero && event.keyCode <= keyNine) {
	log("Received event with number, " + (event.keyCode - keyZero))
        keysCaptured += (event.keyCode - keyZero)
    } else if (event.keyCode == keyControl || event.keyCode == keyShift) {
	// Control+Enter or Control+Shift+Enter should open the link in new
	// tab, so don't reset the keyboard state on control.
    } else {
	reset()
    }
    highlightLink()
}

// Apply a counter to each link.
function resetLinks() {
    var anchors = document.body.getElementsByTagName("a")
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i]
        if (!goodLink(anchor))
            continue

        // Link number zero is reserved for Back button.
        anchor.setAttribute('linkIndex', i + 1)
    }
}

// Update the CSS stylesheet to display link counters.
function updateStyleSheet() {
    var head = document.getElementsByTagName('head')[0]
    if (!head)
	return

    head.appendChild(document.createElement('style'))
    var style = document.styleSheets[document.styleSheets.length - 1]
    style.insertRule("a:after { " +
                     "  content: attr(linkIndex);" +
                     "  font-size: .5em;" +
                     "  font-style: italic;" +
                     "  margin: 1px;" +
                     "  vertical-align: super;" +
                     "}", 0)
}

reset()
resetLinks()
updateStyleSheet()
window.addEventListener("keydown", captureKey, true)
