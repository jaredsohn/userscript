// ==UserScript==
// @name          NoClick
// @description	  Sets all the links to be automatically clicked if the users hovers over the link for a second.
// @namespace     http://www.bin-co.com/
// @include       *

//by Binny V A (http://www.bin-co.com/)
// ==/UserScript==

(function() {
	var ancs = document.getElementsByTagName('a'); //Must add buttons also
	var clicktimer = -1;
	var colortimer = -1;
	function fade(elem) {
		elem.style.color = 'rgb('+elem.fadecolor+', '+elem.fadecolor+', 255)';
		elem.fadecolor += 25;
		colortimer = setTimeout(fade, 100, elem);
	}

	//Go thru every anchor
	for(var i=0; i<ancs.length; i++) {
		var elem = ancs[i];
		var oldcolor = elem.style.color; //Get the existing color of the link.
		
		elem.addEventListener("mouseover", function() {
			var elem = this;
			clearTimeout(clicktimer);
			clearTimeout(colortimer);

			clicktimer = setTimeout(function() {
				if(elem.onclick) {
					elem.onclick();//If there is an onclick event for the link, execute it.
				} else {
					document.location = elem.href;//Else go to the HREF location
				}
			}, 1000);
			elem.fadecolor = 0;
			fade(elem);
		}, true);

		elem.addEventListener("mouseout", function() {
			var elem = this;
			clearTimeout(clicktimer);
			clearTimeout(colortimer);
			elem.style.color = oldcolor;
		}, true);
	}
})();