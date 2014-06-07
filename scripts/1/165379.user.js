// ==UserScript==
// @name        YouTube Tags - Show tags for YouTube videos
// @namespace   rickyfromkingston
// @description Insert a list of tags into the video information
// @include     http*://www.youtube.tld/watch?*
// @version     0.1
// @grant       none
// ==/UserScript==

function check4vid(){
  if (window.location.search.indexOf("?v=") == -1 && window.location.search.indexOf("&v=") == -1) return;
  var v = document.querySelector("embed");
  if (v){ // found EMBED
    var fv = v.getAttribute("flashvars");
    if (fv){ // got flashvars, check for keywords
      fv = fv.substr(fv.indexOf("&keywords=")+10);
      fv = fv.substr(0, fv.indexOf("&")); 
      fv = decodeURIComponent(fv);
      if (fv.length > 0){ // got keywords, try to insert
        var d = document.querySelector("#watch-description-extra-info"); // Better Watch Page script
        if (d){
          var e = document.createElement("li");
          e.appendChild(document.createTextNode("Tags: " + fv.replace(/,/ig, ", ")));
          d.appendChild(e);
        } else {
          d = document.querySelector("#watch-description-extras");
          if (d){ // found destination, add Tags: heading and keywords
            var e = document.createElement("h4");
            e.appendChild(document.createTextNode("Tags:"));
            d.appendChild(e);
            e = document.createElement("p");
            e.appendChild(document.createTextNode(fv.replace(/,/ig, ", ")));
            d.appendChild(e);
            // Expand description area if hidden; may conflict with other scripts/addons
            if (window.getComputedStyle(d,null).getPropertyValue("display") == "none"){
              var b = document.querySelector("#watch-description-toggle button");
              if (b){
                b.click();
              }
            }
          } else { // destination not found, try again in 1 sec
            if (recheck > 5) return;
            recheck++;
            window.setTimeout(check4vid, 1000);
          }
        }
      }
    }
  } else { // EMBED not found, try again in 1 sec
    if (recheck > 5) return;
    recheck++;
    window.setTimeout(check4vid, 1000);
  }
}
var recheck = 0;
check4vid();