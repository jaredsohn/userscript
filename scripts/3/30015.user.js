// ==UserScript==
// @name           powyzszenie paska sb na forum JP
// @author         Rime
// @namespace      www.jspoznan.bnx.pl
// @description    powyzszenie paska sb na forum JP
// @include        http://www.jumppolska.hekko.pl/forum/shoutbox_send.php
// @include        http://www.jumppolska.hekko.pl/forum/shoutbox_send.php?mode=hide
// ==/UserScript==

// v0.1 — pierwsza wersja
// ==UserScript==

	// based on code by Julien Couvreur
	// and included here with his gracious permission

	var instrumentTextarea = function(input) {
		var centerTextarea = function() {
		  if (textarea.scrollIntoView) {
			  textarea.scrollIntoView(false);
		  } else {
			  textarea.wrappedJSObject.scrollIntoView(false);
		  }
	  };

	  var textareaKeydown = function(e) {
		if (e.shiftKey && e.ctrlKey && e.keyCode == 13) {
			// shift-ctrl-enter
			textarea.rows -= 1;
			centerTextarea();
		}
		else if (e.shiftKey && e.ctrlKey && e.keyCode == 32) {				  // shift-ctrl-space
			  textarea.cols -= 1;
			  centerTextarea();
		}
		else if (e.ctrlKey && e.keyCode == 13) {
			  // ctrl-enter
			  if (textarea.offsetHeight < window.innerHeight - 40) {
				  textarea.rows += 1;
			  }
			  centerTextarea();
		}
		else if (e.ctrlKey && e.keyCode == 32) {
			 // ctrl-space
			 if (textarea.offsetWidth < window.innerWidth - 40) {
			     textarea.cols += 1;
			 }
			 centerTextarea();
		}
	};
			  
	textarea.addEventListener("keydown", textareaKeydown, 0);
}
		 
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) {
   instrumentTextarea(textareas[i]);
}
