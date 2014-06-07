// ==UserScript==
// @name           homeless.co.il expanded view 
// @namespace      http://guznik.com/scripts
// @description    Fixes homeless.co.il for firefox running on linux, shows results in expanded mode.
// @include        http://www.homeless.co.il/*
// ==/UserScript==
function getElementsByClassName(oElm, strTagName, strClassName)
{
	var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}

window.addEventListener("load", function(e) {
	hs = getElementsByClassName(document, "*", "zzTROut.");
	for (var i in hs) {
		var h = hs[i];
		var id = h.id;
		var mid = id.slice(7);
		var f = document.getElementsByName("Frame" + mid);
		h.style.display = "";	
		f[0].src = "ShowDetails.asp?ID=" + mid;
	}

}, false);
