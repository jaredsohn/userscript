// ==UserScript==
// @name           APOD-SimpleStyler
// @namespace      http://namespaces.zhonk.de
// @include        http://apod.nasa.gov/apod/ap*.html
// @include        http://antwrp.gsfc.nasa.gov/apod/ap*.html
// @description    SimpleScript that re-styles the APOD (Astronomy Picture of the Day). Putting a black Blackground and Adding Prev, Next Buttons to the left and right.
// ==/UserScript==


var body = document.body;
body.setAttribute("bgcolor","black");
body.setAttribute("link","white");
body.setAttribute("vlink","grey");
body.setAttribute("text","#cccccc");
body.setAttribute("alink","white");


var p=document.getElementsByTagName("center")[2].getElementsByTagName("a")[1];
var n=document.getElementsByTagName("center")[2].getElementsByTagName("a")[0];;


var next = document.createElement("div");
next.setAttribute("class", "nav next");
next.innerHTML="<a href=\""+n+"\">&gt;</a>";
body.appendChild(next);

var prev = document.createElement("div");
prev.setAttribute("class", "nav prev");
prev.innerHTML="<a href=\""+p+"\">&lt;</a>";
body.appendChild(prev);
var style = "body { color: #ccc; font-family: Verdana; font-size: 13px; background-color: black;} a { color: white;} a, a:active,a:visited { color: white;} p { line-height: 20px;} .nav { position:absolute; top:150px; width: 150px; font-size: 70px; text-align: center; border: grey 1px solid; color: white;} .nav a{ text-decoration:none;} .next { right: 3px;} .prev { left: 3px;}";
addGlobalStyle(style);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
