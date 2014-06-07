// ==UserScript==
// @name           RecourcesShortcuts
// @namespace      Yramesora
// @autor          A.Rosemary
// @description    This script adds shortcuts to the resources in a side panel. Moreover, the shortcuts show the increased amount per hour. 
// @include        http://*ikariam.*/index.php*
// ==/UserScript==
/*
Copyright 2008, tocho_nag@hotmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

For a copy of the Licence:
http://www.gnu.org/licenses/gpl.txt
*/

/*
21:03 5/3/2008 (Day/Month/Year)
Description:
Adds shortcuts to the resources on the island and shows the value increased per hour.

Note: I'm using the spanish version, so I ignore some ingame exact english terms :/
e.g. I use trade resource to mean the resource found on the island, the name is taken from the variables names from the game scripts. 
*/
/* Vars naming: character at the beginning of a variable name indicates its type (most of times :P)
s->String
o->Object (DOM nodes, attributes, and anything else)
a->Array
h->Hash
f->float
*/
/*
v 0.1.
v 0.2:
Some Variable renaming.
Added extra menu for the +1000 resources problem. Too much text in the Div.
v 0.3: 12/3/2008
Added Info to the City Information Div. Caused problesm cause it this Div doe sonly appear on city view
v 0.4: 12/3/2008
Created a new side Panel to set the resources info.
@todo: Style stuff...right now is not nice, but works.
@todo: find a better way to put the panel under the first. :/
*/

// Attributes
// Id of the user's City: used to generate url's
var sCityId;
// If of the user's Island: used to generate url's
var sIslandId;

// Increment per second of wood
var fResourcesDelta;
// Increment per secord of the trade resourse
var fTradegoodDelta;
// Name of the user's var: used to put the shortcut
var sTradeGoodName;
// Hash containing HTML id's and class' aattributes: used to put the shortcut 
var hTradeGoodsNames = new Array();
hTradeGoodsNames['value_wine'] = 'wine';
hTradeGoodsNames['value_marble'] = 'marble';
hTradeGoodsNames['value_crystal'] = 'glass'; // That's why I cannot just strip the name and I have to create a Hash >o<
hTradeGoodsNames['value_sulfur']= 'sulfur';

/*
Uses the parameter to find the element containing a certain link to strip part of it.
Used to get sCityId and sIslandId, from the main panel links.
@params: sSearchKey
@return: String 
*/
function extractId (sSearchKey) {
  var oForm = document.getElementById('changeCityForm');
	var aA = oForm.getElementsByTagName('a');
  for (var i = 0; i < aA.length; i++) {
		if (aA[i].href.match(sSearchKey) != null) {
      return aA[i].href.substr(aA[i].href.lastIndexOf("id=")+3,aA[i].href.length);
		}
	}
}

/*
Obtains the Id of the city
@return: string
*/
function extractIslandId ()  {
  return extractId("view=island");
}

/*
Obtains the If of the island
*/
function extractCityId () {
  return extractId("view=city");
}

/*
Creates a new <a href> element and appends it to another given element.
@params: sBaseUrl: basic part of the url,
nParent: element to which the new node will be appended,
sTag: value of the <a href> element. (In fact recieves an Integer)
*/
function addShortCut (sBaseUrl, oParent, sTag) {
      oA = document.createElement('a');
			oA.href=sBaseUrl+this.sIslandId;
			oA.innerHTML = sTag;
			oParent.appendChild(oA);		
}

/*
Calculates a resource's increment per hour and converts it into integer.
Assumption: sValue is positive
@param: resource increment per second
@return: iInteger
*/
function getResourcePerHour(sValue) {
    var fValue = parseFloat(sValue)*3600;
    var fDecPart = fValue - Math.floor(fValue);
    var iFinalValue;
    if (fDecPart > 0.5) iFinalValue = Math.ceil(parseFloat(fValue));
    else iFinalValue = Math.floor(parseFloat(fValue));
    return iFinalValue;    
}

/*
Finds the elements into which add the extra shortcuts and info for resources. Then, adds the links.
DEPRECATED from 0.3...oh good! how I love to say deprecated XD
*/
/*
function setShortCuts() {
	var oDiv = document.getElementById("cityResources");
	var aLis = oDiv.getElementsByTagName("li");

	var oCurrent;
	for (var i = 0; i < oDiv.getElementsByTagName("li").length; i++) {
		oCurrent = oDiv.getElementsByTagName("li")[i];
		var sAttributeName= oCurrent.attributes[1].value;
		if (sAttributeName == "wood") {
			addShortCut("index.php?view=resource&type=resource&id=",oCurrent,"+"+getResourcePerHour(fResourcesDelta));
		}
		if (sAttributeName == hTradeGoodsNames[sTradeGoodName]) {
			addShortCut("index.php?view=tradegood&type=tradegood&id=",oCurrent,"+"+getResourcePerHour(fTradegoodDelta));
		}
	}
}
*/

/*
Searchs for a line in a array and then extracts the relevant info from it.
Used to get the value of the resources increment from the page script.
@params: iStartIndex: position at which it starts to search,
sName: name of the variable searched.
aArray: array of strings with the code.
@return: string
*/
function findValue (iStartIndex,sName, aArray) {
  for (i=iStartIndex; i < aArray.length; i++) {
    iPos = aArray[i].search(sName);
    if (iPos > 0) {
      return stripValue(aArray[i]);
    }
  }
} 

/*
Extracts the substring from '=' to the end of sLine.
@params: sLine, string. To avoid Regular expression, here is an example :P "var startResourcesDelta = 0.0141666666667;" 
@return: string, e.g. "0.0141666666667"
*/
function stripValue (sLine) {
  return sLine.substring(sLine.lastIndexOf("=")+1,sLine.length);
}

/*
Extracts from the script code the name of the element's id of the user's island resource.
Used to know what resource does the island contain in order to put the tag next to it.
Note: i think i don't use this now -> Line:163
@params: sCodeLine, line of the code where the first ocurence of the variable appears.
Obtained looking directly at it, if the scripts is changed this code will fail :/
@return: string
*/
function discoverTradegood (sCodeLine) {
  return sCodeLine.substring(sCodeLine.indexOf('(')+2,sCodeLine.indexOf(')')-1);
}

/*
Initializes global variables with the resources information.
*/
function initResourcesValues () {
  var nScript = document.getElementById("cityResources").getElementsByTagName("script")[0];
  var sCode = nScript.innerHTML;
  var aCodeLines = sCode.split(';');
  sTradeGoodName = aCodeLines[19].substring(aCodeLines[19].indexOf('(')+2,aCodeLines[19].indexOf(')')-1);
  fResourcesDelta = findValue(0,"startResourcesDelta",aCodeLines);
  fTradegoodDelta = findValue(0,"startTradegoodDelta",aCodeLines);
}
/* Not Working :P
function scroll (oEvent) {
  var iX = oEvent.offsetX;
  var iY = oEvent.offsetY;
  alert(iX+" + "+iY);
}
*/

/*
Set a small tip with the resources shortcuts. Used now for better interface.
@todo: solve this nicely
solved in v0.4
*/
/*
function addDebugWindow () {
  GM_addStyle(".debugDiv {position:absolute; top:2px; left:2px; z-index:100; text-align:left; background-color:white; border-style:solid; border-width: 4px 2px 2px 2px; padding: 5px 3px 4px 5px}");
  var oDiv = document.getElementById("extraDiv2");
  oDiv.className ="debugDiv";
  oDiv.id = "debugID"
  addShortCut("index.php?view=resource&type=resource&id=",oDiv,"Wood: +"+getResourcePerHour(fResourcesDelta));
  var oBr = document.createElement('br');
  oDiv.appendChild(oBr);
	addShortCut("index.php?view=tradegood&type=tradegood&id=",oDiv,hTradeGoodsNames[sTradeGoodName]+": +"+getResourcePerHour(fTradegoodDelta));
  document.body.appendChild(oDiv);
}
*/

/*
Creates a new row to add to a Panel.
@params: sLabel, label  for the span element to witch the link will be added
--> For the rest see addShortCut() description.
*/
function newInfoCityElement (sLabel,sBaseUrl, oParent, sTag) {
  //GM_addStyle(".RosemerysInfo {text-align: right; color:green;}");
  var oNewLi = document.createElement('li');
  var oNewSpan = document.createElement('span');
  oNewSpan.innerHTML = sLabel;
  oNewLi.appendChild(oNewSpan);
  addShortCut(sBaseUrl,oNewLi,sTag);
  oParent.appendChild(oNewLi);
}

/*
Add Resources info and link into the Main City "information" Div.
@params: sBaseUrl: basic part of the url,
nParent: element to which the new node will be appended,
sTag: value of the <a href> element. (In fact recieves an Integer)
*/

/*
Auxiliar method to inser an element after another. Used when appendChild was causing problems.
*/
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}	else	{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

/*
Return de first div of the side panel. I really miss Prototype in moments like this :(
*/
function jumpToFirstDinamicDiv () {
  var aNodes = document.getElementById('container2').childNodes;
  var bFound = false;
  var oCurrent;
  for (var i = 0; i< aNodes.length && !bFound; i++) {
    oCurrent = aNodes[i];
    if (oCurrent.className == "dynamic") {
      bFound = true;
    }
  }
  //There's always one, at least so far in the game.
  return oCurrent;
}

/*
Adds the panel with the resources elements.
*/
function addDinamicPanel () {
  var oParent = document.getElementById("container2");
   
  var oPanel = document.createElement('div');
  oPanel.className ="dynamic";
  var oTitle = document.createElement('h3');
  oTitle.innerHTML="Resources"
  oTitle.title="by RecourcesShortcuts Script";
  oTitle.className ="header"
  var oContent = document.createElement('div');
  oContent.className="content";
  var oListUl = document.createElement('ul');
  oListUl.className="cityinfo";
  newInfoCityElement("Wood:","index.php?view=resource&type=resource&id=",oListUl,"  +"+getResourcePerHour(fResourcesDelta));
  newInfoCityElement(hTradeGoodsNames[sTradeGoodName]+":","index.php?view=tradegood&type=tradegood&id=",oListUl,"  +"+getResourcePerHour(fTradegoodDelta));
  oContent.appendChild(oListUl);  
  var oFooter = document.createElement('div');
  oFooter.className = "footer";
  oPanel.appendChild(oTitle);
  oPanel.appendChild(oContent);
  oPanel.appendChild(oFooter);
  var oDiv = jumpToFirstDinamicDiv();
  insertAfter(oPanel, oDiv);
}

/*
Starting method. Invoke before everyting else.
*/
function init () {
  this.sCityId = extractCityId();
  this.sIslandId = extractIslandId();
  initResourcesValues();
}

init();
addDinamicPanel();
