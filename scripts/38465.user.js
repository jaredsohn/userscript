// ==UserScript==
// @name           comic
// @namespace      ktxp
// @include        http://comic.ktxp.com/
// ==/UserScript==
/*function readcomic(e){
alert(e.which);if(e.which==38)window.scrollBy(0,-50);if(e.which==40)window.scrollBy(0,50);if(e.which==17)multipage("next");if(e.which==16)multipage("previous");
}*/

//template
/*document.getElementsByTagName('body')[0].setAttribute("onkeydown",'if(event.which==17)multipage("next");if(event.which==16)multipage("previous");')
var div =document.getElementsByTagName("div");
for (var i=0;i<div.length;i++){
	if (div[i].getAttribute("class")=="browse1 clear"|div[i].getAttribute("class")=="browse_nav"|div[i].getAttribute("style"))
	div[i].parentNode.removeChild(div[i]);
}*/
var img_area= document.getElementById("img_area");
var div=document.getElementById("bg")
div.parentNode.removeChild(div)
document.appendChild(img_area)


/*var bd=document.getElementsByTagName('body')[0];
var realbd=bd.wrappedJSObject
realbd.removeChild(realbd.childNodes[2]);
alert(realbd);
realbd.onkeydown=alert("hi");*/