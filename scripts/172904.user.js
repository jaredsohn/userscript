// ==UserScript==
// @name           Spapinacz
// @description    widze co tam robisz
// @version        0.1
// @include        http://www.karachan.org/b*
// @include        http://karachan.org/b*
// @include        *karachan.org/b*
// ==/UserScript==

var jseyeso=null, jseye1=null, jseye2=null;
var standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body
function jseyesobj(id) {
  var i, x;
  x= document[id];
  if (!x && document.getElementById) x= document.getElementById(id);
  for (i=0; !x && i<document.forms.length; i++) x= document.forms[i][id];
  return(x);
}
function jseyesmove(x, y) {
  var ex, ey, dx, dy;
  if (jseyeso && jseye1 && jseye2 && jseyeso.style) {
    ex=jseyeso.offsetLeft+50; ey=jseyeso.offsetTop+100;
    dx=x-ex; dy=y-ey;
    r=(dx*dx/100+dy*dy/89<1) ? 1 : Math.sqrt(100*89/(dx*dx*60+dy*dy*350));
    jseye1.style.left= r*dx+40+'px'; jseye1.style.top= r*dy+123+'px';
    ex+=56; dx-=56;
    r=(dx*dx/100+dy*dy/89<1) ? 1 : Math.sqrt(100*89/(dx*dx*60+dy*dy*350));
    jseye2.style.left= r*dx+100+'px'; jseye2.style.top= r*dy+123+'px';
  }
}
function jseyes() {
  var img;
  var x, y, a=false;
  if (arguments.length==2) {
    x= arguments[0];
    y= arguments[1];
    a= true;
  }
    img='<div id="jseyeslayer" style=" position: fixed; z-index: -5; bottom: 0px; right: 0px;"><img id="face" alt="face" src="http://i.imgur.com/sBrn1Ue.png"><img style="position:absolute; TOP:124px; LEFT:36px" id="jseye1" alt="eye" src="http://i.imgur.com/Bkt8KxO.png"><img style="position:absolute; TOP:124px; LEFT:96px" id="jseye2" alt="eye" src="http://i.imgur.com/Bkt8KxO.png"></div><img style="position: absolute; TOP:124px; LEFT:96px" id="kremuwa" alt="" src="http://i.imgur.com/jhJncnh.png">';
	document.body.innerHTML += img;
    jseyeso=jseyesobj('jseyeslayer');
    jseye1=jseyesobj('jseye1');
    jseye2=jseyesobj('jseye2');
    document.onmousemove = function(e) {
    jseyesmousemove(e);
    document.getElementById("kremuwa").style.top = e.pageY*1 + 5 + "px";
    document.getElementById("kremuwa").style.left = e.pageX*1 + 5 + "px";
}
}
function jseyesmousemove(e) {
		var mousex=e.clientX;
		var mousey=e.clientY;
  jseyesmove(mousex, mousey);
}
function addEventsToPageElements(){
var hidy = document.getElementsByClassName('hidethread');
for(var i = 0; i < hidy.length; i++){
        document.getElementsByClassName("hidethread")[i].onmouseover = function() { var img = document.createElement("IMG"); img.setAttribute("id", "face");
img.src = "http://i.imgur.com/YavQwNE.png"; var oldImg = document.getElementById('face');
document.getElementById('jseyeslayer').replaceChild(img, oldImg); }
		document.getElementsByClassName("hidethread")[i].onmouseout  = function() { var img = document.createElement("IMG"); img.setAttribute("id", "face");
img.src = "http://i.imgur.com/sBrn1Ue.png"; var oldImg = document.getElementById('face');
document.getElementById('jseyeslayer').replaceChild(img, oldImg); }
      document.getElementsByClassName("thumb")[i].onmouseover = function() { var img = document.createElement("IMG"); img.setAttribute("id", "face");
img.src = "http://i.imgur.com/lVS8pqG.png"; var oldImg = document.getElementById('face');
document.getElementById('jseyeslayer').replaceChild(img, oldImg); }
		document.getElementsByClassName("thumb")[i].onmouseout  = function() { var img = document.createElement("IMG"); img.setAttribute("id", "face");
img.src = "http://i.imgur.com/sBrn1Ue.png"; var oldImg = document.getElementById('face');
document.getElementById('jseyeslayer').replaceChild(img, oldImg); }
	}
		document.getElementsByClassName("postarea")[0].onmouseover = function() { var img = document.createElement("IMG"); img.setAttribute("id", "face");
img.src = "http://i.imgur.com/5eIR2vb.png"; var oldImg = document.getElementById('face');
document.getElementById('jseyeslayer').replaceChild(img, oldImg); }
		document.getElementsByClassName("postarea")[0].onmouseout  = function() { var img = document.createElement("IMG"); img.setAttribute("id", "face");
img.src = "http://i.imgur.com/sBrn1Ue.png"; var oldImg = document.getElementById('face');
document.getElementById('jseyeslayer').replaceChild(img, oldImg); }
}
jseyes();
addEventsToPageElements();