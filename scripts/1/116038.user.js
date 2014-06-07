// ==UserScript==
// @name           openSSinNewTabV2
// @namespace      http://www.somethingselse.com
// @description    OpenScreenShot(SS)inNewTab Script for Pink Lover :P
// @include        http://*lol*.com/details.php*
// edit by spybitx
// ==/UserScript==

if(document.getElementsByTagName('td')[23].innerHTML == "Description")	
	var element_num = 24;
else
	var element_num = 22;

function openss(event){
var descnode = document.getElementsByTagName('td')[element_num];
	for(i=0;i<descnode.childNodes.length;i++){
		urlvar=descnode.childNodes[i].innerHTML;

		if(urlvar==null || urlvar=="")
			continue;
		else {
			if (urlvar.search("jpg") != -1)
			{
				GM_openInTab(urlvar);
			}
		}
	}
}

var tElem = document.getElementsByTagName('td')[23];
tElem.innerHTML = tElem.innerHTML + " <a href='#' id='openallss'><img src='http://www2.hunsa.com/frontpage2011/uploads/17/20110405104515_camera.gif' style='border:none;'></a>";

document.getElementById('openallss').addEventListener("click", openss, true);