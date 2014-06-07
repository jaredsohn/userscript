// ==UserScript==
// @name           iCollapse - Universal iGoogle Sidebar, Header and Footer Toggle
// @copyright      2010 - bluemodule.com
// @namespace      http://bluemodule.com/software/bmsoft/icollapse/
// @description    Expands iGoogle viewing area by toggling iGoogle sidebar, header, and footer
// @version        1.3
// @include        http://www.google.*/ig*
// @include        https://www.google.*/ig*
// ==/UserScript==

// set initial size of nhdrwrapsizer
var nhdrwrapsizerStartSizePX = document.getElementById('nhdrwrapsizer').offsetHeight + "px";

// reduce header
document.getElementById('nhdrwrapsizer').style.height = setnhdrwrapsizerReducedSizePX();

// create a div container for the button
var divButtonElement = document.createElement('div'); 
redrawButton();

// hide the sidebar and footer
document.getElementById('footerwrap').style.display = 'none';
document.getElementById('col1').style.display = 'none';

//create button
var toggleButton = document.createElement('button');
	  toggleButton.href = "#";
	  toggleButton.innerHTML = "iCollapse";
	  toggleButton.addEventListener('click', toggleSidebar, true);
	  divButtonElement.appendChild(toggleButton);
	  document.getElementById('gbar').appendChild(divButtonElement);

// on/off sidebar function
function toggleSidebar(){
	document.getElementById('footerwrap').style.display = (document.getElementById('footerwrap').style.display == "none" ? "block" : "none" );
	document.getElementById('col1').style.display = (document.getElementById('col1').style.display == "none" ? "block" : "none" );
	document.getElementById('nhdrwrapsizer').style.height = (document.getElementById('nhdrwrapsizer').style.height == setnhdrwrapsizerReducedSizePX() ? nhdrwrapsizerStartSizePX : setnhdrwrapsizerReducedSizePX() );
	redrawButton();
}

//returns top potision of sidebar
function getParentTopPosition(sidebarArgObj){
    var topValue = 0;
    while(sidebarArgObj){
	topValue += sidebarArgObj.offsetTop;
	sidebarArgObj = sidebarArgObj.offsetParent;
    }
    return topValue;
}

// recalculates and returns the size of nhdrwrapsizer
function setnhdrwrapsizerReducedSizePX(){
var gseaInitSize = document.getElementById('gsea').offsetHeight;
var addstuffBarInitSize = document.getElementById('addstuff').offsetHeight;

var nhdrwrapsizerReducedSize = gseaInitSize - addstuffBarInitSize;
return nhdrwrapsizerReducedSize+"px";
}

// adjust button position
function redrawButton(){
// get the top/left position of the sidebar
var sidebarDiv = document.getElementById('col2');
var parentTopPosn = getParentTopPosition(sidebarDiv);
divButtonElement.style.position = "absolute";
divButtonElement.style.top = (parentTopPosn - 30) + "px";
}