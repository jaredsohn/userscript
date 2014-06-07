// ==UserScript==
// @name           ExpertFlyer ClearRules
// @namespace      http://www.stud.ntnu.no/~aase/
// @description    Shows rules more clearly by showing newlines
// @include        https://www.expertflyer.com/air/fareRulesResults.do*
// ==/UserScript==

(function() {
	var e = document.getElementsByTagName('table');
	var first = true;
	for (var i = 0; i < e.length; i++) { 
		if (e[i].getAttribute('class') == "ibody") { 
			if (first) {
				first = false;
				continue;
			}
			else {
				var divs = e[i].getElementsByTagName('div');
				for (var j = 0; j < divs.length; j++) {
					divs[j].innerHTML = "<pre>" + divs[j].innerHTML + "</pre>";
				}
				break;	
			}
		} 
	}
})()