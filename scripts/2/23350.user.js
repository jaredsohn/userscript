//
// A simple drag&drop window to be included on a page, for testing purposes only.
//
// Special thanks to quirksmode.com, where most of the code was taken from: 
// http://www.quirksmode.org/js/dragdrop.html
// 
// (The keyboard control had to be commented out due to some tricky event 
// handling that is not compatible with Greasemonkey. Perhaps it will come 
// in another release - or someone else will work it out.)
//


//
// ==UserScript==

// @name           Drag and drop example.
// @namespace      http://www.strolen.com/

// @description    A little window fixed to a certain position on the screen, drag and drop supported.

// @include        *

// ==/UserScript==
//


// make some style:

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'div#dragger {' +
'position:fixed;' +
'top:220px;' +
'background-color: #FFFFFF; border:3px solid #000000;' +
'cursor:pointer;' +
'height:100px;' +
'left:0pt;' +
'padding:10px;' +
'position:fixed;' +
'top:100px;' +
'width:150px;' +
'z-index:200;' +
'}'+
'div.dragged {'+
'cursor: all-scroll !important;'+
'border-color: #cc0000 !important;'+
'z-index: 300 !important;'+
'}');

// eventful

function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}


// the dragDrop object

dragDrop = {
//	keyHTML: '<a href="#" class="keyLink">#</a>',
//	keySpeed: 10, // pixels per keypress event
	initialMouseX: undefined,
	initialMouseY: undefined,
	startX: undefined,
	startY: undefined,
//	dXKeys: undefined,
//	dYKeys: undefined,
	draggedObject: undefined,
	
	initElement: function (element) {
		if (typeof element == 'string')
			element = document.getElementById(element);
		//element.onMouseDown = dragDrop.startDragMouse;
                addEventSimple(element,'mousedown',dragDrop.startDragMouse);

//alert(element.onMouseDown);
//		element.innerHTML += dragDrop.keyHTML;
//		var links = element.getElementsByTagName('a');
//		var lastLink = links[links.length-1];
//		lastLink.relatedElement = element;
//		addEventSimple(lastLink,'click', dragDrop.startDragKeys);
	},

	startDragMouse: function (e) {
		dragDrop.startDrag(this);
		var evt = e || window.event;
		dragDrop.initialMouseX = evt.clientX;
		dragDrop.initialMouseY = evt.clientY;
		addEventSimple(document,'mousemove',dragDrop.dragMouse);
		addEventSimple(document,'mouseup',dragDrop.releaseElement);
		return false;
	},

/*	startDragKeys: function () {
		dragDrop.startDrag(this.relatedElement);
		dragDrop.dXKeys = dragDrop.dYKeys = 0;
		addEventSimple(document,'keydown',dragDrop.dragKeys);
		addEventSimple(document,'keypress',dragDrop.switchKeyEvents);
		this.blur();
		return false;
	},
*/
	startDrag: function (obj) {
		if (dragDrop.draggedObject)
			dragDrop.releaseElement();
		dragDrop.startX = obj.offsetLeft;
		dragDrop.startY = obj.offsetTop;
		dragDrop.draggedObject = obj;
		obj.className += ' dragged';
	},
	dragMouse: function (e) {
		var evt = e || window.event;
		var dX = evt.clientX - dragDrop.initialMouseX;
		var dY = evt.clientY - dragDrop.initialMouseY;
		dragDrop.setPosition(dX,dY);
		return false;
	},
/*	dragKeys: function(e) {
		var evt = e || window.event;
		var key = evt.keyCode;
		switch (key) {
			case 37:	// left
			case 63234:
				dragDrop.dXKeys -= dragDrop.keySpeed;
				break;
			case 38:	// up
			case 63232:
				dragDrop.dYKeys -= dragDrop.keySpeed;
				break;
			case 39:	// right
			case 63235:
				dragDrop.dXKeys += dragDrop.keySpeed;
				break;
			case 40:	// down
			case 63233:
				dragDrop.dYKeys += dragDrop.keySpeed;
				break;
			case 13: 	// enter
			case 27: 	// escape
				dragDrop.releaseElement();
				return false;
			default:
				return true;
		}
		dragDrop.setPosition(dragDrop.dXKeys,dragDrop.dYKeys);
		if (evt.preventDefault)
			evt.preventDefault();
		return false;
	},
*/
	setPosition: function (dx,dy) {
		dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
		dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
	},

/*	switchKeyEvents: function () {
		// for Opera and Safari 1.3
		removeEventSimple(document,'keydown',dragDrop.dragKeys);
		removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
		addEventSimple(document,'keypress',dragDrop.dragKeys);
	},
*/
	releaseElement: function() {
		removeEventSimple(document,'mousemove',dragDrop.dragMouse);
		removeEventSimple(document,'mouseup',dragDrop.releaseElement);
//		removeEventSimple(document,'keypress',dragDrop.dragKeys);
//		removeEventSimple(document,'keypress',dragDrop.switchKeyEvents);
//		removeEventSimple(document,'keydown',dragDrop.dragKeys);
		dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/dragged/,'');
		dragDrop.draggedObject = null;
	}
}


// now the window itself:

var dragger = document.createElement("div");
dragger.setAttribute("id", "dragger");
dragger.innerHTML = 'This is a drag and drop element with <code>position: fixed</code>, glued to your window wherever you leave it.'

dragDrop.initElement(dragger);

document.body.appendChild(dragger);
