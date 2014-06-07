// ==UserScript==
// @name           Gyminee Food Log
// @description    Places food log and calorie intake at top of the page
// @namespace      gyminee
// @include        http://www.gyminee.com/foods*
// ==/UserScript==


var divs = document.getElementById('content_area').getElementsByTagName("div");

var waterTrackerClass = "column one_third_right centered"
var waterTrackerText = "WaterTracker"

var youAteClass = "column two_of_three"
var youAteText = "You Ate"

var waterTracker = null;
var youAte = null;
var hrFound = false;

var firstChildren = [];

function floorChild(element) {
	var parent = element.parentNode;
	parent.removeChild(element);
	parent.appendChild(element);
}

for (var ii=0;ii<divs.length;ii++) {

	var divContent = divs.item(ii);
	
	if (divContent.hasAttribute && divContent.hasAttribute("class") && divContent.getAttribute("class") == "content" ) {
		
		for (var jj=0;jj<divContent.childNodes.length;jj++) {	
			var child = divContent.childNodes.item(jj);
			
			if (child.hasAttribute && child.hasAttribute("class")) {
			
				if(child.getAttribute("class") == waterTrackerClass && child.textContent.indexOf(waterTrackerText) != -1) {
					waterTracker = child;
				}
				if(child.getAttribute("class") == youAteClass && child.textContent.indexOf(youAteText) != -1 ) {
					youAte = child;
				}
			}
			
			if (!hrFound) {
				if (child.nodeName.toLowerCase() != "hr") {
					firstChildren.push(child);
				} else {
					floorChild(child);
					hrFound = true;
				}
			}
		}
	
	}
}

for (var ii=0;ii<firstChildren.length;ii++) floorChild(firstChildren[ii]);

if (waterTracker && youAte) {
	var waterTrackerChildren = [];
	for (var ii=0;ii<waterTracker.childNodes.length;ii++) waterTrackerChildren.push(waterTracker.childNodes.item(ii))
	
	var youAteChildren = [];
	for (var ii=0;ii<youAte.childNodes.length;ii++) youAteChildren.push(youAte.childNodes.item(ii))
	
	for (var ii=0;ii<waterTrackerChildren.length;ii++){
		waterTracker.removeChild(waterTrackerChildren[ii]);
		youAte.appendChild(waterTrackerChildren[ii]);
	}
	
	for (var ii=0;ii<youAteChildren.length;ii++){
		youAte.removeChild(youAteChildren[ii]);
		waterTracker.appendChild(youAteChildren[ii]);
	}
}

