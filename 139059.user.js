// ==UserScript==
// @name Gmail DockBadge [Fluid.App] 
// @version 1.0
// @description Check unread count of Gmail and show on dock.
// @include     http://mail.google.com/*
// @include     http://*.google.com/mail/*
// @include     https://mail.google.com/*
// @include     https://*.google.com/mail/*
// ==/UserScript==

window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

function updateDockBadge() {
	var newBadge = '';

	// find canvas iframe
	var canvas = document.getElementById('canvas_frame');
	//console.log('canvas: ' + canvas);

	// get iframe document
	var doc = canvas.contentDocument;
	//console.log('canvas.contentDocument: ' + canvas.contentDocument);

	// loop thru anchor tags
	var anchorEls = doc.getElementsByTagName('a');
	//console.log('anchors: ' + anchorEls.length);

	var regex = /\s*(收件箱|Inbox)\s*\((\d+)\)[^\d]*/;
	for (var i = 0; i < anchorEls.length; i++) {
		var anchorEl = anchorEls[i];
		//console.log('anchorEl: '+ anchorEl);
		
		var text = '' + anchorEl.innerText;
		if (!text.length) continue;
		if (-1 == text.indexOf('(')) continue;
		var res = text.match(regex);
		if (res && res.length > 1) {
			//console.log('res: '+ res);
			newBadge = res[2];
			break;
		}
	}

	window.fluid.dockBadge = newBadge;
}