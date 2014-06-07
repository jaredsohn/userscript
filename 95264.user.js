// ==UserScript==
// @name           spy attack
// @namespace      marshen
// @description    Creates a second attack button on the top of a espionage report.
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @author         marshen
// ==/UserScript==

(function() {

	function getElementsByClass (cName, domNode) {
		if (cName == undefined || cName.length == 0) return;
		if (domNode == undefined) domNode = document;
		
		if (domNode.getElementsByClassName)
			return domNode.getElementsByClassName(cName);
		
		// browser doesn't support getElementsByClassName
		cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
		var elements = domNode.getElementsByTagName('*');
		var res = new Array();
		for (var i = 0; i < elements.length; i++) {
			var className = " " + elements[i].className + " ";
			if (className.indexOf(cName) > -1) {
				res.push(elements[i]);
			}
		}
		
		return res;
	}

	var box = document.getElementById('messagebox');
	if (box) {
		// get attack button
		var attackButton = getElementsByClass('attack', box);
		
		if (attackButton.length > 0) {
			var spyTable = getElementsByClass('spy', box);
			
			if (spyTable.length > 0) {
				var newAttackButton = attackButton[0].cloneNode(true);
				newAttackButton.setAttribute('colspan', '6');
				newAttackButton.setAttribute('style', 'padding:0px 0px 5px');
				
				var newTR = document.createElement('tr');
				newTR.appendChild(newAttackButton);
				
				spyTable[0].appendChild(newTR);
			}
		}
		
		// get active info
		var activity = getElementsByClass('aktiv', box);
		
		if (activity.length > 0) {
			var info = activity[0].getElementsByTagName('tr');
			
			if (info.length > 1) {
				var text = info[1];
				info = info[1].getElementsByTagName('td');
				
				if (info.length > 0) {
					var head = getElementsByClass('area', activity[0]);
					info = info[0].getElementsByTagName('font');
					
					if (head.length) {
						if (info.length > 0) {
							head[0].firstChild.nodeValue += ": ";
							var activitySpan = document.createElement('span');
							activitySpan.setAttribute('style', 'color: red');
							activitySpan.appendChild(document.createTextNode(info[0].firstChild.nodeValue));
							
							head[0].appendChild(activitySpan);
						} else {
							head[0].firstChild.nodeValue += ": -";
						}
						
						text.parentNode.removeChild(text);
					}
				}
			}
		}
	}
	
})();