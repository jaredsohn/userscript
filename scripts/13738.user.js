// Weewar BigMap v2.0
// 12-16-07 - by Pluto
// ==UserScript==
// @name           Weewar BigMap
// @namespace      plutosforge.com
// @description    Let's you change the height of the weewar map
// @include        http://*weewar.com/game/*
// ==/UserScript==

//  I was heavily inspired by Jason Bunting's Chat Size Adjuster script to spruce up Weewar Bigmap a bit
// check out his very slick Chat Size Adjuster at http://sapientdevelopment.com/weewar

const defaultMapSize = "300px";
const mapSizeIncrement = 50;

try
{
	var mapSizeSettingKey = ("MapSize_" + ((/game\/([0-9]*)/g).exec(window.location.href)[1]));
	//GM_log(mapSizeSettingKey);
	var gameMap = document.getElementById("game");
	gameMap.style.height = GM_getValue(mapSizeSettingKey, defaultMapSize);
	var mapSizeLabel = CreateDOMElement("a", {id:"mapSizeLabel", innerHTML:"Map Size: "}, {fontSize:"0.85em"});
	var increaseMapSizeLink = CreateDOMElement("a", {id:"increaseMapSizeLink", href:"#", innerHTML:"+ increase "}, {fontSize:"0.85em", color:"#00BF00", textDecoration:"none"});
	var decreaseMapSizeLink = CreateDOMElement("a", {id:"increaseMapSizeLink", href:"#", innerHTML:"- decrease"}, {fontSize:"0.85em", color:"#BF0000", textDecoration:"none"});
	var expandHint = CreateDOMElement("a", {id:"expandHint", innerHTML:"(click on the '«' above to further expand)"}, {fontSize:"0.85em", margin:"0px 0px 0px 10px"});
			
	var mapSizeChanger = CreateDOMElement("div", {title:"mapSizeChanger"}, {backgroundColor:"#EEE", padding:"3px 3px 5px 3px", margin:"10px 0px 0px 0px"});
	AppendChildren(mapSizeChanger, mapSizeLabel, increaseMapSizeLink, decreaseMapSizeLink,expandHint);
	gameMap.parentNode.insertBefore(mapSizeChanger,gameMap);
	SetStyle(document.getElementById('game'),{margin:"0px"} );
	
	increaseMapSizeLink.addEventListener(
		"click",
		function(e)
		{
			gameMap.style.height = (+(gameMap.style.height.replace("px", "")) + mapSizeIncrement) + "px";
			GM_setValue(mapSizeSettingKey, gameMap.style.height);
			e.preventDefault();
		},
		false);
		
	decreaseMapSizeLink.addEventListener(
		"click", 
		function(e)
		{
			if(+(gameMap.style.height.replace("px", "")) > 100) gameMap.style.height = (+(gameMap.style.height.replace("px", "")) - mapSizeIncrement) + "px";
			GM_setValue(mapSizeSettingKey, gameMap.style.height);
			e.preventDefault();
		}, 
		false); 
}
catch(e)
{
	// NOTE: "extensions.firebug.showChromeMessages must be set to 
	// true for GM_log messages to show up in the Firebug console"
	GM_log("Script failed!");
	GM_log(e);
}

//////////////////////////////////////////////////////////////////////////////////
// Basic DOM manipulation helpers
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