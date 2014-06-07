//########################################################################
// Ynet Hide Sections
//
// Version 0.12
// See userscripts.org page for full description and changelog.
//
// Written by: Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give credit. Thanks.
// Improvements & suggestions are welcome.
//
//########################################################################
// ==UserScript==
// @name           Ynet Hide Sections
// @namespace      liorzur
// @description    Hides unwanted sections from Ynet (www.ynet.co.il).
// @include        http://www.ynet.co.il/home*
// ==/UserScript==

// ==== Functions ====
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function createEl(elObj, parent) { //from GreaseSpot; By Arvid
  var el;
  if (typeof elObj == 'string') {
	  el = document.createTextNode(elObj);
  } else {
	  el = document.createElement(elObj.n);
	  if (elObj.a) {
		  attributes = elObj.a;
		  for (var key in attributes) {
			  if (key.charAt(0) == '@')  el.setAttribute(key.substring(1), attributes[key]);
			  else  el[key] = attributes[key];
		  }
	  }
	  if (elObj.evl) { el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);  }
	  if (elObj.c) { elObj.c.forEach(function (v, i, a) { createEl(v, el); });  }
  }
  if (parent) parent.appendChild(el);
  return el;
}
function removeNode (element){
	if (element)
		element.parentNode.removeChild(element);
}
function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
    thisElement.parentNode.removeChild(thisElement);
	}
	if (allElements.snapshotLength > 0) return true; 
		else return false;
}

function deserialize(name, def) { // from GreaseSpot (Probably Henrik's or Arvid's)
  return eval(GM_getValue(name, (def || '({})')));
}
function serialize(name, val) {
  GM_setValue(name, uneval(val));
}
// ==== End Functions ====
// ==== Specialized functions ====
function removeSectionTitled (sectionTitle){
	removeElements("//a[@title='"+ sectionTitle +"']/ancestor::tr[position()=2]");
}
function hideSectionTitled (sectionTitle){
	$x("//a[@title='"+ sectionTitle +"']/ancestor::tr[position()=2]").forEach (function(a){
		a.style.display = "none";
	});
}
function showSectionTitled (sectionTitle){
	$x("//a[@title='"+ sectionTitle +"']/ancestor::tr[position()=2]").forEach (function(a){
		a.style.display = "block";
	});
}
function createLinkUnhide (secTitle){
	//Adds new links inside "_divHiddenList"
	function clickUnhide(e) {
			//Closure: secTitle, linkUnhide
			_sectionTitles = _sectionTitles.filter(function(t){return (t != secTitle); }) //remove secTitle from array (wherever it is)
			serialize("hideSections", _sectionTitles);
			showSectionTitled(secTitle);
			removeNode(linkUnhide); //remove my original link
	}
	var linkUnhide = createEl( {n:"a", a:{"@class":"gm_showAgainLink", textContent: secTitle + "   " ,href:"#"}}, _divHiddenList);
	linkUnhide.addEventListener("click", clickUnhide, true);
}
// ==== End specialized functions ====

//  On load: delete saved sections:
_sectionTitles = deserialize("hideSections", []);
_sectionTitles.forEach (hideSectionTitled);

//  On load: Create area for Unhide links.
GM_addStyle ('.gm_showAgainDiv {  display:block; background:white; text-align:right; dir:rtl; }');
GM_addStyle ('.gm_showAgainLink { display:block; text-align:right; dir:rtl; }');

var hebTeimot = String.fromCharCode(1496,1506,1497,1502,1493,1514);
var insertionPoint = $x('//b[text()="' + hebTeimot + '"]/ancestor::table[position()=1]')[0];
var _divHiddenList = createEl( {n:"div", a:{"@class":"gm_showAgainDiv"}});
insertionPoint.parentNode.insertBefore(_divHiddenList, insertionPoint);
insertionPoint = null;
var hebMessage = String.fromCharCode(1499,1512,1490,1506,32,1502,1505,1514,1497,1512,32,1488,1514,32,1492,1502,1491,1493,1512,1497,1501,32,1492,1489,1488,1497,1501,32,45,45,32,1492,1511,1500,1497,1511,1493,32,1506,1500,1497,1492,1501,32,1499,1491,1497,32,1500,1492,1513,1497,1489,1501,58);
createEl (hebMessage,_divHiddenList);

// On load: Create Unhide links for each hidden section:
_sectionTitles.forEach(createLinkUnhide);

// For each section: can hide it:
GM_addStyle ('a.gm_hideCorner { width:20px; height:20px; display:block; color:#b4bdfe !important; font-weight: bold; text-align:right; background: url("/Common/Files/Images/Leshonit/000066.gif") top left no-repeat; }'+
             'a.gm_hideCorner:hover{color:white !important;}');
$x("//img[@src='/Common/Files/Images/Leshonit/000066.gif']/parent::td").forEach (function (element){
	//get Section title (will be remembered using closure!)
	var secLinks = $x("descendant::a[@title]", element.previousSibling);
	if (secLinks.length>0) 
		var _secTitle = secLinks[0].getAttribute("title");
		else return true;
	//function for each link...
	function hideThis(){
		hideSectionTitled(_secTitle);
		createLinkUnhide(_secTitle);
		_sectionTitles.push(_secTitle);
		serialize("hideSections", _sectionTitles);
	}
	//change corner to a link...
	element.innerHTML = "";
	createEl( {n:"a", 
	           a:{"@class":"gm_hideCorner",textContent:"X",href:"#"},
	           evl:{type:"click",f:hideThis,bubble:"true"} } ,element);
});




