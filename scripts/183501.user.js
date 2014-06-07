// ==UserScript==
// @name          FBID
// @namespace     FBID
// @version       1.4
// @description   A simple script that monitors web pages for Facebook profile images.  Adds a middle-click option to each image that opens the user's FB profile page in a new window.
// @include       *
// ==/UserScript==

var re = new RegExp("graph.facebook.com/(\\d+)/picture");
setInterval(function() { checkFBImages(); }, 5000 );

function openProfile(e) {
  var elem;
  if (!e) var e = window.event;
  if (e.target) elem = e.target;
  else if (e.srcElement) elem = e.srcElement;
  if (elem.nodeType == 3) // Safari bug
    elem = elem.parentNode;
  var m = re.exec(elem.src);
  var profile = "http://www.facebook.com/profile.php?id=" + m[1];
  window.open(profile);
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
}

function checkFBImages() {
  var imgs=document.getElementsByTagName("img");
  for(i=0;i<imgs.length;i++) {
    if(imgs[i].src.match(re)){
      // alert("Found image for profile " + m[1]);
      imgs[i].style.border="3px solid blue";
      imgs[i].style.borderRadius="6px";
      imgs[i].style.boxShadow="3px 3px 2px rgb(136, 136, 136)";
      imgs[i].onmousedown=function(event) {openProfile(event);}
    }
  }
}