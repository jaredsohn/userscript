// ==UserScript==
// @name        DP redirect
// @namespace   http://nowhere.man
// @include     http://www.dumppix.com/viewer.php*
// @include     http://dumppix.com/viewer.php*
// @version     1
// ==/UserScript==

try {
	
	document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("td")[0].innerHTML 
	document.getElementsByTagName("head")[0].innerHTML = '<meta name="viewport" content="width=device-width; height=device-height;">'
	document.getElementsByTagName("body")[0].setAttribute("style", "padding: 0px; margin: 0px; text-align: center; background-color: #222222; cursor: -moz-zoom-in;")
	
	if (document.getElementsByTagName("img")[0] ) {
		var img = document.getElementsByTagName("img")[0];
		img.setAttribute("id", "theimg")
		img.setAttribute("style", "width: 100%")
		img.addEventListener("click", function handler(evt){ 
			if ( this.getAttribute("style") != "width: 100%" ) {
				this.setAttribute("style", "width: 100%")
				scrollTo(0, this.height*(evt.pageY/window.innerHeight))
			} else {
				this.setAttribute("style", "height: " + window.innerHeight + "px")
			}
		}, true);
	}
	
	
	if ( document.getElementsByTagName("a")[0] ) {
		document.getElementsByTagName("a")[0].click();
	}

} catch(e) {
	
}