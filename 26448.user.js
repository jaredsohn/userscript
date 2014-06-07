// ==UserScript==
// @name		MCL Quick Quotes
// @namespace	bravo/greasemonkey
// @description	Fix MCL quick quotes
// @include		http://mycoffeelounge.net/forum-replies.php*
// @include		http://*.mycoffeelounge.net/forum-replies.php*
// ==/UserScript==

function $i(id) {
	return document.getElementById(id);
}
function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $xo(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $xf(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function $ec(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes)
		if (attributes.hasOwnProperty(attr))
			node.setAttribute(attr, attributes[attr]);
	return node;
}
function $ed(element) {
	element.parentNode.removeChild(element);
}
function $el(newNode, par) {
	return par.appendChild(newNode);
}

$xu('//A[contains(@href,"cl-replies.php")]').forEach(function(lnk) {
	lnk.href=lnk.href.replace(/cl-replies.php/,'forum-replies.php');
});
function rangeText(range) {
	var div=$ec('DIV');
	$el(range.cloneContents(), div);
	var cont=true;
	while(cont) {
		cont=false;
		$xo('.//*', div).forEach(function(el) {
			switch(el.nodeName) {
			case 'BR':
			case 'IMG':
			case 'PARAM':
			case 'EMBED':
			case 'HR':
			case '#text':
				break;
			default:
				if(!el.childNodes.length) {
					$ed(el);
					cont=true;
				}
			}
		});
	}
	return div.textContent;
}
function nodeText(node) {
	var div=$ec('DIV');
	div.innerHTML = node.innerHTML;
	var cont=true;
	while(cont) {
		cont=false;
		$xo('.//*', div).forEach(function(el) {
			switch(el.nodeName) {
			case 'BR':
			case 'PARAM':
			case 'EMBED':
			case 'HR':
				break;
			default:
				if(!el.childNodes.length) {
					$ed(el);
					cont=true;
				}
			}
		});
	}
	while(div.firstChild.nodeName == '#text' || div.firstChild.nodeName == 'BR') $ed(div.firstChild);
	while(div.lastChild.nodeName == '#text' || div.firstChild.nodeName == 'BR') $ed(div.lastChild);
	return div.textContent;
}
$xu('//TD[@class="news"]/SPAN/button[text()="quote"]').forEach(function(b) {
	b.setAttribute('value', b.getAttribute('onclick'));
	b.setAttribute('onclick', null);
	b.addEventListener('click', function() {
		var buttonRow=b.parentNode.parentNode.parentNode;
		var postNode=$xf('./TD[2]', $i(buttonRow.id.replace(/^shot-rb/i, 'shot-ra')));
		var sel=window.getSelection();
		var text=nodeText(postNode);
		var theButton=b;
		if(sel.rangeCount) {
			var range=sel.getRangeAt(0);
			if(!range.collapsed) {
				text=rangeText(range);
				var parent=range.commonAncestorContainer;
				var root=parent;
				while(root && !
					(root.nodeName == 'TD' && root.className == 'news' && typeof(root.bgcolor) == 'undefined')) {
						root=root.parentNode;
					}
				if(root) {
					var t=$i(root.parentNode.id.replace(/^shot-ra/i, 'shot-rb'));
					if(buttonRow == t) {
						theButton = b;
					}
					else {
						theButton = $xf('./TD[2]/SPAN/button[text()="quote"]', t);
					}
				}
				else {
					text=null;
				}
			}
		}
		if(text) {
			var blah=theButton.getAttribute('value');
			blah=blah.substring(blah.indexOf('(')+1, blah.indexOf(')')).split(',');
			var topic=parseInt(blah[0].replace(/.*?(\d+).*?/, '$1'));
			var theid=parseInt(blah[2].replace(/.*?(\d+).*?/, '$1'));
			var theuser=blah[3].substring(1,blah[3].length-1);
			$i('body1').value += 
				'<a href="cl-replies.php?t=' + topic + 
				'&r=' + theid + 
				'#r' + theid + 
				'">[+ ' + unescape(theuser) + 
				' writes... +]</a>\n[" ' +
				text + ' "]\n\n';
			$i('body1').focus(); 
		}
	}, false);
});
