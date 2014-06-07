// ==UserScript==
// @name           X_Ray
// @namespace      Juampi_Mix
// @description    Inspecciona elementos en una pagina web (LEER MODO DE USO)
// ==/UserScript==
var WebKitDetect = {  };

// If the user agent is WebKit, returns true. Otherwise, returns false.
WebKitDetect.isWebKit = function isWebKit()
{
    return RegExp(" AppleWebKit/").test(navigator.userAgent);
}

// If the user agent is WebKit, returns an array of numbers matching the "." separated 
// fields in the WebKit version number, with an "isNightlyBuild" property specifying
// whether the user agent is a WebKit nightly build. Otherwise, returns null.
//
// Example: 418.10.1 => [ 418, 10, 1 ] isNightlyBuild: false
WebKitDetect.version = function version() 
{
    /* Some example strings: 
            Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/418.9.1 (KHTML, like Gecko) Safari/419.3
            Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Safari/521.32
     */
     
    // grab (AppleWebKit/)(xxx.x.x)
    var webKitFields = RegExp("( AppleWebKit/)([^ ]+)").exec(navigator.userAgent);
    if (!webKitFields || webKitFields.length < 3)
        return null;
    var versionString = webKitFields[2];

    var isNightlyBuild = versionString.indexOf("+") != -1;

    // Remove '+' or any other stray characters
    var invalidCharacter = RegExp("[^\\.0-9]").exec(versionString);
    if (invalidCharacter)
        versionString = versionString.slice(0, invalidCharacter.index);
    
    var version = versionString.split(".");
    version.isNightlyBuild = isNightlyBuild;
    return version;
}

// If the user agent is a WebKit version greater than or equal to the version specified
// in the string minimumString, returns true. Returns false otherwise. minimumString 
// defaults to "".
//
// Example usage: WebKitDetect.versionIsAtLeast("418.10.1")
WebKitDetect.versionIsAtLeast = function versionIsAtLeast(minimumString)
{
    function toIntOrZero(s) 
    {
        var toInt = parseInt(s);
        return isNaN(toInt) ? 0 : toInt;
    }

    if (minimumString === undefined)
        minimumString = "";
    
    var minimum = minimumString.split(".");

    var version = WebKitDetect.version();
    if (!version)
        return false;

    for (var i = 0; i < minimum.length; i++) {
        var versionField = toIntOrZero(version[i]);
        var minimumField = toIntOrZero(minimum[i]);
        
        if (versionField > minimumField)
            return true;
        if (versionField < minimumField)
            return false;
    }

    return true;
}


function isWebKit() {
	
	// String found if this is a AppleWebKit based product
	var kitName = "applewebkit/";
	var tempStr = navigator.userAgent.toLowerCase();
	var pos = tempStr.indexOf(kitName);
	var isAppleWebkit = (pos != -1);

	return isAppleWebkit;
	
	if (isAppleWebkit) {
		// Grab the version
		var kitVersion = tempStr.substring(pos + kitName.length,tempStr.length);
		kitVersion = kitVersion.substring(0,kitVersion.indexOf(" "));
		//alert("Congratulations!\n You are using AppleWebKit version : " + kitVersion);

	} else {
			//alert("Bummer\n You are not using AppleWebKit.");
	}
}

function isSafari2 () {
	return (!WebKitDetect.versionIsAtLeast("420")&&(isWebKit()))
}


function supportsCanvas(){
	//is this any version of IE?
	
	try {		
		var supported=(!document.defaultView.getComputedStyle);
	}
	
	catch (err){
		return false;
	}
	
	return true;
}

//end apple web kit detect

//drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop

var savedTarget=null;                           // The target layer (effectively vidPane)
   var orgCursor=null;                             // The original mouse style so we can restore it
   var dragOK=false;                               // True if we're allowed to move the element under mouse
   var dragXoffset=0;                              // How much we've moved the element on the horozontal
   var dragYoffset=0;                              // How much we've moved the element on the verticle

	var didDrag=false;								//set to true when we do a drag
	
	
	function moveHandler(e){
	      if (e == null) { e = window.event } 
	      if (e.button<=1&&dragOK){
	         savedTarget.style.left=e.clientX-dragXoffset+'px';
	         savedTarget.style.top=e.clientY-dragYoffset+'px';
			 return false;
	      }
	   }

	   function cleanup(e) {
	      document.onmousemove=null;
	      document.onmouseup = xRayEvent;
		  savedTarget.style.cursor=orgCursor;

	      dragOK=false; //its been dragged now
	      didDrag=true;

	   }

	   function dragHandler(e){

	      var htype='-moz-grabbing';
	      if (e == null) { e = window.event;} // htype='move';} 
	      var target = e.target != null ? e.target : e.srcElement;
	      orgCursor=target.style.cursor;


		 if (inHUD(target)) {
			 target=document.getElementById("XRAYHUD");
			 //target.style.webkitBoxShadow='0px 0px 0px #777777';
	         savedTarget=target;       
	         target.style.cursor=htype;
	         dragOK=true;
	         dragXoffset=e.clientX-target.offsetLeft;
	         dragYoffset=e.clientY-target.offsetTop;
	         document.onmousemove=moveHandler;
	         document.onmouseup=cleanup;
	         return false;
	      }
		else {
			 hideCanvas;
	      }
	}

	//end drag handling
	
function GetNextStructuredSibling( objNode ){
		// Copyright Ben Nadel @ KinkySolutions.com 2006
		// Check for a valid starting node.
		if (objNode){
		
			// Travel down the sibling chain looking for a non-text node.
			for ( 
				objNode = objNode.nextSibling ;
				(
					objNode && 
					objNode.nodeType == 3
				) ;
				objNode = objNode.nextSibling
				){
				// Nothing has to happen here. The FOR loop itself is taking care
				// of the node traversing. We don't have to really worry about any
				// error checking as we can't really make it outside of HTML DOM
				// elements without hitting a structured node, or coming up with NULL.
			}
			
		}
				
		
		// Return the sibling node.
		
		if (!objNode) return (objNode);
		if (objNode.nodeName=="SCRIPT") return;
		if ((objNode.nodeName=='WCIECanvas') || (objNode.nodeName=='WCCanvas')) return;
		
		return( objNode );
	}
	
	function GetPreviousStructuredSibling( objNode ){

	// Travel up the sibling chain looking for a non-text node.
	for (
		objNode = objNode.previousSibling ;
		(
			objNode &&
			objNode.nodeType == 3
		) ;
		objNode = objNode.previousSibling
		){
	// Nothing has to happen here. The FOR loop itself is taking care
	// of the node traversing. We don't have to really worry about any
	// error checking as we can't really make it outside of HTML DOM
	// elements without hitting a structured node, or coming up with NULL.
	}

	// Return the sibling node.
	return( objNode );

	}

	function GetFirstStructuredChild( theElement ){
		
		// var nodeChildren=theElement.children;
		var nodeChildren=theElement.childNodes;
		
		if(!nodeChildren) return theElement;
		//if it's the head, return the body
		
		if (theElement.nodeName=='HTML') return document.body;
		
		for (var i = 0; i < nodeChildren.length; i++)
		   {
		   	   var aChild=nodeChildren[i];
			   if (aChild.nodeName!=="#text") {
					break;
		   		}
			}
		
		if(!aChild) return theElement;	
		if (aChild.nodeName=="SCRIPT") return theElement;
		if (aChild.nodeName=="#text") return theElement;
		
		return aChild;
	}
	
	function scrollToElement(theElement){
// http://radio.javaranch.com/pascarello/2005/01/09/1105293729000.html
	
	whereIs=getElementOffsetLocation(theElement);
	elementTop=whereIs[1];
    elementLeft=whereIs[0];
	elementHeight=theElement.offsetHeight
	
	if (elementTop>getClientHeight()+getScrollXY()[1] || elementTop+elementHeight<getScrollXY()[1])
	 window.scrollTo(0,elementTop-(getClientHeight()/2));

	}	


function welcomeToXRAY(){
	var theHUD = document.getElementById("XRAYHUD");
	var newHUDContent	
	newHUDContent= '<div class="elementInfo">';
	newHUDContent= newHUDContent+'<span class="XRAYclosebox"></span>';
	newHUDContent= newHUDContent+'<p class="XRAYtitlebar">Rayos-X</p>';
	newHUDContent= newHUDContent+'<p><strong>Bienvenido a Rayos-X</strong></p>'

	newHUDContent= newHUDContent+'</div>';
	
	newHUDContent= newHUDContent+'<p>Hacer clic en cualquier elemento de la página para activar Rayos-X.</p>'
	newHUDContent= newHUDContent+'<p>Clickear en el cuadro Cerrar, para recargar la pagina y salir de Rayos-X.</p>'
	
	newHUDContent= newHUDContent +'<div id="XRAYabout">';
	newHUDContent= newHUDContent+'<p><a href="http://westciv.com/xray/" class=' +'"XRAYdetailedLink"'+' onmousedown=' +"return true" +'>Saber mas de Rayos-X (v 1.0)</a></p>';
	newHUDContent= newHUDContent+'</div>';
	theHUD.innerHTML=newHUDContent;
	
	placeHUD(window.innerHeight/2-theHUD.offsetHeight/2, window.innerWidth/2);
		
}	

function addCSS (){

	if (isSafari2()) {
		var theHead = document.getElementsByTagName('head');
		var theCSS=document.createElement('link');
		theCSS.type = 'text/css';
		theCSS.rel='stylesheet';
		theCSS.href='http://westciv.com/xray/xraysf2.css';
		
		var theCSS = theHead[0].appendChild(theCSS);
	}
	else if (!supportsCanvas()) {

		var theHead = document.getElementsByTagName('head');
		var theCSS = theHead[0].appendChild(document.createElement('link'));
		theCSS.type = 'text/css';
		theCSS.rel='stylesheet';
		theCSS.href='http://westciv.com/xray/xraywin.css';
	}
	
	else {
		var theHead = document.getElementsByTagName('head');
		var theCSS=document.createElement('link');
		theCSS.type = 'text/css';
		theCSS.rel='stylesheet';
		theCSS.href='http://westciv.com/xray/xraycore.css';
		var theCSS = theHead[0].appendChild(theCSS);
		
	}
	
}

function showDetails() {
	document.navigate("http://westciv.com");
}

function documentScrolled(){
	//called by the scroll event on the document
	if (isSafari2()) hideCanvas();
	
}

function windowResized(){
	//called by the resize event on the document
	hideCanvas();
}


function keyPressed(e){
	//called by the onkeypress event on the document

	var keythatwaspressed;
		
	if (window.event) keythatwaspressed = window.event.keyCode;
	else if (e) keythatwaspressed = e.which;
	
	//alert(keythatwaspressed);
			
	switch (keythatwaspressed){
		case 38: //up
				
			if (currentPatient.parentNode){
				while (currentPatient.parentNode.nodeName == '#text'){
					currentPatient = currentPatient.parentNode;
				}
				
				// alert(currentPatient.nodeName);
				
				if (!(currentPatient.nodeName=='HTML')){
					xRayElement(currentPatient.parentNode);
				}
				return false;	
			}
		
		break;
	
		case 37: //left
		
		if (GetPreviousStructuredSibling(currentPatient)) xRayElement(GetPreviousStructuredSibling(currentPatient));

		return false;
		
		break;
	
		case 39: //right		
		if (GetNextStructuredSibling(currentPatient)) xRayElement(GetNextStructuredSibling(currentPatient));
		
		return false;
		
		break;
	
		case 40: //down
		
		if (GetFirstStructuredChild(currentPatient)) xRayElement(GetFirstStructuredChild(currentPatient));
		
		return false;
		
		break;
	
	
		default : return true;
	}	
	
}

function giveLayout(obj){
	//if this is IE, and theposition of the element is relative, give it haslayout - otherwise, calculating offset location is wrong
	if (obj.currentStyle){ //do the hasLayout if it is relative
		if (obj.currentStyle.position=='relative') {
			obj.style.zoom='100%'
		}
	}
}

function getElementOffsetLocation(obj) {
//adapted from an example at quirksmode.org - a must read resource for javascript, DOM and all web development


	giveLayout(obj);
	
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			giveLayout(obj);
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	
	return [curleft,curtop];
}


function insertCanvas () {
	// inserts a canvas element to do the drawing

		var theCanvas = document.createElement('CANVAS');
		document.body.appendChild(theCanvas);
		theCanvas.id='WCcanvas';
		
		if (!isSafari2()) {
			//canvas is scaled in all browsers when it is resized using CSS, other than Safari 2
			//in safari 2, we set the width and hiieght to 100% using CSS
			//in all other browsers, we set the canvas width and geight tothe visible width and height of the canvas 
			theCanvas.width=getDocumentWidth();
			theCanvas.height=getDocumentHeight();	
		}
		
		else {
			theCanvas.width=getDocumentWidth();
			theCanvas.height=getDocumentHeight();				
		}

		theCanvas.onmousedown=hideCanvas;

		if (!supportsCanvas()) {
			//as there is no context for the canvas, we are using a browser that doesn't support the canvas element, so we use overlays instead
			insertOverlays();
		}

}

function insertHUD () {
	// inserts a div we use for reporting element information

	var theHUD = document.createElement('div');
	document.body.appendChild(theHUD);
	theHUD.id='XRAYHUD';
	setElementProperty(theHUD, "visibility", "visible" );

}

function insertLabels () {
	// inserts the divs we use for reporting element information

	var theLabel = document.createElement('div');
	document.body.appendChild(theLabel);
	theLabel.id='XRAYWidthLabel';
	theLabel.onmousedown=hideCanvas;
	
	var theLabel = document.createElement('div');
	document.body.appendChild(theLabel);
	theLabel.id='XRAYHeightLabel';
	theLabel.onmousedown=hideCanvas;
	
	var theLabel = document.createElement('div');
	document.body.appendChild(theLabel);
	theLabel.id='XRAYTopLeftLabel';
	theLabel.onmousedown=hideCanvas;

}


function insertOverlays () {
	// inserts the divs we use for overlaying for IE because we don't use canvas

	var theIECanvas = document.createElement('div');
	document.body.appendChild(theIECanvas);
	theIECanvas.id='WCIECanvas';
	theIECanvas.onmousedown=hideCanvas;
	//theIECanvas.innerHTML="<!-- -->"; //supposed to fix the min height problem for divs in IE


	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='pageOverlayTop';
	theOverlay.onmousedown=hideCanvas;
	theOverlay.innerHTML="<!-- -->"; //supposed to fix the min height problem for divs in IE
	
	
	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='pageOverlayLeft';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='pageOverlayBottom';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='pageOverlayRight';
	theOverlay.onmousedown=hideCanvas;
	
	
	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='marginOverlayTop';
	theOverlay.onmousedown=hideCanvas;
	
	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='marginOverlayLeft';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='marginOverlayBottom';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='marginOverlayRight';
	theOverlay.onmousedown=hideCanvas;
	
	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='paddingOverlayTop';
	theOverlay.onmousedown=hideCanvas;
	
	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='paddingOverlayLeft';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='paddingOverlayBottom';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	theIECanvas.appendChild(theOverlay);
	theOverlay.id='paddingOverlayRight';
	theOverlay.onmousedown=hideCanvas;

}


function insertOverlays1 () {
	// inserts the divs we use for overlaying for IE because we don't use canvas

	// var theIECanvas = document.createElement('div');
	// document.body.appendChild(theOverlay);
	// theIECanvas.id='WCIECanvas';
	// theIECanvas.onmousedown=hideCanvas;
	// theIECanvas.innerHTML="<!-- -->"; //supposed to fix the min height problem for divs in IE


	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='pageOverlayTop';
	theOverlay.onmousedown=hideCanvas;
	theOverlay.innerHTML="<!-- -->"; //supposed to fix the min height problem for divs in IE
	
	
	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='pageOverlayLeft';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='pageOverlayBottom';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='pageOverlayRight';
	theOverlay.onmousedown=hideCanvas;
	
	
	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='marginOverlayTop';
	theOverlay.onmousedown=hideCanvas;
	
	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='marginOverlayLeft';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='marginOverlayBottom';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='marginOverlayRight';
	theOverlay.onmousedown=hideCanvas;
	
	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='paddingOverlayTop';
	theOverlay.onmousedown=hideCanvas;
	
	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='paddingOverlayLeft';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='paddingOverlayBottom';
	theOverlay.onmousedown=hideCanvas;

	var theOverlay = document.createElement('div');
	document.body.appendChild(theOverlay);
	theOverlay.id='paddingOverlayRight';
	theOverlay.onmousedown=hideCanvas;

}

function getElement(elementId) {
	//get the element with the id, and if it doesn;t exist, inserrt it (a div)
	var theElement = document.getElementById(elementId);
	if (!theElement) {
		//alert(elementId);
		var theElement = document.createElement('div');
		document.body.appendChild(theElement);
		theElement.id=elementId;
		theElement.onmousedown=hideCanvas;
	}
	return theElement;
	
}


function deleteNodeByID(nodeId) {
	//delete the node with the given id, if it exists
	
	try {
		var theNode = document.getElementById(nodeId);
		if (theNode) {
			theNode.parentNode.removeChild(theNode);
		}
	}
	
	catch (err) {
		//alert(err.message);
	}
	
	
}

function showWidthLabel (theElement) {
	// inserts a div we use for reporting element information

	var theLabel = document.getElementById("XRAYWidthLabel");
	theLabel.style.visibility='visible';
	
	whereIs=getElementOffsetLocation(theElement);
	elementTop=whereIs[1];
    elementLeft=whereIs[0];
	elementTopMargin=parseInt(getElementProperty(theElement, 'margin-top'));
	elementBottomMargin=parseInt(getElementProperty(theElement, 'margin-bottom'));
	elementTopPadding=parseInt(getElementProperty(theElement, 'padding-top'));
	elementBottomPadding=parseInt(getElementProperty(theElement, 'padding-bottom'));
	
	elementVerticalSpace=elementTopMargin+elementBottomMargin+elementTopPadding+elementBottomPadding;
	elementBottom=theElement.offsetHeight+elementTop+10;//elementVerticalSpace+5;
	elementWidth=theElement.offsetWidth;

	//make sure that the label is showing
	var labelLeft=elementLeft+(elementWidth/2)-(theLabel.offsetWidth/2);
	var labelTop=elementBottom;
	
	if (labelLeft<0) labelLeft=60;
	if (labelLeft>window.innerWidth) labelLeft=window.innerWidth-theLabel.offsetWidth-10;
	
	if (labelTop<0) labelTop=10;
//	if (labelTop>window.innerHeight) labelTop=window.innerWidth-theLabel.offsetHeight-10;
	
	theLabel.style.left=labelLeft +'px';
	theLabel.style.top=labelTop+ 'px';
	
	// theLabel.style.top=+'px';
	// theLabel.style.left=+ 'px';

	theLabel.innerHTML=getElementProperty(theElement, 'width');
}

function showHeightLabel (theElement) {
	// show the heigth label for this element

	var theLabel = document.getElementById("XRAYHeightLabel");
	theLabel.style.visibility='visible';
	
	whereIs=getElementOffsetLocation(theElement);
	elementTop=whereIs[1];
    elementLeft=whereIs[0];
	elementLeftMargin=parseInt(getElementProperty(theElement, 'margin-left'));
	elementRightMargin=parseInt(getElementProperty(theElement, 'margin-right'));
	elementLeftPadding=parseInt(getElementProperty(theElement, 'padding-left'));
	elementRightPadding=parseInt(getElementProperty(theElement, 'padding-right'));
	
	elementHorizontalSpace=elementLeftMargin+elementRightMargin+elementLeftPadding+elementRightPadding;
	elementRight=theElement.offsetWidth+elementLeft+elementHorizontalSpace;
	elementHeight=theElement.offsetHeight;

	theLabel.innerHTML=getElementProperty(theElement, 'height');

	//make sure that the label is showing
	var labelLeft=elementLeft-(theLabel.offsetWidth)-10;
	var labelTop=elementTop+(elementHeight/2)-(theLabel.offsetHeight/2);
	if (labelLeft<0) labelLeft=10;
	if (labelLeft>window.innerWidth) labelLeft=window.innerWidth-theLabel.offsetWidth-10;
	
	if (labelTop<0) labelTop=10;
	//if (labelTop>window.innerHeight) labelTop=window.innerWidth-theLabel.offsetHeight-10;
	
	theLabel.style.left=labelLeft +'px';
	theLabel.style.top=labelTop+ 'px';

}

function showTopLeftLabel (theElement) {
	// show the topleft label for this element

	var theLabel = document.getElementById("XRAYTopLeftLabel");
	theLabel.style.visibility='visible';
	
	whereIs=getElementOffsetLocation(theElement);
	elementTop=whereIs[1];
    elementLeft=whereIs[0];
	elementLeftMargin=parseInt(getElementProperty(theElement, 'margin-left'));
	elementRightMargin=parseInt(getElementProperty(theElement, 'margin-right'));
	elementLeftPadding=parseInt(getElementProperty(theElement, 'padding-left'));
	elementRightPadding=parseInt(getElementProperty(theElement, 'padding-right'));
	
	elementHorizontalSpace=elementLeftMargin+elementRightMargin+elementLeftPadding+elementRightPadding;
	elementRight=theElement.offsetWidth+elementLeft+elementHorizontalSpace;
	elementHeight=theElement.offsetHeight;

	theLabel.innerHTML=elementTop + "px" + ", " + elementLeft + "px";

	//make sure that the label is showing
	var labelLeft=elementLeft-(theLabel.offsetWidth/2);
	var labelTop=elementTop-(theLabel.offsetHeight) -10;
	
	if (labelLeft<0) labelLeft=60;
	if (labelLeft>window.innerWidth) labelLeft=window.innerWidth-theLabel.offsetWidth-10;
	
	if (labelTop<0) labelTop=10;
	//if (labelTop>window.innerHeight) labelTop=window.innerWidth-theLabel.offsetHeight-10;
	
	theLabel.style.left=labelLeft +'px';
	theLabel.style.top=labelTop+ 'px';


	// theLabel.style.left= +'px';
	// theLabel.style.top=+ 'px';

}

function placeHUD(elementTop, elementLeft){
	//place the HUD relative to the element we are displaying inforrmation on
	
	var theHUD = document.getElementById("XRAYHUD");
	theHUD.style.visibility='visible';
	
	if (didDrag) return; //once dragged, don't position it
	
	// theHUD.style.position='fixed';
	setElementProperty(theHUD, 'top', elementTop);
	setElementProperty(theHUD, 'left', elementLeft);

}


function hideCanvas() {
	
	if (!supportsCanvas()) {
		hideOverlays();
	}
	else {
		var canvas = document.getElementById("WCcanvas");
 		canvas.style.visibility='hidden';
	}
	
	hideLabels();

}

function hideLabels() {
	var widthLabel = document.getElementById("XRAYWidthLabel");
 	widthLabel.style.visibility='hidden';

	var heightLabel = document.getElementById("XRAYHeightLabel");
 	heightLabel.style.visibility='hidden';

	var topLeftLabel = document.getElementById("XRAYTopLeftLabel");
 	topLeftLabel.style.visibility='hidden';
}

function hideOverlays() {
	var overlayElement = document.getElementById("WCIECanvas");
	 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("pageOverlayTop");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("pageOverlayLeft");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("pageOverlayBottom");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("pageOverlayRight");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("marginOverlayTop");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("marginOverlayLeft");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("marginOverlayBottom");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("marginOverlayRight");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("paddingOverlayTop");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("paddingOverlayLeft");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("paddingOverlayBottom");
 	overlayElement.style.visibility='hidden';

	var overlayElement = document.getElementById("paddingOverlayRight");
 	overlayElement.style.visibility='hidden';

}


function showCanvas() {
	var canvas = document.getElementById("WCcanvas");
 	//canvas.style.display='block';
	canvas.style.visibility='visible';

}

function hideHUD() {
	var theHUD = document.getElementById("XRAYHUD");
 	theHUD.style.visibility='hidden';
}

function showHUD() {
	var theHUD = document.getElementById("XRAYHUD");
 	theHUD.style.visibility='visible';

}

function inHUD(obj) {
	//is the element in the HUD element?
	
	if (obj.id=="XRAYHUD") return true;
	
//	alert(obj.parentNode);
	
	if (obj.parentNode) {
		while (obj = obj.parentNode) {
			if (obj.id=="XRAYHUD") return true;
		}
	}
}

function showElementDetails(theElement){
	//show details about the element in the HUD
	
	var theHUD = document.getElementById("XRAYHUD");
	var newHUDContent
	
	//alert();
	newHUDContent= '<div class="elementInfo">';
	newHUDContent= newHUDContent+'<span class="XRAYclosebox"></span>';
	newHUDContent= newHUDContent+'<p class="XRAYtitlebar">XRAY</p>';
	newHUDContent= newHUDContent+'<p><strong>Elemento:</strong> ' + (theElement.nodeName).toLowerCase() +'</p>';
	newHUDContent= newHUDContent+'<p><strong>Identificador:</strong> ' + (theElement.id) +'</p>';
	newHUDContent= newHUDContent+'<p><strong>clase:</strong> ' + (theElement.className) +'</p>';
	newHUDContent= newHUDContent+'</div>';
	
	
	newHUDContent= newHUDContent+'<div id="HUDHierarchy">';
	newHUDContent= newHUDContent+'<p><strong>Jerarquia de Herencia</strong> '+'</p>';
	newHUDContent= newHUDContent+'<p>'+ getElementHierarchy(theElement) +'</p>';
	newHUDContent= newHUDContent+'</div>';

	newHUDContent= newHUDContent+'<div class="group">';
	newHUDContent= newHUDContent+'<p><strong>Posicion:</strong> '+ getElementProperty(theElement, 'position') +'</p>';
	
	whereIs=getElementOffsetLocation(theElement);
	elementTop=whereIs[1];
    elementLeft=whereIs[0];
	
	
	// newHUDContent= newHUDContent+'<div class="groupRow">';
	
	newHUDContent= newHUDContent+'<ul>';
	newHUDContent= newHUDContent+'<li><strong>Sup: </strong> ' + getElementProperty(theElement, 'top')+ ' (' + elementTop +'px)</li>';
	newHUDContent= newHUDContent+'<li><strong>Izq: </strong>' + getElementProperty(theElement, 'left') + ' (' + elementLeft +'px)</li>';
	newHUDContent= newHUDContent+'<li><strong>Ancho: </strong>' + getElementProperty(theElement, 'width')+ ' (' + theElement.offsetWidth +'px)</li>';
	newHUDContent= newHUDContent+'<li><strong>Alto: </strong>' + getElementProperty(theElement, 'height')+ ' (' + theElement.offsetHeight +'px)</li>';
	
	newHUDContent= newHUDContent+'<li><strong>Flotante: </strong>' + getElementProperty(theElement, 'float')+'</li>';
	newHUDContent= newHUDContent+'</ul>';	
	newHUDContent= newHUDContent+'</div>';

	newHUDContent= newHUDContent+'<div class="group">';
	newHUDContent= newHUDContent+'<p><strong>borde</strong> '+'</p>';
	newHUDContent= newHUDContent+'<ul>';

	newHUDContent= newHUDContent+'<li><strong>Sup:</strong> ' + getBorderWidth(theElement, 'border-top')+ 'px</li>';
	newHUDContent= newHUDContent+'<li><strong>Der:</strong> ' + getBorderWidth(theElement, 'border-right')+'px</li>';
	newHUDContent= newHUDContent+'<li><strong>Fondo:</strong> ' + getBorderWidth(theElement, 'border-bottom')+'px</li>';
	newHUDContent= newHUDContent+'<li><strong>Izq:</strong> ' + getBorderWidth(theElement, 'border-left')+'px</li>';

	newHUDContent= newHUDContent+'</ul>';
	newHUDContent= newHUDContent+'</div>';
	
	// newHUDContent= newHUDContent+'</div>'; //end group row
	

	// newHUDContent= newHUDContent+'<div class="groupRow">';
	
	newHUDContent= newHUDContent+'<div class="group">';
	newHUDContent= newHUDContent+'<p><strong>margen</strong> '+'</p>';
	
	newHUDContent= newHUDContent+'<ul>';
	newHUDContent= newHUDContent+'<li><strong>Sup:</strong> ' + getElementProperty(theElement, 'margin-top')+'</li>';
	newHUDContent= newHUDContent+'<li><strong>Der:</strong> ' + getElementProperty(theElement, 'margin-right')+'</li>';
	newHUDContent= newHUDContent+'<li><strong>Fondo:</strong> ' + getElementProperty(theElement, 'margin-bottom')+'</li>';
	newHUDContent= newHUDContent+'<li><strong>Izq:</strong> ' + getElementProperty(theElement, 'margin-left')+'</li>';
	
	newHUDContent= newHUDContent+'</ul>';	
	newHUDContent= newHUDContent+'</div>';
	
	newHUDContent= newHUDContent+'<div class="group">';
	newHUDContent= newHUDContent+'<p><strong>Relleno</strong> '+'</p>';
	newHUDContent= newHUDContent+'<ul>';

	newHUDContent= newHUDContent+'<li><strong>Sup:</strong> ' + getElementProperty(theElement, 'padding-top')+'</li>';
	newHUDContent= newHUDContent+'<li><strong>Der:</strong> ' + getElementProperty(theElement, 'padding-right')+'</li>';
	newHUDContent= newHUDContent+'<li><strong>Fondo:</strong> ' + getElementProperty(theElement, 'padding-bottom')+'</li>';
	newHUDContent= newHUDContent+'<li><strong>Izq:</strong> ' + getElementProperty(theElement, 'padding-left')+'</li>';

	newHUDContent= newHUDContent+'</ul>';
	newHUDContent= newHUDContent+'</div>';

	// newHUDContent= newHUDContent+'</div>'; //end group row


	newHUDContent= newHUDContent +'<div id="XRAYabout">';
	newHUDContent= newHUDContent+'<p><a href="http://userscripts.org/users/99372/scripts" class=' +'"XRAYdetailedLink"'+' onmousedown=' +"return true" +'>Saber mas de Rayos-X (v 1.0)</a></p>';
	newHUDContent= newHUDContent+'</div>';
	theHUD.innerHTML=newHUDContent;
	
}

function getClientSize() {
	//http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
	var myWidth = 0, myHeight = 0;
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    myWidth = window.innerWidth;
	    myHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    myWidth = document.documentElement.clientWidth;
	    myHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    myWidth = document.body.clientWidth;
	    myHeight = document.body.clientHeight;
	  }
	return [myHeight, myWidth];	
	}
	

function getClientHeight(){
	//return the height of the display area

	theSize=getClientSize();
	theHeight=theSize[0];

	return theHeight
}

function getClientWidth(){
	//return the height of the display area
	
	theSize=getClientSize();
	theWidth=theSize[1];
    
	return theWidth
}

function getDocumentWidth() {
	if (document.body.scrollWidth)
		return document.body.scrollWidth;
	
	var w = document.documentElement.offsetWidth;
	
	if (window.scrollMaxX)
		w += window.scrollMaxX;
		return w;
}

function getDocumentHeight() {
	if (document.body.scrollHeight)
		return document.body.scrollHeight;
	
	return document.documentElement.offsetHeight;
}


function getScrollXY() {

//http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }

	return [scrOfX,scrOfY]
}


function getScrollX(){
	//return the current x scroll - now that the canvas is abosolute not fixed for all but Safari 2, we return 0,except for Safari 2
		
		
		if (isSafari2()) {
			return getScrollXY()[0]
		}
		else {
			return 0
		}
	
}

function getScrollY(){
		//return the current y scroll - now that the canvas is abosolute not fixed for all but Safari 2, we return 0,except for Safari 2
			
			if (isSafari2()) {
				return getScrollXY()[1]
			}
			else {
				return 0
			}
	}

function getIEPropertyName(thePropertyName){
	//IE properties have the form propertyName, as opposed to the property-name
	var newName="";
	if (thePropertyName.indexOf('-')!=0) {
		var parts = new Array();
		parts = thePropertyName.split('-');
	}
		
	newName=parts[0];
	for (var i = 1; i < parts.length; i++){
		nextPart=parts[i].substring(0, 1).toUpperCase();
		newName=newName+nextPart+parts[i].substring(1,parts[i].length)
	}
	
	if (newName=="float") newName='styleFloat'; //IE uses this fo rthe float property 
	return newName;
}

function setElementProperty (theElement, whichStyle, theValue) {
	// set the  value for the named property for the element to the given value
	//it's returned as a string so convert to an integer if you need to use it rather than display it
	//elementCSSDeclaration=document.defaultView.getComputedStyle(theElement,"");
    //

	if(!document.defaultView) {
		whichStyle=getIEPropertyName(whichStyle)
	}
	
	if (theElement.currentStyle) {

		theElement.style.whichStyle=theValue;
		
	}
	else if (window.getComputedStyle)
		theElement.style.setProperty(whichStyle, theValue, null);

}

function getElementProperty(theElement, whichStyle)
{
	//adapted from quirksmode.org
	
	//if IE, change format of property name
		
	
	if(!document.defaultView) {
		whichStyle=getIEPropertyName(whichStyle);
	}
	
	if (theElement.currentStyle){ //problem is that this is not computed, its th evalue set, so could be 'auto'
		// alert(whichStyle);
		var y = theElement.currentStyle[whichStyle];
	}
	else if (window.getComputedStyle) {
		var y = document.defaultView.getComputedStyle(theElement,null).getPropertyValue(whichStyle);
	}
	
	else {
		elementCSSDeclaration=document.defaultView.getComputedStyle(theElement,null);
	    y= elementCSSDeclaration.getPropertyValue(whichStyle);
	}
	
	return y;
}

function getBorderWidth(theElement, whichBorder){
	//with IE, the default border is medium, but if the style is none, then this should be 0
	
	if(supportsCanvas()) {
		return getIntegerValue(getElementProperty(theElement, whichBorder+"-width"));
	}
	//otherwise, it's IE, so we determine if that border has a style, and if it does, return the width, else 0
	
	//alert(getElementProperty(theElement, whichBorder+"-style"));
	
	 if(getElementProperty(theElement, whichBorder+"-style")=='none') {
		//alert(getElementProperty(theElement, whichBorder+"-width"));
		return 0;  //no style so any width is irrelevant
	}
	else{
		//alert(getElementProperty(theElement, whichBorder+"-width"));
		return getIntegerValue(getElementProperty(theElement, whichBorder+"-width"));
	}
	
	
}

function getElementHierarchy (theElement) {
	// return the inheritance hierarchy in the form parent<grandparent...<root
	//it's returned as a string so convert to an integer if you need to use it rather than display it
		var theHierarchy="";
		var i=0;
		theHierarchy=theElement.nodeName.toLowerCase();
		if (theElement.parentNode) {
			while ((theElement = theElement.parentNode) && (theElement.parentNode!=null))  {
				i++;
				//theHierarchy=theHierarchy+'&lt;'+ '<a href="#" onmousedown="xRayAncestor('+ i +')">'+theElement.nodeName.toLowerCase() +'</a>';
				theHierarchy= '<a href="#" onmousedown="xRayAncestor('+ i +')">'+theElement.nodeName.toLowerCase() +'</a>' +' &gt; '+ theHierarchy;
			}
		//alert(theHierarchy);			
		return theHierarchy;//.toLowerCase();
		}
	
}

function getIntegerValue(theVal) {
	//alert(theVal);

	//these are for the values of border widths. All but IE return an integer value - here we translate based on what IE does
	if (theVal=='thin') return 2;
	if (theVal=='medium') return 4;
	if (theVal=='thick') return 6;
	
	var newVal= theVal.substr(0, theVal.length-2).valueOf();
	
	if (isNaN(newVal)) {
		//alert(theVal);
		return 0;
	}
	else {
		return parseInt(newVal);
		}
}


function clearCanvas () {
	//delete it and reinsert it

	if (!supportsCanvas()) {
	hideOverlays()
	
	}	

	else {
		var canvas = document.getElementById("WCcanvas");
		canvas.parentNode.removeChild(canvas);
		insertCanvas();
	}


}

function eraseCanvas (elementTop, elementLeft, elementWidth, elementHeight) {
 var canvas = document.getElementById("WCcanvas");
 var ctx = canvas.getContext("2d");
ctx.clearRect(elementLeft, elementTop, elementWidth, elementHeight);

}

function draw(elementTop, elementLeft, elementWidth, elementHeight, fillColor) {
 var canvas = document.getElementById("WCcanvas");
 var ctx = canvas.getContext("2d");

 showCanvas();

 ctx.fillStyle = fillColor
 ctx.fillRect (elementLeft, elementTop, elementWidth, elementHeight);

//alert(elementLeft + " " +  elementTop  + " " +  elementWidth + " " +  elementHeight);

}


function drawWidthLine(theElement) {
	//draw the line to show the width of the content
	
	 var canvas = document.getElementById("WCcanvas");
	 var ctx = canvas.getContext("2d");

//assume it's already showing - called after draw - which shows the canvas

windowScrollX=getScrollX();
windowScrollY=getScrollY();

whereIs=getElementOffsetLocation(theElement);
elementTop=parseInt(whereIs[1])-windowScrollY;
elementLeft=parseInt(whereIs[0])-windowScrollX;
elementTopMargin=parseInt(getElementProperty(theElement, 'margin-top'));
elementBottomMargin=parseInt(getElementProperty(theElement, 'margin-bottom'));
elementTopPadding=parseInt(getElementProperty(theElement, 'padding-top'));
elementBottomPadding=parseInt(getElementProperty(theElement, 'padding-bottom'));
elementLeftPadding=parseInt(getElementProperty(theElement, 'padding-left'));
elementRightPadding=parseInt(getElementProperty(theElement, 'padding-right'));
elementVerticalSpace=elementBottomMargin+elementBottomPadding;

elementBottom=parseInt(theElement.offsetHeight)+elementTop+5;
elementWidth=parseInt(theElement.offsetWidth);

ctx.strokeColor='rgba(255,255,255,1)'

ctx.beginPath;
//do the line
ctx.moveTo(elementLeft+elementLeftPadding, elementBottom+2);
ctx.lineTo(elementLeft+elementWidth-elementRightPadding, elementBottom+2);

//now do the line limits

ctx.lineWidth=1;
ctx.moveTo(elementLeft+elementWidth-elementRightPadding, elementBottom-1);
ctx.lineTo(elementLeft+elementWidth-elementRightPadding, elementBottom+5);

ctx.moveTo(elementLeft+elementLeftPadding, elementBottom-1);
ctx.lineTo(elementLeft+elementLeftPadding, elementBottom+5);


ctx.stroke();
//alert(elementLeft+elementWidth);

ctx.closePath;	
	
}

function drawHeightLine(theElement) {
	//draw the line to show the height of the content
	
	 var canvas = document.getElementById("WCcanvas");
	 var ctx = canvas.getContext("2d");

//assume it's already showing - called after draw - which shows the canvas

windowScrollX=getScrollX();
windowScrollY=getScrollY();


whereIs=getElementOffsetLocation(theElement);
elementTop=parseInt(whereIs[1])-windowScrollY;
elementLeft=parseInt(whereIs[0])-windowScrollX;

elementLeftMargin=parseInt(getElementProperty(theElement, 'margin-left'));
elementRightMargin=parseInt(getElementProperty(theElement, 'margin-right'));
elementLeftPadding=parseInt(getElementProperty(theElement, 'padding-left'));
elementRightPadding=parseInt(getElementProperty(theElement, 'padding-right'));
elementTopPadding=parseInt(getElementProperty(theElement, 'padding-top'));
elementTopMargin=parseInt(getElementProperty(theElement, 'margin-top'));

//alert(elementTopPadding);

elementHorizontalSpace=elementLeftMargin+elementRightMargin+elementLeftPadding+elementRightPadding;
elementRight=parseInt(theElement.offsetWidth)+elementLeft+elementHorizontalSpace;
elementHeight=parseInt(theElement.offsetHeight);
//elementHeight=parseInt(getElementProperty(theElement, 'top'));
ctx.strokeColor='rgba(255,255,255,1)'

ctx.beginPath;
ctx.moveTo(elementLeft-elementRightMargin-5, elementTop+elementTopPadding);
ctx.lineTo(elementLeft-elementRightMargin-5, elementTop+elementHeight-elementBottomPadding);

ctx.moveTo(elementLeft-elementRightMargin-7, elementTop+elementTopPadding);
ctx.lineTo(elementLeft-elementRightMargin-3, elementTop+elementTopPadding);

ctx.moveTo(elementLeft-elementRightMargin-7, elementTop+elementHeight-elementBottomPadding);
ctx.lineTo(elementLeft-elementRightMargin-3, elementTop+elementHeight-elementBottomPadding);



ctx.stroke();
//alert(elementLeft+elementWidth);

ctx.closePath;	
	
}


function drawTopLeft(theElement) {
	//drawindicate where the top left is - it tricks people
	
var canvas = document.getElementById("WCcanvas");
var ctx = canvas.getContext("2d");

//assume it's already showing - called after draw - which shows the canvas

windowScrollX=getScrollX();
windowScrollY=getScrollY();

whereIs=getElementOffsetLocation(theElement);
elementTop=parseInt(whereIs[1])-windowScrollY;
elementLeft=parseInt(whereIs[0])-windowScrollX;

elementLeftMargin=parseInt(getElementProperty(theElement, 'margin-left'));
elementRightMargin=parseInt(getElementProperty(theElement, 'margin-right'));
elementLeftPadding=parseInt(getElementProperty(theElement, 'padding-left'));
elementRightPadding=parseInt(getElementProperty(theElement, 'padding-right'));
elementTopPadding=parseInt(getElementProperty(theElement, 'padding-top'));

elementHorizontalSpace=elementLeftMargin+elementRightMargin+elementLeftPadding+elementRightPadding;
elementRight=parseInt(theElement.offsetWidth)+elementLeft+elementHorizontalSpace;
elementHeight=parseInt(theElement.offsetHeight);

ctx.save();
ctx.strokeColor='rgba(255,0,0,1)'

ctx.beginPath;

ctx.arc(elementLeft, elementTop, 4, 0, (Math.PI*2), 1);

ctx.closePath();	
ctx.fill();

ctx.restore();	
}

function xRayElement(theElement) {
	// alert(theElement.nodeName);
	// alert(theElement.nodeName);	
	if(!theElement) return;
	
	//if not in sight, scroll to it
	
	currentPatient=theElement;
	drawElementSkeleton(theElement);
	showElementDetails(theElement);
	showWidthLabel(theElement);
	showHeightLabel(theElement);
	showTopLeftLabel(theElement);
	
	scrollToElement(theElement);
	
}

function xRayAncestor(ancestorIndex) {
	//show the details for the nth ancestor of the currently targetted element
	var ancestorNode;
	var i=0;
	
	if (currentPatient){
		ancestorNode=currentPatient;
		for (var i = 0; i < ancestorIndex; i++){
				ancestorNode = ancestorNode.parentNode;
		}
	}
		
	if (ancestorNode) {
		xRayElement(ancestorNode);
	}
}

function drawPageOverlay(elementTop, elementLeft, elementWidth, elementHeight, color){
	//for UE - this uses a div element to create the semi transparent overlay over all but the current element
	//we use four elements for this pageOverlayTop, pageOverlayLeft, pageOverlayBottom, pageOverlayRight
	
	
	IECanvas=getElement('WCIECanvas');
	IECanvas.style.visibility='visible';
	IECanvas.style.left='0px';
	IECanvas.style.top='0px';
	
	if (elementTop<0) elementTop=0;
	if (elementHeight<0) elementHeight=0;
	
	//alert(elementTop);
	
	if (elementTop>0) {
	
		topOverlay=getElement('pageOverlayTop');
		topOverlay.style.left='0px';
		topOverlay.style.top='0px';
		topOverlay.style.width=getClientWidth();
		topOverlay.style.height=elementTop + "px";
		topOverlay.style.visibility='visible';
		topOverlay.style.backgroundColor=color;
		topOverlay.style.fontSize=0;
		topOverlay.style.lineHeight=0;
	}
	
	
	if (getDocumentHeight()-(elementTop + elementHeight)>0) {
		var bottomHeight=getDocumentHeight()-(elementTop + elementHeight);	
	}
	else {
		bottomHeight=0;			
	}

	if (bottomHeight>0) {
		bottomOverlay=getElement('pageOverlayBottom');
		bottomOverlay.style.position='absolute';
		bottomOverlay.style.left='0px';	
		bottomOverlay.style.height=bottomHeight + 'px';
		bottomOverlay.style.top=elementHeight + elementTop+ "px";
		bottomOverlay.style.width=getClientWidth();	
		bottomOverlay.style.visibility='visible';
		bottomOverlay.style.backgroundColor=color;
		bottomOverlay.style.fontSize=0;
		bottomOverlay.style.lineHeight=0;
	}
	
	if (elementHeight>0 && elementLeft>0) {
	
		leftOverlay=getElement('pageOverlayLeft');
		leftOverlay.style.position='absolute';
		leftOverlay.style.left='0px';
		leftOverlay.style.top=elementTop + "px";
		leftOverlay.style.width=elementLeft + "px";
		leftOverlay.style.height=elementHeight + 'px';
		leftOverlay.style.visibility='visible';
		leftOverlay.style.backgroundColor=color;
		leftOverlay.style.fontSize=0;
		leftOverlay.style.lineHeight=0;

		rightOverlay=getElement('pageOverlayRight');
		rightOverlay.style.position='absolute';
		rightOverlay.style.left=elementLeft + elementWidth + 'px';
		rightOverlay.style.top=elementTop + "px";

		if ((getClientWidth()-elementWidth)>0) {
			var rightWidth=getClientWidth()-elementWidth + 'px';		
		}
	
		else {
			rightWidth=0;	
		
		}

		rightOverlay.style.width=rightWidth;	
		rightOverlay.style.height=elementHeight+ 'px'; // + elementTop + "px";
		rightOverlay.style.visibility='visible';
		rightOverlay.style.backgroundColor=color;
		rightOverlay.style.fontSize=0;
		rightOverlay.style.lineHeight=0;
	}
}


function drawTopMargin(elementTop, elementLeft, topMarginWidth, elementWidth, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (elementTop<0) elementTop=0;
	
	if (topMarginWidth<1) return;
	
	marginOverlay=getElement('marginOverlayTop');
	marginOverlay.style.left=elementLeft+'px';
	marginOverlay.style.top=elementTop+'px';
	marginOverlay.style.width=elementWidth+'px';
	marginOverlay.style.height=topMarginWidth + "px";
	marginOverlay.style.visibility='visible';
	marginOverlay.style.backgroundColor=color;
	marginOverlay.style.fontSize=0;
	marginOverlay.style.lineHeight=0;	

}

function drawBottomMargin(marginTop, marginLeft, bottomMarginWidth, elementWidth, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (marginTop<0) marginTop=0;
	
	if (bottomMarginWidth<1) return;
	
	marginOverlay=getElement('marginOverlayBottom');
	marginOverlay.style.left=marginLeft+'px';
	marginOverlay.style.top=marginTop+'px';
	marginOverlay.style.width=elementWidth+'px';
	marginOverlay.style.height=bottomMarginWidth + "px";
	marginOverlay.style.visibility='visible';
	marginOverlay.style.backgroundColor=color;
	marginOverlay.style.fontSize=0;
	marginOverlay.style.lineHeight=0;	

}


function drawLeftMargin(elementTop, elementLeft, leftMarginWidth, elementHeight, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (elementTop<0) elementTop=0;
	
	if (leftMarginWidth<1) return; //don't draw it if its tiny
	
	marginOverlay=getElement('marginOverlayLeft');
	marginOverlay.style.left=elementLeft+'px';
	marginOverlay.style.top=elementTop+'px';
	marginOverlay.style.width=leftMarginWidth+'px';
	marginOverlay.style.height=elementHeight + "px";
	marginOverlay.style.visibility='visible';
	marginOverlay.style.backgroundColor=color;
	marginOverlay.style.fontSize=0;
	marginOverlay.style.lineHeight=0;	

}


function drawRightMargin(marginTop, marginLeft, rightMarginWidth, elementHeight, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (marginTop<0) marginTop=0;
	
	if (rightMarginWidth<1) return; //don't draw it if its tiny
	
	marginOverlay=getElement('marginOverlayRight');
	marginOverlay.style.left=marginLeft+'px';
	marginOverlay.style.top=marginTop+'px';
	marginOverlay.style.width=rightMarginWidth+'px';
	marginOverlay.style.height=elementHeight + "px";
	marginOverlay.style.visibility='visible';
	marginOverlay.style.backgroundColor=color;
	marginOverlay.style.fontSize=0;
	marginOverlay.style.lineHeight=0;	

}



function drawTopPadding(paddingTop, paddingLeft, topPaddingWidth, elementWidth, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (paddingTop<0) paddingTop=0;
	
	if (topPaddingWidth<1) return;
	
	paddingOverlay=getElement('paddingOverlayTop');
	paddingOverlay.style.left=paddingLeft+'px';
	paddingOverlay.style.top=paddingTop+'px';
	paddingOverlay.style.width=elementWidth+'px';
	paddingOverlay.style.height=topPaddingWidth + "px";
	paddingOverlay.style.visibility='visible';
	paddingOverlay.style.backgroundColor=color;
	paddingOverlay.style.fontSize=0;
	paddingOverlay.style.lineHeight=0;	

	
}

function drawBottomPadding(paddingTop, paddingLeft, bottomPaddingWidth, elementWidth, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (paddingTop<0) paddingTop=0;
	
	if (bottomPaddingWidth<1) return;
	
	paddingOverlay=getElement('paddingOverlayBottom');
	paddingOverlay.style.left=paddingLeft+'px';
	paddingOverlay.style.top=paddingTop+'px';
	paddingOverlay.style.width=elementWidth+'px';
	paddingOverlay.style.height=bottomPaddingWidth + "px";
	paddingOverlay.style.visibility='visible';
	paddingOverlay.style.backgroundColor=color;
	paddingOverlay.style.fontSize=0;
	paddingOverlay.style.lineHeight=0;	

}


function drawLeftPadding(paddingTop, paddingLeft, leftPaddingWidth, elementHeight, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (paddingTop<0) elementTop=0;
	
	if (leftPaddingWidth<1) return; //don't draw it if its tiny
	
	paddingOverlay=getElement('paddingOverlayLeft');
	paddingOverlay.style.left=paddingLeft+'px';
	paddingOverlay.style.top=paddingTop+'px';
	paddingOverlay.style.width=leftPaddingWidth+'px';
	paddingOverlay.style.height=elementHeight + "px";
	paddingOverlay.style.visibility='visible';
	paddingOverlay.style.backgroundColor=color;
	paddingOverlay.style.fontSize=0;
	paddingOverlay.style.lineHeight=0;	

}

function drawRightPadding(paddingTop, paddingLeft, rightPaddingWidth, elementHeight, color){
	//for IE - this uses div elements to create the semi transparent overlay over all but the current element
	//we use four elements for this marginOverlayTop, marginOverlayLeft, marginOverlayBottom, marginOverlayRight
		
	if (paddingTop<0) paddingTop=0;
	
	if (rightPaddingWidth<1) return; //don't draw it if its tiny
	
	paddingOverlay=getElement('paddingOverlayRight');
	paddingOverlay.style.left=paddingLeft+'px';
	paddingOverlay.style.top=paddingTop+'px';
	paddingOverlay.style.width=rightPaddingWidth+'px';
	paddingOverlay.style.height=elementHeight + "px";
	paddingOverlay.style.visibility='visible';
	paddingOverlay.style.backgroundColor=color;
	paddingOverlay.style.fontSize=0;
	paddingOverlay.style.lineHeight=0;	

}

var currentPatient; //this is the element currently being xrayed

function xRayEvent(e) {
//xray the element - called by the click handler

if (!e) var e = window.event;
    if (e.target) var tg = e.target;
    else if (e.srcElement) var tg = e.srcElement;

    while (tg.nodeName == '#text'){
		tg = tg.parentNode;
	}
	
	if (tg.className=='XRAYclosebox'){ 
		uninstallXRAY();
		return false;
	}
	
	if (tg.className=='XRAYdetailedLink'){ 
		document.navigate("http://westciv.com");
		return true;
	}	
	
	if (inHUD(tg)) return false;
	
	xRayElement(tg);

	return false;
	
}

function drawElementSkeleton(theElement){
	//draws the 'skeleton' of the given element		
		
		whereIs=getElementOffsetLocation(theElement);		
		
		elementTop=parseInt(whereIs[1]);
	    elementLeft=parseInt(whereIs[0]);

	    elementWidth=theElement.offsetWidth.valueOf();
	    elementHeight=theElement.offsetHeight.valueOf(); 
	
	 	topPadding=getElementProperty(theElement,'padding-top');
		topPadding=getIntegerValue(topPadding);
				
		bottomPadding=getElementProperty(theElement,'padding-bottom');
		bottomPadding=getIntegerValue(bottomPadding);
		leftPadding=getElementProperty(theElement,'padding-left');
		leftPadding=getIntegerValue(leftPadding);
		rightPadding=getElementProperty(theElement,'padding-right');
		rightPadding=getIntegerValue(rightPadding);

	    topMargin=getElementProperty(theElement,'margin-top');
	    topMargin=getIntegerValue(topMargin);
	    bottomMargin=getElementProperty(theElement,'margin-bottom');
	    bottomMargin=getIntegerValue(bottomMargin);
	    leftMargin=getElementProperty(theElement,'margin-left');
	    leftMargin=getIntegerValue(leftMargin);
	    rightMargin=getElementProperty(theElement,'margin-right');
	    rightMargin=getIntegerValue(rightMargin);
		
		
		topBorder=getBorderWidth(theElement,'border-top');
		bottomBorder=getBorderWidth(theElement,'border-bottom');
		leftBorder=getBorderWidth(theElement,'border-left');
		rightBorder=getBorderWidth(theElement,'border-right');
		
		
		clearCanvas();


		windowScrollX=getScrollX();
		windowScrollY=getScrollY();
		
		if (supportsCanvas()) {
		//add opaque background
		//semi opaque the whole window- needs to adjust canvas width and scale for window without scrollbars
		
		draw(0,0,getDocumentWidth() ,getDocumentHeight(), 'rgba(0,0,0,.4)');

		//clear the area where the element is
		eraseCanvas(elementTop-topMargin-topBorder-windowScrollY, elementLeft-leftMargin-leftBorder-windowScrollX, elementWidth+leftMargin+rightMargin+leftBorder+rightBorder, elementHeight+ topMargin + bottomMargin+bottomBorder+topBorder);

		//draw the margin box
	   	draw(elementTop-topMargin-topBorder-windowScrollY, elementLeft-leftMargin-leftBorder, elementWidth+leftMargin+rightMargin+leftBorder+rightBorder, elementHeight+ topMargin + bottomMargin+bottomBorder+topBorder, 'rgba(0, 0, 255 , .4)');
	
		//draw the padding box
		draw(elementTop-windowScrollY, elementLeft-windowScrollX, elementWidth, elementHeight, 'rgba(255, 0, 0, .4)');

		//draw the content box
		eraseCanvas(elementTop+topPadding+topBorder-windowScrollY, elementLeft+leftPadding+leftBorder-windowScrollX, elementWidth-leftPadding-rightPadding-leftBorder-rightBorder, elementHeight-topPadding-bottomPadding-topBorder-bottomBorder);
		
		drawWidthLine(theElement);
		drawHeightLine(theElement);
		
	} //not ie
	
	else {
		//ie, so we use elements not the canvas
		//this overlays all but the element itself 

		var boxWidth=elementWidth+leftMargin+rightMargin; //element width includes padding
		var boxHeight=elementHeight+topMargin+bottomMargin; //element height includes padding
	
		drawPageOverlay(elementTop-topMargin, elementLeft-leftMargin, boxWidth, boxHeight, '#000');

		//draw the margin box	

		drawTopMargin(elementTop-topMargin, elementLeft-leftMargin, topMargin, boxWidth, '#00f');
		drawLeftMargin(elementTop, elementLeft-leftMargin, leftMargin, elementHeight, '#00f');
		drawBottomMargin(elementTop + elementHeight, elementLeft-leftMargin, bottomMargin, boxWidth, '#00f');
		drawRightMargin(elementTop, elementLeft+elementWidth, rightMargin, elementHeight, '#00f');
		
		//draw the padding box
		
		drawTopPadding(elementTop, elementLeft, topPadding, elementWidth, '#f00');
		drawLeftPadding(elementTop+topPadding, elementLeft, leftPadding, elementHeight-topPadding-bottomPadding, '#f00');
		drawBottomPadding(elementTop + elementHeight-bottomPadding, elementLeft, bottomPadding, elementWidth, '#f00');
		drawRightPadding(elementTop+topPadding, elementLeft+elementWidth-rightPadding, rightPadding, elementHeight-topPadding-bottomPadding, '#f00');
		
	}
		// placeHUD(window.innerHeight/2, window.innerWidth/2);
}

function uninstallXRAY(){
	//when the user closes the application, reove all the stuff, and event handlers
	
	document.onclick = null;
	document.onmouseup = null;
	document.onmousedown = null;
	document.onscroll = null;
	window.onresize = null;
	window.onkeydown= null;
	document.onkeydown = null;
	
	deleteNodeByID('XRAYHUD');
	deleteNodeByID('XRAYWidthLabel');
	deleteNodeByID('XRAYHeightLabel');	
	deleteNodeByID('XRAYTopLeftLabel');
	deleteNodeByID('WCcanvas');
	deleteNodeByID('XRAYjs');
	deleteNodeByID('JQjs');
	
	//need to do overlays
	
	deleteNodeByID('pageOverlayTop');
	deleteNodeByID('pageOverlayLeft');
	deleteNodeByID('pageOverlayBottom');
	deleteNodeByID('pageOverlayRight');
	
	deleteNodeByID('marginOverlayTop');
	deleteNodeByID('marginOverlayLeft');
	deleteNodeByID('marginOverlayBottom');
	deleteNodeByID('marginOverlayRight');

	deleteNodeByID('marginOverlayTop');
	deleteNodeByID('marginOverlayLeft');
	deleteNodeByID('marginOverlayBottom');
	deleteNodeByID('marginOverlayRight');
	
	deleteNodeByID('WCIECanvas');
	
}

function installXRAY() {

	//installs handlers for clicking
	//to do if page is not already loaded, install this as the clik handler then return

	addCSS();
	insertCanvas();
	insertHUD();
	insertLabels();
	
	welcomeToXRAY();

	document.onclick = xRayEvent;
	document.onmouseup = xRayEvent;
	document.onmousedown = dragHandler;
	document.onscroll = documentScrolled;
	window.onresize = windowResized;
	document.onkeydown= keyPressed;	
	
	var theHUD = document.getElementById("XRAYHUD");
	theHUD.onmousedown=dragHandler;
	
	deleteNodeByID('XRAYLoading')
	return;
	
	}
	
		
installXRAY();