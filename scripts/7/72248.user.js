// ==UserScript==
// @name           NoFocusForYou
// @namespace      ww
// @description    Prevent a website setting focus on page-load for the first 3 seconds.
//                 This fixes the annoying problem that websites set focus on search box,
//                 making navigation with keyboard impossible.
// @version       1.0
// ==/UserScript==


(function() {

	var noFocusForYou = true;
	var inputs = document.querySelectorAll('input[type=text]');
	for (var i = 0; i < inputs.length; i++) {
		(function(i) {
			function checkFocus() {
				if (noFocusForYou)
					inputs[i].blur();
			}

			inputs[i].addEventListener('focus', checkFocus, false);
			inputs[i].blur();
		})(i);
	}

	setTimeout(
		(function() {
			noFocusForYou = false;
		}), 3000);

})();


