// ==UserScript==
// @name           auto scroll
// @namespace      *.boobstagram.fr
// @include        *.boobstagram.fr
// ==/UserScript==

    var i = 0;

	function doscroll() {
		i++;
		window.scroll(0, i);

		if(i > 6000) {
			var a = document.getElementById("footer").getElementsByTagName("a");
			
			window.location = a[a.length-1].href;
		} else {
			setTimeout(function() {
    doscroll();
	}
	, 10);
		}
	}

    window.onload=doscroll