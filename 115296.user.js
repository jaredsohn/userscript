// ==UserScript==
// @name           gcpl_gpx
// @namespace      gcpl
// @version        1.0
// @description    get gpx from geocaching.pl
// @include        http://www.geocaching.pl*
// @author         qrcodepl
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var DEBUG = true;

const version="1.0" ; // will be checked once the day 
const build="0001" ; // will be checked once the day 

var urls;
var urlIndex = 0;
var cacheIndex = 0;

// xmlDoc = document.implementation.createDocument("", "", null);
// root = xmlDoc.createElement("root");
// xmlDoc.appendChild(root);

var xmlString ;

function debug(s) {
	if (DEBUG && console) {
		unsafeWindow.console.log('GC: '+s);
  }
}

function xmlEncode( myString ) {
	
	var result ; 

    result = myString.replace( /&/g, "&amp;" ) ;
	result = result.replace( /</g, "&lt;" );
	result = result.replace( />/g, "&gt;" );
	
	return result;
}

//Submit handler for gpx generation


div = document.createElement("div");
div.innerHTML = '<textarea id="gpx_txt" style="height: 20px; width: 100%; margin-left: auto; margin-right: auto;"></textarea>' +
				'<button id="gpx_gen" type="button" onclick="javascript:return 0;" style="width: 100%;">Generate GPX (version:' 
				+ version + '.b.' + build + ')</button>' ;

td = document.getElementsByTagName("td")[0] ;
td.insertBefore(div, td.firstChild );
gpxTxt = document.getElementById('gpx_txt');
gpxButton = document.getElementById('gpx_gen');

gpxButton.addEventListener('click', function(e) {
// window.addEventListener('submit', function(e) {
	// stop the event before it gets to the element and causes onsubmit to
	// get called.
	debug('inside event listener ');
	e.stopPropagation();
	// stop the form from submitting
	e.preventDefault();
		
		
	gpxTxt.setAttribute("style","height: 20px; width: 100%; margin-left: auto; margin-right: auto;") ;
	gpxTxt.value = '';
	
	// create url array
	
	urls = new Array();
    for( lon = 14.0 ; lon <= 24.0 ; lon += 1.0 ) {
	// for( lon = 14.0 ; lon <= 15.0 ; lon += 1.0 ) {   // for test time only
		for( lat = 49.0 ; lat <= 55.0 ; lat += 0.5 ) {
			lon2 = lon + 0.99999999999 ;
			lat2 = lat + 0.49999999999 ;
			url = "http://www.geocaching.pl/services/getcaches.php?BBOX=" + lon.toFixed(2) + "," + lat.toFixed(2) + "," + lon2 + "," + lat2 ;
			urls.push( url );	
		}	
	}
	urlIndex = 0;
	cacheIndex = 0;
	
	xmlString = '' ;
	processing();
  	
}, true);

function processing(response) {
		
	if( response ) {
    		if (!response.responseXML) {
      			response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    		}
			len = response.responseXML.getElementsByTagName("markers")[0].childNodes.length ;
			lenMarker = response.responseXML.getElementsByTagName("marker").length ;
			cacheIndex += lenMarker ;
			gpxTxt.value = 'Get cache data :' + cacheIndex ;
			debug( 'Response len = ' + lenMarker );
			if( lenMarker > 0 ) {

			for( m = 0; m < lenMarker; m ++ ) {
				var cacheType, cacheTypeName , available, cacheName, owner, container , difficulty, terrain ;
				var tmp ;
				marker = response.responseXML.getElementsByTagName("marker")[m] ;
				cacheTypeName = marker.getAttribute('cache_type_name') ;
				tmp           = marker.getAttribute('cachename') ;
				cacheName     = xmlEncode( tmp );
				tmp           = marker.getAttribute('username') ;
				owner         = xmlEncode( tmp );				
				difficulty    = marker.getAttribute('difficulty') ;
				terrain       = marker.getAttribute('terrain') ;
				
				xmlString +=  '<wpt lat="' + marker.getAttribute('lat') + '" lon="'+ marker.getAttribute('lng') + '">\n';
				  xmlString += ' <time>' + marker.getAttribute('date') + 'T00:00:00Z</time>\n';
				  xmlString += ' <name>' + marker.getAttribute('waypoint') + '</name>\n';
				  xmlString += ' <desc>' + cacheName + ' by ' + 
				               owner + ', ' + 
				               cacheTypeName + ' (' + 
				               difficulty + '/' + terrain +
				               ')</desc>\n';
				  xmlString += ' <url>' + 'http://www.geocaching.com/seek/cache_details.aspx?wp=' +  marker.getAttribute('waypoint') + '</url>\n' ;				               
				  xmlString += ' <sym>Geocache</sym>\n';

				  if ( cacheTypeName == 'Skrytka Tradycyjna' ) 
				  	  cacheType = 'Traditional Cache'
				  else if ( cacheTypeName == 'Skrytka MultiCache' )	  
				      cacheType = 'Multi-Cache (offset)'				      
				  else if ( cacheTypeName == 'Skrytka Zagadkowa' )
				      cacheType = 'Unknown (Mystery) Cache'
				  else if ( cacheTypeName == 'Letterbox Hybrydowy' )
				      cacheType = 'LetterBox Hybrid'
				  else if ( cacheTypeName == 'Skrytka Wydarzenie' )
				      cacheType = 'Event Cache'
				  else if ( cacheTypeName == 'Skrytka EarthCache' )
				      cacheType = 'Earthcache'
				  else if ( cacheTypeName == 'Skrytka Wirtualna' )
				      cacheType = 'Virtual Cache'
				  else
				      cacheType = 'Inny' ;    					  				  
				  xmlString += ' <type>Geocache|' + cacheType  + '</type>\n';
				  
				  if( marker.getAttribute('available') ==  '1' ) 
				    available = 'True'
				  else 
				    available = 'False' ;
				  
				  if( marker.getAttribute('container_name') ==  'Mały' )    
				  	container = 'Small'
				  else if( marker.getAttribute('container_name') ==  'Mikro' ) 
				    container = 'Micro' 
				  else if( marker.getAttribute('container_name') ==  'Normalny' )  	  
				    container = 'Regular'
				  else if( marker.getAttribute('container_name') ==  'Duży' ) 
				    container = 'Large' 
				  else  
				    container = 'inny' ;    
				    
				  xmlString += ' <groundspeak:cache available="' + available + '" xmlns:groundspeak="http://www.groundspeak.com/cache/1/0/1">\n';
				    xmlString += '   <groundspeak:name>'+ cacheName +' ( ' + cacheType + ' )</groundspeak:name>\n';
				    xmlString += '   <groundspeak:placed_by>' + owner + '</groundspeak:placed_by>\n';
				    xmlString += '   <groundspeak:type>' + cacheType + '</groundspeak:type>\n';
				    xmlString += '   <groundspeak:container>' + container +  '</groundspeak:container>\n';
				    xmlString += '   <groundspeak:difficulty>' + difficulty +   '</groundspeak:difficulty>\n';
				    xmlString += '   <groundspeak:terrain>' + terrain + '</groundspeak:terrain>\n';
				    // xmlString += '   <groundspeak:long_description html="True">\n';
				    // xmlString += '   </groundspeak:long_description>\n';
				  xmlString += ' </groundspeak:cache>\n';
				xmlString +=  '</wpt>\n' ;
			}	
		}	
			
	}
	else {
	  // begin processing
 	 xmlString = '<?xml version="1.0" encoding="UTF-8" ?>\n' ;
 	 xmlString += '<gpx xmlns:xsd="http://www.w3.org/2001/XMLSchema"' + 
     			  ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' + 
     			  ' version="1.0"' + 
     			  ' xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd http://www.groundspeak.com/cache/1/0/1 http://www.groundspeak.com/cache/1/0/1/cache.xsd http://www.gsak.net/xmlv1/5 http://www.gsak.net/xmlv1/5/gsak.xsd"' + 
     			  ' xmlns="http://www.topografix.com/GPX/1/0">\n' ; 
	  	
	}
	
	if (urls[urlIndex]) { 
		debug( urls[urlIndex] );
		GM_xmlhttpRequest({
  			method: "GET",
        	url: urls[urlIndex],
  			onload: processing  });
  		urlIndex++;	
  	}		
  	else {
	  // end processing  
	  // xmlString += (new XMLSerializer()).serializeToString(xmlDoc);	 
	  xmlString += '</gpx>';	 
	  gpxTxt.value =  xmlString ; 
	  
	  gpxTxt.setAttribute("style","height: 200px; width: 100%; margin-left: auto; margin-right: auto;") ;

	}	
}

