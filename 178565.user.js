// ==UserScript==
// @name       Show code block lengths for codegolf.SE
// @description  For code golf, counts the number of characters in code blocks and displays them above.
// @match      http://codegolf.stackexchange.com/*
// @copyright  Public Domain (no copyright)
// ==/UserScript==

var oldonload = window.onload
window.onload = function() {

// inject a script element into the head so that jQuery is available
var scriptEl = document.createElement('script')
scriptEl.innerHTML = "$('pre code').each(function() { $(this).parent().before('<div style=\"border: 1px dotted #C0D4DB; border-bottom: none; border-radius: 5px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; padding: 3px; font: 12px monospace; display: inline; background-color: #F7FDFF; margin-left: 5px\">' + $(this).text().trim().replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, ' ').length + ' chars</div>') })"
document.head.appendChild(scriptEl)

oldonload()

}