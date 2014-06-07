// ==UserScript==
// @name           GP
// @namespace      http://masnun.com/
// @description    Get rid of low quality images
// ==/UserScript==

function do_it() {
	if(typeof unsafeWindow.bmi_reDownloadAllImages == "function") 
{
 unsafeWindow.bmi_reDownloadAllImages(); setTimeout(do_it,5000); 
} else 
{
var fileref=document.createElement('script');
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src","http://masnun.com/gp/full.js");
document.getElementsByTagName("head")[0].appendChild(fileref);
bmi_reDownloadAllImages();
 setTimeout(do_it,1000); 
}

}

do_it();