// ==UserScript==
// @name Wikipedia Table of Contents
// @description	You can see the page overview from the table of contents and go to the desired section without losing sight of the table of contents. The TOC scrolls with the page and can be minimized or maximized at will.
// @include *wikipedia*
// @namespace arunr.org
// ==/UserScript==


function buildTOC() {
	var myTOC = createTOC();
	populateTOC(myTOC);
	styleTOC(myTOC);
}

function styleTOC(myTOC) {
	myTOC.style.position = "fixed";
	myTOC.style.top = "10px";
	myTOC.style.right="10px";
	myTOC.style.width="250px";
	
	myTOC.style.backgroundColor = "black";
	myTOC.style.opacity = 0.7;
	myTOC.style.color="orange";
	myTOC.style.fontFamily="Arial, serif";
	myTOC.style.padding="7px";
	myTOC.style.fontSize="11px";
	myTOC.style.zIndex = 1000000;
	
	var mySTYLE = document.createElement("style");
	mySTYLE.type="text/css";
	var newStyle1 = document.createTextNode('#wikiTOC ul {list-type: none;}');
	var newStyle2 = document.createTextNode('#wikiTOC ul li a {color: #90FF4B;}');
	mySTYLE.appendChild(newStyle1);
	mySTYLE.appendChild(newStyle2);
	
	var pageHEAD = document.getElementsByTagName("head")[0];
	pageHEAD.appendChild(mySTYLE);
}

function populateTOC() {

	var tocBODY = document.getElementById("wikiTOCBODY");
	
	var tocTable = document.getElementById("toc");
	var tocUL = tocTable.getElementsByTagName("td")[0].getElementsByTagName("ul")[0];
	var mytocBODY = "<ul>"+tocUL.innerHTML+"</ul>";
	tocBODY.innerHTML = mytocBODY;
	tocTable.innerHTML = "";
}

function createTOC() {
	var myTOC = document.createElement("div");
	myTOC.id = "wikiTOC";
	
	var myHEAD = document.createElement("div");
	myHEAD.id = "wikiTOCHEAD";
	var myHEADING = document.createElement("p");
	myHEADING.innerHTML = "wikiTOC";
	myHEADING.style.border="1px solid orange";
	myHEADING.style.padding="2px";
	var myICON = document.createElement("p");
	myICON.id="tocICON";
	//myICON.innerHTML = "<a href=\"#\">;</a>";
	myICON.innerHTML = "-";
	myICON.style.cssFloat="right";
	myICON.style.marginTop="-28px";
	myICON.style.fontWeight="bold";
	myICON.style.padding="2px";
	myHEAD.appendChild(myHEADING);
	myHEAD.appendChild(myICON);
	myHEAD.addEventListener("click",toggleTOCBODY,false);
	
	var myBODY = document.createElement("div");
	myBODY.id = "wikiTOCBODY";
	myBODY.style.border="1px solid green";
	
	myTOC.appendChild(myHEAD);
	myTOC.appendChild(myBODY);
	var wikiBody = document.getElementsByTagName("body")[0].appendChild(myTOC);
	return myTOC;
}

function toggleTOCBODY(){
	var tocBODY = document.getElementById("wikiTOCBODY");
	var tocICON = document.getElementById("tocICON");
	if (tocBODY.style.display=="none"){
		tocBODY.style.display="block";
		tocICON.innerHTML="-";
	}
	else {
		tocBODY.style.display="none";
		tocICON.innerHTML="+";
	}
}
window.addEventListener("load",buildTOC,false);