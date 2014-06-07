// Weewar Skins
// version 0.1
// 11-11-07
// Copyright (c) 2007, Pluto

// ==UserScript==
// @name Weewar Skins
// @ skins
// @namespace plutosforge.com
// @include http://*weewar.com/game/*
// ==/UserScript==

var map = document.getElementById('map');
var xOffset = 32;
var yOffset = 26;
var customTileURL = "http://www.plutosforge.com/images/custom_tiles/";


//loop through the map hexes using the dimensions provided in the document		
for (var x = 0; x < unsafeWindow.bWidth; x++)
{
	for (var y = 0; y < unsafeWindow.bHeight; y++)
	{
		var terrain = unsafeWindow.weewarMap.getTerrain(x,y);
		var tileX = x * xOffset;
		var tileY = y * yOffset;
		
		if(y%2) tileX += 16;		
		
		tileX += "px";
		tileY += "px";
		
		var newTileImg = "";
		switch(terrain){
			case "mountain.png":
				newTileImg = "snow_mountains.png";
				break;
			case "water.png":
				newTileImg = "ice.png";
				break;
			case "forest.png":
				newTileImg = "snow_with_trees.png";
				break;
			case "plain.png":
				newTileImg = "snow.png";
				break;
			case "swamp.png":
				newTileImg = "tundra2.png";
				break;
			case "desert.png":
				newTileImg = "tundra.png";
				break;
		}
		
		var tileImg = CreateDOMElement("img", {width:"32", height:"34", border:"0", src: customTileURL + newTileImg}, {position:"absolute", top:tileY, left:tileX, zIndex:"1"});				
		AppendChildren(map,tileImg);

	}
}

function CreateDOMElement(name, attrs, styleList)
{ 
	var domElement = document.createElement(name);
	for(var prop in attrs)
	{ 
		domElement[prop] = attrs[prop]; 
	}
	SetStyle(domElement, styleList);
	return domElement; 
}
function SetStyle(element, styleList)
{
	for(var styleName in styleList)
	{ 
		element.style[styleName] = styleList[styleName];
	}
}
function AppendChildren(element /*, list of children*/)
{
	for(var i = 1; i < arguments.length; i++)
	{	
		element.appendChild(arguments[i]);
	}
}