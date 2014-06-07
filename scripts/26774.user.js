// ==UserScript==
// @name            Travian Send to the home upraveno Cakenem
// @author          mikrop, upraveno Cakenem
// @include 		http://s*.travian.*/build.php
// @include 		http://s*.travian.*/build.php?id=*
// @include 		http://s*.travian.*/build.php?newdid=*&gid=*&id=*
// @include 		http://s*.travian.*/a2b.php
// @version         Latest version 1.2 upraveno Cakenem
// @description		        
// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function find(xpath, xpres) {
    var ret = document.evaluate(xpath, document, null, xpres, null);
    return (xpres) == XPFirst ? ret.singleNodeValue : ret;
}

(function() {

	var dName = find("//input[@name='dname']", XPFirst);
		dName.setAttribute('size', '20');

	var parentTd = dName.parentNode.style.textAlign = 'right';
	
	if (dName) {
		
		var elSel = window.document.createElement('select');
			elSel.setAttribute('class', 'fm');
			elSel.style.margin = '5px 0px 0px 5px';
			elSel.addEventListener('change', function(event) {
					
					var el = event.target;
					dName.value = el.value;

			}, false);

			elSel.appendChild(window.document.createElement('option'));

		var tr = find("//div[@id='lright1']/child::table/child::tbody/child::tr", XPList);
		if (tr.snapshotLength) {

			var elOpt, parentTr, elA = null;
	
			for (i = 0; i < tr.snapshotLength; i++) {

				elOpt = window.document.createElement('option');
				parentTr = tr.snapshotItem(i);
				elA = parentTr.firstChild.childNodes[2]; 
				elOpt.textContent = elA.textContent;
				elOpt.value = elA.textContent;
				
				if (elA.getAttribute('class') == 'active_vl') {
					elOpt.setAttribute('disabled', 'disabled');
				}
				
				elSel.appendChild(elOpt);
				
			}
			
		}

		dName.parentNode.insertBefore(elSel, dName.nextSibling);
		
	}

})();