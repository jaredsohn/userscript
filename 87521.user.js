// ==UserScript==
// @name           Upjers Werbung Goodbye
// @namespace      http://userscripts.org/scripts/show/87521
// @description    Entfernt Upjers Werbung
// @date           08.04.2011
// @include        http://*myfreefarm.*
// @include        http://*mabelleferme.*
// @include        http://*wolnifarmerzy.*
// @include        http://*enkicsitanyam.*
// @include        http://*veselaferma.*
// @include        http://*mojaderewnja.*
// @include        http://*migranjalinda.*
// @include        http://*kapibados.*
// @include        http://*zagubionawyspa.*
// @include        http://*kapihospital.*
// @include        http://*molehillempire.*
// @include        http://*zeleneimperium.*
// @include        http://*wurzelimperium.*
// @include        http://*kipourosendrasi.*
// @include        http://*kertbirodalom.*
// @include        http://*zieloneimperium.*
// @include        http://*bahcivanlardiyari.*
// ==/UserScript==

window.addEventListener("load",function(){
function $(ID){return document.getElementById(ID);}
// Toolbar
if ($("uptoolbar")){ $("uptoolbar").style.display = "none"; }
if ($("upsimtoolbar")){ $("upsimtoolbar").style.display = "none"; }
// advertising in iframe at right border
if ($("banner_right")) { $("banner_right").style.display = "none"; }
if ($("skyframe")){ $("skyframe").parentNode.style.display="none"; }

if(location.hostname.match(/myfreefarm/)||location.hostname.match(/mabelleferme/)||location.hostname.match(/wolnifarmerzy/)||location.hostname.match(/enkicsitanyam/)||location.hostname.match(/veselaferma/)||location.hostname.match(/mojaderewnja/)||location.hostname.match(/migranjalinda/)){
	// MyFreeFarm
	GM_addStyle("#travelpremiuminfo{display:none!important;}");
	GM_addStyle("#travelad{display:none!important;}");
} else if(location.hostname.match(/kapihospital/)){
	// Kapi Hospital
	try{
		var candDiv = document.getElementsByTagName("div");
		for(var i=0;i<candDiv.length;i++){
			if (candDiv[i].style.backgroundImage.match("tool_bg.jpg")){
				// upjers toolbar with random id
				candDiv[i].parentNode.style.display = "none"; 
			}
			if (candDiv[i].id == "menu_miniicons"){  
				// maincontainer
				candDiv[i].parentNode.style.marginTop="5px";  
			}   
	
		}
		// TopRack
		if($("toprack")){ $("toprack").style.top="129px"; }
		candDiv=null;
	}catch(err){}
} else if(location.hostname.match(/wurzelimperium/)||location.hostname.match(/molehillempire/)||location.hostname.match(/zeleneimperium/)||location.hostname.match(/kipourosendrasi/)||location.hostname.match(/kertbirodalom/)||location.hostname.match(/zieloneimperium/)||location.hostname.match(/bahcivanlardiyari/)){
	// Wurzelimperium
	document.body.style.margin="0px";
}
},false);