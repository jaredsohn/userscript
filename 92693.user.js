// ==UserScript==
// @name      	Redo Mastering astronomy hw
// @namespace	session.masteringastronomy.com
// @include     *session.masteringastronomy.com/myct/*
// @author	Oldarney
// ==/UserScript==
if(window.location.href.search(/itemWork\?*/)!=-1){
	var retrylink = document.getElementById("partHead").getElementsByTagName("a")[1];
	if (!retrylink){
		retrylink = document.getElementById("partHead").getElementsByTagName("a")[0];
	}
	//alert(retrylink.innerHTML);
	if (retrylink.innerHTML == "Rework for Practice"){
		GM_setValue("retrylink", retrylink.href);
		//alert("you rock");
	}
}

window.addEventListener("load",hitit,false);
function hitit() {
		if(GM_getValue("retrylink","") != ""){
			window.location=GM_getValue("retrylink","");
			GM_setValue("retrylink", "");
		}
}