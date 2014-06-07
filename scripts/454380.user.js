// ==UserScript==
// @name        webpjs - Display webp images - for Newztown
// @namespace   Newztown
// @include     /^https?://(www\.)?newztown\.co\.za/.*$/
// @grant none
// @run-at document-start
// @require http://webpjs.appspot.com/js/webpjs-0.0.2.min.js
// ==/UserScript==

// webpjs comes from http://webpjs.appspot.com/

// preventing weppy.js from running comes from dindog's @document-start Example: hijack page scripts
//    http://userscripts.org/scripts/show/125936

var changed = 0; // script need to be edited with

window.addEventListener('beforescriptexecute', function(e) {

    /// for external script:
	src = e.target.src;

	if (src.search(/weppy\.js/) != -1) {
		changed++;
		e.preventDefault();
		e.stopPropagation();
	};

    ///when done, remove the listener:
	if(changed == 1) {
		window.removeEventListener(e.type, arguments.callee, true);
		window.onload = append_js();
		}

}, true);

unsafeWindow.WebP = (function () {
return {
    reprocessImages: function() {
	  append("http://webpjs.appspot.com/js/webpjs-0.0.2.min.js");
    }
  }
})();

function append_js() {
append("http://webpjs.appspot.com/js/webpjs-0.0.2.min.js");
}

////// append with new block function:
function append(s) {
	var script = document.createElement('script');
	script.src = s;
    document.head.appendChild(script);
}
