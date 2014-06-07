// ==UserScript==
// @name          O'Reilly Safari Minimalist Tweaked
// @description   Remove everything not needed on O'Reilly Safari books online
// @match         http://*.safaribooksonline.com/*
// @match         https://*.safaribooksonline.com/*
// @include       http://*.safaribooksonline.com/*
// @include       https://*.safaribooksonline.com/*
// ==/UserScript==

// Inspired by O'Reilly Safari Beautifier http://userscripts.org/scripts/show/3913
// and Safari Code Un-Scroller http://userscripts.org/scripts/show/8019

// Instant fullscreen mode, fixing broken mdash html attributes.
// Event removes toolbars. Code unscrolling. Only signout link is missing.

function runScript() {

	if(/Opera|Safari|Epiphany|Chrome|Midori/.test(navigator.userAgent)) {
		unsafeWindow = window;
	}	


	// Jquery injection which also works in Chrome from
	// Youtube without Flash Auto http://userscripts.org/scripts/review/50771	
	function addScript(contents, id, isurl) {
		var head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		var script = document.getElementById(id);
		if(script != undefined) {
			head.removeChild(script);
		}
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = id;
		if(isurl) {
			script.src = contents
		} else {
			script.innerHTML = contents;
		}
		head.appendChild(script);
	}
	
	// http://diveintogreasemonkey.org/patterns/add-css.html
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		try {
			style.innerHTML = css;
		} catch(x) { style.innerText = css; }
		head.appendChild(style);
	}

	addGlobalStyle(".htmlcontent { padding: 0em 10em 0em 10em ! important; }");
	addGlobalStyle('.docText, .docList { font-family:Arial,Arial,sans-serif; color:black; font-size:small; font-weight: normal; }');	
    addGlobalStyle('.htmlcontent pre { font-family:Consolas,Consolas,serif; }');
    
	addScript("http://code.jquery.com/jquery-latest.js", "addedjq", true);

	function GM_wait() { 
		if(typeof unsafeWindow.jQuery == 'undefined') 
		{ window.setTimeout(GM_wait,100); } 
				else { $ = unsafeWindow.jQuery; letsJQuery(); } 
	} 
	GM_wait(); 

	function letsJQuery() {
		interceptChanges();
		$('#fullscreenbtn').click();
		
		// Disable this if you want toolbars
		$('.toolbar,.locationbar').hide();
				
			
		function makePageEasierToRead()
		{
			$('.codeSegmentsExpansionLinks').hide();
			 $('.docText,.docList').each(function(idx,elem) 
				{ $(elem).html($(elem).html().replace(/&amp;mdash;/g," &mdash; ")); });
			unsafeWindow.expandCodeSegments();		
		}
				
		function interceptChanges()
		{
			XMLHttpRequest = unsafeWindow.XMLHttpRequest;
			(function(send) {
			XMLHttpRequest.prototype.send = function(m) {
				this.addEventListener("readystatechange", function(e) 
					{ if(this.readyState == 4) { makePageEasierToRead(); } }, false);
				send.call(this, m);
			};
			})(XMLHttpRequest.prototype.send);
		}
	}

}
	
if(/Chrome/.test(navigator.userAgent)) {
    var script = document.createElement("script");
    script.type = "application/javascript";
    script.textContent = "(" + runScript + ")();";
    document.body.appendChild(script);
} else {
    runScript();
}