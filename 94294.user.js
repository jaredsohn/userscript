// ==UserScript==
// @name           YTAPYoutubeSpinnerBeGone
// @namespace      http://userscripts.org/users/272625
// @description    Detects frozen video state and causes an automatic refresh ahead 1 seconds to unfreese the video
// @include        http://*.youtube.com/*
// @version        1.2.0
// ==/UserScript==

//Vesion 1.2.0
//fixed error; was using "or" instead of || in if condition
//renamed functions

var intv = -100;
var lasttime = -100;
function YTAP_SBGListen()
{
	//alert("YTAP_SBGListen");
	if(unsafeWindow._gel('movie_player').getPlayerState()!=2)
	{
		//spinner check;
		var tm = Math.round(unsafeWindow._gel('movie_player').getCurrentTime());
		if(tm == lasttime || tm == 0)
		{
			//alert("Detected spinner")
			//reload
			var loc = "" + window.location;
			var vend = loc.indexOf('#t=');
			if(vend>0)
			{
				loc = loc.substring(0,vend);
			}
			loc +="#t=" + (tm+1) + "s";
			window.location = loc;
			return;

		}
		lasttime = tm;
		return;
	}
	return;

}
	
function YTAP_SBGOnLoad()
{
	//alert("YTAP_SBGOnLoad");
	if(!document.getElementById('movie_player')) 
	{
		return;
	}
	//alert("YTAP_SBGOnLoad - ON");
	intv=setInterval(function(){YTAP_SBGListen();}, 5000);
}
function YTAP_SBGOnUnload()
{
	if(intv != -100) 
	{
		clearInterval(intv);
	}
}
//GM_registerMenuCommand('AmIOn', function(){YTAP_SBGOnLoad();});

window.addEventListener('load', function(){YTAP_SBGOnLoad();}, false);
window.addEventListener('unload', function(){YTAP_SBGOnUnload();}, false);
