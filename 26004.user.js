// ==UserScript==
// @name           GMail - Multi-row input boxes in Filter dialogue
// @namespace      Martin Ruiz
// @description    Multi-row input boxes in Filter dialogue
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
(function() {
window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
		try {
				GM_log('GMail loaded');
				window.setTimeout( function() { 
					try{
						main(gmail); 
					} catch(e) { alert(e); }
					},0);
		} catch(e) { alert(e); }
  });
}}, true);

function main(g) {	
	gmail = g;
	gmail.registerViewChangeCallback(resizeBoxes);	

	resizeBoxes();
	
function resizeBoxes() {
	if (gmail.getActiveViewType() != 's') {
		listen(false);
		return;
	}
	listen(true);
	return;
}

function doResize() {
	var boxes = getBoxes();
	if (boxes.length>1) return;
	var box = boxes[0];
	var mbox = gmail.getActiveViewElement().ownerDocument.createElement('textarea');
	mbox.rows = 15;
	mbox.id = box.id;
	mbox.tabindex = box.tabindex;
	mbox.value = box.defaultValue;
	mbox.style.width = '100%';
	mbox.style.fontFamily = 'monospace';
	mbox.style.fontSize = '14px';
	box.parentNode.replaceChild(mbox,box);
}

function getBoxes() {
	var boxes = [];
	var iterator;
	try {
		iterator = gmail.getActiveViewElement().ownerDocument.evaluate(
			".//input[contains(@type, 'text')]",
			gmail.getActiveViewElement().ownerDocument,
			null,
			XPathResult.ORDERED_NODE_ITERATOR_TYPE,
			null);
	} catch(e) { alert(e); return null; }
	for (var box = iterator.iterateNext(); box; box = iterator.iterateNext()) {
	GM_log(box.parentNode.parentNode.firstChild.textContent);
		if (box.parentNode.parentNode.firstChild.textContent=="Has the words:"){
			boxes.push(box);
		}
	}

	return boxes;
}

function listen(bool) {
			var root=gmail.getActiveViewElement();
			if (bool==true) {		
				root.ownerDocument.addEventListener("DOMNodeInserted", doResize, false); 		
			}
			if (bool==false) {
				root.ownerDocument.removeEventListener("DOMNodeInserted", doResize, false); 
			}}
}

})();