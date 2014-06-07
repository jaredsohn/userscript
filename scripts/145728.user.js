// ==UserScript==
// @name           My chrome plugin
// @namespace      http://linkftp.myftp.org/
// @description    Just for test
// @version        0.1
// @author         Link
// ==/UserScript==


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}


// the guts of this userscript
function main() {
	var host = document.location.host;
	if (host == "www.facebook.com" && host != "m.facebook.com"){
		alert(document.location);
		
	}
}

// load jQuery and execute the main function
addJQuery(main);
	
