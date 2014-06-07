// ==UserScript==
// @name           YCArrows
// @namespace      http://www.redokapi.com
// @description    submits votes on YCNews without reloading the page
// @include        http://news.ycombinator.com/*
// ==/UserScript==
if (!GM_xmlhttpRequest) {
    alert('YCArrows requires version Greasemonkey 0.2.6 or later.');
    return;
}

function map(fn, seq) {
	var a = new Array(seq.length);
	for(var i = 0; i < seq.length; i++) {
		a[i] = fn(seq[i]);
	}
	return a;
}

function filter(fn, seq) {
	var a = new Array();
	for(var i = 0; i < seq.length; i++) {
		if(fn(seq[i])) {
			a.push(seq[i]);
		}
	}
	return a;
}

function onLoginPage(htmltext) {
	return (htmltext.search(/<b>Login<\/b>/) >= 0);
}

function blankArrows(center) {
	var img = document.createElement('img');
	img.src = 'http://ycombinator.com/images/s.gif';
	img.height = 1;
	img.width = 14;
	var ctag = document.createElement('center');
	ctag.appendChild(img);
	center.parentNode.replaceChild(ctag, center);
}

function parentOf(e, depth) {
	if(depth <= 1)
		return e.parentNode;
	else
		return parentOf(e.parentNode, depth-1);
}

function findPointsNode(img) {
	//comments style layout
	var tag = parentOf(img, 3).nextSibling.firstChild;
	if(tag.tagName.search(/span/i) >= 0)
		return tag.firstChild;
	
	//story style layout
	return parentOf(img, 4).nextSibling.childNodes[1].firstChild;
}

function votefn(img) {
	if(img.src.search(/graydown/) >= 0)
		return function(n) { return --n; };
	return function(n) { return ++n; };
}

function alterPoints(txtnode, alterfn) {
	var n = alterfn(parseInt(txtnode.data.match(/([+-]?[0-9]+) point/)[1]));
	var repltxt = (n == 1)?n + " point":n + " points";
	txtnode.data = txtnode.data.replace(/[+-]?[0-9]+ points?/, repltxt); 
}

var clickHandler = function(event) { 
	GM_xmlhttpRequest({
		method: 'GET',
		url: event.target.parentNode.href,
		onload: function(responseDetails) {
			if(onLoginPage(responseDetails.responseText)) {
				var link = document.getElementsByTagName('link')[0];
				link.parentNode.removeChild(link);
				document.getElementsByTagName('body')[0].innerHTML = 
					responseDetails.responseText.replace(/<\/?html>/g, '');
			} else {
				alterPoints(findPointsNode(event.target), votefn(event.target));
				blankArrows(event.target.parentNode.parentNode);
			}
		}
	});
	event.preventDefault();
};

var arrow_anchors = 
filter(function(a) {
	return (a.href && (a.href.search(/\/r\?.*/) >= 0)); 
}, document.getElementsByTagName('a'));

map(function(a) {
	a.addEventListener('click', clickHandler, true);
    }, arrow_anchors);