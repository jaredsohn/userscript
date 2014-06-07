// ==UserScript==
// @name                WME Color Highlights City
// @namespace           http://userscripts.org/users/419370
// @description         Adds colours to road segments to show their status
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/*/editor/*
// @updateURL           http://userscripts.org/scripts/source/175260.meta.js
// @downloadURL         http://userscripts.org/scripts/source/175260.user.js
// @version             2.0.0.0
// @grant               GM_xmlhttpRequest
// ==/UserScript==

/* == meine City-Erweiterung ================================================= */


var aNurl;
var aNstatus;
var aNcnt = 100;

var testGM_TM;
var getURL;
var isCRX = false;
var new_version;

var hilici = new Object();
hilici.CityKnown = new Array();
hilici.CityUnknown = new Array();
hilici.CityInProgress = new Array();
hilici.CityUnknown = [];
hilici.CityKnown = [];
hilici.CityInProgress = [];

var _HiLiCi = document.createElement('script');


function _aNchecksCity() {
  var cityName = "";
  var countryName = "";
  var hStr = "";
  var i;

  hilici.CityInProgress	= unsafeWindow.hilici.CityInProgress;
  hilici.CityKnown		= unsafeWindow.hilici.CityKnown;
  hilici.CityUnknown	= unsafeWindow.hilici.CityUnknown;
  console.log("Cities in progress *: " + hilici.CityInProgress.length +
			  " / known : " + hilici.CityKnown.length +
			  " / unknown : " + hilici.CityUnknown.length);

  // Are there any cities?
  if (hilici.CityInProgress.length > 0) {
	var h = hilici.CityInProgress[0].split(",");
	cityName = h[0];
	countryName = h[1];
	console.log("found City: " + cityName + " / Country: " + countryName);
	hStr = '"' + cityName + '"';
	//console.log("WME Highlights: aNchecksCity (aN) ?: " + cityName + ", " + countryName);
	// Search on Web
	aNstatus = undefined;
	aNurl = "http://members.aon.at/aneumeister/scripts/waze/"+countryName+".txt";
	var ret = GM_xmlhttpRequest({
	  method: "GET",
	  url: aNurl,
	  headers: {
	    "Accept": "text/xml"            // If not specified, browser defaults will be used.
	  },
	  //synchronous: true,
	  //timeout: 500,
	  onerror: function(response) {
	  	console.log("WME Highlights: aNchecksCity (aN): " + cityName +" error :/");
	  	i = hilici.CityInProgress.indexOf(cityName+","+countryName);
	  	console.log("WME Highlights: aNchecksCity (aN): i: " + i);
	  	hilici.CityInProgress.splice((i==-1)?0:i,1);
	    },
	  onload: function(response) {
	    console.log(hStr + " Position: " + response.responseText.indexOf(hStr) + " Status: " + response.status);
	    i = hilici.CityInProgress.indexOf(cityName+","+countryName);
	    //console.log("WME Highlights: aNchecksCity (aN): i: " + i);
	    unsafeWindow.hilici.CityInProgress.splice((i==-1)?0:i,1);
	    //alert(hStr + " Position: " + response.responseText.indexOf(hStr) + " Status: " + response.status);

	    // country is missing
	    if (response.status == 404) {
	  	console.log("WME Highlights: aNchecksCity (aN): Country not found: " + countryName);
	  	unsafeWindow.hilici.CityKnown.splice(0, 0, cityName+","+countryName);
	  	return true;
	    }
	    if (response.status != 200) {
	  	console.log("WME Highlights: aNchecksCity (aN): Status: " + response.status);
	  	alert("WME Highlights: aNchecksCity (aN): Status: " + response.status);
	  	return true;
	    }


	    // Search in all cities
	    if (response.responseText.indexOf(hStr) >= 0) {
		  if (unsafeWindow.hilici.CityKnown.indexOf(cityName+","+countryName) == -1) {
	  	    unsafeWindow.hilici.CityKnown.splice(0, 0, cityName+","+countryName); // City found
		  }
	  	  console.log("WME Highlights: aNchecksCity (aN): " + cityName +" found :)");
	  	  return true;
	    } else {
	  	  if (-1 == unsafeWindow.hilici.CityUnknown.indexOf(cityName+","+countryName)) {
		    if (unsafeWindow.hilici.CityUnknown.indexOf(cityName+","+countryName) == -1) {
	  	      alert("Unknown City: " + cityName + " (" + countryName + ")");
	  	      unsafeWindow.hilici.CityUnknown.splice(0, 0, cityName+","+countryName); // Unknown City
		    }
	  	    console.log("WME Highlights: aNchecksCity (aN): " + cityName +" not found :(");
	  	  }
	  	  return false;
	    }
	  }
	});
  }
  return true;
}

function setNew() {
  new_version = "";
  var ret = GM_xmlhttpRequest({
    method: "GET",
    url: "http://members.aon.at/aneumeister/scripts/waze/version.txt",
    headers: {
	  "Accept": "text/xml"            // If not specified, browser defaults will be used.
    },
	onerror: function(response) {
	  alert("\'versionb.txt\' not found");
	},
    onload: function(response) {
	  new_version= response.responseText;
	  unsafeWindow.hilici.new = new_version;
	}
  });
  unsafeWindow.hilici.new = new_version;
  unsafeWindow.hilici.ldr = "2.0.0.0";
}

function init_script() {
  var ret = GM_xmlhttpRequest({
    method: "GET",
    url: "http://members.aon.at/aneumeister/scripts/waze/hilici2.user.js",
    headers: {
	  "Accept": "text/xml"            // If not specified, browser defaults will be used.
    },
	onerror: function(response) {
	  alert("\'HiLiCi\' not loaded");
	},
    onload: function(response) {
	  _HiLiCi.text = response.responseText;
	  _HiLiCi.type = 'text/javascript';
	  _HiLiCi.async = false;
	  _HiLiCi.onload = function() {
        };
	  document.head.appendChild(_HiLiCi);

	  unsafeWindow.hilici.new = new_version;
	}
  });
}

window.setInterval(_aNchecksCity, 1601);
window.setTimeout(setNew, 800);
init_script();