// ==UserScript==
// @name           Flickramio
// @namespace      http://kruyt.org/projects/greasemonkey/flickramio
// @description    Google map like Panoramio in Flickr
// @include        http://*flickr.com/photos/*/*
// ==/UserScript==

function flickramio() {
	
// Get Meta
function getMeta(mn){ 
  var m = document.getElementsByTagName('meta'); 
  for(var i in m){ 
   if(m[i].name == mn){ 
     return m[i].content; 
   } 
  } 
}

// Check if image is geotagged
var coord = getMeta('ICBM');

if (coord==undefined) {

} else {
	
// Get lat and lon from metadata
var coords = coord.split(', ');
var lat = coords[0];
var lon = coords[1];

lat = lat.replace(",",".");
lon = lon.replace(",",".");

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='Widget']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
    thisDiv.innerHTML = thisDiv.innerHTML + '<p><iframe src="http://kruyt.org/include/php/flickrmap.php5?Latitude=' + lat + '&Longitude=' + lon + '" width="370" height="505" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></p>';
    document.body.insertAfter(thisDiv, document.body.firstChild);
}

}
}

if (document.body) flickramio();
