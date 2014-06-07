// written by yasaf delabruere
// version 1.0.2
// ==UserScript==
// @name           Ebay Ad / Iframe Remover (canada)
// @namespace      
// @description    Removes annoying ads from ebay search results.
// @include        http://*search*ebay.ca*
// @include        http://*listings*ebay.ca*
// @include        http://*ebay.ca*
// @include        http://*shop*ebay.ca*
// ==/UserScript==
function doload() {
	var b=document.getElementsByTagName("body")
	b[0].innerHTML=b[0].innerHTML+" ";
frame=document.getElementsByTagName("iframe");
for(var i=0;i<frame.length;i++){
	frame[i].width=1;frame[i].height=1;
}
var center=document.getElementsByTagName("body")[0].children[2].children[0].children[0].children[0].children[11]
center.removeChild(center.children[1])

var images=document.getElementsByTagName("img") 
for(i=0;i<images.length;i++){
	if(images[i].src=="http://pics.ebaystatic.com/aw/pics/s.gif") {
		images[i].height=0;images[i].width=0;
	}
}
}
var divs=document.getElementsByTagName("div")
for(i=0;i<divs.length;i++){
if(divs[i].id.indexOf("rtm")!=-1){
divs[i].style.display="none"
}
}
window.addEventListener("load",doload,false)
setTimeout("document.getElementsByTagName('center')[0].parentNode.removeChild(document.getElementsByTagName('center')[0])",1000)