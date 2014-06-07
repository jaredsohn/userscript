// ==UserScript==
// @name          Greentext ETI by Owl Regime!
// @namespace     http://wiki.endoftheinter.net/index.php/User:Owt_Regym
// @description	  Add green text functionality to ETI
// @author        Owl Regime
// @version       1.0
// @homepage      ETI
// @include       *boards.endoftheinter.net/showmessages.php*
// @include 	  *links.endoftheinter.net/linkme.php?*
// ==/UserScript==



// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { 
		
		$ = unsafeWindow.jQuery;
		$(document).ready(window.setInterval(letsJQuery,1000));
		letsJQuery();
		//unsafeWindow.document.watch("body", updatefunc);

		
	
	}
}


//window.setInterval(letsJQuery,1000));
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	var mainMessage = $('.message');
	mainMessage.each(function(){
		if(!$(this).hasClass("fixed"))
		{

		// Split post up in to each individual line
		var lines = this.innerHTML.split("<br>");

		// Loop over each line
		for (i = 0; i < lines.length; i++){
			
			// Assign line contents to temp variable
			var lineText = lines[i];

			// check if ">" is the first character in line
			if (lineText.indexOf("&gt;") == -1){
				lines[i] = lineText;
			}
			else if (lineText.indexOf("&gt;") < 2){

				// append greenstyle CSS before line and end at the end of the line

				lineText = ("<span style='color:#789922'>" + lineText + "</span>");
				lines[i] = lineText;
			};

		// add new line to HTML after check
		};
		$(this).html(lines.join("<br>"));
		$(this).addClass("fixed");
		};
	});
}

/*
$(document).ready(function(){
	if (document.addEventListener) {
	
		document.addEventListener("DOMNodeInserted", letsJQuery, false);
	
	}

}); 
*/