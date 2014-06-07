// ==UserScript==
// @name           Duck Duck Go Zero Click Info
// @namespace      Duck Duck Go
// @include        *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/jquery-ui.min.js
// @require http://dhruvbird.com/ddb/js/jquery.zero_clickable.min.js
// ==/UserScript==

var $, jQuery;

function importScriptURL(url, p , cb) {
    // unsafeWindow.console.log("importScriptURL:", url, p.toString(), cb.toString());
	if (p(url)) {
        var GM_Head = unsafeWindow.document.getElementsByTagName('body')[0] || unsafeWindow.document.documentElement;
        var GM_JQ = unsafeWindow.document.createElement('script');
    
        GM_JQ.setAttribute("src", url);
        GM_JQ.setAttribute("type", 'text/javascript');
        GM_JQ.setAttribute("async", true);

	    GM_Head.appendChild(GM_JQ);
	    GM_wait(url, p, cb);
	}
	else {
		GM_wait(url, p, cb);
	}
}

function importCSS(url) {
    // unsafeWindow.console.log("importCSS:", url);
	var GM_Head = unsafeWindow.document.getElementsByTagName('head')[0] || unsafeWindow.document.documentElement;
	var GM_JQ = unsafeWindow.document.createElement('link');

	GM_JQ.setAttribute("href", url);
	GM_JQ.setAttribute("type", 'text/css');
	GM_JQ.setAttribute("rel", 'stylesheet');

	GM_Head.appendChild(GM_JQ);
}


// Add jQuery
(function(){
	// For now
	// return;

	importCSS("http://dhruvbird.com/ddb/css/jquery.zero_clickable.css");

	function importZeroClickable() {
		importScriptURL("http://dhruvbird.com/ddb/js/jquery.zero_clickable.min.js", 
			function () {
				return typeof unsafeWindow.jQuery.fn.zero_clickable == 'undefined';
			}, letsJQuery);
	}

	function importjQueryUI () {
		// unsafeWindow.console.log("In importjQueryUI");
		importScriptURL("https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/jquery-ui.min.js", 
			function () {
			    // unsafeWindow.console.log(unsafeWindow.jQuery("body").draggable);
				return typeof unsafeWindow.jQuery.fn.draggable == 'undefined';
			}, 
			importZeroClickable);
	}

	function importjQuery() {
		importScriptURL("http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js", 
			function () {
				return typeof unsafeWindow.jQuery == 'undefined';
			}, 
			function() {
				jQuery = $ = unsafeWindow.jQuery;
				importjQueryUI();
			});
	}

	importjQuery();

})();



// Check if jQuery is loaded
function GM_wait(url, p, cb) {
	// unsafeWindow.console.log("GM_wait", arguments);
	if (p(url)) {
		window.setTimeout(function() { GM_wait(url, p, cb); }, 100);
	} 
	else {
		// unsafeWindow.console.log("Making cb for:", url);
		cb();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
  $("body").contents().zero_clickable({
	singleton: true, 
	clickout: true, 
	proximity: true, 
	cornered: false, 
	css: { "background-color": "#FFEEAA", color: "#000000", "z-index": 100 }
  });
}
