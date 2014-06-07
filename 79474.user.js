// ==UserScript==
// @name Zoom Image
// @author Vasil Dinkov 
// @namespace http://www.smartmenus.org/ 
// @version 1.0.2
// @description  Allows zooming of individual images using a toolbar.
// @ujs:category browser: enhancements
// @ujs:published 2005-09-04 21:30
// @ujs:modified 2005-09-04 23:00
// @ujs:documentation http://userjs.org/scripts/browser/enhancements/zoom-image 
// @ujs:download http://userjs.org/scripts/download/browser/enhancements/zoom-image.user.js 
// @ujs:download.gm http://userjs.org/scripts/download/browser/enhancements/zoom-image.user.js
// ==/UserScript==


/* 
 * This script is granted to the Public Domain.
 */

(function () {

// === User Configuration ===
var zoomFactor=1.7;
var menuShowTimeOut=1.2; // seconds
var minimalImageWidth=100; // minimal width of the images the menu is activated for
var minimalImageHeight=50; // minimal height of the images the menu is activated for


// === Code ===
var t=0;
var menuBuilt=0;
var menu, image, pixelLeft, pixelTop, menuBuilt;

function handler(o){
	if((o.clientWidth<minimalImageWidth || o.clientHeight<minimalImageHeight) && !o.zoomed || menuBuilt && menu.style.visibility=="visible") {
		return;
	}
	var oParent;
	image=o;
	if(!image.original_width){
		image.original_width=o.clientWidth;
		image.original_height=o.clientHeight;
	}
	pixelLeft=o.offsetLeft;
	pixelTop=o.offsetTop;
	var oParent=o.offsetParent;
	while(oParent){
		pixelLeft+=oParent.offsetLeft;
		pixelTop+=oParent.offsetTop;
		oParent=oParent.offsetParent;
	}
	// bug in Opera 8.0
	if(window.opera && window.opera.version()=="8.0" && o.style.display!="block"){
		pixelLeft+=3;
		pixelTop+=3;
	}
	// bug in Opera 8.0
	if(pixelLeft<window.pageXOffset)
		pixelLeft=window.pageXOffset;
	if(pixelTop<window.pageYOffset)
		pixelTop=window.pageYOffset;
	t=setTimeout(showMenu,menuShowTimeOut*1000);
}

function showMenu(){
	if(!menuBuilt)
		buildMenu();
	if(!menuBuilt)
		return;
	menu.style.top=pixelTop+"px";
	menu.style.left=pixelLeft+"px";
	menu.style.visibility="visible";
}

function hideMenu(e){
	if(t){
		clearTimeout(t);
		t=0;
	}
	if(!menuBuilt)
		return;
	var relatedTarget=e?e.relatedTarget:0;
	if(relatedTarget && (menu==relatedTarget || menu==relatedTarget.parentNode))
		return;
	menu.style.visibility="hidden";
}

function outOfMenu(e){
	var relatedTarget=e.relatedTarget;
	if(relatedTarget && relatedTarget != image)
		hideMenu(e);
}

function buildMenu(){
	var buttonsHolder, zoom, plus, minus, close;
	if(window.opera && document.body.all.length==5)
		return;
	menu=document.createElement("div");
	menu.setAttribute("style",
		"position:absolute;"+
		"background:#F5EBBC;"+
		"border:1px solid;"+
		"border-color:#ffffdd #857A4A #857A4A #ffffdd;"+
		"box-sizing:content-box;"+
		"-moz-box-sizing:content-box;"+
		"width:84px;"+
		"height:17px;"+
		"padding:0;"+
		"margin:0;"+
		"z-index:10000000;"
	);

	buttonsHolder=document.createElement("div");
	buttonsHolder.setAttribute("style",
		"position:absolute;"+
		"top:1px;"+
		"left:33px;"+
		"border:1px solid;"+
		"border-color:#C1B683 #ffffdd #ffffdd #C1B683;"+
		"box-sizing:content-box;"+
		"-moz-box-sizing:content-box;"+
		"width:30px;"+
		"height:13px;"+
		"padding:0;"+
		"margin:0;"
	);

	zoom=document.createElement("img");
	zoom.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAMAAADK6xa6AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURU1Mdv///8VIzGcAAAACdFJOU/8A5bcwSgAAADFJREFUeNpiYAABRiyAAU5gkwFjBjgJIkAISRJBguUR5qHLMDDilGGAGw6zB4IAAgwALq0AeHVzkmAAAAAASUVORK5CYII=";
	zoom.setAttribute("style",
		"position:absolute;"+
		"top:5px;"+
		"left:4px;"+
		"border:none;"+
		"width:25px;"+
		"height:7px;"+
		"padding:0;"+
		"margin:0;"
	);

	plus=document.createElement("img");
	plus.title="Zoom In";
	plus.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAMAAADTuiYfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURU1Mdv///8VIzGcAAAACdFJOU/8A5bcwSgAAABdJREFUeNpiYEQABuJIBgggWj0cAAQYABKQAFc7IMbiAAAAAElFTkSuQmCC";
	plus.setAttribute("style",
		"position:absolute;"+
		"top:2px;"+
		"left:34px;"+
		"border:1px solid;"+
		"width:11px;"+
		"height:9px;"+
		"padding:1px;"+
		"margin:0;"
	);
	plus.style.borderColor="#ffffdd #C1B683 #C1B683 #ffffdd"; // must be set this way because of a Opera bug

	minus=document.createElement("img");
	minus.title="Zoom Out";
	minus.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAMAAADTuiYfAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURU1Mdv///8VIzGcAAAACdFJOU/8A5bcwSgAAABdJREFUeNpiYEQABuLYDBBAtHo4AAgwABPUAF3wOWutAAAAAElFTkSuQmCC";
	minus.setAttribute("style",
		"position:absolute;"+
		"top:2px;"+
		"left:49px;"+
		"border:1px solid;"+
		"width:11px;"+
		"height:9px;"+
		"padding:1px;"+
		"margin:0;"
	);
	minus.style.borderColor="#ffffdd #C1B683 #C1B683 #ffffdd"; // must be set this way because of a Opera bug

	close=document.createElement("img");
	close.title="Original Size of the Image";
	close.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURU1Mdv///8VIzGcAAAACdFJOU/8A5bcwSgAAAB9JREFUeNpiYIQBBmQWAzLFAJOFEwyoClD1QgFAgAEADQIASckhCLMAAAAASUVORK5CYII=";
	close.setAttribute("style",
		"position:absolute;"+
		"top:2px;"+
		"left:68px;"+
		"border:1px solid;"+
		"width:9px;"+
		"height:9px;"+
		"padding:1px;"+
		"margin:0;"
	);
	close.style.borderColor="#ffffdd #C1B683 #C1B683 #ffffdd"; // must be set this way because of a Opera bug

	plus.addEventListener("mouseover",function(){this.style.borderColor="#4d4c76"},false);
	plus.addEventListener("mousedown",function(){this.style.borderColor="#000";this.style.background="#eee4a5"},false);
	plus.addEventListener("mouseup",function(){this.style.borderColor="#4d4c76";this.style.background="transparent"},false);
	plus.addEventListener("mouseout",function(){this.style.borderColor="#ffffdd #C1B683 #C1B683 #ffffdd";this.style.background="transparent"},false);
	plus.addEventListener("click",function(){var width,height;width=image.clientWidth;height=image.clientHeight;image.style.width=width*zoomFactor+"px";image.style.height=height*zoomFactor+"px";image.zoomed=1;hideMenu()},false);
	
	minus.addEventListener("mouseover",function(){this.style.borderColor="#4d4c76"},false);
	minus.addEventListener("mousedown",function(){this.style.borderColor="#000";this.style.background="#eee4a5"},false);
	minus.addEventListener("mouseup",function(){this.style.borderColor="#4d4c76";this.style.background="transparent"},false);
	minus.addEventListener("mouseout",function(){this.style.borderColor="#ffffdd #C1B683 #C1B683 #ffffdd";this.style.background="transparent"},false);
	minus.addEventListener("click",function(){var width,height;width=image.clientWidth;height=image.clientHeight;image.style.width=width/zoomFactor+"px";image.style.height=height/zoomFactor+"px";image.zoomed=1;hideMenu()},false);
	
	close.addEventListener("mouseover",function(){this.style.borderColor="#4d4c76"},false);
	close.addEventListener("mousedown",function(){this.style.borderColor="#000";this.style.background="#eee4a5"},false);
	close.addEventListener("mouseup",function(){this.style.borderColor="#4d4c76";this.style.background="transparent"},false);
	close.addEventListener("mouseout",function(){this.style.borderColor="#ffffdd #C1B683 #C1B683 #ffffdd";this.style.background="transparent"},false);
	close.addEventListener("click",function(){image.style.width=image.original_width+"px";image.style.height=image.original_height+"px";image.zoomed=0;hideMenu()},false);
	
	menu.addEventListener("mouseout",outOfMenu,false);
	
	menu.appendChild(buttonsHolder);
	menu.appendChild(zoom);
	menu.appendChild(plus);
	menu.appendChild(minus);
	menu.appendChild(close);
	document.body.appendChild(menu);
	menuBuilt=1;
}

for(var i=0; i<document.images.length; i++){
	document.images[i].addEventListener("mouseover",function(){handler(this);},false);
	document.images[i].addEventListener("mouseout",hideMenu,false);
}

})();