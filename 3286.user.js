// Created by: jarrodn
// ==UserScript==
// @name            ebroadcast.com.au Cleaner: Brisbane
// @namespace       jarrodn.com
// @description     Cleans up ebroadcast.com.au, adds more visible navigation between times of day, removes Bris31 and Digital TV channels. Easily tailored to other Australian States.
// @include         http://www.ebroadcast.com.au/TV/static/Brisbane*
// ==/UserScript==

(function() {
		//this is an awful way to remove the elements, but nothing is named in the HTML, no ID's, etc
		//Luckily, each part of the page is in its own table, and don't change from page to page
		//Oh yeah, this is my first greasemonkey script, w00t!
		
		var guide = "";
		if (window.location.href.indexOf('Brisbane')>=0) { guide = "Brisbane"; }
		if (window.location.href.indexOf('QLDReg')>=0) { guide = "QLDReg"; }
		if (window.location.href.indexOf('Sydney')>=0) { guide = "Sydney"; }
		if (window.location.href.indexOf('NSQReg')>=0) { guide = "NSQReg"; }
		if (window.location.href.indexOf('Canberra')>=0) { guide = "Canberra"; }
		if (window.location.href.indexOf('Melbourne')>=0) { guide = "Melbourne"; }
		if (window.location.href.indexOf('VICReg')>=0) { guide = "VICReg"; }
		if (window.location.href.indexOf('Perth')>=0) { guide = "Perth"; }
		if (window.location.href.indexOf('WAReg')>=0) { guide = "WAReg"; }
		if (window.location.href.indexOf('Adelaide')>=0) { guide = "Adelaide"; }
		if (window.location.href.indexOf('SAReg')>=0) { guide = "SAReg"; }
		if (window.location.href.indexOf('Hobart')>=0) { guide = "Hobart"; }
		if (window.location.href.indexOf('TASReg')>=0) { guide = "TASReg"; }
		if (window.location.href.indexOf('Darwin')>=0) { guide = "Darwin"; }
		if (window.location.href.indexOf('NTReg')>=0) { guide = "NTReg"; }
		
		els = document.getElementsByTagName( "table" );
		els[0].parentNode.removeChild(els[0]);
		els[0].parentNode.removeChild(els[0]);
		els[0].parentNode.removeChild(els[0]);
		els[0].parentNode.removeChild(els[0]);
		els[4].parentNode.removeChild(els[4]);
		els[4].parentNode.removeChild(els[4]);
		els[4].parentNode.removeChild(els[4]);

        iframes = document.getElementsByTagName( "iframe" );
        var i;
        for( i = 0 ; i < iframes.length ; i ++ )
        {
				if ( iframes[i].src.indexOf("casale") >= 0  )
                {
					iframes[i].parentNode.removeChild(iframes[i]);
					i--;
                }
        }


		rows = document.getElementsByTagName( "tr" );
		rows[8].parentNode.removeChild(rows[8]);
		rows[8].parentNode.removeChild(rows[8]);
		rows[9].parentNode.removeChild(rows[9]);

		var linksText = document.createElement("div");
		linksText.innerHTML = '<h1 align="center"><a href="http://www.ebroadcast.com.au/TV/static/'+guide+'Morning.html">Morning</a> - <a href="http://www.ebroadcast.com.au/TV/static/'+guide+'Afternoon.html">Afternoon</a> - <a href="http://www.ebroadcast.com.au/TV/static/'+guide+'Night.html">Night</a> - <a href="http://www.ebroadcast.com.au/TV/static/'+guide+'LateNight.html">Late Night</a></h1>';
		document.body.insertBefore(linksText, els[els.length]); 
	
})();