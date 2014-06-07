/*
Geocaching OS Linker - 0.50 14/07/2005
Copyright (c) 2005, Paul Dixon <paul@elphin.com>
Released under the GPL http://www.gnu.org/copyleft/gpl.html

This is a Greasemonkey user script, see http://greasemonkey.mozdev.org/.

This provides cache information pages with links to OS Maps for UK
caches, and links to Google Maps and Google Earth for everyone. It 
also changes the OS Get-a-Map popup to include an indicator arrow for 
the cache position.

The parseGridRef function is an adaptation of code Neil Jones
wrote for his map substitution script.
*/

// ==UserScript==
// @name          Geocaching Map Linker
// @namespace     http://files.dixo.net
// @description	  Links cache pages to maps, e.g. Google Maps and UK Ordnance Survey
// @include       http://www.geocaching.com/seek/cache_details.aspx*
// @include       http://getamap.ordnancesurvey.co.uk/getamap/map.htm
// ==/UserScript==



//get position of a DOM element
//(from http://www.quirksmode.org/js/findpos.html)
window._findPosX=function(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

window._findPosY=function(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}


//get url to OS Get-a-Map
window._getOSMapUrl=function(gridref)
{
	if (gridref.length > 0)
		return 'http://getamap.ordnancesurvey.co.uk/getamap/frames.htm?mapAction=gaz&gazName=g&gazString='+gridref;
	else
		return 'http://getamap.ordnancesurvey.co.uk/getamap/frames.htm';
}

//display a OS Get-a-Map popup
window._popupOSMap=function(gridref)
{
        //remember the grid ref
        GM_setValue('gridref', gridref);
        
        var wWidth = 740;
        var wHeight = 520;
        var wLeft = Math.round(0.5 * (screen.availWidth - wWidth));
        var wTop = Math.round(0.5 * (screen.availHeight - wHeight)) - 20;
        var url=window._getOSMapUrl(gridref);
		var newWin = window.open(url, 
			'gam',
			'left='+wLeft+',screenX='+wLeft+',top='+wTop+',screenY='+wTop+',width='+wWidth+',height='+wHeight+',status,scrolling=no');
		newWin.focus();
}

window.getOSMapAnchor=function(gridref, text,title)
{
	var url=window._getOSMapUrl(gridref);

	return '<a target="_blank" title="'+title+'" href="'+url+'" onclick="window._popupOSMap(\''+gridref+'\');return false;">'+text+'</a>';
	
}

window.getGoogleEarthLinkUrl=function(latitude, longitude, name, desc)
{
	//build the kml data
	var kml=new String;
	kml='<?xml version="1.0" encoding="UTF-8"?>';
	kml=kml+'<kml xmlns="http://earth.google.com/kml/2.0">';
	kml=kml+'<Placemark>';
	kml=kml+'<name><![CDATA['+name+']]></name>';

	desc=desc+'<br><a href="'+document.location+'">Cache Details</a>';
	kml=kml+'<description><![CDATA['+desc+']]></description>';



	kml=kml+'<styleUrl>#geocache</styleUrl>';

	kml=kml+'<Style id="geocache"><IconStyle><Icon>';
	kml=kml+'<href>root://icons/palette-2.png</href>';
	kml=kml+'<x>160</x><y>192</y><w>32</w><h>32</h>';
	kml=kml+'</Icon></IconStyle></Style>';



	kml=kml+'<Point>';
	kml=kml+'<coordinates>'+longitude+','+latitude+',0</coordinates>';
	kml=kml+'</Point>';


	kml=kml+'</Placemark>';
	kml=kml+'</kml>';
	
	
	
	//data:[<mediatype>][;base64],<data>
	return "data:application/vnd.google-earth.kml+xml,"+encodeURIComponent(kml);
}

window.getGoogleEarthAnchor=function(latitude, longitude, name, desc, text, title)
{
	var url=window.getGoogleEarthLinkUrl(latitude, longitude, name, desc);
	return '<a href="'+url+'" title="'+title+'">'+text+'</a>';
}


window.getGoogleMapUrl=function(latitude, longitude, sat)
{
	var url="http://maps.google.com/?q="+latitude+"%2C"+longitude;
	if (sat)
	{
		url=url+"&amp;spn=0.055120,0.055120&amp;t=k";
	}
	
	return url
}

window.getGoogleMapAnchor=function(latitude, longitude, sat, text, title)
{
	var url=window.getGoogleMapUrl(latitude, longitude, sat);
	return '<a href="'+url+'" title="'+title+'">'+text+'</a>';
}



//this is called to enhance a geocaching.com cache listing page with OS Get-a-Map links
//and Google Maps links
window.enhanceGeocacheListing=function()
{
	var isUK=false;

	//<span id="UTMFormat">British Grid: TL 11855 26471<br /><font size=2><img src="../images/icons/compass/SW.gif" alt="SW" title="SW" border=0>SW 8.9mi&nbsp;from your home coordinates.<br /></font></span>
	var UTMFormat = document.getElementById("UTMFormat"); 
	if (UTMFormat)
	{
		var pattern = /British Grid: ([A-Z]{2}) (\d{5}) (\d{5})/;
		var matches=UTMFormat.innerHTML.match(pattern);
		if (matches)
		{
			isUK=true;

			var gridref=matches[1]+matches[2]+matches[3];
			
			//store grid reference - GreaseMonkey'd Get-a-Map picks this up
			GM_setValue('gridref', gridref);
			
			var maplink=window.getOSMapAnchor(gridref, matches[1]+' '+matches[2]+' '+matches[3],'Click for OS Map');
			UTMFormat.innerHTML = 
				UTMFormat.innerHTML.replace(pattern, 
				'British Grid '+maplink);
		}

	}
	
	//collect useful information about the cache
	
	//<title>(GCH8TJ) In the shadow of the Tower by Cookiecachers</title>
	var titlepattern = /^\(.*?\) (.*) by .*$/;
	var matches=document.title.match(titlepattern);
	var cachename=matches[1];
	
	var spanShort=document.getElementById("ShortDescription");
	var shortdesc="";
	if (spanShort)
	{
		shortdesc=spanShort.innerHTML;
	}
	
	//<a id="linkJeeep" href="http://www.jeeep.com/details/coord/translate.cgi?datum=83&amp;lat=51.9255&amp;lon=-0.374733&amp;detail=1"
	var linkJeeep = document.getElementById("linkJeeep");
	if (linkJeeep && UTMFormat)
	{
		//alert(linkJeeep.href);
		var pattern = /lat=(-?[\d\.]+).*lon=(-?[\d\.]+)/;
		var matches=linkJeeep.href.match(pattern);
		if (matches)
		{
			var latitude=matches[1];
			var longitude=matches[2];

			var linkGMap=window.getGoogleMapAnchor(latitude, longitude, false, 'Google Map', 'Click for Google Map');
			var linkGSat=window.getGoogleMapAnchor(latitude, longitude, true, '(inc Satellite)', 'Click for Google Map with Satellite Images (if available)');
			var linkGEarth=window.getGoogleEarthAnchor(latitude, longitude, cachename, shortdesc, 'Google Earth', 'Click to open Google Earth waypoint');
			
			UTMFormat.innerHTML=linkGMap+" "+linkGSat+" "+linkGEarth+"<br/>"+UTMFormat.innerHTML;
		}

	}
	
	//lets see if we can hyperlink any other mentioned coordinates to a map
	var spanLong=document.getElementById("LongDescription");
	if (spanLong)
	{
		
		
		
		var longdesc=spanLong.innerHTML;
	
		//match N52 03.270 W000 17.675
		longdesc=longdesc.replace(/([ns])\s*(\d+)[ÃÂ°\s]+(\d+\.\d+)\s+([we])\s*(\d+)[ÃÂ°\s]+(\d+\.\d+)/ig,
		   function (match, lat1,lat2,lat3,long1,long2,long3) 
		   {
			  var reformatted=match;
			  var wgs84=new GT_WGS84();
			  if (wgs84.parseString(match))
			  {
			  	if (wgs84.isGreatBritain())
			  	{
			  		//link to OSGB map
			  		var osgb=wgs84.getOSGB();
			  		var gridref=osgb.getGridRef(5);
			  		
			  		var anchor=window.getOSMapAnchor(gridref, '<span style="font-size:small;">[map]</span>','Click for OS Map');
					reformatted=match+ " "+anchor;
			  		
			  	}
			  	else
			  	{
			  		//link to google maps
			  	}
			  	
			  }
			  
			  
			  
			  return reformatted;
		   }
	                   
	                
        );
        
        spanLong.innerHTML=longdesc;       
	}
	
	
	
}




//this is called to enhance OS Get-a-Map - it overrides some of their
//JS functions with cheeky monkey versions
window.enhanceOSMap=function()
{
	window.original_updateInfo=updateInfo;
	updateInfo=window.super_updateInfo;
	
	window.original_setRetImg=setRetImg;
	setRetImg=window.super_setRetImg;
}

//Get-A-Map calls this to hide the map, we take opportunity to hide our
//indicator marker too...
window.super_setRetImg=function()
{
	var result=window.original_setRetImg();
	
	//hide our marker
	var indicator=document.getElementById('monkeymagic');
	if (indicator)
	{
		indicator.style.display='none';
	}
	
	return result;
}

//Get-A-Map calls this to update the display, so we do the magic to place an
//indicator marker onto the map
window.super_updateInfo=function(winWid, srcDat, coordStr, lastSearch, a, b, c, d, e)
{
	//GM_log("winWid="+winWid+" srcDat="+srcDat+" coordStr="+coordStr+" lastSearch="+lastSearch+" a="+a+" b="+b+" c="+c+" d="+d+" e="+e);
	
	//call original function
	var result=window.original_updateInfo(winWid, srcDat, coordStr, lastSearch, a, b, c, d, e);
	
	
	//get grid reference to plot
	var gridref=GM_getValue('gridref', '');
	if (gridref.length)
	{
		var osgb=new GT_OSGB();
		osgb.parseGridRef(gridref);
		
		//for TL1801127713
		//gives     520737, 226196
		//should be 518011, 227713
		//out by 2726,-1517
	
		//GM_log("gridref="+gridref);

		//get the info original code pasted in
		var mapInfo=document.getElementById('mapInfo')
		var info=mapInfo.innerHTML;

		//parse the scale
		var metres_per_pixel=5;
		var pattern = /Window width - (\d+) km/;
		if (matches=info.match(pattern))
		{
			var w=parseInt(matches[1]);
			metres_per_pixel=(w*1000)/400;
		}


		//GM_log("metres per pixel "+metres_per_pixel);

		//point 0,0 on the image can be obtained from the OS script
		//variables minX,maxY - frm this we can work out the offset
		//in metres to the indicator point
		var mx=osgb.eastings - window.minX;
		var my=window.maxY - osgb.northings;

		//GM_log("osgb.eastings="+osgb.eastings+" osgb.northings="+osgb.northings);
		//GM_log("minX="+window.minX+" maxY="+window.maxY);
		//GM_log("mx="+mx+" my="+my);

		//and now it's just a simple conversion to pixels
		var px=mx/metres_per_pixel;
		var py=my/metres_per_pixel;

		//get the map img and calculate the absolute position of our marker
		var mapImg = document.images['imgMap'];	
		var imgx=window._findPosX(mapImg) + px;
		var imgy=window._findPosY(mapImg) +py;

		
		

		var indicator=document.getElementById('monkeymagic');
		if (!indicator)
		{
			//create our indicator - a transparent image, absolutely positioned
			indicator=document.createElement('img');
			indicator.src='data:image/gif,GIF89a%0D%00%0D%00%80%00%00%FF%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%0D%00%0D%00%00%02%1A%84%8F%A9%18%CB%ED%40%98q%D2zq%3Cp%A7%CEp%99qY%99%25%99%94Y%00%00%3B';
			indicator.id='monkeymagic';
			indicator.style.position="absolute";
			indicator.style.display='none';
			
			//insert into document
			mapInfo.parentNode.insertBefore(indicator, mapInfo);
		}

		//set the indicator position
		indicator.style.top=imgy;
		indicator.style.left=imgx;
		indicator.style.display='';

	}
	
	
	
	
	
	
	return result;
}


/*****************************************************************************
*
* GeoTools script inlined here....
* Contact paul@elphin.com for most recent version of this script...
*
*****************************************************************************/


/*****************************************************************************
*
* GT_OSGB holds OSGB grid coordinates
*
*****************************************************************************/

function GT_OSGB()
{
	this.northings=0;
	this.eastings=0;
	this.status="Undefined";
}

GT_OSGB.prefixes = new Array (
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
			

GT_OSGB.prototype.setGridCoordinates = function(eastings,northings)
{
	this.northings=northings;
	this.eastings=eastings;
	this.status="OK";
}

GT_OSGB.prototype.setError = function(msg)
{
	this.status=msg;
}

GT_OSGB.prototype._zeropad = function(num, len)
{
	var str=new String(num);
	while (str.length<len)
	{
		str='0'+str;
	}
	return str;
}

GT_OSGB.prototype.getGridRef = function(precision)
{
	
	

	if (precision<0)
		precision=0;
	if (precision>5)
		precision=5;
		
	var e="";

	var n="";
	if (precision>0)
	{
		var y=Math.floor(this.northings/100000);
		var x=Math.floor(this.eastings/100000);


		var e=Math.round(this.eastings%100000);
		var n=Math.round(this.northings%100000);


		var div=(5-precision);
		e=Math.round(e / Math.pow(10, div));
		n=Math.round(n / Math.pow(10, div));
	}
	
	var prefix=GT_OSGB.prefixes[y][x];
	
    return prefix+this._zeropad(e, precision)+this._zeropad(n, precision);
}

GT_OSGB.prototype.parseGridRef = function(landranger)
{
	var ok=false;

	
	this.northings=0;
	this.eastings=0;
	
	var precision;

	for (precision=5; precision>=1; precision--)
	{
		var pattern = new RegExp("^([A-Z]{2})\\s*(\\d{"+precision+"})\\s*(\\d{"+precision+"})$", "i")
		var gridRef = landranger.match(pattern);
		if (gridRef)
		{
			var gridSheet = gridRef[1];
			var gridEast=0;
			var gridNorth=0;
			
			//5x1 4x10 3x100 2x1000 1x10000 
			if (precision>0)
			{
				var mult=Math.pow(10, 5-precision);
				gridEast=parseInt(gridRef[2],10) * mult;
				gridNorth=parseInt(gridRef[3],10) * mult;
			}
			
			var x,y;
			search: for(y=0; y<GT_OSGB.prefixes.length; y++) 
			{
				for(x=0; x<GT_OSGB.prefixes[y].length; x++)
					if (GT_OSGB.prefixes[y][x] == gridSheet) {
						this.eastings = (x * 100000)+gridEast;
						this.northings = (y * 100000)+gridNorth;
						ok=true;
						break search;
					}
			
			}
		
		}
	}

	

	return ok;
}


GT_OSGB.prototype.getWGS84 = function()
{
	
	var height = 0;

	var lat1 = GT_Math.E_N_to_Lat (this.eastings,this.northings,6377563.396,6356256.910,400000,-100000,0.999601272,49.00000,-2.00000);
	var lon1 = GT_Math.E_N_to_Long(this.eastings,this.northings,6377563.396,6356256.910,400000,-100000,0.999601272,49.00000,-2.00000);

	var x1 = GT_Math.Lat_Long_H_to_X(lat1,lon1,height,6377563.396,6356256.910);
	var y1 = GT_Math.Lat_Long_H_to_Y(lat1,lon1,height,6377563.396,6356256.910);
	var z1 = GT_Math.Lat_H_to_Z     (lat1,      height,6377563.396,6356256.910);

	var x2 = GT_Math.Helmert_X(x1,y1,z1,446.448 ,0.2470,0.8421,-20.4894);
	var y2 = GT_Math.Helmert_Y(x1,y1,z1,-125.157,0.1502,0.8421,-20.4894);
	var z2 = GT_Math.Helmert_Z(x1,y1,z1,542.060 ,0.1502,0.2470,-20.4894);

	var latitude = GT_Math.XYZ_to_Lat(x2,y2,z2,6378137.000,6356752.313);
	var longitude = GT_Math.XYZ_to_Long(x2,y2);

	var wgs84=new GT_WGS84();
	wgs84.setDegrees(latitude, longitude);
	return wgs84;
}

/*****************************************************************************
*
* GT_WGS84 holds WGS84 latitude and longitude
*
*****************************************************************************/

function GT_WGS84()
{
	this.latitude=0;
	this.longitude=0;
}

GT_WGS84.prototype.setDegrees = function(latitude,longitude)
{
	this.latitude=latitude;
	this.longitude=longitude;
}

GT_WGS84.prototype.parseString = function(text)
{
	var ok=false;

	var str=new String(text);

	//N 51ÃÂ° 53.947 W 000ÃÂ° 10.018

	var pattern = /([ns])\s*(\d+)[ÃÂ°\s]+(\d+\.\d+)\s+([we])\s*(\d+)[ÃÂ°\s]+(\d+\.\d+)/i;
	var matches=str.match(pattern);
	if (matches)
	{
		ok=true;
		var latsign=(matches[1]=='s' || matches[1]=='S')?-1:1;
		var longsign=(matches[4]=='w' || matches[4]=='W')?-1:1;
		
		var d1=parseFloat(matches[2]);
		var m1=parseFloat(matches[3]);
		var d2=parseFloat(matches[5]);
		var m2=parseFloat(matches[6]);
		
		this.latitude=latsign * (d1 + (m1/60.0));
		this.longitude=longsign * (d2 + (m2/60.0));
		
		
	}
	
	return ok;
}



GT_WGS84.prototype.isGreatBritain = function()
{
	return this.latitude > 49 &&
		this.latitude < 62 &&
		this.longitude > -9.5 &&
		this.longitude < 2.3;
}

GT_WGS84.prototype.isIreland = function()
{
	return this.latitude > 51.2 &&
		this.latitude < 55.73 &&
		this.longitude > -12.2 &&
		this.longitude < -4.8;
}



GT_WGS84.prototype.getOSGB = function()
{
	var osgb=new GT_OSGB();
	if (this.isGreatBritain())
	{
		var height = 0;
		
		var x1 = GT_Math.Lat_Long_H_to_X(this.latitude,this.longitude,height,6378137.00,6356752.313);
		var y1 = GT_Math.Lat_Long_H_to_Y(this.latitude,this.longitude,height,6378137.00,6356752.313);
		var z1 = GT_Math.Lat_H_to_Z     (this.latitude,      height,6378137.00,6356752.313);

		var x2 = GT_Math.Helmert_X(x1,y1,z1,-446.448,-0.2470,-0.8421,20.4894);
		var y2 = GT_Math.Helmert_Y(x1,y1,z1, 125.157,-0.1502,-0.8421,20.4894);
		var z2 = GT_Math.Helmert_Z(x1,y1,z1,-542.060,-0.1502,-0.2470,20.4894);

		var latitude2  = GT_Math.XYZ_to_Lat (x2,y2,z2,6377563.396,6356256.910);
		var longitude2 = GT_Math.XYZ_to_Long(x2,y2);

		var e = GT_Math.Lat_Long_to_East (latitude2,longitude2,6377563.396,6356256.910,400000,0.999601272,49.00000,-2.00000);
		var n = GT_Math.Lat_Long_to_North(latitude2,longitude2,6377563.396,6356256.910,400000,-100000,0.999601272,49.00000,-2.00000);

		osgb.setGridCoordinates(Math.round(e), Math.round(n));
	}
	else
	{
		osgb.setError("Coordinate not within Great Britain");
	}

	return osgb;
}




/*****************************************************************************
*
* GT_Math is a collection of static methods doing all the nasty sums
*
*****************************************************************************/

//GT_Math is just namespace for all the nasty maths functions
function GT_Math()
{
}

GT_Math.E_N_to_Lat = function(East, North, a, b, e0, n0, f0, PHI0, LAM0)
{
	//Un-project Transverse Mercator eastings and northings back to latitude.
	//Input: - _
	//eastings (East) and northings (North) in meters; _
	//ellipsoid axis dimensions (a & b) in meters; _
	//eastings (e0) and northings (n0) of false origin in meters; _
	//central meridian scale factor (f0) and _
	//latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	//'REQUIRES THE "Marc" AND "InitialLat" FUNCTIONS

	//Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);

	//Compute af0, bf0, e squared (e2), n and Et
    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var Et = East - e0;

	//Compute initial value for latitude (PHI) in radians
    var PHId = GT_Math.InitialLat(North, n0, af0, RadPHI0, n, bf0);
    
	//Compute nu, rho and eta2 using value for PHId
    var nu = af0 / (Math.sqrt(1 - (e2 * ( Math.pow(Math.sin(PHId),2)))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(PHId),2)));
    var eta2 = (nu / rho) - 1;
    
	//Compute Latitude
    var VII = (Math.tan(PHId)) / (2 * rho * nu);
    var VIII = ((Math.tan(PHId)) / (24 * rho * Math.pow(nu,3))) * (5 + (3 * (Math.pow(Math.tan(PHId),2))) + eta2 - (9 * eta2 * (Math.pow(Math.tan(PHId),2))));
    var IX = ((Math.tan(PHId)) / (720 * rho * Math.pow(nu,5))) * (61 + (90 * ((Math.tan(PHId)) ^ 2)) + (45 * (Math.pow(Math.tan(PHId),4))));
    
    var E_N_to_Lat = (180 / Pi) * (PHId - (Math.pow(Et,2) * VII) + (Math.pow(Et,4) * VIII) - ((Et ^ 6) * IX));
	
	return (E_N_to_Lat);
}

GT_Math.E_N_to_Long = function(East, North, a, b, e0, n0, f0, PHI0, LAM0)
{
	//Un-project Transverse Mercator eastings and northings back to longitude.
	//Input: - _
	//eastings (East) and northings (North) in meters; _
	//ellipsoid axis dimensions (a & b) in meters; _
	//eastings (e0) and northings (n0) of false origin in meters; _
	//central meridian scale factor (f0) and _
	//latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	//REQUIRES THE "Marc" AND "InitialLat" FUNCTIONS

	//Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);

	//Compute af0, bf0, e squared (e2), n and Et
    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var Et = East - e0;

	//Compute initial value for latitude (PHI) in radians
    var PHId = GT_Math.InitialLat(North, n0, af0, RadPHI0, n, bf0);
    
	//Compute nu, rho and eta2 using value for PHId
   	var nu = af0 / (Math.sqrt(1 - (e2 * (Math.pow(Math.sin(PHId),2)))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(PHId),2)));
    var eta2 = (nu / rho) - 1;

	//Compute Longitude
    var X = (Math.pow(Math.cos(PHId),-1)) / nu;
    var XI = ((Math.pow(Math.cos(PHId),-1)) / (6 * Math.pow(nu,3))) * ((nu / rho) + (2 * (Math.pow(Math.tan(PHId),2))));
    var XII = ((Math.pow(Math.cos(PHId),-1)) / (120 * Math.pow(nu,5))) * (5 + (28 * (Math.pow(Math.tan(PHId),2))) + (24 * (Math.pow(Math.tan(PHId),4))));
    var XIIA = ((Math.pow(Math.cos(PHId),-1)) / (5040 * Math.pow(nu,7))) * (61 + (662 * (Math.pow(Math.tan(PHId),2))) + (1320 * (Math.pow(Math.tan(PHId),4))) + (720 * (Math.pow(Math.tan(PHId),6))));

    var E_N_to_Long = (180 / Pi) * (RadLAM0 + (Et * X) - (Math.pow(Et,3) * XI) + (Math.pow(Et,5) * XII) - (Math.pow(Et,7) * XIIA));
	
	return E_N_to_Long;
}

GT_Math.InitialLat = function(North, n0, afo, PHI0, n, bfo)
{
	//Compute initial value for Latitude (PHI) IN RADIANS.
	//Input: - _
	//northing of point (North) and northing of false origin (n0) in meters; _
	//semi major axis multiplied by central meridian scale factor (af0) in meters; _
	//latitude of false origin (PHI0) IN RADIANS; _
	//n (computed from a, b and f0) and _
	//ellipsoid semi major axis multiplied by central meridian scale factor (bf0) in meters.
 
	//REQUIRES THE "Marc" FUNCTION
	//THIS FUNCTION IS CALLED BY THE "E_N_to_Lat", "E_N_to_Long" and "E_N_to_C" FUNCTIONS
	//THIS FUNCTION IS ALSO USED ON IT'S OWN IN THE  "Projection and Transformation Calculations.xls" SPREADSHEET

	//First PHI value (PHI1)
   	var PHI1 = ((North - n0) / afo) + PHI0;
    
	//Calculate M
    var M = GT_Math.Marc(bfo, n, PHI0, PHI1);
    
	//Calculate new PHI value (PHI2)
    var PHI2 = ((North - n0 - M) / afo) + PHI1;
    
	//Iterate to get final value for InitialLat
	while (Math.abs(North - n0 - M) > 0.00001) 
	{
        PHI2 = ((North - n0 - M) / afo) + PHI1;
        M = GT_Math.Marc(bfo, n, PHI0, PHI2);
        PHI1 = PHI2;
	}    
    return PHI2;
}

GT_Math.Lat_Long_H_to_X = function(PHI, LAM, H, a, b)
{
	// Convert geodetic coords lat (PHI), long (LAM) and height (H) to cartesian X coordinate.
	// Input: - _
	//    Latitude (PHI)& Longitude (LAM) both in decimal degrees; _
	//  Ellipsoidal height (H) and ellipsoid axis dimensions (a & b) all in meters.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);

	// Compute eccentricity squared and nu
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)))));

	// Compute X
    return (V + H) * (Math.cos(RadPHI)) * (Math.cos(RadLAM));
}


GT_Math.Lat_Long_H_to_Y =function(PHI, LAM, H, a, b) 
{
	// Convert geodetic coords lat (PHI), long (LAM) and height (H) to cartesian Y coordinate.
	// Input: - _
	// Latitude (PHI)& Longitude (LAM) both in decimal degrees; _
	// Ellipsoidal height (H) and ellipsoid axis dimensions (a & b) all in meters.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);

	// Compute eccentricity squared and nu
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2))) ));

	// Compute Y
    return (V + H) * (Math.cos(RadPHI)) * (Math.sin(RadLAM));
}


GT_Math.Lat_H_to_Z =function(PHI, H, a, b)
{
	// Convert geodetic coord components latitude (PHI) and height (H) to cartesian Z coordinate.
	// Input: - _
	//    Latitude (PHI) decimal degrees; _
	// Ellipsoidal height (H) and ellipsoid axis dimensions (a & b) all in meters.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);

	// Compute eccentricity squared and nu
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var V = a / (Math.sqrt(1 - (e2 * (  Math.pow(Math.sin(RadPHI),2)) )));

	// Compute X
    return ((V * (1 - e2)) + H) * (Math.sin(RadPHI));
}


GT_Math.Helmert_X =function(X,Y,Z,DX,Y_Rot,Z_Rot,s) 
{

	// (X, Y, Z, DX, Y_Rot, Z_Rot, s)
	// Computed Helmert transformed X coordinate.
	// Input: - _
	//    cartesian XYZ coords (X,Y,Z), X translation (DX) all in meters ; _
	// Y and Z rotations in seconds of arc (Y_Rot, Z_Rot) and scale in ppm (s).

	// Convert rotations to radians and ppm scale to a factor
	var Pi = 3.14159265358979;
	var sfactor = s * 0.000001;

	var RadY_Rot = (Y_Rot / 3600) * (Pi / 180);

	var RadZ_Rot = (Z_Rot / 3600) * (Pi / 180);

	//Compute transformed X coord
    return  (X + (X * sfactor) - (Y * RadZ_Rot) + (Z * RadY_Rot) + DX);
}


GT_Math.Helmert_Y =function(X,Y,Z,DY,X_Rot,Z_Rot,s)
{
	// (X, Y, Z, DY, X_Rot, Z_Rot, s)
	// Computed Helmert transformed Y coordinate.
	// Input: - _
	//    cartesian XYZ coords (X,Y,Z), Y translation (DY) all in meters ; _
	//  X and Z rotations in seconds of arc (X_Rot, Z_Rot) and scale in ppm (s).

	// Convert rotations to radians and ppm scale to a factor
	var Pi = 3.14159265358979;
	var sfactor = s * 0.000001;
	var RadX_Rot = (X_Rot / 3600) * (Pi / 180);
	var RadZ_Rot = (Z_Rot / 3600) * (Pi / 180);

	// Compute transformed Y coord
	return (X * RadZ_Rot) + Y + (Y * sfactor) - (Z * RadX_Rot) + DY;

}



GT_Math.Helmert_Z =function(X, Y, Z, DZ, X_Rot, Y_Rot, s)
{
	// (X, Y, Z, DZ, X_Rot, Y_Rot, s)
	// Computed Helmert transformed Z coordinate.
	// Input: - _
	//    cartesian XYZ coords (X,Y,Z), Z translation (DZ) all in meters ; _
	// X and Y rotations in seconds of arc (X_Rot, Y_Rot) and scale in ppm (s).
	// 
	// Convert rotations to radians and ppm scale to a factor
	var Pi = 3.14159265358979;
	var sfactor = s * 0.000001;
	var RadX_Rot = (X_Rot / 3600) * (Pi / 180);
	var RadY_Rot = (Y_Rot / 3600) * (Pi / 180);

	// Compute transformed Z coord
	return (-1 * X * RadY_Rot) + (Y * RadX_Rot) + Z + (Z * sfactor) + DZ;
} 






GT_Math.XYZ_to_Lat =function(X, Y, Z, a, b) 
{
	// Convert XYZ to Latitude (PHI) in Dec Degrees.
	// Input: - _
	// XYZ cartesian coords (X,Y,Z) and ellipsoid axis dimensions (a & b), all in meters.

	// THIS FUNCTION REQUIRES THE "Iterate_XYZ_to_Lat" FUNCTION
	// THIS FUNCTION IS CALLED BY THE "XYZ_to_H" FUNCTION

    var RootXYSqr = Math.sqrt(Math.pow(X,2) + Math.pow(Y,2));
    var e2 = (Math.pow(a,2) - Math.pow(b,2)) / Math.pow(a,2);
    var PHI1 = Math.atan2(Z , (RootXYSqr * (1 - e2)) );
    
    var PHI = GT_Math.Iterate_XYZ_to_Lat(a, e2, PHI1, Z, RootXYSqr);
    
    var Pi = 3.14159265358979;
    
    return PHI * (180 / Pi);
}


GT_Math.Iterate_XYZ_to_Lat =function(a, e2, PHI1, Z, RootXYSqr) 
{
	// Iteratively computes Latitude (PHI).
	// Input: - _
	//    ellipsoid semi major axis (a) in meters; _
	//    eta squared (e2); _
	//    estimated value for latitude (PHI1) in radians; _
	//    cartesian Z coordinate (Z) in meters; _
	// RootXYSqr computed from X & Y in meters.

	// THIS FUNCTION IS CALLED BY THE "XYZ_to_PHI" FUNCTION
	// THIS FUNCTION IS ALSO USED ON IT'S OWN IN THE _
	// "Projection and Transformation Calculations.xls" SPREADSHEET


    var V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
    var PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
    
    while (Math.abs(PHI1 - PHI2) > 0.000000001) {
        PHI1 = PHI2;
        V = a / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(PHI1),2))));
        PHI2 = Math.atan2((Z + (e2 * V * (Math.sin(PHI1)))) , RootXYSqr);
    }

    return PHI2;
}


GT_Math.XYZ_to_Long =function (X, Y) 
{
	// Convert XYZ to Longitude (LAM) in Dec Degrees.
	// Input: - _
	// X and Y cartesian coords in meters.

    var Pi = 3.14159265358979;
    return Math.atan2(Y , X) * (180 / Pi);
}

GT_Math.Marc =function (bf0, n, PHI0, PHI) 
{
	//Compute meridional arc.
	//Input: - _
	// ellipsoid semi major axis multiplied by central meridian scale factor (bf0) in meters; _
	// n (computed from a, b and f0); _
	// lat of false origin (PHI0) and initial or final latitude of point (PHI) IN RADIANS.

	//THIS FUNCTION IS CALLED BY THE - _
	// "Lat_Long_to_North" and "InitialLat" FUNCTIONS
	// THIS FUNCTION IS ALSO USED ON IT'S OWN IN THE "Projection and Transformation Calculations.xls" SPREADSHEET

		return bf0 * (((1 + n + ((5 / 4) * Math.pow(n,2)) + ((5 / 4) * Math.pow(n,3))) * (PHI - PHI0)) - (((3 * n) + (3 * Math.pow(n,2)) + ((21 / 8) * Math.pow(n,3))) * (Math.sin(PHI - PHI0)) * (Math.cos(PHI + PHI0))) + ((((15 / 8
	) * Math.pow(n,2)) + ((15 / 8) * Math.pow(n,3))) * (Math.sin(2 * (PHI - PHI0))) * (Math.cos(2 * (PHI + PHI0)))) - (((35 / 24) * Math.pow(n,3)) * (Math.sin(3 * (PHI - PHI0))) * (Math.cos(3 * (PHI + PHI0)))));
}




GT_Math.Lat_Long_to_East =function (PHI, LAM, a, b, e0, f0, PHI0, LAM0)
{
	//Project Latitude and longitude to Transverse Mercator eastings.
	//Input: - _
	//    Latitude (PHI) and Longitude (LAM) in decimal degrees; _
	//    ellipsoid axis dimensions (a & b) in meters; _
	//    eastings of false origin (e0) in meters; _
	//    central meridian scale factor (f0); _
	// latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);

    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var nu = af0 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(RadPHI),2) )));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(RadPHI),2) ));
    var eta2 = (nu / rho) - 1;
    var p = RadLAM - RadLAM0;
    
    var IV = nu * (Math.cos(RadPHI));
    var V = (nu / 6) * ( Math.pow(Math.cos(RadPHI),3)) * ((nu / rho) - (Math.pow(Math.tan(RadPHI),2)));
    var VI = (nu / 120) * (Math.pow(Math.cos(RadPHI),5)) * (5 - (18 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)) + (14 * eta2) - (58 * (Math.pow(Math.tan(RadPHI),2)) * eta2));
    
    return e0 + (p * IV) + (Math.pow(p,3) * V) + (Math.pow(p,5) * VI);
}


GT_Math.Lat_Long_to_North =function (PHI, LAM, a, b, e0, n0, f0, PHI0, LAM0) 
{
	// Project Latitude and longitude to Transverse Mercator northings
	// Input: - _
	// Latitude (PHI) and Longitude (LAM) in decimal degrees; _
	// ellipsoid axis dimensions (a & b) in meters; _
	// eastings (e0) and northings (n0) of false origin in meters; _
	// central meridian scale factor (f0); _
	// latitude (PHI0) and longitude (LAM0) of false origin in decimal degrees.

	// REQUIRES THE "Marc" FUNCTION

	// Convert angle measures to radians
    var Pi = 3.14159265358979;
    var RadPHI = PHI * (Pi / 180);
    var RadLAM = LAM * (Pi / 180);
    var RadPHI0 = PHI0 * (Pi / 180);
    var RadLAM0 = LAM0 * (Pi / 180);
    
    var af0 = a * f0;
    var bf0 = b * f0;
    var e2 = (Math.pow(af0,2) - Math.pow(bf0,2)) / Math.pow(af0,2);
    var n = (af0 - bf0) / (af0 + bf0);
    var nu = af0 / (Math.sqrt(1 - (e2 * Math.pow(Math.sin(RadPHI),2))));
    var rho = (nu * (1 - e2)) / (1 - (e2 * Math.pow(Math.sin(RadPHI),2)));
    var eta2 = (nu / rho) - 1;
    var p = RadLAM - RadLAM0;
    var M = GT_Math.Marc(bf0, n, RadPHI0, RadPHI);
    
    var I = M + n0;
    var II = (nu / 2) * (Math.sin(RadPHI)) * (Math.cos(RadPHI));
    var III = ((nu / 24) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),3))) * (5 - (Math.pow(Math.tan(RadPHI),2)) + (9 * eta2));
    var IIIA = ((nu / 720) * (Math.sin(RadPHI)) * (Math.pow(Math.cos(RadPHI),5))) * (61 - (58 * (Math.pow(Math.tan(RadPHI),2))) + (Math.pow(Math.tan(RadPHI),4)));
    
    return I + (Math.pow(p,2) * II) + (Math.pow(p,4) * III) + (Math.pow(p,6) * IIIA);
}








//we're a multi-domain script, so here we decide what we're going to do...
var url=new String(document.location);
if (url.match(/^http:\/\/www\.geocaching\.com\/seek\/cache_details\.aspx.*/i))
{
	window.enhanceGeocacheListing();
}
else if (url.match(/^http:\/\/getamap\.ordnancesurvey\.co\.uk\/getamap\/map\.htm/i))
{
	window.enhanceOSMap();
}
