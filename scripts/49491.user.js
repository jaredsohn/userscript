// ==UserScript==
// @name           Resize Elements
// @namespace      http://twoday.tuwien.ac.at/pub/
// @description    make elements resizeable through ctrl+click
// @include        *
// ==/UserScript==

var body = document.getElementsByTagName("body")[0];
var MIN_SIZE = 15;

function insertAfter(node,newNode) {
	if (node.nextSibling == null) {
		node.parentNode.appendChild(newNode);
	}
	else {
		node.parentNode.insertBefore(newNode,node.nextSibling);
	}
}

function getDim(node,dim) {
	var value = node['offset'+dim.substring(0,1).toUpperCase()+dim.substring(1)];
	if (value != 0) { return value; }

	value = node[dim];
	if (value != undefined) { return parseInt(value); }

	value = node.style[dim];
	if (/.*py$/.test(value)) { return parseInt(value); }
	if (/.*em$/.test(value)) { return parseInt(value) * 16; }
	return 0;
}

function addListener(grabber,nodes_to_resize) {
	var mouseDown = false;
	var moveX  = 0;
	var moveY  = 0;
	var width  = 0;
	var height = 0;
	var preserveAspect = false;

	for (var i = 0; i < nodes_to_resize.length; ++ i) {
		var node = nodes_to_resize[i];

		if (width  == 0) { width  = getDim(node, 'width');  }
		if (height == 0) { height = getDim(node, 'height'); }
	}

	var aspect = width / height;

	grabber.style.left=(width - 10) + "px";
	grabber.style.top="-10px";

	grabber.addEventListener("mousedown", function(e) {
		if (e.button == 0) {
			preserveAspect = e.ctrlKey;
			aspect = width / height;
			body.style.MozUserSelect="none";
			mouseDown = true;
			moveX = e.pageX;
			moveY = e.pageY;
			return false;
		}
		return true;
	}, true);

	window.addEventListener("mousemove", function(e) {
		if (e.button == 0 && mouseDown) {
			var newWidth  = width  + e.pageX - moveX;
			var newHeight = height + e.pageY - moveY;

			if (preserveAspect && aspect != (newWidth/newHeight)) {
				newHeight = Math.sqrt(newWidth*newHeight/aspect);
				newWidth  = newHeight * aspect;
			}

			if (newWidth >= MIN_SIZE) {
				grabber.style.left=(newWidth-10)+"px";
				for (var i = 0; i < nodes_to_resize.length; ++ i) {
					var node = nodes_to_resize[i];
					node.style.width = newWidth+"px";
					node.width = width = newWidth;
				}
				moveX = e.pageX;
			}

			if (newHeight >= MIN_SIZE) {
				for (var i = 0; i < nodes_to_resize.length; ++ i) {
					var node = nodes_to_resize[i];
					node.style.height = newHeight+"px";
					node.height = height = newHeight;
				}
				moveY = e.pageY;
			}

			return false;
		}
		return true;
	}, true);

	window.addEventListener("mouseup", function(e) {
		if (e.button == 0 && mouseDown) {
			body.style.MozUserSelect="text";
			mouseDown = false;
			return false;
		}
		return true;
	}, true);
}

function isResizeable(node) {
	return node.className.split(" ").indexOf("at-ac-tuwien-student-e0427417-made-resizeable") != -1;
}

function markResizeable(node) {
	node.className += " at-ac-tuwien-student-e0427417-made-resizeable";
}

function makeResizeable(node) {
	if (!isResizeable(node)) {
		var prev = node;
		var nodes_to_resize = [node];

		while (prev.parentNode != undefined && (prev.parentNode.tagName == "OBJECT" || prev.parentNode.tagName == "A")) {
			prev = prev.parentNode;
			nodes_to_resize.push(prev);
		}

		var grabber = document.createElement("div");
		
		grabber.style.width="15px";
		grabber.style.height="15px";
		grabber.style.borderStyle="solid";
		grabber.style.borderWidth="2px";
		grabber.style.borderColor="#333333";
		grabber.style.backgroundColor="#6a6a6a";
		grabber.style.cursor="se-resize";
		grabber.style.position="relative";
		grabber.style.MozUserSelect="none";

		addListener(grabber,nodes_to_resize);
		insertAfter(prev,grabber);

		for (var i = 0; i < nodes_to_resize.length; ++ i) {
			var n = nodes_to_resize[i];
			if (!isResizeable(n)) {
				markResizeable(n);
			}
		}
		markResizeable(grabber);
	}
}

body.addEventListener("click",function(e) {
	if (e.button == 0 && e.ctrlKey && e.target != body) {
		e.returnValue=false;
		e.cancelBubble=true;
		e.cancel=true;
		makeResizeable(e.target);
		return false;
	}
	return true;
}, true);