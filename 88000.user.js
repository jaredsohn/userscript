// ==UserScript==
// @name           fitnesse-collapsed-color-changer
// @namespace      Dan Dudley
// @description    changes the color of a collapsed element based on if assertions passed, failed, or had an exception
// @include        http://*fitnesseResult*.html*
// @include        file://*fitnesseResult*.html*
// @include        http://*FrontPage*?suite*
// @include        http://*FrontPage*?test*
// @include        http://*FitNesse*?test*
// @include        http://*FitNesse*?suite*
// ==/UserScript==
	
	var collapseable = findAllCollapseableElements();
	for (var i=0;i<collapseable.length;i++) {
		var state = whatIsCurrentState(collapseable[i]);
		if (state != "nothing") {
			collapseable[i].className = state + " " + collapseable[i].className;
		}
	}
	
	function findAllCollapseableElements() {
		var classNames = ["setup", "collapse_rim", "included"];
		var collapseable = new Array();
		
		var divs = document.getElementsByTagName('div');
		for (var i=0;i<divs.length;i++) {
			for (var j=0;j<classNames.length;j++) {
				if (divs[i].className.indexOf(classNames[j]) != -1) {
					collapseable = collapseable.concat(divs[i]);
				}
			}
		}
		
		return collapseable;
	}
	
	function whatIsCurrentState(element) {
		var state = "nothing";
		for (var i=0;i<element.childNodes.length;i++) {
			if (element.childNodes[i].childNodes.length > 0) {
				var result =  whatIsCurrentState(element.childNodes[i]);
				if (result != "nothing" && state == "nothing") {
					state = result;
				}
			} else {
				var name = element.className;
				if (name == null) {
					name = "";
				}

				if (name == "error" || state == "error") {
					return "error";
				}
				
				if (name == "fail" && state != "error")  {
					state = "fail";
				} else if (name == "pass" && state != "fail") {
					state = "pass";
				}
				
			    console.log(name + " "+(name == "fail" && state != "error")+" -> "+state);
			}
		}
		return state;
	}