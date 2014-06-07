// ==UserScript==
// @name           GifMouse
// @namespace      TD GifMouse
// @include        *
// @include        about:blank
// ==/UserScript==
//Alpha version, fixed
var gif=new Image();
var offset=84.2;
gif.src="http://thedownloader.24.eu/swim.gif";
gif.alt="Error: Image not loaded";
gif.setAttribute("style", "z-index:1000 ! important;width:180px;height:102px;position:absolute ! important;left:0;top:0;");
document.body.appendChild(gif);

var imageMove = function (e)
{
    gif.style.left=e.clientX/window.innerWidth*offset+"%";
    gif.style.top=e.clientY/window.innerHeight*offset+"%";
};

var handleDown = function (k)
{
var kcode;
if(!k)var k=window.event;
if(k.keyCode)kcode=k.keyCode;
else if(k.which)kcode=k.which;
if(kcode == "88" && offset != 84.2)offset++;
if(kcode == "90" && offset != 0.2)offset--;
};

window.addEventListener("mousemove",imageMove,false);
window.addEventListener("keydown",handleDown,false);