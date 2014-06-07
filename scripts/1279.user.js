// Greasemap
// version 0.4 BETA!
// 2005-07-14
// Copyright (c) 2005, Vinq, LLC
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF GREASEMAP, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Greasemap", and click Uninstall.
//
// --------------------------------------------------------------------
// WHAT IT DOES:
//
// On any web page that doesn't match *vinq.com*
// - searches for addresses, zip codes, and geolocation tags within the page
// - if it finds any,
//   - injects a Google map using the new Google Maps API at the top
//     of the page, including credit to Google and to Vinq Greasemap
// --------------------------------------------------------------------
// CHANGELOG:
// 0.4 2005-07-14 8pm  New link to show the same map in a new, big window
//                     On big map, addresses link to show infowindow on that pin
//                     On big map, infowindow shows address + directions form
//                     Parse geo:lat and geo:lon tags from Flickr + other sites
//                     Parse U.S. addresses which lack a zip code, as long as the state
//                       abbreviation is valid; use case http://www.google.com/search?q=movie%3A+movie+crash&sc=1&near=350+Lexington+Ave%2C+New+York%2C+NY&rl=1
// 0.3 2005-07-02 4pm  Version tag 0.3 in iframe URL, so map frame can notify users to upgrade if their version is lower
//                     New links to show + hide the map, hidden map loads faster (doesn't hit vinq.com)
//                     New menu items to toggle whether map should be shown immediately
//                     Rewrite ; to , within lat;long points, for better matching
// 0.2 2005-06-30 4pm  Added support for geo.position and GeoURL meta tags
// 0.1 2005-06-30 3am  Initial version
//
// ==UserScript==
// @name            Greasemap
// @namespace       http://www.vinq.com/greasemap/
// @description     Embed Google Map at top of pages containing georeferences
// @include         *
// @exclude         http://maps.google.com/*
// ==/UserScript==

(function() {
    var Greasemap = {
       findLocations: function(c) {
         var l = [];
         // NOTE: Each regex pattern here must also be recognized by the greasemap.html script at vinq.com
         // Look for addresses with zipcodes
	 var addr_re = /\b(One|\d+)\s+(<br>|[A-Za-z0-9\-.,'\s])+?\s+[A-Z][A-Z]\s+\d\d\d\d\d\b/;
	 var addr = addr_re.exec(c);
	 var pos = 0;
	 while (addr) {
	   l.push(addr[0]);
	   pos += addr.index + addr[0].length;
	   addr = addr_re.exec(c.substr(pos));
         }

	 // Also look for addresses without zipcodes; state abbrev must be valid and must be preceded by comma
	 // Use case: http://www.google.com/search?q=movie%3A+movie+crash&sc=1&near=350+Lexington+Ave%2C+New+York%2C+NY&rl=1
	 addr_re = /\b(\d+)\s+(<br>|[A-Za-z0-9\-.,'\s])+,\s+([A-Z][A-Z])\s+/;
	 addr = addr_re.exec(c);
	 pos = 0;
         var isState = {AL:1,AK:1,AZ:1,AR:1,CA:1,CO:1,CT:1,DE:1,DC:1,FL:1,GA:1,HI:1,ID:1,IL:1,IN:1,IA:1,KS:1,KY:1,LA:1,ME:1,MD:1,MA:1,MI:1,MN:1,MS:1,MO:1,MT:1,NE:1,NV:1,NH:1,NJ:1,NM:1,NY:1,NC:1,ND:1,OH:1,OK:1,OR:1,PA:1,RI:1,SC:1,SD:1,TN:1,TX:1,UT:1,VT:1,VA:1,WA:1,WV:1,WI:1,WY:1};
	 while (addr) {
           // Accept this address if the state abbreviation is valid
	   if (addr[3] && isState[addr[3]]) { l.push(addr[0]); }
	   pos += addr.index + addr[0].length;
	   addr = addr_re.exec(c.substr(pos));
         }
	 return l;
       },

       insertMap: function(locs,spots,num) {
	 // locs are addresses, semicolon-separated.  spots are lat+long pairs, comma-separated.
	 var mapurl = 'http://www.vinq.com/greasemap.html?v=0.4&spots='+encodeURIComponent(spots)+'&locs=' + encodeURIComponent(locs);
	 var gmd = document.createElement("div");
	 gmd.id = 'gmd';
	 var plural = '';
         if (num > 1) { plural = 's'; }
	 var str = '<div style="background-color: #def; padding: 2px 8px 2px 10px; font-family: arial; font-size: 8pt" onclick="gm_click();">Greasemap found '+num+' location'+plural+' in this page. Click here to map them.</div>';
	 str += '<script>var block=\'block\'; function gm_click() { var d=document; var m=d.createElement(\'div\'); m.id=\'gmf\'; m.innerHTML=\'<iframe id=gmf width=100% height=150 src="'+mapurl+'"></iframe><img id="gmi" src="http://www.vinq.com/greasemap/closebox.png" style="position: absolute; top: 4px; right: 16px" onclick="var cn=document.body.childNodes; cn[1].style.display=block; document.body.removeChild(document.body.firstChild);">\'; d.body.insertBefore(m, d.body.firstChild); d.getElementById("gmd").style.display=\'none\'; }</script>';
	 gmd.innerHTML = str;
 	 document.body.insertBefore(gmd, document.body.lastChild);
	 if (GM_getValue && GM_getValue('mapfirst','1') == '1') {
	   gm_click();
	 }
       }
    }

    if (GM_getValue && GM_registerMenuCommand) {
      if (GM_getValue('mapfirst','1') == '1') {
        GM_registerMenuCommand('Greasemap: Always show minimized bar',function(){GM_setValue('mapfirst','0'); window.location.reload();});
      } else {
        GM_registerMenuCommand('Greasemap: Always show map immediately',function(){GM_setValue('mapfirst','1'); window.location.reload();});
      }
    }

    var href = window.location.href;
    var meta = document.documentElement.innerHTML;
    var gp_re = /<meta name="(?:geo\.position|ICBM)" content="([^"]*)">/i;
    var spots = [];
    var gp = gp_re.exec(meta);
    var pos = 0;
    while (gp) {
      if (gp[1]) { gp[1] = gp[1].replace(/;/g,','); spots.push(gp[1]); }
      pos += gp.index + gp[0].length;
      gp = gp_re.exec(meta.substr(pos));
    }
    var content = document.body.innerHTML;
    content = content.replace(/\n/g,' ');
    content = content.replace(/<b>/ig,'');
    content = content.replace(/<\/?font[^>]*>/ig,'');
    content = content.replace(/<\/b>/ig,'');
    content = content.replace(/&nbsp;/g,' ');
    content = content.replace(new RegExp("<br ?/?>","ig"),'<br>');
    content = content.replace(/\s+/g,' ');
    if (!href.match(/vinq.com\/greasemap.?\.html/)) {
      var latlong_re = /\b(N|S) [\d\.]+. ([\d\.]+\s+)?\s*(W|E) [\d\.]+. ([\d\.]+)?/;
      var latlong = latlong_re.exec(content);
      var pos = 0;
      while (latlong) {
        spots.push(latlong[0]);
        pos += latlong.index + latlong[0].length;
        latlong = latlong_re.exec(content.substr(pos));
      }
      latlong_re = /\bgeo:lat=([\-\d\.]+).*geo:lon=([\-\d\.]+)\b/;
      var latlong = latlong_re.exec(content);
      var pos = 0;
      while (latlong) {
        if (latlong[1] && latlong[2]) { spots.push(latlong[1]+','+latlong[2]); }
        pos += latlong.index + latlong[0].length;
        latlong = latlong_re.exec(content.substr(pos));
      }
      latlong_re = /\bgeo:lon=([\-\d\.]+).*geo:lat=([\-\d\.]+)\b/;
      var latlong = latlong_re.exec(content);
      var pos = 0;
      while (latlong) {
        if (latlong[1] && latlong[2]) { spots.push(latlong[2]+','+latlong[1]); }
        pos += latlong.index + latlong[0].length;
        latlong = latlong_re.exec(content.substr(pos));
      }

      // Call the internal function, defined above, to search for addresses
      var locs = Greasemap.findLocations(content);
      if ((spots && spots.length > 0) || (locs && locs.length > 0)) {
	  Greasemap.insertMap(locs.join(';'),spots.join(';'),locs.length+spots.length);
      }
    }
})();

// END FILE

