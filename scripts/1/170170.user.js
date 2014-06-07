// ==UserScript==
// @name           SDMB Threadspotter
// @namespace      SDMB_Threadspotter
// @description    SDMB Threadspotter
// @include        http://boards.straightdope.com/sdmb/*
// @grant          none
// ==/UserScript==

//Places a small link above each post on the SDMB to facilitate submission of a thread to the Threadspotting section of the SD main page

(function() 
 {
	var dateareas = document.getElementsByClassName('normal');
  	var datecount = dateareas.length;
  	for(var i = 0; i < datecount; i++)
   	{
     	if (dateareas[i].innerHTML.search("date") > 1)
	 	{
    		var threadurl= document.URL;
			var a = document.createElement('a');
			var linkText = document.createTextNode("Threadspot");
			a.appendChild(linkText);
			a.title = "Threadspot";
			a.href = "mailto:tubadiva%40aol.com?subject=Threadspotting%20Nomination&body=Dear%20Tubadiva%2C%0A%0AI%20nominate%20%20" + threadurl + "%20to%20be%20featured%20in%20the%20Threadspotting%20section%20of%20the%20SD.%20%0A%0AIf%20selected%2C%20I%20would%20like%20to%20be%20credited%20as%3A%20%5Bscreen%20name%2C%20real%20name%2C%20nickname%2C%20dog's%20name%2C%20whatever.%5D";
			var thisdate=dateareas[i];
			thisdate.appendChild(a);
		}
   }
})();