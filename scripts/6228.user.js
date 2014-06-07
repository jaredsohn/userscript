/*
Geocaching OS Maps - 0.11 04/05/2006
Copyright (c) 2005, Neil Jones
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/.

This substitutes the lame microsoft map on cache information pages for an
OS map snippet from MultiMap showing the given location, along with a link
to the full multi-map page.

Updated 5th July to fix Internet Explorer compatibility for Turnabout

This script is based loosely on the Geocaching Map Linker by Paul Dixon

Modified by Paul Dixon 4th May 2006 to cope with Google Maps changes

Modified by Neil Jones 6th May 2206 to add a link to the google map cache search page

Modified by Neil Jones 5th Nov 2006 to fix the broken maps
*/

// ==UserScript==
// @name          Geocaching UK Map Substituter
// @namespace     http://www.xisoft.co.uk
// @description	  Substitutes the map on the cache information page for an OS map with the cache location marked on it
// @include       http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==


var win=window;
if (unsafeWindow)
{
	win=unsafeWindow;
}


	var isUK=false;
	var gridSheet="TQ";
	var east;
	var north;

	// Extract the grid reference and convert it into an easting & northing (needed by multimap..)
	var UTMFormat = document.getElementById("UTMFormat"); 
	if (UTMFormat)
	{
		var pattern = /British Grid: ([A-Z]{2}) (\d{5}) (\d{5})/;
		var gridRef = UTMFormat.innerHTML.match(pattern);
		// Add test to see if LordElph's script has been added to this page (the mangling breaks the pattern matching)
		if (!gridRef) {
			pattern = />([A-Z]{2}) (\d{5}) (\d{5})/;
			gridRef = UTMFormat.innerHTML.match(pattern);
		}
			
		if (gridRef)
		{
			gridSheet = gridRef[1];
			//GM_log('Grid Sheet: '+gridSheet);
			
			var gridEast=gridRef[2];
			var gridNorth=gridRef[3];
			//GM_log('Grid East: '+gridEast);
			//GM_log('Grid North: '+gridNorth);
			
			//GM_log('Trimmed Grid East: '+gridEast);
			//GM_log('Trimmed Grid North: '+gridNorth);

			var GBGrid = new Array (
				new Array("SV","SW","SX","SY","SZ","TV","TW"),
				new Array("SQ","SR","SS","ST","SU","TQ","TR"),
				new Array("SL","SM","SN","SO","SP","TL","TM"),
				new Array("SF","SG","SH","SJ","SK","TF","TG"),
				new Array("SA","SB","SC","SD","SE","TA","TB"),
				new Array("NV","NW","NX","NY","NZ","OV","OW"),
				new Array("NQ","NR","NS","NT","NU","OQ","OR"),
				new Array("NL","NM","NN","NO","NP","OL","OM"),
				new Array("NF","NG","NH","NJ","NK","OF","OG"),
				new Array("NA","NB","NC","ND","NE","OA","OB"),
				new Array("HV","HW","HX","HY","HZ","JV","JW"),
				new Array("HQ","HR","HS","HT","HU","JQ","JR"),
				new Array("HL","HM","HN","HO","HP","JL","JM"));
			for(y=0; y<GBGrid.length; y++) {
				for(x=0; x<GBGrid[y].length; x++)
					if (GBGrid[y][x] == gridSheet) {
						//GM_log('Parse Int of '+gridEast+' = '+parseInt(gridEast,10));
						//GM_log('Parse Int of '+gridNorth+' = '+parseInt(gridNorth,10));
						east = (x * 100000)+parseInt(gridEast,10);
						north = (y * 100000)+parseInt(gridNorth,10);
						//GM_log('Easting: '+east);
						//GM_log('Northing: '+north);
					}
						
			}
			//UTMFormat.innerHTML = 
			//	UTMFormat.innerHTML.replace(pattern, 
			//	'British Grid <a title="Click for OS Map" href="#" onclick="_popupOSMap(\'$1$2$3\')">$1 $2 $3</a>');
		} else {
			GM_log('Could Not Extract GridRef from: '+UTMFormat.innerHTML);
		}
		
	} else {
		GM_Log('COULD NOT FIND GRID REF');
	}


	//stop the onload from firing up Google Maps
	win.onload=function() {}
	
	var gmap = document.getElementById("map");
	if (gmap)
	{
		gmap.style.display="none";
	}
	
	
	var LargeMap = document.getElementById("LargeMap");
	var LargeMapPrint = document.getElementById("LargeMapPrint");
	if ((LargeMap || LargeMapPrint) && east && north)
	{
		
		var mmX = ""+Math.round(east/250);
		var mmY = ""+Math.round(north/250);
		var mapUrl = "http://mc.multimap.com/cs/mi10//X"+
				    mmX.slice(0,2)+"/Y"+
				    mmY.slice(0,2)+"/X"+mmX+"Y"+mmY+"S25W400H400.gif";

		var multiMapUrl = "http://www.multimap.com/map/browse.cgi?client=public"+
		                  "&X="+(Math.round(east/10000)*10000)+
		                  "&Y="+(Math.round(north/10000)*10000)+
		                  "&width=500&height=300&"+
		                  "&gride="+east+
		                  "&gridn="+north+
		                  "&srec=0&coordsys=gb&db=pc&zm=1&scale=25000";
		var cOffsetX = east - (Math.round(east/250)*250);
		var cOffsetY = north - (Math.round(north/250)*250);
		//GM_log("X Centre Offset:"+cOffsetX);
		//GM_log("Y Centre Offset:"+cOffsetY);
		
		// Convert to map pixels
		cOffsetX = Math.round(cOffsetX*0.225);
		cOffsetY = Math.round(cOffsetY*0.225);
		//GM_log("X Centre Offset(px):"+cOffsetX);
		//GM_log("Y Centre Offset(px):"+cOffsetY);
		
		//GM_log(multiMapUrl);
		//var mapHTML = '<span id="map">'+
		//	      '<A href="'+multiMapUrl+'" target="_blank">'+
		//	      '<IMG ALIGN="right" WIDTH="300" HEIGHT="308" SRC="'+
		//	      mapUrl+ '" BORDER="1"></a>'+
		//	      '<img align="right" style="position:relative; left:'+
		//	      159+'px; top:'+
		//	      142+'px; width:16px; height:16px;" '+
		//	      'src="http://www.multimap.com/images/X.png" alt=""/></span>';

		var mapHTML = '<span id="map">'+
			      '<IMG ALIGN="right" WIDTH="300" HEIGHT="308" SRC="'+
			      mapUrl+ '" BORDER="1" onclick="'+
			      "window.location = 'gmnearest.aspx?lat='+lat+'&lng='+lng+'&zm=14';"+'">'+
			      '<img align="right" style="position:relative; left:'+
			      159+'px; top:'+
			      142+'px; width:16px; height:16px;" '+
			      'src="http://www.multimap.com/images/X.png" alt=""/></span>';
		//GM_log(mapHTML);
		if (LargeMap)
		{
			LargeMap.innerHTML = mapHTML;
			LargeMap.className = "";
			
		}
		else if (LargeMapPrint)
		{
			LargeMapPrint.innerHTML = mapHTML;
		}
	}
	
