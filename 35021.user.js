// ==UserScript==
// @name           Gravatar - Mouseover to view
// @author         aVg
// @namespace      #avg
// @version        0.6
// @description    Mouseover to see those brilliant avatars.
// @include        *
// @exclude        *gmail*
// @exclude        *youtube*
// ==/UserScript==
var gs=document.evaluate("//img[contains(@src,'gravatar')]",document,null,6,null), g,
    box=document.createElement("div"), i=gs.snapshotLength;
box.setAttribute("style",
 "position: fixed;"+
 "visibility: hidden;" +
 "top: 0px;" +
 "left:0px;" +
 "border : 2px solid red;" +
 "width: 512px;" +
 "height: 512px;"
);
box.appendChild(document.createElement("img"));

document.body.appendChild(box);

function enter(A) {
if(A.shiftKey)
	return;
if ((A.screenX+20+box.offsetWidth) > window.outerWidth)
 box.style.right="20px";
else 
 box.style.left=(A.screenX+20)+"px";
 box.style.bottom="0px";
 box.firstChild.src=this.src.replace(/&amp;/g,"&").replace(/&default=[^&#]+/,"").replace(/s(?:ize)?=\d+/,"s=512");
 box.firstChild.addEventListener("load", function() {
	 box.style.visibility="";
 },false);
}

function leave(A) {
if(!A.shiftKey)
 box.style.visibility="hidden";
}

while(g=gs.snapshotItem(--i)) { 
 g.addEventListener("mouseover", enter ,false);
 g.addEventListener("mouseout", leave, false);
}

document.addEventListener("keyup", leave ,false);