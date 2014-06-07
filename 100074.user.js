// ==UserScript==
// @name           Bots4 Train List
// @namespace      Bots4 Train List
// @description    Bots4 Train List
// @include        http://bots4.net/train
//
// @author 	   AquaRegia
// @version 	   2011-04-04
// ==/UserScript==

if(!window.chrome)
{
	storage = unsafeWindow.localStorage;
	browser = "firefox";
}
else
{
	storage = localStorage;
	browser = "chrome";
}

function addStyle(css)
{
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

function attachCollapseEvent(element, triggerElement)
{
	var trainbot = element.getElementsByTagName("a")[0].innerHTML;

	triggerElement.addEventListener("click", function()
	{
		if(element.getElementsByClassName("collapseButton")[0].innerHTML == "+")
		{
			element.getElementsByTagName("table")[0].style.display = "table";
			element.getElementsByTagName("table")[1].style.display = "table";
			element.getElementsByTagName("div")[0].style.display = "block";
			element.getElementsByClassName("collapseButton")[0].innerHTML = "-";
			
			storage["TrainList:" + username + ":" + trainbot + ":minimized"] = 0;
		}
		else
		{
			element.getElementsByTagName("table")[0].style.display = "none";
			element.getElementsByTagName("table")[1].style.display = "none";
			element.getElementsByTagName("div")[0].style.display = "none";
			element.getElementsByClassName("collapseButton")[0].innerHTML = "+";
			
			storage["TrainList:" + username + ":" + trainbot + ":minimized"] = 1;
		}
	}, false);
}

function attachBrightnessEvent(element, triggerElement)
{
	var trainbot = element.getElementsByTagName("a")[0].innerHTML;

	triggerElement.addEventListener("click", function()
	{
		if(element.getElementsByClassName("brightnessButton")[0].checked)
		{
			element.style.opacity = 1;
			storage["TrainList:" + username + ":" + trainbot + ":bright"] = 1;
		}
		else
		{
			element.style.opacity = 0.25;
			storage["TrainList:" + username + ":" + trainbot + ":bright"] = 0;
		}
	}, false);
}

var styles = "\
	.extraContent\
	{\
		position: absolute !important;\
		top: 0px !important;\
		right: 5px !important;\
		font-size: 14pt !important;\
		font-family: Courier New !important;\
		font-weight: bold !important;\
	}\
	.collapseButton\
	{\
		cursor: pointer !important;\
	}\
	.brightnessButton\
	{\
		cursor: pointer !important;\
	}\
	";
	
addStyle(styles);

var headerLinks = document.getElementById('header').getElementsByTagName('a');
var username;

for(var i = 0; i < headerLinks.length; i++)
{
	if(headerLinks[i].href.match('/profile'))
	{
		username = headerLinks[i].innerHTML;
		break;
	}
}

var trainBoxes = Array.prototype.slice.call(document.getElementsByClassName("box"), 2);
var plus;
var brightness;
var extraContent;
var minimized;
var bright;
var trainbot;

for(var i = 0; i < trainBoxes.length; i++)
{
	trainBoxes[i].style.position = "relative";

	trainbot = trainBoxes[i].getElementsByTagName("a")[0].innerHTML;
	minimized = storage["TrainList:" + username + ":" + trainbot + ":minimized"] || "1";
	bright = storage["TrainList:" + username + ":" + trainbot + ":bright"] || "0";
	
	if(minimized == "1")
	{
		trainBoxes[i].getElementsByTagName("table")[0].style.display = "none";
		trainBoxes[i].getElementsByTagName("table")[1].style.display = "none";
		trainBoxes[i].getElementsByTagName("div")[0].style.display = "none";
	}
	
	if(bright == "0")
	{
		trainBoxes[i].style.opacity = 0.25;
	}
	
	extraContent = document.createElement("span");
	extraContent.className = "extraContent";
	
	brightness = document.createElement("input");
	brightness.className = "brightnessButton";
	brightness.type = "checkbox";
	
	if(bright == "1")
	{
		brightness.checked = true;
	}
	
	attachBrightnessEvent(trainBoxes[i], brightness);
	extraContent.appendChild(brightness);
	
	plus = document.createElement("span");
	plus.className = "collapseButton";
	plus.innerHTML = minimized == "1" ? "+" : "-";
	attachCollapseEvent(trainBoxes[i], plus);
	extraContent.appendChild(plus);
	
	trainBoxes[i].appendChild(extraContent);
}