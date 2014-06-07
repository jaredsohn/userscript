// ==UserScript==
// @name        VDex Item Highlight
// @namespace   http://www.enbewe.de/vdex
// @description Highlights Pokemon carrying an Item
// @include     http://vdexproject.net/pc.php?&mode=item*
// @version     0.1
// ==/UserScript==
(function(){
	
	var buttonAnchor = document.evaluate('//table[@id="login"]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var highlightDiv = document.createElement('div');
	highlightDiv.setAttribute('id','highlightDiv');
	highlightDiv.setAttribute('style','text-align: center; width: 950px; margin-left: auto; margin-right: auto;');
	var highlightSmall = document.createElement('small');
	highlightSmall.innerHTML = '[ <span class="hlclickable">Highlight Pokemons with Items</span> ]';
	highlightSmall.addEventListener("click", function(){highlightMons();}, true);
	highlightDiv.appendChild(highlightSmall);
	buttonAnchor.parentNode.insertBefore(highlightDiv, buttonAnchor.nextSibling);
	
	function highlightMons() {
		var pokelist = document.evaluate('//td[@class="pcslot"][@onclick]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
		var itemRegExp = /'ITEM', '(\w+)'/;
	
		for (var i = pokelist.snapshotLength - 1; i >= 0; i--) {
			var elm = pokelist.snapshotItem(i);
			var onclickstring = elm.getAttribute('onClick');
			if (onclickstring.search(/pcConfirm/) >= 0) {
				itemRegExp.exec(onclickstring);
				if(RegExp.$1 != 'none'){
					elm.style.backgroundColor = '#FFCACA';
				}
			}		
		}
	}
})();