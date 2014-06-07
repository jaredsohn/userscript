// ==UserScript==
// @name           Skeleton(Fixed Position)
// @description    Drag the picture of skeleton 
// @author         Vusan
// @include        http*://*.com*
// ==/UserScript==
var newImg=document.createElement('img');
newImg.src="http://i45.tinypic.com/2vunfch.gif";
newImg.setAttribute("class","dragme");
newImg.style.position="fixed";
newImg.style.zIndex=999;
newImg.style.top="0";
newImg.style.left="0";
document.body.appendChild(newImg);
var ie=document.all;
var nn6=document.getElementById&&!document.all;

var isdrag=false;
var x,y;
var dobj;

function movemouse(e)
{
  if (isdrag)
  {
    dobj.style.left = nn6 ? tx + e.clientX - x+"px" : tx + event.clientX - x+"px";
    dobj.style.top  = nn6 ? ty + e.clientY - y+"px" : ty + event.clientY - y+"px";
    return false;
  }
}

function selectmouse(e) 
{
  var fobj       = nn6 ? e.target : event.srcElement;
  var topelement = nn6 ? "HTML" : "BODY";

  while (fobj.tagName != topelement && fobj.className != "dragme")
  {
    fobj = nn6 ? fobj.parentNode : fobj.parentElement;
  }

  if (fobj.className=="dragme")
  {
    isdrag = true;
    dobj = fobj;
    tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    x = nn6 ? e.clientX : event.clientX;
    y = nn6 ? e.clientY : event.clientY;
    document.onmousemove=movemouse;
    return false;
  }
}

document.onmousedown=selectmouse;
    document.onmouseup=function(){isdrag=false};