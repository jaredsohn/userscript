// ==UserScript==
// @name          Google Reader Resizable Sidebar
// @description   Replaces the sidebar toggle with a draggable separator
// @namespace     teremolly
// @version       1.0
// @include       http://*google.tld/reader/view*
// @include       https://*google.tld/reader/view*
// ==/UserScript==

var currWidth=260;
var barColor='#b8bcc6';
var barWidth='10px';
var resizeState=false;
var x0,divx0;

elNav=document.getElementById("nav");
elNav.style.width=currWidth+"px";
elChrome=document.getElementById("chrome");
elChrome.style.marginLeft=currWidth+"px";

toggler=document.getElementById("chrome-lhn-toggle");
toggler.style.display='none';
viewer=document.getElementById("chrome-viewer");
parent=viewer.parentNode;
newTogg=document.createElement("TD");
newTogg.setAttribute('id', 'newTogg');
newTogg.style.backgroundColor=barColor;
newTogg.style.width=barWidth;
newTogg.style.position="relative";
newTogg.style.left='0px';
newTogg.style.top='0px';
parent.insertBefore(newTogg,viewer);

newTogg.addEventListener('mousedown',function(event){initMove(this,event);return false;},false);
document.addEventListener('mousemove',function(event){moveHandler(newTogg,event);return false;},false);
document.addEventListener('mouseup',function(event){resizeState=false;document.body.style.cursor='auto';},false);

function initMove(togg,event)
{
var event=event||window.event;
x0=event.clientX+window.scrollX;
divX0 = parseInt(elNav.style.width);
resizeState = true;
document.body.style.cursor='w-resize';
}

function moveHandler(div, event) {
var event = event || window.event;
if (resizeState) {
offX=divX0+event.clientX+window.scrollX-x0;
elNav.style.width=offX+"px";
elChrome.style.marginLeft=offX+"px";
}
}