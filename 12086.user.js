// ==UserScript==
// @name          Quote - Quote replies
// @namespace     http://www.happycode.it
// @description   Quote replies with a >
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==



function newNode(type) {
	return unsafeWindow.document.createElement(type);
}

function getNode(id) {
	return unsafeWindow.document.getElementById(id);
}
function askWhich() {
	insertSignature();
}

var sep                 = newNode('div');
sep.innerHTML           = '';

var navSigLink       = newNode('div');
navSigLink.className = 'nl';
navSigLink.innerHTML = '<span id=navSigLink class=lk><font size=-1><b>Quote reply</b></font></span>';
navSigLink.addEventListener('click', askWhich, false);  

GM_setValue('allow_html', true);

var sigNode = getNode('msgs');
if (sigNode) {
	sigNode.insertBefore(sep, sigNode.lastChild);
	sigNode.insertBefore(navSigLink, sigNode.lastChild);
} else {
	var sigNode = getNode('sb_compose');
	if (sigNode) {
		sigNode.insertBefore(sep, sigNode.firstChild.nextSibling);
		sigNode.insertBefore(navSigLink, sigNode.firstChild.nextSibling);
	}
}

function insertSignature() { 
	var txtBox = getNode('hc_compose'); 
	if (txtBox) {
		txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML + '<br />' + s_html; 
	} else {
		for (var nodeId = 0; nodeId < 30 && !txtBox; nodeId++) { 
			txtBox = getNode('hc_' + String(nodeId)); } 
			if (txtBox) {
			var start = txtBox.contentDocument.body.innerHTML.indexOf("padding-left: 1ex;");
			var stop = txtBox.contentDocument.body.innerHTML.indexOf("</blockquote>");
			if ((start != -1) || (stop != -1)) {
			var quote = txtBox.contentDocument.body.innerHTML.substring(start+20,stop);
			quote = '>' + quote.replace(/<br>/g,'<br>>');
                        var prova = getNode('mb_2'); 
			txtBox.contentDocument.body.innerHTML = quote;
			}
		}
	}
}
