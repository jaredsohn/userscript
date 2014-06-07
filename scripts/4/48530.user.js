// ==UserScript==
// @name           FlyAwayHome
// @version		   1.1
// @author	       ACMB
// @namespace      http://www.acmbdesign.com
// @include        http://twitter.com/*
// @description    twitter lat/long data fed into http://www.geonames.org/ to produce full address
// ==/UserScript==

var RE = /[-\+]?[0-9]{1,3}\.?[0-9]+,\s?[-\+]?[0-9]{1,3}\.?[0-9]+/gi;

var ts = document.getElementsByTagName("span");
for (var t in ts) {
if(ts[t].className=="adr") { ts[t].id = "location"; }
if(ts[t].className=="fn") { ts[t].id = "fn"; }
}

var a = document.getElementById("location").innerHTML;
var im = "<img src='http://assets0.twitter.com/images/loader.gif' alt='Loading' border='0'/>";
document.getElementById("location").innerHTML = "<span id='locationadd'>"
+ "<a title='Locating Address'  target='_blank' href='' id='locationlink'>" + im + "</a></span>"
+ "<span id='locationdesc'></span>";
document.getElementById('locationdesc').innerHTML = a;
var f = document.getElementById("fn").innerHTML;
f = f.replace(' ','%A0') + "@";

if(a.match(RE)){


		var matches = a.match(RE);
		var ll = a.substr(a.lastIndexOf(" ",a.lastIndexOf(",")-2)+1).split(",");
		var lll = ll.join(','); 
		var Jurl = 'http://ws.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=' + ll[0] + '&lng=' + ll[1] + '&style=full';
		var Hurl = 'http://maps.google.com/maps/?z=13&q=' + f + lll; 
		document.getElementById('locationlink').href = Hurl;
		var ana = 0;	
				GM_xmlhttpRequest({
					method: 'GET',
					url: Jurl,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/json,application/xml,text/xml',
					},
					onload: function(responseDetails) {
						var RT = eval('('+ responseDetails.responseText + ')');
			//*Debug*	alert('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' + 'Feed data:\n' + responseDetails.responseText);
						var RD = RT['geonames'][0];
						var add = RD['name'];
						if(RD['adminName2']) { add += ", "+RD['adminName2'] ;}
						if(RD['countryName']) { add += ", "+RD['countryName']; }
						if(add&&(ana==0)) { document.getElementById('locationlink').innerHTML = add + "<br/>";}
					}
				});
			var Jurl = 'http://ws.geonames.org/findNearestAddressJSON?formatted=true&lat=' + ll[0] + '&lng=' + ll[1] + '&style=full';
				GM_xmlhttpRequest({
					method: 'GET',
					url: Jurl,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/json,application/xml,text/xml',
					},
					onload: function(responseDetails) {
						var RT = eval('('+ responseDetails.responseText + ')');
						if(RT['address']) {add = RT['address']['streetNumber'] + " " + RT['address']['street'] + ", " + RT['address']['placename'] + ", " + RT['address']['adminName2'] + ", " + RT['address']['adminName1'] + ", USA";
						ana = 1; document.getElementById('locationlink').innerHTML = add + "<br/>";;	}
					}
				});
	} else {
		var Hurl = 'http://maps.google.com/maps/?z=10&q=' + escape(f + a); 
		document.getElementById('location').innerHTML = '<a href="' + Hurl + '">' + a + '</a>';
		
		}