// ==UserScript==
// @name          Good-Tutorials Ad Remover
// @namespace     http://infiniti-hax.com
// @description   Removes Good-Tutorials Ad.
// @include       http://good-tutorials.com/*
// @include       http://*good-tutorials.com/*
// ==/UserScript==

(function() {
	document.getElementById("leaderboard").style.display="none";
})();

(function() {
    var divs=document.getElementsByTagName("div");
    
    for(var i=0; i < divs.length; i++) {
        if(divs[i].className.indexOf("skyscraper") != -1 || divs[i].className.indexOf("skyscraper") != -1) {
            divs[i].style.display="none";
        }
    }
})();

(function() { 
  deleteme( getObject( document, "//DIV[IFRAME/@name='iframe0']"));

  function deleteme( obj) {
    try { obj.parentNode.removeChild( obj); }
    catch( e) {}
  }

  function getObject( obj, xpath) {
    try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
    catch( e) { return null; }
  }
})();

(function()
{
	if(document.createElement){ 
		var el = document.createElement("DIV"); 
		el.id = "myDiv";     
		with(el.style){ 
			width = 100 + "%";
			color = "#FFFFFF"; 
			textAlign = "center";
			fontFamily = "Arial";
			fontSize = 10 + "px";
			marginBottom = "7px";
			fontWeight = "bold";
			position ="absolute";
			top = "0"
		} 
		el.innerHTML = "Good-Tutorials Leaderboard Ad Remover is injected. Created by Nick." 
		document.body.appendChild(el); 
	}
})();
