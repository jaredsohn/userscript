// ==UserScript==
// @name           MusicBrainz release day of the week
// @description    Include the day of the week for release events 
// @version        2007-04-13
// @author         Jugdish
// @namespace      41725D35-39E4-48d0-B26D-DA884D05D04E
//
// @include        http://*.musicbrainz.org/*
// @include        http://musicbrainz.org/*

// ==/UserScript==

var monthStartComn = [ 0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5 ];
var monthStartLeap = [ 6, 2, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5 ];
var dayOfWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements);
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement)
		parent.appendChild(newElement);
	else
		parent.insertBefore(newElement, targetElement.nextSibling);
}

function _calcDayOfWeek(year,month,day) {
	var century = Math.floor(year/100);
	if (century < 19 || century > 20 || month < 1 || month > 12 || day < 1 || day > 31) return "";
	year %= 100;
	var dayNum = ((3-(century%4))*2 + year + Math.floor(year/4) + (year % 4 ? monthStartComn[month-1] : monthStartLeap[month-1]) + day) % 7;
	return " "+dayOfWeek[dayNum];
}

function calcDayOfWeek(dateString) {
	var pieces = dateString.split("-");
	return _calcDayOfWeek(Number(pieces[0]),Number(pieces[1]),Number(pieces[2]));
}

function verifyDate(n) {
	var yrField = getElementsByClassName(n,"input","yearfield")[0];
	var moField = getElementsByClassName(n,"input","monthfield")[0];
	var dyField = getElementsByClassName(n,"input","dayfield")[0];
	n.lastChild.innerHTML = _calcDayOfWeek(Number(yrField.value),Number(moField.value),Number(dyField.value)) || " ???";
}

function monitorDate(parent,yrField,moField,dyField) {
	var span = document.createElement("span");
	span.style["fontFamily"] = [ "courier new", "monospace" ];
	parent.appendChild(span);
	yrField.addEventListener("keyup", function(e) { verifyDate(e.target.parentNode); }, false);
	moField.addEventListener("keyup", function(e) { verifyDate(e.target.parentNode); }, false);
	dyField.addEventListener("keyup", function(e) { verifyDate(e.target.parentNode); }, false);
	verifyDate(parent);
}

// append day of week to any full dates found in the document
var i, j;
var cells = document.getElementsByTagName("td");
for (i = 0; i < cells.length; i++) {
	if (cells[i].getElementsByTagName("td").length) continue;
	for (j = 0; j < cells[i].childNodes.length; j++) {
		var c = cells[i].childNodes[j];
		if (c.nodeType == 3) // text node
			c.nodeValue = c.nodeValue.replace(/[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/g, function(d) { return d+calcDayOfWeek(d); });
	}
}

// release date input fields when editing
var parent, yrFields, moFields, dyFields;
yrFields = getElementsByClassName(document,"input","yearfield");
for (i = 0; i < yrFields.length; i++) {
	parent = yrFields[i].parentNode;
	moFields = getElementsByClassName(parent,"input","monthfield");
	dyFields = getElementsByClassName(parent,"input","dayfield");
	if (moFields.length && dyFields.length)
		monitorDate(parent,yrFields[i],moFields[0],dyFields[0]);
}
