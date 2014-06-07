// ==UserScript==
// @name       	FULL SIZE PREVIEW
// @namespace  	kot-ss
// @version    	0.2
// @description Kot's Protype A for the UI of "Your remote screenshots"
// @include		http://shaddyshow.com/members/mod_free_after.php*
// @copyleft  	2012+, You
// ==/UserScript==

/*
document.onreadystatechange = function () {
	if (document.readyState == "complete") 
        fullSizePreview();
} 
*/



fullSizePreview();




//=======================================================================
//						MAIN SCRIPT FUNCTION:
//=======================================================================
function fullSizePreview() {

    //START:
    console.log("FS BEGINS");

    
    
    var UNSELECTED_COLOR = "rgb(255, 255, 255)";
    var SELECTED_COLOR = "rgb(0, 230, 0)";  
    
    
    
    

        
    //===========================
    // CHANGE MAIN TABLE LAYOUT: 
    //===========================
   
	//GET Main TBody: 
	var mainTBody = document.getElementById("headerfooter1").parentNode.parentNode;    
    //GET Main Table:
    var mainTable = mainTBody.parentNode;
    //INSERT new row on first position, and displace the rest:
    var firstRow = mainTBody.insertRow(0);    
    //INSERT new cell on the first row:
    firstRow.insertCell(0);
    //GET SECOND row (where "top page selector" is placed):
    var secondRow = mainTBody.children[1];
    //GET THIRD row (where infoBox and images are placed):
    var thirdRow = mainTBody.children[2];
    //GET FORTH row (where "bottom page selector" is placed):
    var forthRow = mainTBody.children[3];    
               
   
    
    //TAKE INFOBOX DIV AND APPEND IT TO CONTENT DIV:
    var infoBox = thirdRow.getElementsByTagName("div")[0];
    var contentFirstChild = document.getElementById("content").firstChild;
    document.getElementById("content").insertBefore(infoBox, contentFirstChild);
    infoBox.setAttribute("style", "position: fixed; top: 57px; left: 200px; z-index: 10000; visibility: hidden");
    
    
    //Create helpLine
	var helpLine = document.createElement("span"); 
    helpLine.innerHTML = "Left-Click to Zoom  &nbsp;&nbsp;|&nbsp;&nbsp;  Right-Click to Select";
    helpLine.setAttribute("style", "color: white; font-size: 13px; font-weight: bold");
    firstRow.cells[0].appendChild(helpLine);
    firstRow.cells[0].setAttribute("style", "padding: 10px; text-align: center;");
    
    //Position Header Buttons
    positionHeaderButtons();
    
    //DELETE remaining left columns in Second and Forth row:
    secondRow.deleteCell(0);
    thirdRow.deleteCell(0);
    forthRow.deleteCell(0);
    
    
    
    
    //===========================
    // STYLE: 
    //===========================
   
    //STYLE "content" div:
   	document.getElementById("content").style.background = "repeat url('http://s14.postimg.org/f1vzcnd8d/noisy_texture_100x100_rgb_0_130_130.png')"
    //dark green: http://s7.postimg.org/wdl19wxjb/noisy_texture_100x100_rgb_0_80_80.png
    
    //STYLE mainTable:
    mainTable.setAttribute("style", "background: #055; min-width: 990px; border-radius: 10px; padding: 0 20px 10px 20px; ");
    

    //Add padding to second and forth row (where page selectors are placed):
    secondRow.cells[0].style.padding = "10px";
    forthRow.cells[0].style.padding = "10px";

    //Delete trailing br tag on page selector cells:
    secondRow.cells[0].removeChild(secondRow.cells[0].lastChild);
    forthRow.cells[0].removeChild(forthRow.cells[0].lastChild);
    
    //Delete empy table:
    var emptyTable = document.getElementById("images").previousSibling;
    emptyTable.parentNode.removeChild(emptyTable);
    
    //===========================
    // EXPAND images:
    //===========================

    // REMOVE width and height attributes in all images:    
    var imgTBody = document.getElementById("images").nextSibling.firstChild;
    var imgs = imgTBody.getElementsByTagName("img");    
    for (var j = 0; j < imgs.length; j++) {
        imgs[j].removeAttribute("width");
        imgs[j].removeAttribute("height");
    }

    //Remove white border on images:    
    for (var j = 0; j < imgs.length; j++) imgs[j].style.border = "0"; 
    
    //Extract ID from image
    for (var j = 0; j < imgs.length; j++) imgs[j]._id = imgs[j].getAttribute("id").split(/image/)[1];
    
    
    
    
    
    //================================
    // Add smart wrappers for images:
    //================================

    var wrapper;
    var checkBox;
    for (var j = 0; j < imgs.length; j++) {
        wrapper = createWrapper("div", imgs[j]);
        wrapper.style.padding = "5px";
        wrapper.style.background = UNSELECTED_COLOR;
        //Create Delete and Upload buttons on top of the wrapper
        //var uploadButton = wrapper.insertBefore(document.createElement("div"), this.firstChild());
        //var deleteButton = wrapper.insertBefore(document.createElement("div"), this.firstChild());

        //Get associated select checkbox object:         
        checkBox = wrapper.parentNode.parentNode.parentNode.nextSibling.firstChild.firstChild;
  
        wrapper._checked = checkBox.checked;
        //If wrapper is selected then paint it as such:
        if (wrapper._checked) 
        	wrapper.style.background = SELECTED_COLOR;
          
                
        //Remove checkBox:
        checkBox.parentNode.removeChild(checkBox);
        
    }
    
    //Add padding to imgTBody cells
	var trs = imgTBody.children;
    
    for (var j = 0; j < trs.length; j++) {
        var tds = trs[j].children;
        for (var k = 0; k < tds.length; k++)
	        tds[k].style.padding = "7px";
    }
    
    //Add Event Listener to all images to flip color on right-click:
    for (var j = 0; j < imgs.length; j++) {
        imgs[j].addEventListener('contextmenu', function(ev) { ev.preventDefault(); flipIMGSelection(this); return false; }, false);
    }
    
    //Add Event Listener to all images to zoom on ctrl-key hold:
    for (var j = 0; j < imgs.length; j++) {
        addQuickZoom(imgs[j]);
    }
    
    
    

    
    //===========================
    // MISCELLANEOUS:
    //===========================
    
    //FASTER Highslide JS:    
	hs.expandDuration=75; 
    hs.restoreDuration=75;    
    
    
    
    
    //END:
    console.log("FS COMPLETE");
}





//																		//
//======================================================================//
//																		//
//							HELPER FUNCTIONS:							//
//																		//
//======================================================================//
//																		//


//=========================================================
//Creates and inserts a wrapper around a given childNode:
//=========================================================
function createWrapper(wrapperType, childNode) {    
    var parent = childNode.parentNode;
    var wrapper = document.createElement(wrapperType);
	
    //parent.replaceChild(wrapper, childNode);
    parent.removeChild(childNode);
	wrapper.appendChild(childNode);
    parent.appendChild(wrapper);

	return wrapper;
}




//=================================
//Selects or Unselects an image:
//=================================
function flipIMGSelection(img) {
    var UNSELECTED_COLOR = "rgb(255, 255, 255)";
    var SELECTED_COLOR = "rgb(0, 230, 0)";  
    
    var parent = img.parentNode;
    
    if (parent.style.background == UNSELECTED_COLOR) {
    	parent.style.background = SELECTED_COLOR;
        parent._checked = true;
        check(img._id, parent._checked);
    }
    else {
    	parent.style.background = UNSELECTED_COLOR;	
        parent._checked = false;
        check(img._id, parent._checked);
    }
}




//===================================================================
//Place show infobox button and show selected button on the top bar
//===================================================================
function positionHeaderButtons(){
    //Build header containers:
    var headerT = document.createElement("div");
    var headerLeft = document.createElement("div");
    var headerRight = document.createElement("div");

    document.getElementsByTagName("body")[0].appendChild(headerT);
    headerT.appendChild(headerLeft);
    headerT.appendChild(headerRight);

    headerT.setAttribute("style", "position: fixed; height: 57px; width: 100%; z-index: 5000; top: 0px; pointer-events: none");
    headerLeft.setAttribute("style", "display: inline-block; position: relative; height: 23px; width: 49%; text-align: right; padding: 15px; box-sizing: border-box;");
    headerRight.setAttribute("style", "display: inline-block; position: relative; height: 23px; width: 49%; text-align: left; padding: 15px; box-sizing: border-box;");

    headerLeft.style.paddingRight = "300px";
    headerRight.style.paddingLeft = "300px";
     
    
    
    //CREATE ANCHOR FOR INFOBOX:
    var infoboxLink = document.createElement('a'); 
    infoboxLink.appendChild( document.createTextNode("Show InfoBox") );
    infoboxLink.setAttribute("href", "");
    infoboxLink._checked = false;
    

	//CREATE ANCHOR FOR SELECTED BUTTON:
    var selectedLink = document.createElement('a'); 
    selectedLink.appendChild( document.createTextNode("Show Selected") );
    selectedLink.setAttribute("href", "");
    selectedLink._checked = false;

    
    //STYLE FOR ANCHORS:
    infoboxLink.setAttribute(
        "style", "display: inline-block; border: 2px solid white; color: white; padding: 2px 2px; font-size: 13px; font-weight: bold; text-decoration: none; pointer-events: auto;"); 
    selectedLink.setAttribute("style", infoboxLink.getAttribute("style"));

	
    
    //POSITION ANCHORS on the header:
    headerLeft.appendChild(infoboxLink);
    headerRight.appendChild(selectedLink);
    
    
    
    //=======================
    //ADD EVENT TO BUTTONS:
    //=======================
    
    //Add event to Show Infobox button:
    var infoBox = document.getElementById("content").firstChild;
    //Hides or Shows the infobox:
    infoboxLink.onclick = function(ev) {
        ev.preventDefault();
        if (infoBox.style.visibility === "hidden") {
            
            infoBox.style.visibility = "visible";
        } else {
            infoBox.style.visibility = "hidden"
        }
            
    }
   
    
    
    //Loading status for selectedLink (active or inactive):
    var onlySelectedInput = document.getElementById("sharediv").previousSibling;
    if (onlySelectedInput.checked === true) {
        selectedLink._checked = true;
    	selectedLink.style.borderColor = "rgb(0, 230, 0)";
		selectedLink.style.color = "rgb(0, 230, 0)";
    }

    selectedLink.addEventListener("click", function (ev) { onlySelectedInput.onclick() } );

    
    //Remove onlySelectedInput:
    onlySelectedInput.parentNode.removeChild(onlySelectedInput);
    
    

    //Add event to Show Selected button:
    selectedLink.onclick = function(ev) {
        ev.preventDefault();
        if (this._checked) {
            this._checked = false;
        }            
        else {
        	this._checked = true;
        }
    }
    
}




//======================
// Quick Zoom Function:
//======================
function addQuickZoom(img) {
    img.addEventListener("mousemove", function (e) { if (e.altKey){ quickZoom(this, true) } else { quickZoom(this, false) } });
    img.addEventListener("mouseout", function (e) { quickZoom(this, false) } );
    img.addEventListener("keydown", function (e) { alert("KEYDOWN !!!")}, true );
    img.addEventListener("keypress", function (e) { alert("KEYPRESS !!!")}, true );
                                     
}


//====================
// ON OFF Quick Zoom:
//====================
function quickZoom(img, show) {
    var contentDiv = document.getElementById("content");
    
    if (show && !contentDiv._zoomedImg) { 
        console.log("Zoom: ON");

        var container = document.createElement("div");
        container.setAttribute("id", "zoomedContainer");
        container.setAttribute("style", "position: fixed; width: 100%; height: 100%: z-index: 1000000; pointer-events: none; ");
        contentDiv.insertBefore(container, contentDiv.firstChild);

        var zoomedImg = img.cloneNode(true); //document.createElement("img");
        container.appendChild(zoomedImg);
        //var wrapper = createWrapper("div", zoomedImg);
        //wrapper.setAttribute("style", "display: inline-block; position: relative; margin: 20px auto;");
        //zoomedImg.setAttribute("src", img.getAttribute("src"));
        zoomedImg.setAttribute("style", "height: 75%; border: 3px solid white; ");
        
        
    	contentDiv._zoomedImg = true;
        
    } else if (contentDiv._zoomedImg && !show) {
        console.log("Zoom: OFF");
        
        var container = document.getElementById("zoomedContainer");
        container.parentNode.removeChild(container);
        
        contentDiv._zoomedImg = false;     
        
    }
     
}








