// ==UserScript==
// @name           Filtering
// @description    replace filtering page with a blank black page and disable the peyvandha redirecting
// @namespace      MVGM
// @include        *
// ==/UserScript==


var iframe = document.getElementsByTagName('iframe');		
for(var i=0;i<iframe.length;i++){
	var iframe = iframe[i];
	if(iframe.src.toLowerCase().match(/^http:\/\/10.10.34.34\/(.*)/)) {
		iframe.src = iframe.src.replace(".","");
		iframe.src = iframe.src.replace(".","");
		iframe.src = iframe.src.replace(".","");
		iframe.src = iframe.src.replace("?","");
		iframe.src = iframe.src.replace("=","");
		iframe.src = iframe.src.replace("=","");
		iframe.src = iframe.src.replace("%","");
		iframe.src = iframe.src.replace("&","");
		iframe.src = iframe.src.replace("/t","");
		iframe.style.display = "none";
		iframe.parentNode.style.background = "#000";
		document.title = '-Filter-';
	}
}



