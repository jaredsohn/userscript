// ==UserScript==
// @name           �kariam Kestirme Yollar Eklentisi
// @namespace      �a�atay Karahan
// @description    Bu script ana panelde ve ba�ka yerlerde kaynaklara kestirme yollar� g�sterir. 
// @include        http://*ikariam.*/index.php*
// ==/UserScript==
/*
19:50 16/3/2008 (Gun/Ay/Yil)
Description:
Kestirme yollar olunca adadaki kaynaklara  ula�ma y�zde elli artt�.

Not:Bu scripti kullanarak adadaki kaynaklara ula�man daha da h�zlan�r bunun sayesinde mesela sana sald�r� oldu�unda hemen bu script ile kaynaklar�n� azalt�p t�m kaynaklar�n� kullan�rs�n ve e�er kar��daki adam kazan�rsa o g�lmez sen onun arkas�ndan g�lersin.  
*/
/* Ba�lang��da ki karakter:
s->Diz
o->�tiraz et 
a->Array
h->K�y
f->Y�z
*/
/*
v 0.1.
v 0.2:
Some Variable renaming.
Added extra menu for the +1000 resources problem. Too much text in the Div.
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
hTradeGoodsNames['value_wine'] = 'Sarap';
hTradeGoodsNames['value_marble'] = 'Mermer';
hTradeGoodsNames['value_crystal'] = 'Kristal';
hTradeGoodsNames['value_sulfur']= 'Sulfur';

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
		if (aA[i].href.matchs(sSearchKey) != null) {
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
*/
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
*/
function setDebug () {
  GM_addStyle(".debugDiv {position:absolute; top:2px; left:2px; z-index:100; text-align:left; background-color:white; border-style:solid; border-width: 4px 2px 2px 2px; padding: 5px 3px 4px 5px}");
  //var oDiv = document.createElement('div');
  var oDiv = document.getElementById("extraDiv2");
  oDiv.className ="debugDiv";
  oDiv.id = "debugID"
  addShortCut("index.php?view=resource&type=resource&id=",oDiv,"Odun: +"+getResourcePerHour(fResourcesDelta));
  var oBr = document.createElement('br');
  oDiv.appendChild(oBr);
  //oDiv.addEventListener("click", scroll, false);
	addShortCut("index.php?view=tradegood&type=tradegood&id=",oDiv,hTradeGoodsNames[sTradeGoodName]+": +"+getResourcePerHour(fTradegoodDelta));
  document.body.appendChild(oDiv);
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
setShortCuts();
setDebug();