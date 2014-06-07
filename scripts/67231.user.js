// ==UserScript==
// @name           GarantiBank - Internet Branch
// @description    AutoShow timer banner for SMS pin re-sending & Allow window resize(only widening)
// @version        1.0
// @date           25.01.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        https://sube.garanti.com.tr/*
// ==/UserScript==

window.helloworld = function()
{
	var xxx = document.getElementsByTagName('frame');
	for (var i = 0; i < xxx.length; i++) {
		var yyy = xxx[i].contentDocument.getElementById("pinAgain");
		if (yyy)
		{
			yyy.style.display = "block";
		}
		var zzz = xxx[i].contentDocument.getElementsByTagName('BODY')[0];
		var re = /res\(\);/;
		if (zzz && zzz.getAttribute('onresize') && (zzz.getAttribute('onresize').match(re)) && !(xxx[i].contentDocument.getElementById('bizim_script')))
		{
			var sGetter = xxx[i].contentDocument.createElement("script");
			sGetter.setAttribute('id', 'bizim_script');
			sGetter.type = "text/javascript";
			sGetter.textContent = 
			    "<!--" + "\r\n"
			  + "function res() {" + "\r\n"
			  + "if ((parent.window.outerWidth<800) || (parent.window.outerHeight<parent.wd))" + "\r\n"
			  + "{" + "\r\n"
			  + "parent.window.resizeTo(800,parent.wd);" + "\r\n"
			  + "parent.window.moveTo(0,0);" + "\r\n"
			  + "}" + "\r\n"
			  + "}" + "\r\n"
//			  + "alert('bzzztt');" + "\r\n" // for testing
			  + "// -->" + "\r\n";
			zzz.appendChild(sGetter);
		}
	}
}

window.addEventListener("DOMFrameContentLoaded", helloworld, true);
