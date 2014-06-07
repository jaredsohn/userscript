// ==UserScript==
// @name           Universal GET Params Form Populator
// @namespace      http://zeke.sikelianos.com
// @date           2009-01-27
// @creator        Zeke Sikelianos (zeke.sikelianos.com), with jQuery inclusion help from http://joanpiedra.com/jquery/greasemonkey/
// @description    This script finds text fields on the page and populates them with the values of any corresponding GET parameters
// @include        *
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script')
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js'
GM_JQ.type = 'text/javascript'
document.getElementsByTagName('head')[0].appendChild(GM_JQ)

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait()

// Main function
function letsJQuery() {
	var inputs = $("form :text")
	for (var i=0; i<inputs.length; i++) {
		var input = inputs[i]
		
		// Try assigning value based on input's DOM name
		var get_value = value_of_get_param(input.name)
		if (get_value != null) input.value = get_value
		
		// Try assigning value based on input's DOM id
		var get_value = value_of_get_param(input.id)
		if (get_value != null) input.value = get_value
	}
}

function value_of_get_param(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]")
  var regexS = "[\\?&]"+name+"=([^&#]*)"
  var regex = new RegExp( regexS )
  var results = regex.exec( window.location.href )
  return (results==null) ? null : results[1].replace(/+/g, " ")
}