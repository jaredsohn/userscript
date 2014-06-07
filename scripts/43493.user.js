// 11x11 game show user info user script
// version 0.2 BETA!
// 2009-03-02
// Copyright (c) 2009, Aleh Krutsikau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          11x11 Show player info
// @namespace     http://krolser.com/
// @description   Add "show player info" button
// @include       http://www.11x11.ru/xml/players/
// @include       http://www.11x11.ru/xml/players/transfer.php*
// @include       http://www.11x11.ru/users/*
// ==/UserScript==

// --------- Drag Functions   -----
var DRAG_SCRIPT = <><![CDATA[

	//mouse down on dragged DIV element  
	function startdrag(t, e) {
		if (e.preventDefault) e.preventDefault(); //line for IE compatibility  
		e.cancelBubble = true;  
		window.document.onmousemoveOld = window.document.onmousemove;  
		window.document.onmouseupOld = window.document.onmouseup;  
	    window.document.onmousemove=dodrag;  
	    window.document.onmouseup=stopdrag;  
	    window.document.draged = t;  
	    t.dragX = e.clientX;  
	    t.dragY = e.clientY;  
	    return false;  
	}  
	 //move the DIV  
	function dodrag(e) {  
		if (!e) e = event; //line for IE compatibility  
	    t = window.document.draged;  
	    t.style.left = (t.offsetLeft + e.clientX - t.dragX)+"px";  
	    t.style.top = (t.offsetTop + e.clientY - t.dragY)+"px";  
	    t.dragX = e.clientX;  
	    t.dragY = e.clientY;  
	    return false;  
	}  
	//restore event-handlers  
	function stopdrag() {  
		window.document.onmousemove=window.document.onmousemoveOld;  
		window.document.onmouseup=window.document.onmouseupOld;  
	}
]]></>.toXMLString();

var GLOBAL_CSS = <><![CDATA[
div.nicediv {
	position:absolute;
	padding:4px;
	top:0px;
	left:0px;
	background-color: #DDDDFF;
	color:white;
	font-size:13px;
	font-family:Verdana,Helvetica,Arial,sans-serif;
	width:25em;
	font-weight:bold;
	-moz-border-radius:12px !important;
	opacity:0.9;
	border: thin solid #000000;	
}
div.nicediv p {
	margin:0;padding:0 3px;
}
div.nicediv strong {
	color:0;
}
div.nicediv p.destination {
	font-size:9px;
	text-align:left;
	padding-top:3px;
}
div.nicetitle {
	color:0;
	padding: 4px;
	background-color: #AAAAFF;
	-moz-border-radius:6px !important;
	margin-bottom: 10px;
	border: thin solid #8888FF;
	clear : none;
}
div.nicetitle h1 {
	font-size : 1em;
}
span.close {
	color : red;
	margin : 2px;
}
]]></>.toXMLString();

// --------- Helper Functions -----

function addGlobalStyle(css){	
	var elmHead,elmStyle;
	elmHead = document.getElementsByTagName('head')[0];	
	if (!elmHead){return;}	
	elmStyle = document.createElement('style');
	elmStyle.type ='text/css';
	elmStyle.innerHTML = css;
	elmHead.appendChild(elmStyle);
} 

function addGlobalScript(js){	
	var elmHead,elmStyle;
	elmHead = document.getElementsByTagName('head')[0];	
	if (!elmHead){return;}	
	elmStyle = document.createElement('script');
	elmStyle.type ='text/javascript';
	elmStyle.innerHTML = js;
	elmHead.appendChild(elmStyle);
}

//--------------------------------------

function setParent(el, newParent) {
	newParent.appendChild(el);
}

function createHtmlChild(elem) {		 
	var newElem;
	if (elem.tagName == undefined) {		
		newElem = document.createTextNode(elem.textContent);		
	} else {
		newElem = document.createElement(elem.tagName);
		if (elem.hasChildNodes() ) {
			// Get all children of node
		    var children = elem.childNodes;               

		    // Loop through the children
		    for(var c=0; c < children.length; c++) {
		    	newElem.appendChild(createHtmlChild(children[c]));	    	
		    }
		}
	}
	return newElem;
}

function showNiceTitleW(fn,a) {
	return fn(a);
}

function getY( oElement ) {
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

// --------- FUNCTIONS -------------

function closeNiceDiv(event) {
	var t = event.target;	
	document.body.removeChild(t.parentNode.parentNode);
}

function createHeader(elmTarget, elmWrapper) {
	
	var header = document.createElement("div");
	header.className = "nicetitle";
	header.innerHTML = "<span>" + elmTarget.getAttribute("_playerName") + "</span>";
	
	var closeButton = document.createElement("span");
	closeButton.className = "close";
	closeButton.innerHTML = "✖";
	closeButton.setAttribute("_parentDiv", elmWrapper); 
	closeButton.addEventListener("click", closeNiceDiv, false);
	
	header.appendChild(closeButton);
	
	elmWrapper.appendChild(header);	
}

function showNowTitle(elmTarget, elmWrapper) {
		
	elmTarget.innerHTML = "→";								
	document.body.appendChild(elmWrapper);
		
	elmWrapper.style.top = getY(elmTarget) + "px";	
}

function showNiceTitle(event) {
	
	var elmTarget = event.target;
	var href = elmTarget.getAttribute("_href");
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20=%22" + href + "%22";

	elmTarget.innerHTML = "&#x25D4;";
	
	var innerHtml = elmTarget.getAttribute("_innerHTML");
		
	var elmWrapper = document.createElement("div");	
	elmWrapper.setAttribute("onmousedown" , "startdrag(this, event);");
	elmWrapper.className = "nicediv";
	
	if (innerHtml == null) {
	
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: url ,	    
		    onload: function(responseDetails) {			
				
				createHeader(elmTarget, elmWrapper); //, playerName);
				
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "text/xml");
				
				var allPlayerTdChild = dom.evaluate(
					    "/query/results/body/center/table/tr/td/table/tr/td[2]/table/tr[2]/td[2]/table/tr/td/table/tr[2]/td/table/tr/td/*",
					    dom,
					    null,
					    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					    null);
				
				// dont show form
				for (var i = 0; i < 6; i++) {
					var tdChild = allPlayerTdChild.snapshotItem(i);
					elmWrapper.appendChild(createHtmlChild(tdChild));
				}
				elmTarget.setAttribute("_innerHTML", elmWrapper.innerHTML);
				
				showNowTitle(elmTarget, elmWrapper);
		    }
		});
	} else {
		elmWrapper.innerHTML = innerHtml;		
		showNowTitle(elmTarget, elmWrapper);		
	}
}

// ---------- Main Code -------------

var allMainTables, thisMainTable;
var allA, thisA;
var allTd, thisTd;

allMainTables = document.evaluate(
    "//table[@class='maintable']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allMainTables.snapshotLength; i++) {	
	thisMainTable = allMainTables.snapshotItem(i);		
    // do something with mainTable
	
	allTd = document.evaluate(
		    ".//tr[position()>1]//td[2]",
		    thisMainTable,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
	
	for (var j = 0; j < allTd.snapshotLength - 1; j++) {
		thisTd = allTd.snapshotItem(j);
		
		if (thisTd.innerHTML != "") {
			
			thisA = document.evaluate(
				    ".//a",
				    thisTd,
				    null,
				    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				    null).snapshotItem(0);
			
			if (thisA != null) {
			
				var a = document.createElement("a");
				a.innerHTML = "↓";
				a.setAttribute("_href", thisA.href); 
				a.setAttribute("_playerName", thisA.innerHTML);
				thisTd.appendChild(a);
				
				a.addEventListener("click"
					, showNiceTitle
					,true
				);
			}
		}		
	}
}
	
addGlobalStyle(GLOBAL_CSS);
addGlobalScript(DRAG_SCRIPT);

// ✖,▲,▼,←,↑,→,↓; 


