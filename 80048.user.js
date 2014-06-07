// ==UserScript== 
// @name          vuvuzeol 
// @version       0.8
// @namespace     http://www.noname.net
// @description   Te hace sufrir.
// @run-at 	  document-end
// @include       http://www.elotrolado.net/* 
// @exclude              

// ==/UserScript== 

var embed = '<embed src="http://www.tutorialesenlaweb.com/wp-content/download/swish/vuvuzelas.swf" width="1" height="1" quality="mid" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" wmode="transparent" title="bzzzzzz"></embed>';


function replaceVuvu() {
	
	var divs = document.getElementsByTagName("div");
	for ( var i = 0; i < divs.length; i++) {
		var element = divs.item(i);
		if (element.getAttribute("class") == "content") {
			replaceAllVuvu(element);
		}
	}
};

function replaceAllVuvu(element) {
	var div = document.createElement("div");
	div.innerHTML = embed;
	element.appendChild(div);
}

replaceVuvu();