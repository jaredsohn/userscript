// ==UserScript==
// @name           Edgeworld refresher
// @namespace      MaxwellLipphardt
// @include        *www.kabam.com/edgeworld/play*
// @include        *apps.facebook.com/edgeworld/*
// ==/UserScript==

	//===[Settings]===\\
//		var StRefTime = '600';  //==[Set time by seconds]
	//===[/Settings]===\\
    
//    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);


var stringvalue="/api/bases/402965323/buildings/442329590/collect_all"; 

GM_xmlhttpRequest({ 
method: "POST", 
url: "https://www.kabam.com/edgeworld/play", 
headers: { "Content-type" : "application/x-www-form-urlencoded" }, 
data: encodeURI("stringkey="+stringvalue), 
onload: function(e) { alert(e.responseText); } 
});
