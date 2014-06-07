// ==UserScript==
// @name           Guardian Soulmates disguiser
// @namespace      soulmates.disguiser
// @author		   Caroline Clifford
// @description    This makes Guardian Soulmates look much less like Guardian Soulmates
// @include        http://*dating.guardian.co.uk*
// ==/UserScript==

window.addEventListener(
    'load', 
    function() { 
    document.title="Guardian bookmarks | guardian.co.uk";
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://www.guardian.co.uk/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
	hide("header");
	hide("navigation");
	hide("profileHead");
	hide("actionsPrimaryLinksm");
        hide("subbanner");
	divs = document.getElementsByTagName("div");
	for(a=0;a<=divs.length-1;a++) {
		if(divs[a].className=="lphrsub") divs[a].style.backgroundColor="#9B1C49";
	}
}, true);

function hide(x) {
	document.getElementById(x).style.display="none";
}




