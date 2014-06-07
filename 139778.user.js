// ==UserScript==
// @name           EW collect
// @namespace      JJY
// @include        *www.kabam.com/edgeworld/play*
// @include        *apps.facebook.com/edgeworld/*
// ==/UserScript==http://www.addtoany.com/share_save#url=http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F139778&title=EW%20collect&description=

	//===[Settings]===\\
	//===[/Settings]===\\
    
//    if (StRefTime > 0) setTimeout("location.reload(true);",StRefTime*1000);


var Interval = '60';  //==[Set time by seconds]
var stringvalue="api/bases/402965323/buildings/442329590/collect_all"; 

if (Interval>0)
 setTimeout(GM_xmlhttpRequest({method: "POST", url: "https://www.kabam.com/edgeworld/play", headers: { "Content-type" : "application/x-www-form-urlencoded" }, data: encodeURI("stringkey="+stringvalue), onload: function(e) { alert(e.responseText); }});",Interval*100); 
  