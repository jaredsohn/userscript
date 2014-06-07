// ==UserScript==
// @name          Google Link Preview
// @namespace     http://loucypher.wordpress.com/
// @include       http*://www.google.*/search?*
// @include       http://www.google.*/custom?*
// @include       http://www.google.*/search%3F*
// @include       http://www.google.*/custom%3F*
// @include       http://www.google.com/blogsearch*
// @description	  Adds Clusty.com-like magnifiers on web and news search results to preview a link in a frame. hzhbest modded.
// @version        1.2
// ==/UserScript==

// Last updated: 2007-08-03
// hzhbest mod 2010.05.25 [http://userscripts.org/users/86496]

(function() {

var XPath;
//if (location.href.match(/\/blogsearch\?/)) {
//	XPath = "//a[starts-with(@id, 'p-') and count(img)=0]";
//} else {
	XPath = "//h3";
//}
var pOpen = 'data:image/gif;base64,R0lGODlhDAAMAMIGAKZZWatkYcqfjsyikM2mk9KumfLsyPLsyCH5BAEKAAcALAAAAAAMAAwAAAMneEcRpFCFokqIi8Ly4MWfhB1hFnGgZgkj4wjAMEZDPEO1fB%2F5zg8JADs%3D';
var pClosed = 'data:image/gif;base64,R0lGODlhDAAMAMIGAMwAAKtkYc2Tk8yikM2mk9KumQAAAAAAACH5BAEKAAcALAAAAAAMAAwAAAMyeEcRpFCFokqIix5xytvHtQHcJZDiKAQnR2gqCU1VizEsKWPtYEM%2F307BgfgGGMxgkAAAOw%3D%3D';
var hcls = document.evaluate(XPath, document, null, 6, null).snapshotItem(1).className; 
var clsC = hcls + ' _pClose';
var srm = 30; //screen right margin
if (!document.getElementById('_G_preview')) {
	var box = creaElemIn('div', document.body);
	box.setAttribute('style', 'display:none;');
	box.id = '_G_preview';
}

window.addEventListener('load', addpreview, false);
//window.addEventListener('AutoPagerize_DOMNodeInserted', function(e){addpreview(e, e.target)}, false);
window.addEventListener('DOMAttrModified', function(e){addpreview(e, e.target)}, false);

// Insert CSS
var headID = document.getElementsByTagName("head")[0];         
var cssNode = creaElemIn('style', headID);
cssNode.type = 'text/css';
cssNode.innerHTML = 'h3>a.sw{margin:0 5px 0 0;} h3>a.sw>img{border:1px solid #AACCFF;padding:3px;}  h3._pClose>a.sw{background:#FFAAAA;border:1px solid #FF7777;padding:0 10px;} h3._pClose>a.sw>img{border:0px solid #AACCFF;} h3._pClose>a._g_preview{background:#DDDDFF;border:1px solid #AACCFF} h3._pClose>a._g_preview{color:black !important;text-shadow:1px 1px 2px white;}';

function addpreview(e, node) {
	doc = node || document;

	var h3 = document.evaluate(XPath, doc, null, 6, null);
	if (!h3.snapshotLength) return;
	
	for (var i = 0; i < h3.snapshotLength; i++) {
		var links = h3.snapshotItem(i).getElementsByTagName('a');
		var link = links[links.length-1];
		if (link.className.indexOf(' _g_preview') != -1) continue;
		if (link.href.indexOf('http://maps.google.') == 0) continue;
		link.className += ' _g_preview';
		if (link.hasAttribute('onmousedown')) link.removeAttribute('onmousedown');

		var pLink = link.parentNode.insertBefore(document.createElement('a'), link);
		pLink.id = link.href;
		pLink.title = 'preview';
		pLink.className = 'sw';
		pLink.addEventListener('click', function(e) {
			e.preventDefault();
			s = (this.firstChild.src == pOpen) ? true : false;
			this.firstChild.src = (s)? pClosed : pOpen;
			this.title = (s)? 'close preview' : 'preview';
			this.parentNode.className = (s)? clsC : hcls;
			if (!s) {
				box.removeChild(box.firstChild);
				box.setAttribute('style', 'display:none;');
				return;
			}
			else {
				var iframe = creaElemIn('iframe', box);
				var h = window.innerHeight*.6, w = window.innerWidth*.8;
				var x = Math.min(getX(this), window.innerWidth - srm - w);
				var y = getY(this) + this.offsetHeight + 5;
				box.setAttribute('style', 'position:absolute;left:'+ x +'px;top:'+ y +'px;z-index:10000;width:'+ w +'px;height:'+ h +'px;border:1px solid #AACCFF;background:white;box-shadow:1px 1px 5px #888;');
				iframe.width = '100%';
				iframe.height = '100%';
				iframe.style.border = '0px solid black';
				iframe.appendChild(document.createTextNode(''));
				iframe.src = this.id;
			}
		}, false);

		var img = creaElemIn('img', pLink);
		img.alt = 'preview';
		img.align = 'absmiddle';
		img.src = pOpen;
		img.id = hcls;
	}
}


// Create an element
function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}

function getX(oElement) {
	var iReturnValue = 0;
	while (oElement != null) {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function getY(oElement) {
	var iReturnValue = 0;
	while (oElement != null) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

})();