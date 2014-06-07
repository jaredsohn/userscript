// ==UserScript==
// @name           Chive photo keyboard nav
// @namespace      chive
// @include        http://thechive.com/*/*/*/*/
// ==/UserScript==

if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}

function onKeyPress(e)
{
	var chr = String.fromCharCode(e.charCode);
	var num = 0;
	
	switch(chr)
	{
		case 'j':
			num = currentPic == pictures.length - 1 ? pictures.length - 1 : currentPic + 1;
			break;
		case 'k':
			num = currentPic == 0 ? 0 : currentPic - 1;
			break;
	}
	
	gotoPic(num);
}

document.addEventListener('keypress',onKeyPress,true);



var pictures = document.getElementsByClassName('gallery-item');
var currentPic = 0;

gotoPic(0);

function gotoPic(num)
{
	var picTop = calcTotalOffset(pictures[num]);	
	window.scroll(0,picTop);
	currentPic = num;
}

function calcTotalOffset(node)
{
	var offset = node.offsetTop;
	
	while( node != document.body)
	{
		node = node.offsetParent;
		offset += node.offsetTop;
	}
	
	return offset;
}