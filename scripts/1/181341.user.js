// ==UserScript==
// @name           show_html_comments
// @namespace      show_html_comments
// @description    Display unique HTML comments at the bottom of the page
// @include	http://*.*/*
// @include	https://*.*/*
// @include	file://*
// @exclude	http://*.*/*.pdf
// @exclude	https://*.*/*.pdf
// @exclude	https://www.inoreader.com/
// @exclude	http://bugs.python.org/*
// @exclude	http://www.python.org/*
// @exclude	http://pypi.python.org/*
// @exclude	https://pypi.python.org/*
// @exclude	http://planetmath.org/*
// @exclude	http://dictionary.die.net/*
// @exclude	http://jsbin.com/*
// @exclude	http://grepcode.com/*
// @exclude	https://github.com/*
// @exclude	http://www.open-zfs.org/*
// @exclude	http://www.supermicro.com/*
// @exclude	https://www.inoreader.com/*
// @exclude	http://www.codinghorror.com/*
// @version        0.3
// ==/UserScript==


var startsWith = function(str, prefix) {
	return str.lastIndexOf(prefix, 0) == 0;
};

var getPosition = function(element) {
	var xPosition = 0;
	var yPosition = 0;
	 
	while(element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;

	}
	return {x: xPosition, y: yPosition};
};

var alreadySeen = {};

var wantComment = function(text) {
	// TODO: turn this into a regexp
	if(
		   text == 'IE6sux'
		|| text == ''
		|| text == '<![endif]'
		|| text == ' Extra divs, for stylesheet developers to add imagery '
		|| text == ' Quantcast Tag '
		|| text == '<!-- .reply -->'
		|| text == '<!-- #comment-## -->'
		|| text == '<!-- .children -->'
		|| text == '<!-- .comment-author .vcard -->'
		|| text == '<!-- .comment-meta .commentmetadata -->'
		|| startsWith(text, '?xml version="1.0" encoding=')
		|| startsWith(text, '[if IE ')
		|| startsWith(text, '[if IE]')
		|| startsWith(text, '[if lt IE ')
		|| startsWith(text, '[if lte IE ')
		|| startsWith(text, '[if gt IE ')
		|| startsWith(text, '[if gte IE ')
		|| startsWith(text, '[if (gte IE ')
	) {
		return false;
	}
	if(alreadySeen[text] === undefined) {
		alreadySeen[text] = true;
		return true;
	} else {
		return false;
	}
};

var getComments = function() {
	var comments = document.evaluate("//comment()", document, null, 6, null);
	var filteredComments = [];
	for(var i=0; i < comments.snapshotLength; i++) {
		var text = comments.snapshotItem(i).data;
		if(wantComment(text)) {
			filteredComments.push(text);
		}
	}
	return filteredComments;
};

var makeControls = function(removeAll) {
	var controls = document.createElement('span');
	var removeLink = document.createElement('a');
	removeLink.style.fontSize = '14px';
	removeLink.style.fontFamily = 'Arial, sans-serif';
	// Set "javascript:" instead of "#", to make sure that nothing happens
	// when JavaScript fails.
	removeLink.href = "javascript:";
	removeLink.innerText = removeLink.textContent = 'Hide all <!-- comments -->';
	// Don't use .onclick =, because that doesn't work when NoScript is blocking JS
	removeLink.addEventListener('click', removeAll, true);
	controls.appendChild(removeLink);
	return controls;
};

var makeHr = function() {
	var hr = document.createElement("hr");
	hr.style.clear = 'both';
	hr.style.border = '0';
	hr.style.padding = '0';
	hr.style.margin = '0.25em 0 0.25em 0';
	hr.style.height = '1px';
	hr.style.color = '#ccc';
	hr.style.backgroundColor = '#ccc';
	hr.style.width = '100%';
	return hr;
};

var displayComments = function() {
	var comments = getComments();

	if(!comments.length) {
		return;
	}

	var div = document.createElement('div');
	div.style.padding = '0.5em';
	div.className = "userscript-html-comments";

	var removeAll = function() {
		document.body.removeChild(div);
		return false;
	};

	div.appendChild(makeHr());
	div.appendChild(makeControls(removeAll));

	for(var i=0; i < comments.length; i++) {
		div.appendChild(makeHr());
		var commentSpan = document.createElement('span');
		commentSpan.style.fontSize = '14px';
		commentSpan.style.fontFamily = 'Arial, sans-serif';
		commentSpan.style.whiteSpace = "pre-wrap";
		commentSpan.appendChild(document.createTextNode('<!--' + comments[i] + '-->'));
		div.appendChild(commentSpan);
	}

	// Also show the controls at the bottom as well
	div.appendChild(makeHr());
	div.appendChild(makeControls(removeAll));

	document.body.appendChild(div);

	// Some pages have absolute-positioned content, and we don't want our footer
	// to be positioned at (0, 0) and overlap with the content.  So, if the header
	// rendered near the top of the page, position it to the bottom.

	// Ugh, Firefox:
	// <ivan> according to Firefox an element rendered at the top of the page and overlapping absolute-positioned content is really 8000 pixels below
	// <ivan> oh great, apparently I have to wait a little while after document.body.appendChild(div); before accessing .offsetTop
	// setTimeout(function() {
	// 	GM_log("div position y: " + div.offsetTop);
	// 	if(div.offsetTop < 200) {
	// 		div.style.top = (document.body.clientHeight + div.clientHeight) + 'px';
	// 		div.style.position = "absolute";
	// 	}
	// }, 0);
}

displayComments();