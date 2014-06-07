// ==UserScript==
// @name             Facebook Chat Resize and sort
// @namespace        W3D
// @description      Drag resize and sort by online
// @include          http://*.facebook.com/*
// @include          https://*.facebook.com/*
// @version          2
// ==/UserScript==

var dragging=false;
var currentDragging;
var startx, starty;
var startw, starth;
var c3, c4, c5, c6, cin, ctx;


var msmv = function (e){
	if(dragging){
		var ch = starth + starty - e.clientY;
		var cw = startw + startx - e.clientX;
		
		c3.style.height = ch + "px";
		c3.style.maxHeight = ch +"px";
		c3.style.width = cw +"px";
		
		
		c4.style.height = ch + "px";
		c4.style.maxHeight = ch +"px";
		c4.style.width = cw +"px";
		
		c5.style.height = ch + "px";
		c5.style.maxHeight = ch +"px";
		c5.style.width = cw +"px";
		
		c6.style.width = cw +"px";
		cin.style.height = ch-27-25 + "px";
		cin.style.minHeight = ch-27-25 + "px";
		cin.style.maxHeight = ch-27-25 + "px";
		
		ctx.style.width = (cw- 26) +"px";
	}
};

var msup = function (e){
	e.preventDefault();
	currentDragging = null;

	dragging=false;
	document.removeEventListener('mousemove', msmv,false);
};

function cstyle(source){
	return document.defaultView.getComputedStyle(source);
}

var msdwn = function (e){
	e.preventDefault();
	currentDragging = e.target;
	c3 = currentDragging.parentNode.parentNode.parentNode;
	c4 = c3.parentNode;
	c5 = c4.parentNode;
	c6 = c5.parentNode;
	cin = c4.getElementsByClassName("fbNubFlyoutBody")[0];
	ctx = c4.getElementsByTagName("textarea")[0];
	
	document.addEventListener('mouseup', msup, false);
	dragging = true;
	
	startx = e.clientX;
	starty = e.clientY;
	
	starth = parseInt(cstyle(c3).height,10);
	startw = parseInt(cstyle(c3).width,10);
	
	document.addEventListener('mousemove', msmv, false);
};



function inter(){
	var els = document.getElementsByClassName("fbNubFlyoutTitlebar");
	for(i in els){
		var subels = els[i].getElementsByClassName("titlebarTextWrapper");
		for(ii in subels){
			if(subels[ii].className.indexOf("resizable") == -1){
				subels[ii].addEventListener('mousedown', msdwn, false);
				subels[ii].className += " resizable";
				
				var style = document.createElement('style');
				style.textContent = ".resizable {cursor:nw-resize}";
				document.getElementsByTagName('head')[0].appendChild(style);
			}
		}
	}
}

window.setInterval(onlineSort, 2000);
window.setInterval(inter, 2000);

function onlineSort() {
	var list = document.getElementsByClassName("fbChatOrderedList")[0];
	if(list){
	
		var items = list.getElementsByClassName("item");
		var lastOn = 0;
		for(i in items){
			if(items[i].className.indexOf("active")>0){
				list.insertBefore(items[i], list.childNodes[lastOn]);
				lastOn++;
			}
		}
	}
}