// ==UserScript==
// @name           colin
// @namespace      http://colinglover.com
// @description    testing
// ==/UserScript==
// coding by Colin Glover

// Some galleries link the thumbs to an HTML page rather than the image.
// example:  http://spandex-xxx.com/galls/shinydolls/spandex-lycra-girl/

// 1 = Load full images from gallery at bottom of page. (html jpg swap)
// 2 = change .html links to .jpg for easier downloading (html jpg swap)
// 3 = hover mouse over image, iframe toggled when z key pressed (or click outside iframe)
var load = 3;

// Don't change anything below here unless you know what you are doing!

window.addEventListener("load", function(e) {
  dbs1grid();
}, false);

function dbs1grid() {
 var anch = content.document.getElementsByTagName('a');
 if (!thumb) {
  var thumb=1;
  var thumbs = [];
  for(var i = 0; i<anch.length; i++) {
   if (anch[i].innerHTML.indexOf('<img')>-1) {
    if  (load==3) {
	 if (anch[i].href.substring(4,0) != 'java') {
	  anch[i].setAttribute('onmouseover', 'javascript:dbsi = "'+anch[i].href+'";');
	  anch[i].setAttribute('target', '');
	 }
    }
    if (load==1) {
     thumbs[thumb]=anch[i].href;
	 thumb++;
	}
	if (load==2 && ".html" == anch[i].href.substring(anch[i].href.length-5)) {
	 var nLink = document.createElement("b");
	 nLink.appendChild(document.createTextNode("!"));
	 nLink.setAttribute("href", anch[i].href);
     nLink.setAttribute("class", "directlink");
     anch[i].parentNode.insertBefore(nLink, anch[i]);
	 anch[i].setAttribute("href",anch[i].href.substring(0, anch[i].href.length-5)+".jpg"); 
    }
   }
  }
 }
 var cnt=1;
 if (load==1) {
  for(var i = 1; i<thumbs.length; i++) {
   temp = thumbs[i].replace(/html/i, "jpg");
   var newt = content.document.createElement('IMG');
   newt.src=temp;
   content.document.body.appendChild(newt);
  }
 }
 if  (load=3) {
  var s = document.createElement('script');
  s.setAttribute('type','text/javascript');
  s.innerHTML = "\
   document.onclick = dbsdl;\
   document.onmousemove = mous;\
   document.onkeyup = dbsky;\
   var posx;\
   var posy;\
   var dbsi;\
   var cURL = document.location.href;\
  function dbsky(e) {\
  if (e.keyCode == 90) {\
   var newt = document.getElementById('dbsIF');\
   if (newt) {\
    newt.parentNode.removeChild(newt);\
   }\
   if (!newt) {\
    var newt = content.document.createElement('iframe');\
    newt.src=dbsi;\
    posy=posy-200;\
    if (posy<0) {\
 	 posy=0;\
    }\
    posx=posx-300;\
    if (posx<0) {\
	 posx=0;\
    }\
    newt.setAttribute('id', 'dbsIF');\
    newt.setAttribute('width', '600');\
    newt.setAttribute('height', '400');\
    /* newt.setAttribute('onmouseout', 'setTimeout(\"dbsdl()\", 2000)'); */ \
    newt.setAttribute('style', 'position:absolute;');\
    newt.style.top = posy+'px';\
    newt.style.left = posx+'px';\
    content.document.body.appendChild(newt);\
  }\
  }\
  }\
  function dbsdl() {\
    var newt = document.getElementById('dbsIF');\
   if (newt) {\
    newt.parentNode.removeChild(newt);\
   }\
 }\
   function mous(e) {\
    if (!e) { \
     var e = window.event;\
    }\
    posx=e.pageX;\
    posy=e.pageY;\
   }\
  ";
  document.getElementsByTagName('head')[0].appendChild(s)
 }
}
