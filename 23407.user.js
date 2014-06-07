//
// A simple dice rolling tool you can keep on the side.
//
// Special thanks to quirksmode.com, where the drag&drop code was taken from: 
// http://www.quirksmode.org/js/dragdrop.html
// 
// (The keyboard control had to be commented out due to some tricky event 
// handling that is not compatible with Greasemonkey. Perhaps it will come 
// in another release - or someone else will work it out.
//
// There were more changes to the code, and it has very likely lost the 
// intra-browser compatibility. Since this is designed for Firefox only, 
// it doesn't matter as much.)
//
// There's a lot of code waiting to be cleaned up, and it behaves funnily 
// with some movements (selecting and deselecting page text), but it does 
// what it is supposed to.
//

// ==UserScript==
// @name           Dice rolling device
// @namespace      http://www.strolen.com/
// @description    A simple tool for rolling dice.
// @include        http://www.strolen.com/*
// ==/UserScript==


// give it some style:

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
'div#roller {' +
'position:fixed;' +
'background-color: #D2B48C; border:3px solid #000000;' +
'left:-3px;' +
'padding:0px;' +
'position:absolute;' +
'top:15px;' +
'width:270px;' +
'cursor: default !important;'+
'z-index:200;' +
'}'+
'div#navbar {' +
'background-color: #C0C0C0; border:3px solid #000000;' +
'height:15px;' +
'left:10px;' +
'padding:0px;' +
'margin:0px;' +
'position:fixed;' +
'top:25px;' +
'width:270px;' +
'cursor: all-scroll !important;'+
'z-index:201;' +
'}'+
'div.dragged {'+
'cursor: all-scroll !important;'+
'border-color: #000080 !important;'+
'z-index: 300 !important;'+
'}'+
'a#forced {'+
'cursor: pointer !important;'+
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
	sideObject: undefined,
	
	initElement: function (element, side) {
		if (typeof element == 'string')
			element = document.getElementById(element);
                addEventSimple(element,'mousedown',dragDrop.startDragMouse);
		dragDrop.sideObject = side;

		//removeEventSimple(element.firstChild,'mousedown',dragDrop.startDragMouse);

                //addEventSimple(element,'mousedown',dragDrop.startDragMouse);

//alert(element.onMouseDown);
//		element.innerHTML += dragDrop.keyHTML;
//		var links = element.getElementsByTagName('a');
//		var lastLink = links[links.length-1];
//		lastLink.relatedElement = element;
//		addEventSimple(lastLink,'click', dragDrop.startDragKeys);
	},

	startDragMouse: function (e) {
		var evt = e || window.event;
		// make sure only the navbar serves for dragging
		var elem
		if (e.target) {
			elem = (e.target.nodeType == 3) ? e.target.parentNode : e.target;
		} else {
			elem = e.srcElement;
		}
		//if((elem.id != "navbar") && (elem.parentNode.id != "navbar")) return false;
		if(elem.id != "navbar") return false;

		dragDrop.startDrag(this);
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
//alert(obj.id);
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
		if (dragDrop.mainObject){
			dragDrop.mainObject.style.left = dragDrop.startX + dx + 'px';
			dragDrop.mainObject.style.top = dragDrop.startY + dy + 'px';
//			dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
//			dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
		}else{
			dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
			dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
		}
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

var roller = document.createElement("div");
roller.setAttribute("id", "roller");
//roller.setAttribute("name", "roller");

var navigator = document.createElement("div");
navigator.setAttribute("id", "navbar");
//navigator.innerHTML = "(+)"

var toggler = document.createElement("a");
toggler.setAttribute("id", "forced");
toggler.innerHTML = "(+)"
addEventSimple(toggler,'click', function () {
	var rollDiv = dragDrop.sideObject;
	var vis = rollDiv.style.display;
	if (vis=="none"){
		rollDiv.style.display="block";
	}else {
		rollDiv.style.display="none";
	}
}
);

//addEventSimple( navigator,'mousedown',dragDrop.startDragMouse);

//roller.appendChild(navigator);
navigator.appendChild(toggler);
//navigator.innerHTML += ' <span align="center">Rolling dice</span>';
navigator.appendChild(roller);


// the roller:

roller.innerHTML += '<form action="" name="xRollForm" id="xRollForm">'+
'<table align="center">'+
'<tr><td align="center">'+
'<br /><b>Basic dice:</b> <input type="text" name="times" value="1" size="2" maxlength="2">'+
'<select name="dice" id="diceselect">'+
'	<option value="4">d4</option>'+
'	<option value="6" SELECTED>d6</option>'+
'	<option value="8">d8</option>'+
'	<option value="10">d10</option>'+
'	<option value="20">d20</option>'+
'</select>'+
'&nbsp;+/- <input type="text" name="mod" id="modfield" value="0" size="2" maxlength="2">'+
'</td></tr>'+
'<tr><td>&nbsp;</td></tr>'+
'<tr><td align="center">'+
'<input type="button" id="rollsmallbt" value="Roll me" class="bigger">'+
'<input type="text" name="result" id="resultfield" size="5" maxlength="5" class="bigger">'+
'</td></tr>'+
'<tr><td align="center"><hr></td></tr>'+
'<tr><td>'+
'<br /><b>Random roll:</b> invent a roll, say, 1d<input type="text" name="roller" value="100" size="5" maxlength="5">, <br />'+
'<input type="button" id="rollbigbt" value="...click..." class="bigger">'+
'and get <input type="text" name="result2" size="5" maxlength="5" class="bigger"> as the result.'+
'</td></tr>'+
'</table>'+
'</form>';


function roll(dice, ntimes, mod){
	sum = 0;
	for(i=0; i<ntimes; i++){
		sum = sum + Math.floor(Math.random()*(dice))+1;	// 1-dice interval
	}
	return sum + mod;
}


/*    oDiv=document.getElementById('elementId');

function isDecendant(decendant,ancestor){
    return ((decendant.parentNode==ancestor)  ||
        (decendant.parentNode!=document) &&
            isDecendant(decendant.parentNode,ancestor));
}

if(oDiv && isDecendant(oDiv, oAncestor)){
    //  do something with oDiv
}*/


function getForm(){
    flen = document.forms.length;
    for (var i = 0; i < flen; i++) {
        frm = document.forms[flen-i-1];  // go from the end
//        alert(frm.name);
        if( (frm.name == "xRollForm") && (frm.id == "xRollForm") )
            return frm;
    }alert("Not found!");
return;
/*    drs = document.getElementsByName('roller');
    for (var i = 0; i < drs.length; i++) {
        dr = drs[i];
//alert(dr.id);
//alert( dr.firstChild );
        if( dr.id == "roller")
            return dr.firstChild; // this must be it!
    }
    alert("Not found!");*/
}

function makeRoll(event){
    rollForm = getForm();
//    alert( rollForm.name );
    //dr = document.getElementById('roller');
    dice  = Math.round( rollForm.elements.namedItem("dice").value);
    times = Math.round( rollForm.elements.namedItem("times").value);
    mod   = Math.round( rollForm.elements.namedItem("mod").value);
    
    result = roll(dice, times, mod);

    //alert( result );//roll(6, 1, 0) );

    rollForm.elements.namedItem("result").value= result;
}

function randomRoller(){
    rollForm = getForm();
    dice = Math.round( rollForm.elements.namedItem("roller").value);
  
    result = roll(dice, 1, 0);
    rollForm.elements.namedItem("result2").value= result;
}

buttons = roller.getElementsByTagName('input');
for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].id == "rollsmallbt")
        addEventSimple(buttons[i],'click',makeRoll);

    if (buttons[i].id == "rollbigbt")
        addEventSimple(buttons[i],'click',randomRoller);
}

//----------------------

// finish:

//dragDrop.initElement(roller, navigator);

//dragDrop.initElement(roller);
dragDrop.initElement(navigator, roller);

//document.body.appendChild(roller);
document.body.appendChild(navigator);
