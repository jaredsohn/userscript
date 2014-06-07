// Displays a link to a MapQuest map and route/directions to a Microformat coded Address 
// version 1.0
// 2006-04-22
// Copyright (c) 2006, Andrew Turner
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Display Locations in MapQuest", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES
// 
// Finds addresses written with the Microformats adr or geo format and then provides a 
//	MapQuest link to display a map. It also displays a link to show the route/directions 
//  to an address, starting at the page-viewers geolocated IP address.
//
// UUID: 564898c0-d2db-11da-a94d-0800200c9a66
//
// ==UserScript==
// @name          GreaseRoute
// @namespace     http://www.highearthorbit.com/mapquest/
// @description   Displays a link to a MapQuest map and route/directions to a Microformat coded Address (see http://microformats.org/wiki/adr and http://microformats.org/wiki/geo)
// @include       *
// ==/UserScript==

(function() {

function getSetting(name) {
    var value = GM_getValue(name);
    if (!value) {
        value = prompt('MapQuest Mapping '+ name + ' please: it will be stored locally for future use. If you do not understand what this script does please uninstall it. It is for developers only');
        GM_setValue(name, value); 
    }
    return value;
}

/* Globe icon supplied by the FamFam, http://www.famfamfam.com */
const address_image_src = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAANbY1E9YMgAAABl0' + 
	'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGAUExURcDYv1C8WdPrtIDAeWqk' + 
	'Oqnd2VLWaOX0x7ftwZzZlIjGxr7gxanLkdfu1FumybHSsJ3Cutbyx4S9fm2paMrq0Lfo1L/a' + 
	'o6PHiozL11aZJpnW2oG0ZLTcm5zjvovbvM3qtcror2q5vUaIRHLGZWWkR0aQGSR/BYy5baHY' +
	'imrbd/z+/HO9bPb69m29xHy8c2OeMUGJPZDThZPPi3ivdGazzZbBgCuCEd3x2jaICs7ksqLZ' +
	'mTp/N6zwtWu/YLDWvZHHeqLS0affzKfvsWDYpn7CvJHJh0+cSGWbY6PQka/Xkvj894W2a4DQ' +
	'qIrDhF+hQ8fexJDN24PYgYGzWnXJy6zXpp3Fm5jCg37NdI++dWejWmCwVnSrT6nuyTuLELvh' +
	'pV2gO6DSwI3qnd3wv6rQxK/fz1OZxrTvtaLim3rRr+bv5TuCN+jw557FiK7NlWzRkHDGhHLd' +
	'fnHWmm2zx7Xe1m21zW65z9Ts0HTHaHrGb3vJb3yvVbTaxVGUTITLtV6w0////94DUpYAAACA' +
	'dFJOU///////////////////////////////////////////////////////////////////' +
	'////////////////////////////////////////////////////////////////////////' +
	'//////////////////////////////8AOAVLZwAAAQxJREFUeNpiqAcCc87wcuVKTl4Qm6G+' +
	'XstKOU6eu9ouxNbICySgZajBzluWUuzgkOyqpwMUsNJIEuQVYWUNkOCysxeqZzBXZk+z4RCV' +
	'kiopquVUcPNn4JSRd4oRkZAwUSwsKPAQN2YIZ0pPFBUpNQnWZGNj0xOrYShPCtSUdeTTlXNm' +
	'0WcUtjRgUE4Kz5Plq0vVzWAJkoy0zGKokDeU4+JjYWHRr+KJVhVTYjDylMn34WPJzeXhiRBX' +
	'sXBnKIti0tZW1M9VV/eWlg6LV2Oo943wZHaR5BEXz/EOUzHTYajXEfZWSJBUVY2NN1UxywR5' +
	'TsfYIFRAQIDfws8sG+xbICGsZG2tpKamBWQDBBgAU049f2kd9aAAAAAASUVORK5CYII=';

const route_image_src = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0' +
	'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIeSURBVHjaYvz//z8DMig4lHLk' +
	'39//rJMc55ozEAEAAogJRfPBlPPi3BLWEjziZpk74i4SYwBAADGCXFB4OI3t379/l4Ea1VRE' +
	'lBn+AcVuPLvB8Oj1kzt///zVXhC86hcuAwACCOyCf3//bQJiub9//zP8/fcPiP8y/AHhP39l' +
	'gHgrPhcABBAjchikb4/9b6duywA0gmHPuX0MC0NWMxLyAkAAsSBzgM4FOv8vw9///0C2ExME' +
	'DAABxIRuwG+g0//++8Pw9zemAe59DhUuXbbMyGIAAcSE3QUg///BMAAoFgXEM5HFAAIIxQt/' +
	'gLb++f+H4d+//wx8XPwgG18yMjECHfVPGmS4lLg0w9+/f3Uta42/HG8+WwDSAxBAqAb8+QuO' +
	'gfsvHjB8/fKVQUZCRkyIX4iBm5ObgYOdAxI2f/8w/Pr5K9+oVPfLue7LNQABhBqIv/8Ao+8f' +
	'w/37DxkkZcUZZHjkGBgZmMHeAkXrP1D8AA0BugIURmwgPQABhNULctrSDOIckgw/3v1kuH3/' +
	'DsODhw/A4SMtBfIC0IJ796dcnHCtDKQHIIDQDPgD9gI7IwfD1+9fGQ4eOfwY6K21xxrPFILk' +
	'DYt1Lv398+/spYnXcmF6AAKICd0F/74wMvD9EmS4e/UBiA/XDI2llUCcgqwHIIDQAvEP2K//' +
	'gX6+/+ABw/FmhGYQuDTxeit61AIEEEYY7Ni7Hezfv0SmRIAAAwDWrC6NOg5DngAAAABJRU5E' +
	'rkJggg==';
	
/*
    Written by Jonathan Snook, http://www.snook.ca/jonathan
*/

var getElementsByClassName = function (oElm, strTagName, strClassName){
    var arrElements = oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

/* End of Jonathan Snook's code */

function postParm(name, value) {
    return name + "=" + escape(value);
}

function postParms(parms) {
    var param = "";
    for (var name in parms) {
        param += postParm(name, parms[name]) + "&";
    }
    GM_log(param);
    return param;
}

function GetUserLocation() {
	if(userLocation == null)
	{
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.hostip.info/',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://snark/speedlimit/',
        },
        onerror: function(responseDetails) {
            alert('Error getting User Location ' + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Response data:\n' + responseDetails.responseText);
        },
        onload: function(responseDetails) {
            if (responseDetails.status == 200) {
                GM_log('User Location request succeeded and returned ' + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Response data:\n' + responseDetails.responseText);
				var dom = new DOMParser().parseFromString(responseDetails.responseText, 
				            "application/xml"); 
                userLocation = ParseUserLocation(dom);
				DisplayUserLocation(userLocation);
            } else if (responseDetails.status == 403) {
                GM_log('User Location failed and returned ' + responseDetails.status +
                  ' ' + responseDetails.statusText + '\n\n' +
                  'Response data:\n' + responseDetails.responseText);
            }
        }
    });
	}
	else {
		DisplayUserLocation(userLocation);
	}
}

var makeMappingLinkGeo = function(geo) {
  var geolocation = parseGeo(geo);
  var map_link = document.createElement('a');
  map_link.title = "Display MapQuest Map"
  map_link.href = "http://www.mapquest.com/maps/map.adp?searchtype=address&formtype=latlong&latlongtype=decimal";
  map_link.target = "_blank";

  if(geolocation.latitude) map_link.href += "&latitude=" + geolocation.latitude;
  if(geolocation.longitude) map_link.href += "&longitude=" + geolocation.longitude;
  
  address_image = document.createElement('img');
  address_image.src = address_image_src;
  address_image.border = 0;
  address_image.addEventListener('click', function(event) {
        // if you want to prevent the default click action
        // (such as following a link), use these two commands:
/*        geolocation.stopPropagation();*/
        geolocation.preventDefault();
    }, true);
  map_link.appendChild(address_image);
  geo.appendChild(map_link);
};

var makeMappingLink = function(adr) {
  var address = parseAdr(adr);
  var map_link = document.createElement('a');
  map_link.title = "Display MapQuest Map"
  map_link.href = "http://www.mapquest.com/maps/map.adp?searchtype=address";
  map_link.target = "_blank";

  if(address.country) map_link.href += "&country=" + address.country;
  if(address.locality) map_link.href += "&city=" + address.locality;
  if(address.region) map_link.href += "&state=" + address.region;
  if(address.postalcode) map_link.href += "&zipcode=" + address.postalcode;
  if(address.street) map_link.href += "&address=" + address.street;
  if(address.street_extended) map_link.href += "+" + address.street_extended;

  
  address_image = document.createElement('img');
  address_image.src = address_image_src;
  address_image.border = 0;
  address_image.addEventListener('click', function(event) {
        // if you want to prevent the default click action
        // (such as following a link), use these two commands:
        adr.stopPropagation();
        adr.preventDefault();
    }, true);
  map_link.appendChild(address_image);
  adr.appendChild(map_link);
};

var parseGeo = function (geo){
  var popFirst = function(geo) {
    return (geo && geo.length > 0) ? geo[0] : null;
  };

  var trim = function(str) { 
    return str.replace(/^\s+|\s+$/, ''); 
  };

  var stripHTML = function(e) {
	html = e.innerHTML.replace(/(\.)/ig,""); 
	return html.replace(/(<([^>]+)>)/ig,""); 
  };

  var latitude = popFirst(getElementsByClassName(geo, "*", "latitude")).getAttribute("title");
  var longitude = popFirst(getElementsByClassName(geo, "*", "longitude")).getAttribute("title");

  return { "latitude" : latitude, 
	   "longitude" : longitude};
}

var ParseUserLocation = function(hostipxml) {
	var location = hostipxml.getElementsByTagNameNS("http://www.opengis.net/gml","name")[1].firstChild.data.split(", ")

	if(location == "(Unknown city)")
		return "";
	
	var country = hostipxml.getElementsByTagName("countryAbbrev")[0].firstChild.nodeValue
	var coordinates = hostipxml.getElementsByTagNameNS("http://www.opengis.net/gml","coordinates")[0].firstChild.data.split(",")

  return { "locality" : location[0], 
	    	"region" : location[1], 
	    	"country": country,
			"latitude": coordinates[1],
			"longitude": coordinates[0]
		};
}
var makeRouteLink = function(userLoc, adr) {
	var end_address = parseAdr(adr);
	var route_link = document.createElement('a');
	route_link.title = "Show MapQuest route (from " + userLoc.locality + ", " + userLoc.region + " " + userLoc.country + ")";
	if(userLoc.country != "USA" && userLoc.country != "US" && userLoc.country != "" 
		&& userLoc.country != "CA" && userLoc.country != "Canada"
		&& end_address.country != "USA" && end_address.country != "US" && end_address.country != ""
		&& end_address.country != "CA" && end_address.country != "Canada") {
  		route_link.href = "http://www.mapquest.com/directions/europe.adp?go=1"
	}	
	else {
		route_link.href = "http://www.mapquest.com/directions/main.adp?go=1"	
	}
	route_link.target = "_blank";

	if(userLoc.country) route_link.href += "&1y=" + userLoc.country;
	if(userLoc.locality) route_link.href += "&1c=" + userLoc.locality;
	if(userLoc.region) route_link.href += "&1s=" + userLoc.region;
	if(userLoc.postalcode) route_link.href += "&1z=" + userLoc.postalcode;
	if(userLoc.street) route_link.href += "&1a=" + userLoc.street;
	if(userLoc.street_extended) route_link.href += "+" + userLoc.street_extended;

	if(end_address.country) route_link.href += "&2y=" + end_address.country;
	if(end_address.locality) route_link.href += "&2c=" + end_address.locality;
	if(end_address.region) route_link.href += "&2s=" + end_address.region;
	if(end_address.postalcode) route_link.href += "&2z=" + end_address.postalcode;
	if(end_address.street) route_link.href += "&2a=" + end_address.street;
	if(end_address.street_extended) route_link.href += "+" + end_address.street_extended;

	route_image = document.createElement('img');
	route_image.src = route_image_src;
	route_image.border = 0;
	route_image.addEventListener('click', function(event) {
	      // if you want to prevent the default click action
	      // (such as following a link), use these two commands:
	      adr.stopPropagation();
	      adr.preventDefault();
	  }, true);
	route_link.appendChild(route_image);
	adr.appendChild(route_link);
};
var DisplayUserLocation = function (loc) {
	for(var i=0; i < adrs.length; ++i) {
	  makeRouteLink(loc,adrs[i]);
	}

}
var parseAdr = function (adr){
  var popFirst = function(arr) {
    return (arr && arr.length > 0) ? arr[0] : null;
  };

  var trim = function(str) { 
    return str.replace(/^\s+|\s+$/, ''); 
  };

  var stripHTML = function(e) {
	html = e.innerHTML.replace(/(\.)/ig,""); 
	return html.replace(/(<([^>]+)>)/ig,""); 
  };

  var street = popFirst(getElementsByClassName(adr, "*", "street-address"));
  var street_extended = popFirst(getElementsByClassName(adr, "*", "extended-address"));
  var locality = popFirst(getElementsByClassName(adr, "*", "locality"));
  var region = popFirst(getElementsByClassName(adr, "*", "region"));
  var postalcode = popFirst(getElementsByClassName(adr, "*", "postal-code"));
  var country = popFirst(getElementsByClassName(adr, "*", "country-name"));

  street = street ? trim(stripHTML(street)) : null;
  street_extended = street_extended ? trim(stripHTML(street_extended)) : null;
  locality = locality ? trim(stripHTML(locality)) : null;
  region = region ? trim(stripHTML(region)) : null;
  postalcode = postalcode ? trim(stripHTML(postalcode)) : null;
  country = country ? trim(stripHTML(country)) : null;
  var us_states = {'AL' : 'Alabama', 'Alaska' : 'AK', 'America Samoa' : 'AS', 'Arizona' : 'AZ', 'Arkansas' : 'AR', 'California' : 'CA', 'Colorado' : 'CO', 'Connecticut' : 'CT', 'Delaware' : 'DE', 'District of Columbia' : 'DC', 'Micronesia' : 'FM', 'Florida' : 'FL', 'Georgia' : 'GA', 'Guam' : 'GU', 'Hawaii' : 'HI', 'Idaho' : 'ID', 'Illinois' : 'IL', 'Indiana' : 'IN', 'Iowa' : 'IA', 'Kansas' : 'KS', 'Kentucky' : 'KY', 'Louisiana' : 'LA', 'Maine' : 'ME', 'Maryland' : 'MD', 'Massachusetts' : 'MA', 'Michigan' : 'MI', 'Minnesota' : 'MN', 'Mississippi' : 'MS', 'Missouri' : 'MO', 'Montana' : 'MT', 'Nebraska' : 'NE', 'Nevada' : 'NV', 'New Hampshire' : 'NH', 'New Jersey' : 'NJ', 'New Mexico' : 'NM', 'New York' : 'NY', 'North Carolina' : 'NC', 'North Dakota' : 'ND', 'Ohio' : 'OH', 'Oklahoma' : 'OK', 'Oregon' : 'OR', 'Palau' : 'PW', 'Pennsylvania' : 'PA', 'Puerto Rico' : 'PR', 'Rhode Island' : 'RI', 'South Carolina' : 'SC', 'South Dakota' : 'SD', 'Tennessee' : 'TN', 'Texas' : 'TX', 'Utah' : 'UT', 'Vermont' : 'VT', 'Virgin Island' : 'VI', 'Virginia' : 'VA', 'Washington' : 'WA', 'West Virginia' : 'WV', 'Wisconsin' : 'WI', 'WY' : 'Wyoming'};

	/* Todo : stop being a bad american and put in more logic for other countries */
	if (country == "US" || country == "USA" || country == null || country == "") {
		country = "US";
        var state = null;
		if(region.length > 2)
			state = us_states[region];

		/* just in case the state wasn't correctly found */
		if(state != null)
			region = state;
	}


  return { "street" : street, 
	   "street_extended" : street_extended, 
	   "locality" : locality, 
	   "region" : region, 
	   "postalcode" : postalcode,
	   "country": country};
}

var adrs = getElementsByClassName(document, "*", "adr");
var geos = getElementsByClassName(document, "*", "geo");
var addresses = getElementsByClassName(document, "*", "address");

var userLocation = null;

/* Only get the user's location if it will be used. */
if(adrs.length > 0 || geos.length > 0) {
	GetUserLocation();
}

for(var i=0; i < addresses.length; ++i) {
	adrs.push(addresses[i]);
}	
for(var i=0; i < adrs.length; ++i) {
  makeMappingLink(adrs[i]);
}


for(var i=0; i < geos.length; ++i) {
  makeMappingLinkGeo(geos[i]);
}


})();

