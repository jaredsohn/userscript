// ==UserScript==
// @name           Google Maps QR
// @namespace      http://userscripts.org/users/120060
// @include        http://maps.google.com*
// @description    Generates a QR code for the current map for scanning to your phone or other device.
// ==/UserScript==

(function() {
	var settings = {
		size:"500",
		top:"80px",
		left:"10px"
	}
	var img = undefined;
	var baseQRuri = "http://chart.apis.google.com/chart?cht=qr&chs="+ settings.size + "x" + settings.size + "&chl=";
	function getFullQRuri() {
		return baseQRuri + encodeURIComponent(document.getElementById('link').href);
	}
	function createQRimage() {
		var img = document.createElement("img");
		img.setAttribute("id", "qrimg");
		var uri = getFullQRuri();
		img.setAttribute("src", uri);
		img.style.display = "none";
		img.style.position = "absolute";
		img.style.top = settings.top;
		img.style.left = settings.left;
		img.style.zIndex = "5";
		return img;	
	}
	function toggle() {
		if(img.style.display=="block") { 
			hide();
		} else {
			show();
		}
	}
	function show() {
		var uri = getFullQRuri();
		img.setAttribute("src", uri);
		img.style.display = "block";
	}
	function hide() {
		img.style.display = "none";
	}
	
	function addQRLink() {
		var targets = document.getElementById('link');
		if (targets != undefined) {
			var divider = document.createElement("img");
			divider.setAttribute("class","bar-icon-divider bar-divider");
			divider.setAttribute("src", "http://maps.gstatic.com/intl/en_us/mapfiles/transparent.png");
			divider.setAttribute("jstcache", "0");
			
			var qrlink = document.createElement("a");
			qrlink.setAttribute("id", "qrlink");
			qrlink.setAttribute("href", "javascript:void(0)");
			qrlink.addEventListener("click", toggle, false);
			
			var icon = document.createElement("img");
			icon.setAttribute("class","bar-icon bar-icon-link2");
			icon.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oLBQ4cF1BFoVoAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAIhJREFUOMuVkkkOwDAIA+0o//8yPVRI1DU05ZTFATyBAAImIgIkEXFfk3Qy7BTXSLGeO92qG61ycrYwhFZsLXTiyqC1MUF0XF5FYuizg/mw0GXOR/mdurbf6DxrB5pktKAwtQDJGaK266ZyfxGviRzUPRGvIJVR6jcOQpPX/a9JbC10s9CBrfoLHbB0JqNruv4AAAAASUVORK5CYII=");
			icon.setAttribute("height", "16");
			icon.setAttribute("width", "16");
			icon.setAttribute("style", "margin:0 4px 0 4px;")
			icon.setAttribute("jstcache", "0");
			qrlink.appendChild(icon);
			
			var linkText = document.createElement("span");
			linkText.appendChild(document.createTextNode("QR"));
			linkText.setAttribute("class", "link-text");
			qrlink.appendChild(linkText);
						
			targets.parentNode.appendChild(divider);
			targets.parentNode.appendChild(qrlink);
			
			img = createQRimage();
			document.getElementById("main").appendChild(img);
		}
	}

	addQRLink();

})();