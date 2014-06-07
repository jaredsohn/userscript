// ==UserScript==
// @name           Google Voice - Delete All
// @namespace      twieder
// @version        1.0
// @description    Add a "Delete All" button to Google Voice
// @include        https://www.google.com/voice*
// @include        http://www.google.com/voice*
// @author         Todd Wieder
// @author         toddwieder@Yahoo.com
// ==/UserScript==

function cloneNode(node) {
	    // If the node is a text node, then re-create it rather than clone it
	    var clone = node.nodeType == 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);
	 	    // Recurse
	    var child = node.firstChild;
	    while(child) {
	        clone.appendChild(cloneNode(child));
	        child = child.nextSibling;
	    }
	 
	    return clone;
	}
function click(A) {
	//var B = document.createEvent("MouseEvents");
	//B.initEvent("click", true, true);
	//A.dispatchEvent(B);
	if (A.tagName=='INPUT') {
 A.click();
} else {
   if (document.createEvent) {
		       var evObj=document.createEvent('MouseEvents');
		          evObj.initEvent('mousedown',true,false);
		           A.dispatchEvent(evObj);
		          evObj.initEvent('mouseup',true,false);
		          A.dispatchEvent(evObj);
		       } else if (document.createEventObject) {
		         A.fireEvent('onmousedown');
		          A.fireEvent('onmouseup');
		        }
			};
}

function deleteAll() { 
	var main = document.getElementById('gc-view-main');
	var allElements = main.getElementsByTagName("*");
		for (i=0; i < allElements.length; i++){
			if (allElements[i].type == "checkbox") {
				click(allElements[i]);
				};
		};
    var deleteButton = document.getElementById('gc-inbox-delete-forever');
	click(deleteButton);
//	deleteButton.focus();
}

//if(unsafeWindow.console){
 //  var GM_log = unsafeWindow.console.log;
//}
window.addButton = function () {

	var existingButton = document.getElementById('gc-inbox-delete-forever');
	var targetDiv  = existingButton.parentNode;
	var newButton = document.createElement("div");
	newButton.className="goog-inline-block goog-button goog-button-base goog-button-base-collapse-left gc-inbox-hd-btn-right";
	newButton.style.marginLeft="0pt";
	newButton.role = "button";
	newButton.id = 'gc-inbox-delete-all';
	var lvl1 = document.createElement("div");
	var lvl2 = document.createElement("div");
	var lvl3 = document.createElement("div");
	var lvl4a = document.createElement("div");
	var lvl4b = document.createElement("div");
	lvl1.className="goog-inline-block goog-button-base-outer-box";
	lvl2.className="goog-inline-block goog-button-base-inner-box";
	lvl3.className="goog-button-base-pos";
	lvl4a.className="goog-button-base-top-shadow";
	lvl4b.className="goog-button-base-content";
	lvl4b.innerHTML='Delete All';
	lvl4a.innerHTML="&nbsp;";
	lvl3.appendChild(lvl4a);
	lvl3.appendChild(lvl4b);
	lvl2.appendChild(lvl3);
	lvl1.appendChild(lvl2);
	newButton.appendChild(lvl1);	
	newButton.addEventListener("click", deleteAll, true);
	targetDiv.appendChild(newButton);
}
addButton();
