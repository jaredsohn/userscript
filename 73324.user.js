// ==UserScript==
// @name         Lib Drag for (Ikariam Lista de Links)
// @version	     1
// @namespace    HaShiShi
// @description  Biblioteca de funções para arratar os objetos de Ikariam Lista de Links
// ==/UserScript==

// ***************************************************************************
// ********** DRAG Windows ***************************************************
// ***************************************************************************
var _startX = 0;				// mouse starting positions var _startY = 0; 
var _offsetX = 0;				// current element offset var _offsetY = 0; 
var _dragElement;				// needs to be passed from OnMouseDown to OnMouseMove 
var _oldZIndex = 0;				// we temporarily increase the z-index during drag 
var nMarginDrag = 0;			// Margem para arrastar

function getParentDrag(oObj)
{
	while(oObj.tagName != "FAKEBODY" && oObj.tagName != "HTML" && oObj.className != "drag"){ oObj = oObj.parentNode; }
	return oObj;
}
function getParentDragTarget(oObj)
{
	while(oObj.tagName != "FAKEBODY" && oObj.tagName != "HTML" && oObj.className != "dragTarget"){ oObj = oObj.parentNode; }
	return oObj;
}

function OnMouseDown(e){
	// IE is retarded and doesn't pass the event object 
	if (e == null) 
		e = window.event;
	
	// IE uses srcElement, others use target 
	var target = e.target != null ? e.target : e.srcElement;
	
	if(target.className == 'noDrag'){return false;}
	
	target = getParentDrag(target);
	if(target.className!="drag"){return false;}
	
	target = getParentDragTarget(target);
	
	// for IE, left click == 1 
	// for Firefox, left click == 0 
	if ((e.button == 1 && window.event != null || e.button == 0) && target.className == 'dragTarget'){
		
		target.style.position = "absulute";
		
		// grab the mouse position 
		_startX = e.clientX; 
		_startY = e.clientY; 
		
		// grab the clicked element's position 
		_offsetX = ExtractNumber(target.style.left); 
		_offsetY = ExtractNumber(target.style.top); 
		
		// bring the clicked element to the front while it is being dragged 
		_oldZIndex = target.style.zIndex; 
		target.style.zIndex = 1000000; 
		
		// we need to access the element in OnMouseMove 
		_dragElement = target; 
		
		// tell our code to start moving the element with the mouse 
		addEvent(document, "mousemove", OnMouseMove);
		
		// cancel out any text selections
		document.body.focus();
		
		// prevent text selection in IE 
		addEvent(document, "selectstart", function () { return false; });
		
		// prevent IE from trying to drag an image 
		addEvent(document, "dragstart", function() { return false; });
		
		// prevent text selection (except IE) 
		return false;
	}
}

function OnMouseMove(e){
	if (e == null)
		var e = window.event;
	
	if (_dragElement){
		// fecha o menu de contexto
		if(getId("llContextMenu").style.display=="block"){llCloseWin("llContextMenu");}
	
		// this is the actual "drag code"
		
		var nTop = (_offsetY + e.clientY - _startY);
		var nLeft = (_offsetX + e.clientX - _startX);
		
		//getId('bugDebug').innerHTML = (nTop + _dragElement.offsetHeight + nMarginDrag) + " >= " + document.body.scrollHeight;
		
		if( nTop <= nMarginDrag){nTop = nMarginDrag;}
		if( (nTop + _dragElement.offsetHeight + nMarginDrag) >= document.body.scrollHeight ){nTop = (document.body.scrollHeight - _dragElement.offsetHeight - nMarginDrag);}
		
		if(nLeft <= nMarginDrag){nLeft = nMarginDrag;}
		if( (nLeft + _dragElement.offsetWidth + nMarginDrag) >= document.body.scrollWidth ){nLeft = (document.body.scrollWidth - _dragElement.offsetWidth - nMarginDrag);}
		
		_dragElement.style.top = nTop + 'px';
		_dragElement.style.left = nLeft + 'px';
	}
}
	
function OnMouseUp(e){
	//alert("up")
	if (_dragElement){
		
		_dragElement.style.position = "fixed";
		_dragElement.style.zIndex = _oldZIndex;
		
		// we're done with these events until the next OnMouseDown
		addEvent(document, "mousemove", function(){return false});
		addEvent(document, "selectstart", function(){return false});
		addEvent(_dragElement, "dragstart", function(){return false});
		
		// Guardando as coordenadas
		if(_dragElement.getAttribute("principal")){
			_offsetY = ExtractNumber(_dragElement.style.top);
			_offsetX = ExtractNumber(_dragElement.style.left);
			_sV(llJanPrincCoords, _offsetY + "," + _offsetX);
		}
		// this is how we know we're not dragging
		_dragElement = null;
	}
}

function InitDragDrop(){
	addEvent(document, "mousedown", OnMouseDown);
	addEvent(document, "mouseup", OnMouseUp);
}
// ***************************************************************************
// ***************************************************************************