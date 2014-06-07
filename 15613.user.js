// ==UserScript==
// @name           Stumbleupon Avatar Bubbles
// @namespace      www.daddy.sk
// @description    Shows larger version of avatar in tooltip bubble after pointing the mouse.
// @include        http://*.stumbleupon.com/*
// @include        http://stumbleupon.com/*
// ==/UserScript==
//
// Inspired by StumbleUpon Hover Enlarge script by MrEricSir
//
// Using (many) parts of bubble Tooltips by Alessandro Fulciniti  
//		http://web-graphics.com/mtarchive/001717.php
//		http://web-graphics.com/mtarchive/BtJsCode.html

var tinyPics, singleAvatar;

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function showTooltipPic(e){
	var content;
	if (e==null) {
		e = window.event;
	}
	// ****************** User changeable ******************
	// Define content here:
	var origImg, newImg, center;
	origImg 			= e.target;
	newImg				= document.createElement('img');
	center				= document.createElement('center');
	newImg.setAttribute( "src", origImg.src.replace("superminipics", "mediumpics") ); //mainpics mediumpics
	newImg.setAttribute( "id", "tooltipImg" );
	center.appendChild(newImg);
	GM_log("title: " + origImg.Title);
	GM_log("title: " + origImg.getAttribute("Title"));
	content				= center;
	// ****************** /User changeable ******************
	// Tooltip generation
	var tooltip;
	tooltip					= document.createElement("span");
	tooltip.className 		= "tooltip";
	tooltip.style.display 	= "block";
	tooltip.appendChild(content);
	tooltip.style.MozOpacity= "0.95";
	document.getElementById("btc").appendChild(tooltip);
}

function hideTooltipPic(e){
	var d=document.getElementById("btc");
	if(d.childNodes.length>0) d.removeChild(d.firstChild);
}

function locate(e) {
	var posx=0, posy=0;
	var clientW, clientH;
	var tooltipW = 0, tooltipH = 0;

	if (e==null) {
		e=window.event;
	}
	
	if (document.documentElement.scrollTop){
		posx=e.clientX+document.documentElement.scrollLeft;
		posy=e.clientY+document.documentElement.scrollTop;
		clientW = window.innerWidth + document.documentElement.scrollLeft;
		clientH = window.innerHeight + document.documentElement.scrollTop;
	} else {
		posx=e.clientX+document.body.scrollLeft;
		posy=e.clientY+document.body.scrollTop;
		clientW = window.innerWidth;
		clientH = window.innerHeight;	
	}		
	
	// ****************** User changeable ******************
	// Get the tooltip width & height here
	var tooltipImg;
	
	tooltipImg = document.getElementById("tooltipImg");
	if (tooltipImg != null) {
		tooltipW = tooltipImg.width;
		tooltipH = tooltipImg.height;
	}
	// ****************** /User changeable ******************
	
	if (posx + tooltipW + 20 > clientW) {
		posx -= tooltipW + 35;
	}
	if (posy + tooltipH + 20 > clientH) {
		posy -= tooltipH + 35;
	}
	
	document.getElementById("btc").style.top=(posy+10)+"px";
	document.getElementById("btc").style.left=(posx+10)+"px";
}

// Create tooltip dummy
var dummy;
dummy		= document.createElement("span");
dummy.id	= "btc";
dummy.setAttribute("id","btc");
dummy.style.position = "absolute";
document.getElementsByTagName("body")[0].appendChild(dummy);

// Define css
addGlobalStyle(".tooltip{ color:#000; font:lighter 11px/1.3 Arial,sans-serif; text-decoration:none;text-align:center; background-color: rgb(50,50,55); padding: 5px; border: 4px double black;} .tooltip img{border: 2px groove white;}");

// ****************** User changeable ******************
// Get elements to be tooltiped 
tinyPics = xpath("//img[contains(@src, '/superminipics/' )]");
// ****************** /User changeable ******************

for (var i = 0; i < tinyPics.snapshotLength; i++) {
	singleAvatar = tinyPics.snapshotItem(i);
	singleAvatar.addEventListener("mouseover", showTooltipPic, true);
	singleAvatar.addEventListener("mouseout", hideTooltipPic, true);
	singleAvatar.addEventListener("mousemove", locate, true);
}
