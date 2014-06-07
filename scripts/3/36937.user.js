// ==UserScript==
// @name           Reddit Floating Parent Comments
// @namespace      gcalpo
// @description    Shows a copy of parent comments directly above child comments.
// @include        http://www.reddit.com/*/comments/*
// ==/UserScript==

/*********************************************************************************/

var PARENT_BACKGROUND_COLOR = '#FFC';
var HOVER_BACKGROUND_COLOR = '#EEF';

var divs = document.getElementsByTagName('div');
var nrDivs = divs.length;
for (var i = 0; i < nrDivs; i++) {
	var div = divs[i];
	if (div.className.match('entry')) {
		AddMouseoverEvent(div);
	}
}
/*********************************************************************************/
function AddMouseoverEvent(div) {
	if(!div) return 0;
	div.addEventListener('mouseover', function(event) {
		showParentComment(this);
		event.cancelBubble = true;
	}, false);

	div.addEventListener('mouseout', function(event) {
		hideParentComments(this);
		event.cancelBubble = true;
	}, false);

}
/*********************************************************************************/
function showParentComment(div) {
	if (!div) return 0;
	var parentLink = getParentLink(div); // returns anchor object
	if (!parentLink) return 0; // get outta there
	var href = parentLink.href; 
	var parts = href.split('#');
	var inputValue = 't1_' + parts[1];
	
	// find the input tag whose *value* is this "t1_XXXXXXX"
	var inputObj = getInputByValue(inputValue);
	
	// its parent div whose class is "entry" is the div we want to clone
	var parentDiv = inputObj; // initialize
	parentDiv = parentDiv.parentNode;
	var bFoundParent = false;
	while (parentDiv.parentNode && !bFoundParent) {
		parentDiv = parentDiv.parentNode;
		if (parentDiv.className) {
			var divClass = parentDiv.className
			if (divClass.match('entry')) {
				bFoundParent = true;
			}
		}
	}
	
	if (!bFoundParent) parentDiv = null;
	
	var cloneDiv = parentDiv.cloneNode(true); // deep copy clone
	var insertedDiv = div.insertBefore(cloneDiv, div.firstChild);
	insertedDiv.style.position = 'absolute';
	insertedDiv.className += ' clonedComment';
	insertedDiv.style.backgroundColor = PARENT_BACKGROUND_COLOR;
	insertedDiv.style.border = '1px solid #000';
	div.style.backgroundColor = HOVER_BACKGROUND_COLOR;
	
	var newX = getLeftPosn(parentDiv) - 5;
	var newY = getTopPosn(div)  - parentDiv.clientHeight - 5; 
	insertedDiv.style.left = newX + 'px';
	insertedDiv.style.top = newY + 'px';
  }
/*********************************************************************************/
function getInputByValue(inputValue) {

	// returns "input" object whose value is inputValue
	var objInputs = document.getElementsByTagName('input');
	var nrInputs = objInputs.length;
	for (var i = 0; i < nrInputs; i++) {
		var objInput = objInputs[i];
		if (objInput.value == inputValue) {
			return objInput;
		}
	}
}
/*********************************************************************************/
function hideParentComments(thisDiv) {
	thisDiv.style.backgroundColor = '';
	var divs = document.getElementsByTagName('div');
	var nrDivs = divs.length;
	for (var i = 0; i < nrDivs; i++) {
		var div = divs[i];
		if (div && div.className.match('clonedComment')) {
			div.parentNode.removeChild(div);
		}
	}
}
/*********************************************************************************/
function getParentLink(div) {
	// recursively search inside div for a parent link
	var anchors = document.getElementsByTagName('a');
	var nrAnchors = anchors.length;
	for (var i = 0; i < nrAnchors; i++) {
		var a = anchors[i];
		if (a.innerHTML == 'parent' && isChildOf(a,div) ) {
			return a;
		}
	}
}
/*********************************************************************************/
function isChildOf(objTarget, objParent) {
	var objChild = objTarget;
	while (objChild.parentNode) {
		objChild = objChild.parentNode;
		if (objParent == objChild) return true;
	}
	return false;
}
/*********************************************************************************/
// Utility function to get the left position of an object
// credit to : http://userscripts.org/scripts/review/11558?format=txt
function getLeftPosn(object) {
   var leftPos = object.offsetLeft;

   while (object.offsetParent !== null) {
      object = object.offsetParent;
      leftPos += object.offsetLeft;
   }

   return leftPos;
}
/*********************************************************************************/
// Utility function to get the top position of an object
function getTopPosn(object) {
   var topPos = object.offsetTop;

   while (object.offsetParent !== null) {
      object = object.offsetParent;
      topPos += object.offsetTop;
   }

   return topPos;
}
/*********************************************************************************/
