// ==UserScript==
// @name           Y! Lite and Live Lite Ad Remover
// @namespace      DNE.Browser
// @include        http://us.mc570.mail.yahoo.com/mc/showFolder*
// @include        http://us.mc570.mail.yahoo.com/mc/showMessage*
// @include        http://by129w.bay129.mail.live.com/*
// @include        http://bl105w.blu105.mail.live.com/*
// ==/UserScript==

function RemoveIt(strid){
       if (document.getElementById(strid)!=null){
	var elm = document.getElementById(strid) ;
	while (elm.childNodes.length >= 1) {
      		elm.removeChild(elm.firstChild);
	}
	elm.style.display="none";
        }
}

//========Yahoo=======
RemoveIt("northbanner") ;
RemoveIt("REC");
RemoveIt("ygmabot");
RemoveIt("MON");
RemoveIt("LREC");
RemoveIt("MWA2");
RemoveIt("nwad");
RemoveIt("newsmodule");
//========Live=========
window.setInterval(
function()
{
	
	RemoveIt("adHeader");
	RemoveIt("RadAd_Banner");
	RemoveIt("CustComm_120x60");
	RemoveIt("TodayTabSection");
	RemoveIt("dapIfM2");
	RemoveIt("dapIfM3");
},1000);