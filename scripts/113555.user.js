// ==UserScript==
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*
// @version 0.5
// @name Facebook Style+
// @description Add the ability to make text in the facebook chat bold again. Also features italics and underline. *bold*, ^italic^, _underline_
// ==/UserScript==

// Extension specific variables:
var version = "0.5",
	devMode = true;

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(function() {
	jQuery.noConflict();

	var codes = [
			{"start": "\\*", "regex": "(.*)", "end": "\\*", "htmlStart": "<b>", "htmlEnd": "</b>"},
			{"start": "\\^", "regex": "(.*)", "end": "\\^", "htmlStart": "<i>", "htmlEnd": "</i>"},
			{"start": "_", "regex": "(.*)", "end": "_", "htmlStart": "<u>", "htmlEnd": "</u>"}
		];
		
	replaceCodesInChat(null, null);
	
	jQuery(".fbDockWrapper").bind("mouseover mousedown click", function(e) {
		//if (e.which === 13) {
			replaceCodesInChat(null, null);
		//}
	});
	
	function replaceCodesInChat (element, event) {
		jQuery(".fbChatMessage").each(function() {
			var convo = jQuery(this);
			var convoText = (convo.html()).toString();
			
			for (var i in codes) {
				try {
					var regex = RegExp(codes[i].start + codes[i].regex + codes[i].end, "gi");
				
					if (convoText.match(regex)) {
						var match = regex.exec(convoText);
						convoText = convoText.replace(regex, codes[i].htmlStart + match[1] + codes[i].htmlEnd);
						convo.html(convoText);
					}
				} catch(e){};
			}
			
			i ? i = null : void(0);
		});
	}	
});
