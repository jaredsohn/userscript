// ==UserScript==
// @name           anchor text selector
// @namespace      http://rerank.jp
// @author         Takehiro Yamamoto <tyamamot at dl.kuis.kyoto-u.ac.jp>
// @description    This script enables user to select some text from a link 
// @include        *
// ==/UserScript==

(function(){

X = 0;
Y = 0;

//thresholds
offsetX = 5;
offsetY = 3;
function removeAnchor(anchor){
	if (anchor && anchor.tagName && anchor.tagName.toLowerCase() == "a"
				&& anchor.getAttribute('href')) {
		anchorNode = anchor;
		anchorHref = anchor.getAttribute('href');
		anchor.removeAttribute('href');
		anchorNode.addEventListener("mousemove",onAnchorMove,true);
		anchorNode.addEventListener("click",onAnchorClick,true);
	}		
}

function restoreAnchor(){
	if(anchorNode){
		anchorNode.setAttribute("href",anchorHref);
		anchorNode.removeEventListener('mousemove',onAnchorMove,true);
		anchorNode = null;
		anchorHref = null;
	}
}

function onMouseDown(event){
	if(event.which != 1) return;
	var sel = window.getSelection().toString();
	if(sel && sel.length > 0){
		return;
	}
	var element = event.target;
	var anchor = getAnchorNode(element,0);
	if(anchor){
		removeAnchor(anchor)
	}
	X = event.screenX;
	Y = event.screenY;
}

function onAnchorMove(event){
	if(event.which != 1) return;
	restoreAnchor();
}

function onAnchorClick(event){
	if(event.which != 1) return;
	var sel = window.getSelection().toString();
	restoreAnchor();
	if(sel && sel.length > 0){
		moveX = Math.abs(event.screenX - X);
		moveY = Math.abs(event.screenY - Y);
		if(moveX > offsetX || moveY > offsetY){
			event.target.removeEventListener('click',onAnchorClick,true);
			event.preventDefault();
		}
	}
}

function getAnchorNode(element,depth){
	if (depth > 5) return null;
	if(element && element.tagName && element.tagName.toLowerCase() == "a"){
		return element;
	}
	if(element.parentNode){
		return getAnchorNode(element.parentNode,depth + 1);
	}
	else{
		return null;
	}
}


window.addEventListener('load', function(event){
	document.body.addEventListener('mousedown',onMouseDown,true);
},true);
}());