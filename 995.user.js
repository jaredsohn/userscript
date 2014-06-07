// ==UserScript==
// @name          Weather Undreground re-org
// @namespace     http://mkgray.com:8000/userscripts
// @include       http://www.wunderground.com/cgi-bin/findweather/getForecast*
// @description	  Re-organizes the weather underground forecast/conditions page
// @exclude
// ==/UserScript==

(function() {
	if(document.reorg){
	    alert("script called on reorged doc");
	}
	else{
	    t1=document.getElementById("Table1");
	    t3=document.getElementById("Table3");
	    t4=document.getElementById("Table4");
	    document.body.insertBefore(t4, document.body.firstChild);
	    document.body.insertBefore(t3, document.body.firstChild);
	    document.body.insertBefore(t1, document.body.firstChild);
	    document.reorg = true;
	}
})();
