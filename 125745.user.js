// ==UserScript==
// @name        Flickr with Google Maps
// @description Displays Google map instead of Yahoo! map on Flickr photo page.
// @version     2.0
// @include			*flickr.com*
// ==/UserScript==

// Author: Waqas Ashraf
// Date: 22.01.13
// License: GNU General Public License v3 (GPL)

var lat, lon;
var metaz = document.getElementsByTagName('meta'); 
for (var i=0; i<metaz.length; i++){ 
    if (metaz[i].getAttribute("property") == "flickr_photos:location:latitude"){ 
        lat = metaz[i].getAttribute("content"); 
      }
    if (metaz[i].getAttribute("property") == "flickr_photos:location:longitude"){ 
        lon = metaz[i].getAttribute("content"); 
    }
  }
if (lat && lon){
  document.getElementById('photo-story-map').style.display="none";
  var map_links = document.getElementById('photo-story');
  var gmap_div = document.createElement('gmap_div');
  var gmap_mid = document.createElement('gmap_mid');
  var photo_stats = document.getElementById('photo-story-stats');
  var zoomed_out = 'http://maps.googleapis.com/maps/api/staticmap?&zoom=4&size=300x200&sensor=false&markers=size:mid%7Ccolor:red%7C'+lat+','+lon+'';
  var zoomed_mid = new Image();
  var zoomed_in = new Image();
  zoomed_mid.src = 'http://maps.googleapis.com/maps/api/staticmap?&zoom=10&size=300x200&sensor=false&markers=size:mid%7Ccolor:red%7C'+lat+','+lon+'';
  zoomed_in.src = 'http://maps.googleapis.com/maps/api/staticmap?&zoom=14&size=300x200&sensor=false&markers=size:mid%7Ccolor:red%7C'+lat+','+lon+'';
  var gmap_link = 'http://maps.google.com/maps?q='+lat+','+lon+'&z=15';
  gmap_div.style.height = 200+'px';
  gmap_div.style.width = 300+'px';
  gmap_div.style.display = "block";
  gmap_mid.style.height = 100+'px';
  gmap_mid.style.width = 150+'px';
  gmap_mid.style.display = "block";
  gmap_mid.style.position = 'absolute';
  gmap_mid.style.top = 130+'px';
  gmap_mid.style.left = 75+'px';  
  map_links.insertBefore(gmap_div, photo_stats);
  map_links.insertBefore(gmap_mid, photo_stats);
  gmap_div.style.backgroundImage = 'url('+zoomed_out+')';
  gmap_div.onmouseover = function () {gmap_div.style.backgroundImage = 'url('+zoomed_mid.src+')';}
  gmap_mid.onmouseover = function () {gmap_div.style.backgroundImage = 'url('+zoomed_in.src+')';gmap_mid.style.cursor = "pointer";}
  gmap_mid.onclick = function () {window.open(gmap_link,'mywindow','width=1000,height=800,toolbar=yes, location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes, resizable=yes')};
  map_links.onmouseout = function () {gmap_div.style.backgroundImage = 'url('+zoomed_out+')';}
}
