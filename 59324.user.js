// ==UserScript==
// @name           Fixes for XDCC sites
// @description    It fixes errors and problems on XDCC sites.
// @version        1.0.0.2
// @author         ale5000
// @namespace      http://userjs.ale5000.altervista.org/
// @include        http://*
// @filename       fixes-for-xdcc-sites.user.js
// @support        Opera(native)|Firefox(Greasemonkey)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function()
{
	var location=window.location;
	var hostname=location.hostname;
	var temp, unsw=(typeof unsafeWindow=="object");

	if(hostname=="searchxdcc.com")
	{
		if(typeof toclip=="undefined")
		{
			toclip=function(a){if(!window.clipboardData){prompt('_Pack: '+b+'\nBot: '+a+'\n\nCopia e incolla questo comando nel tuo client IRC:',a);}else{window.clipboardData.setData('Text',a);}};
			if(unsw) unsafeWindow.toclip=toclip; // Firefox
		}
	}
	else if(hostname=="farfuglio.altervista.org")
	{
		if(unsw) t=unsafeWindow.t; // Firefox
		if(typeof t=="function") // If the function t exists, replace the browser detection with the object detection
		{
			var old_function="functiont(a,b){if(navigator.appName!='MicrosoftInternetExplorer'){prompt('Pack:'+b+'\\nBot:'+a+'\\n\\nCopiaeincollaquestocomandoneltuoclientIRC:','/msg'+a+'xdccsend'+b);}else{window.clipboardData.setData('Text','/msg'+a+'xdccsend'+b);}}";
			temp=t.toString().replace(/"/g,"'"); // Apparently Firefox (unlike Opera) change the function in the page a bit
			temp=temp.replace(/\n| /g,"");

			if(temp==old_function)
			{
				t=function(a,b){if(!window.clipboardData){prompt('_Pack: '+b+'\nBot: '+a+'\n\nCopia e incolla questo comando nel tuo client IRC:','/msg '+a+' xdcc send '+b);}else{window.clipboardData.setData('Text','/msg '+a+' xdcc send '+b);}};
				if(unsw) unsafeWindow.t=t; // Firefox
			}
		}
	}
})();
