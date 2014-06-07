// ==UserScript==
// @name           BVG Suche vorausfüllen
// @description	   Füllt das Suchformular der Berliner Verkehrsbetriebe(BVG) standartmäßig mit voreingestellten Stationen aus, da man meistens Verbindungen von oder nach der Heimatstation sucht.
// @namespace      http://www.davidfichtmueller.de
// @include        http://www.bvg.de/*
// ==/UserScript==
//
// author 		   David Fichtmueller
// version		   0.3
// licence		   GPL


//check for default start station and end station
var start= GM_getValue("startStation","null");
var end= GM_getValue("endStation","null");
if(start=="null"){
	start = prompt("Bitte gib deinen gewünschten Startbahnhof ein. \nPlease enter you desired departure station.", "Hackescher Markt");
	end = prompt("Bitte gib deinen gewünschten Zielbahnhof ein. \nPlease enter you desired arrival station.", start);
	GM_setValue("startStation",start);
	GM_setValue("endStation",end);

}else if(end=="null"){
	end = prompt("Bitte gib deinen gewünschten Zielbahnhof ein. \nPlease enter you desired arrival station.", start);
	GM_setValue("endStation",end);
}

var startStations = start.split(';');
var startStation = startStations[0];

var endStations = end.split(';');
var endStation = endStations[0];

	

//replace input fields
var fromField = document.getElementById("from_position");
var fromElement;

if(fromField){
	fromElement = document.createElement('input');
	fromElement.type = 'text';
	fromElement.name="from";
	if(!(fromField.value == "Haltest. / Str., Nr." || fromField.value == "Dep. stop / St., No." )&& fromField.value != ""){
		fromElement.value=fromField.value; 
	}else{
		fromElement.value=startStation; 
	}
	fromElement.id="from_position_new";
	fromElement.title=fromField.title;
	fromElement.alt="new";

	fromParent = fromField.parentNode;
	fromParent.removeChild(fromField);
	fromParent.appendChild(fromElement);

	fromElement.setAttribute("onfocus","focusFunction(this,'"+startStation+"')");
	fromElement.setAttribute("onblur","blurFunction(this,'"+startStation+"')");
	
	if(startStations.length>1){
		//show Icon
		fromElement.style.cssFloat="left";
		fromElement.style.width="135px";
		var link = document.createElement('a');
		link.href = "#";
		link.setAttribute("onclick","toggleAlternativeStartStations();return false;");
		link.className = "nobg";
		link.innerHTML = '<img style="margin-left:3px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oJCw4TOggdxbMAAABOSURBVDjLY3RycvrPQCFgYWBgYNi7dy/ZBjg7OzMwMVABMBFjE8WGUMUlQ8sQFmICEZs4crJgwSWBbAChdDQaO2QYQkzmpIpLGKlRngAAMSwSsdsw7wgAAAAASUVORK5CYII=">';
		
		fromParent.appendChild(link);
		
		//add hidden div with links
		var body = document.getElementsByTagName('body')[0];
		var div = document.createElement('div');
		div.id = "alternativeStarts";
		div.style.zIndex="3";
		div.style.position="absolute";
		div.style.left = "961px";
		div.style.top = "251px";
		div.style.visibility="hidden";
		div.style.border = "#424242 solid 1px";
		div.style.background = "#ffffff";
		
		var links = "<ul style='list-style-type:none; position:relative; left:-20px; top:5px;'>";
		for(var i=1;i<startStations.length;i++){
			links = links + '<li><a href="#" onclick="setStartStation(\''+startStations[i]+'\');return false;" style="color:#141312;">' + startStations[i]+"</a></li>";
		}
		links = links + "</ul>";
		div.innerHTML = links;
		body.appendChild(div);
	}
}else{
	fromElement = document.getElementById("from_position_new");
}

var toField = document.getElementById("to_position");
var toElement;

if(toField){
	toElement = document.createElement('input');
	toElement.type = 'text';
	toElement.name="to";
	if(!(toField.value == "Haltest. / Str., Nr." || toField.value == "Dep. stop / St., No." ) && toField.value != ""){
		toElement.value=toField.value; 
	}else{
		toElement.value=endStation; 
	}
	toElement.id="to_position_new";
	toElement.title=toField.title;
	toElement.alt="new";

	toParent = toField.parentNode;
	toParent.removeChild(toField);
	toParent.appendChild(toElement);

	toElement.setAttribute("onfocus","focusFunction(this,'"+endStation+"')");
	toElement.setAttribute("onblur","blurFunction(this,'"+endStation+"')");
	
	if(endStations.length>1){
		//show Icon
		toElement.style.cssFloat="left";
		toElement.style.width="135px";
		var link = document.createElement('a');
		link.href = "#";
		link.setAttribute("onclick","toggleAlternativeEndStations();return false;");
		link.className = "nobg";
		link.innerHTML = '<img style="margin-left:3px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oJCw4TOggdxbMAAABOSURBVDjLY3RycvrPQCFgYWBgYNi7dy/ZBjg7OzMwMVABMBFjE8WGUMUlQ8sQFmICEZs4crJgwSWBbAChdDQaO2QYQkzmpIpLGKlRngAAMSwSsdsw7wgAAAAASUVORK5CYII=">';
		
		toParent.appendChild(link);
		
		//add hidden div with links
		var body = document.getElementsByTagName('body')[0];
		var div = document.createElement('div');
		div.id = "alternativeEnds";
		div.style.zIndex="3";
		div.style.position="absolute";
		div.style.left = "961px";
		div.style.top = "278px";
		div.style.visibility="hidden";
		div.style.border = "#424242 solid 1px";
		div.style.background = "#ffffff";
		
		var links = "<ul style='list-style-type:none; position:relative; left:-20px; top:5px;'>";
		for(var i=1;i<endStations.length;i++){
			links = links + '<li><a href="#" onclick="setEndStation(\''+endStations[i]+'\');return false;" style="color:#141312;">' + endStations[i]+"</a></li>";
		}
		links = links + "</ul>";
		div.innerHTML = links;
		body.appendChild(div);
	}
}else{
	toElement = document.getElementById("to_position_new");
}

//script for toggleing the default values on focus/blur 
var script = 'function focusFunction(element,station){'+
'	if(element.value==station){'+
'		element.value="";'+
'	}'+
'}'+
'function blurFunction(element,station){'+
'	if(element.value==""){'+
'		element.value=station;'+
'	}'+
'}'+
'function setStartStation(station){'+
'	var input = document.getElementById("from_position_new");'+
'	if(input){'+
'		input.value=station;'+
'	}'+
'	var div = document.getElementById("alternativeStarts");'+
'	if(div){'+
'		div.style.visibility="hidden";'+
'	}'+
'}'+
'function toggleAlternativeStartStations(){'+
'	var div = document.getElementById("alternativeStarts");'+
'	if(div){'+
'		if(div.style.visibility=="visible"){'+
'			div.style.visibility="hidden";'+
'		}else if(div.style.visibility=="hidden"){'+
'			div.style.visibility="visible";'+
'		}'+
'	}'+
'	var div2 = document.getElementById("alternativeEnds");'+
'	if(div2){'+
'		div2.style.visibility="hidden";'+
'	}'+
'}'+
'function setEndStation(station){'+
'	var input = document.getElementById("to_position_new");'+
'	if(input){'+
'		input.value=station;'+
'	}'+
'	var div = document.getElementById("alternativeEnds");'+
'	if(div){'+
'		div.style.visibility="hidden";'+
'	}'+
'}'+
'function toggleAlternativeEndStations(){'+
'	var div = document.getElementById("alternativeEnds");'+
'	if(div){'+
'		if(div.style.visibility=="visible"){'+
'			div.style.visibility="hidden";'+
'		}else if(div.style.visibility=="hidden"){'+
'			div.style.visibility="visible";'+
'		}'+
'	}'+
'	var div2 = document.getElementById("alternativeStarts");'+
'	if(div2){'+
'		div2.style.visibility="hidden";'+
'	}'+
'}';

//add functions to header
var header = document.getElementsByTagName('head')[0];
var scriptelement = document.createElement('script');
scriptelement.type = 'text/Javascript';
scriptelement.innerHTML = script;
header.appendChild(scriptelement);

//add additional style rule to header
var style = "a.nobg:focus{background-color:transparent !important;}";
var styleelement = document.createElement('style');
styleelement.type = 'text/css';
styleelement.innerHTML = style;
header.appendChild(styleelement);

//possibility to change default stations
function changeStations() {
	var startStation= GM_getValue("startStation","null");
	var endStation= GM_getValue("endStation","null");
	startStation = prompt("Bitte gib deinen gewünschten Startbahnhof ein. \n Please enter you desired departure station.", startStation);
	endStation = prompt("Bitte gib deinen gewünschten Zielbahnhof ein. \n Please enter you desired arrival station.", endStation);
	GM_setValue("startStation",startStation);
	GM_setValue("endStation",endStation);
	window.location.reload();
}

GM_registerMenuCommand("BVG Stationen ändern - change BVG Stations", changeStations);