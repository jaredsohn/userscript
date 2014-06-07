// ==UserScript== 
// @name          instantsFunEOL 
// @version       0.8
// @namespace     http://www.noname.net
// @description   Interpreta instantsfun embutidos
// @run-at 	  	  document-end
// @include       http://www.elotrolado.net/* 
// @exclude              

// ==/UserScript== 

var rgx = /<(?:a|A)(?:\s*class="postlink")?\s*href="http:\/\/(?:www.)?instantsfun\.es\/(\w*)"(?:\s*class="postlink")?\s*>(.*?)<\/(?:a|A)>/g;

var embed = '<embed src="http://www.instantsfun.es/swf/$1.swf" width="50" height="50" quality="mid" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" wmode="transparent" title="$2"></embed>';


function replaceFun() {
	
	var divs = document.getElementsByTagName("div");
	for ( var i = 0; i < divs.length; i++) {
		var element = divs.item(i);
		if (element.getAttribute("class") == "content") {
			replaceInstant(element);
		}
	}
};

function replaceInstant(element) {
	element.innerHTML = element.innerHTML.replace(rgx, embed);
}

replaceFun();