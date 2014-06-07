// ==UserScript==
// @name			Endomono Scroll Zoom
// @description	 	Makes the maps on endmondo.com zoomable by mouse scroll wheel
// @include     	http://www.endomondo.com/*
// ==/UserScript==

function contentScript() {
	try {
		Wicket.Event.add(window, "domready", function(event) {
			for(var i in Wicket.maps) {
				Wicket.maps[i].setScrollWheelZoomEnabled(true);
			}
		});
	} catch(e) {}
}

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = '(' + contentScript + ')();';

document.body.appendChild(script);
document.body.removeChild(script);



