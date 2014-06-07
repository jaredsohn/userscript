// ==UserScript==
// @name           Calvin and Hobbes Nav
// @namespace      Calvin
// @include        http://www.gocomics.com/calvinandhobbes/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

function keyPressEvent(event) {
	var keyNum = event.charCode ? event.charCode : event.keyCode;

	switch (keyNum) {
		case 37: // Left Arrow
		    for(var i=0; i<links.length; i++) {
				if(links[i].className && links[i].className == "prev") {
					location.href = links[i].href;
					break;
				}
			}
		    break;
		case 39: // Right Arrow
		    for(var i=0; i<links.length; i++) {
				if(links[i].className && links[i].className == "next") {
					location.href = links[i].href;
					break;
				}
			}
		    break;
            
        default:
    }
}

//Add Listeners
document.addEventListener('keypress', keyPressEvent, true);
