// ==UserScript==
// @name        Corrigir Vivo OnLine
// @description Corrige o site Vivo OnLine para poder funcionar no Firefox.
// @include     https://servicos.vivo.com.br/VOLWeb/*
// ==/UserScript==

(function() {
	var scripts = document.getElementsByTagName("head")[0].getElementsByTagName("script");
	for(i = 0; i < scripts.length; i++) {
		if(scripts[i].innerHTML == "" && scripts[i].src != "") {
			var j = i;
			GM_xmlhttpRequest({
				method: "GET",
				url: scripts[j].src,
				onload: function(responseDetails) {
					fixScript(scripts[j], responseDetails.responseText);
				}
			});
		}
		else {
			fixScript(scripts[i], scripts[i].innerHTML);
		}
	}

	var links = document.getElementsByTagName("head")[0].getElementsByTagName("link");
	for(i = 0; i < links.length; i++) {
		if(links[i].rel == "stylesheet") {
			var j = i;
			GM_xmlhttpRequest({
				method: "GET",
				url: links[j].href,
				onload: function(responseDetails) {
					fixStyle(links[j], responseDetails.responseText);
				}
			});
		}
	}
})();

function fixScript(currentScript, currentInnerHTML) {
	var newInnerHTML = currentInnerHTML.replace(/document\[getNetuiTagName\(\"frm/g, "document.forms[getNetuiTagName(\"frm");
	newInnerHTML = newInnerHTML.replace(/document\.frm/g, "document.forms.frm");
	newInnerHTML = newInnerHTML.replace(/document\[getNetuiTagName\(formulario, this\)\]/g, "document.forms[getNetuiTagName(formulario, this)]");
	if(newInnerHTML != currentInnerHTML) {
		var newScript = document.createElement("script");
		newScript.setAttribute("type", "text/javascript");
		newScript.innerHTML = newInnerHTML;
		document.getElementsByTagName("head")[0].replaceChild(newScript, currentScript);
	}
}

function fixStyle(currentLink, currentInnerHTML) {
	var newInnerHTML = currentInnerHTML.replace(/cursor: HAND/g, "cursor: pointer");
	newInnerHTML = newInnerHTML.replace(/width: 145x/g, "width: 145px");
	if(newInnerHTML != currentInnerHTML) {
		var newStyle = document.createElement("style");
		newStyle.setAttribute("type", "text/css");
		newStyle.innerHTML = newInnerHTML;
		document.getElementsByTagName("head")[0].appendChild(newStyle);
		document.getElementsByTagName("head")[0].removeChild(currentLink);
	}
}
