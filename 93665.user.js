// ==UserScript==
// @name           All Numbers in Georgia Font
// @namespace      yijiang
// @description    All your numbers are belong to Georgia!
// @include        *
// @exclude        http://www.google.com/images*
// ==/UserScript==

(function(){
	var temp = document.createElement('div'),
	noParse = ['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA'],
	regex = /\d+/g;
	
	function dummyEvt (evt) {
		evt.stopPropagation();
	}

	function parseDOM(node){
		if(node.nodeType === 3 && node.data.match(regex)) {
			replaceData(node);
		} else if(node.nodeType === 1) {
			if(noParse.indexOf(node.nodeName) === -1) {
				var child = node.childNodes;
				node.normalize();
				
				for(var i = child.length - 1; i >= 0 ; i--) {
					parseDOM(child[i]);
				}
			} else {
				node.addEventListener('DOMNodeInserted', dummyEvt, false);
				node.addEventListener('DOMCharacterDataModified', dummyEvt, false);
			}
		}
	}
	
	function replaceData (textNode) {
		var parent = textNode.parentNode;
		temp.innerHTML = textNode.data.replace(regex, '<span class="gm_number">$&</span>');
		
		while (temp.firstChild) {
			parent.insertBefore(temp.firstChild, textNode);
		}
		
		parent.removeChild(textNode);
	}
	
	function processEvt (evt){
		if ((evt.target.className || evt.relatedNode.className) !== 'gm_number'){
			parseDOM(evt.target);
		}
	}
	
	parseDOM(document.body);
	
	document.body.addEventListener('DOMNodeInserted', processEvt, false);
	document.body.addEventListener('DOMCharacterDataModified', processEvt, false);
	
	var css = document.createElement('style');
	css.innerHTML = '.gm_number { font-family: Georgia !important; display: inline !important; }';
	document.getElementsByTagName('head')[0].appendChild(css);
})();