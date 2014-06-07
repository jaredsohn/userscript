// ==UserScript==
// @name			Custom title previewer
// @namespace			http://userscipts.org
// @description			Custom title previewer
// @include			http*://*what.cd/user.php?id=*
// ==/UserScript==
function $x() {
	var x = '';
	var node = document;
	var type = 0;
	var fix = true;
	var i = 0;
	var cur;
		
	function toArray(xp) {
		var final = [], next;
		while (next = xp.iterateNext()) {
			final.push(next);
		}
		return final;
	}
	
	while (cur = arguments[i++]) {
		switch (typeof cur) {
			case "string": x+=(x == '') ? cur : " | " + cur; continue;
			case "number": type = cur; continue;
			case "object": node = cur; continue;
			case "boolean": fix = cur; continue;
		}
	}
	
	if (fix) {
		if (type == 6) type = 4;
		if (type == 7) type = 5;
	}
	
	// selection mistake helper
	if (!/^\//.test(x)) x="//"+x;

	// context mistake helper
	if (node != document && !/^\./.test(x)) x = "."+x;

	var result = document.evaluate(x, node, null, type, null);
	if (fix) {
		// automatically return special type
		switch (type) {
			case 1: return result.numberValue;
			case 2: return result.stringValue;
			case 3: return result.booleanValue;
			case 8:
			case 9: return result.singleNodeValue;
		}
	}

	return fix ? toArray(result) : result;
}
function $x1(a) {
	return $x(a, XPathResult.FIRST_ORDERED_NODE_TYPE);
}

function createElement(type,attr) {
	var ele = document.createElement(type);
	var attr = attr.split('|');
	for (var e = 0; e < attr.length; e++) {
		if (attr[e].split('>>')[0] == 'innerHTML')
			ele.innerHTML = attr[e].split('>>')[1];
		else
			ele.setAttribute(attr[e].split('>>')[0],attr[e].split('>>')[1]);
	}
	return ele;
}
var userID = document.getElementsByClassName('username')[0].href.split('=')[1];

if (document.URL.match(/user\.php\?id/) && document.URL.match(userID)) {
	var target = $x1("//div[@class='main_column']/div[@class='box']/div[@class='head']/span[1]");
	target.setAttribute('class', 'target');

	var sidebar = document.querySelectorAll('div.linkbox')[0];
	sidebar.appendChild(document.createTextNode('['));
	sidebar.appendChild(createElement('a', 'innerHTML>>Custom Title|class>>custom|href>>javascript:void(0);'));
	sidebar.appendChild(document.createTextNode(']'));

	var span = createElement('span', 'style>>display: none;|class>>spanCT|id>>yy');

	span.appendChild(document.createElement('br'));
	span.appendChild(createElement('input', 'type>>text|class>>customValue'));
	span.appendChild(createElement('input', 'type>>text|class>>customValue2|style>>display:none;|value>>' + target.innerHTML));
	span.appendChild(createElement('input', 'type>>button|value>>Preview custom title|onclick>>document.querySelectorAll(".target")[0].innerHTML = "Profile - " + document.querySelectorAll(".customValue")[0].value;'));
	sidebar.appendChild(span);

	document.querySelectorAll('a.custom')[0].addEventListener('click', function() {
		var span = document.querySelectorAll('span.spanCT')[0];
		if (span.id == 'yy') {
			span.style.display = null;
			span.id = 'nn';
		}
		else if (span.id == 'nn') {
			span.style.display = 'none';
			document.querySelectorAll('.target')[0].innerHTML = document.querySelectorAll('input.customValue2')[0].value;
			span.id = 'yy';
		}

	}, false);
}