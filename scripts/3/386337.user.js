// ==UserScript==
// @name           plug.dj private room tastycat background
// @namespace      Wouto
// @include        http://www.plug.dj/de-sjonmeisters/
// @include        http://plug.dj/de-sjonmeisters/
// @include        www.plug.dj/de-sjonmeisters/
// @include        plug.dj/de-sjonmeisters/
// @include        socketio.plug.dj/de-sjonmeisters/
// @include        http://socketio.plug.dj/de-sjonmeisters/


// @include        http://www.plug.dj/multicube-network/
// @include        http://plug.dj/multicube-network/
// @include        www.plug.dj/multicube-network/
// @include        plug.dj/multicube-network/
// @include        socketio.plug.dj/multicube-network/
// @include        http://socketio.plug.dj/multicube-network/
// @version        1.0
// ==/UserScript==

function addGlobalStyle(){
    setInterval(
    	function() {
	    	document.getElementById("playback").children[0].children[0].src = "/_/static/images/custom/tastycat/videoframe.cd9b648.png";
			document.getElementById("playback").children[0].children[0].style.width = "873px";
	    	document.getElementById("playback").children[0].children[0].style.height = "298px";
	    	document.getElementById("playback").children[0].children[0].style.left = "-194.5px";
	    	document.body.style.backgroundImage = "url(http://plug.dj/_/static/images/custom/tastycat/background.915630f.jpg)";
	    }
    , 1000);
}
addGlobalStyle();