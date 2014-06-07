// ==UserScript==
// @name       FacebookDeGMaps
// @version    0.0.1
// @description  Add google maps link at Facebook's map page.
// @match      https://www.facebook.com/*/page_map
// @copyright  2013+, kik0220
// ==/UserScript==

document.addEventListener("DOMNodeInserted", function(e){
  var addressFloats = document.getElementsByClassName('businessAddress lfloat');
  if( addressFloats === undefined){
    return;
  }
  for (var i = addressFloats.length - 1; i >= 0; i--) {
    var addressFloat = addressFloats[i];
    if( addressFloat.parentNode.getElementsByClassName('facebookDeGMaps').length > 0){
      continue;
    }
    var address = addressFloat.innerText.replace(/\n/g," ");
    var gmap = document.createElement("a");
    gmap.target = "_blank";
    gmap.className = 'facebookDeGMaps';
    gmap.href = "//www.google.co.jp/maps/preview#!q=" + encodeURIComponent(address);
    addressFloat.parentNode.appendChild(gmap);
    var gmapIcon = document.createElement("img");
    gmapIcon.src = "//maps.gstatic.com/favicon3.ico";
    gmapIcon.title = "Google Maps";
    gmap.appendChild(gmapIcon);
  }
});