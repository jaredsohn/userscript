// ==UserScript==
// @name           Textbox sizemodifier
// @namespace      http://userscripts.org/users/64760
// @description    Modifies text-boxes to make them resizeable, programmed by Marcus Gustafsson (marcus.gstfssn@gmail.com)
// @include        *
// ==/UserScript==


{
	
	var textBoxes = document.getElementsByTagName("textarea");
	var textDiv = new Array();
	var iParent = new Array();
	var textBox = new Array();
	var width = new Array();
	var height = new Array();
	var divRight = new Array();
	var divBottom = new Array();
	var divCorner = new Array();
	var textDiv = new Array();
	var move = new Array();
	var moveX = new Array();
	var moveY = new Array();
	for (var i = 0; i < textBoxes.length; ++i) {
		textDiv[i] = document.createElement("div");
		iParent[i] = textBoxes[i].parentNode;
		textBox[i] = textBoxes[i].cloneNode(textBoxes[i]);
		width[i] = textBoxes[i].offsetWidth;
		height[i] = textBoxes[i].offsetHeight;
		iParent[i].insertBefore(textDiv[i], textBoxes[i]);
		iParent[i].removeChild(textBoxes[i]);
		
		
		// Fix for nosized textareas
		if (textBox[i].cols)
			width[i] = textBox[i].cols * 10;
		if (textBox[i].rows)
			height[i] = textBox[i].rows * 10;
		
		divRight[i] = document.createElement("div");
		divBottom[i] = document.createElement("div");
		divCorner[i] = document.createElement("div");
		
		textDiv[i].style.position = "relative";
		textDiv[i].style.display = "block";
		
		textBox[i].style.display = "block";
		textBox[i].style.position = "absolute";
		textBox[i].style.top = "0px";
		textBox[i].style.left = "0px";
		
		divRight[i].style.position = "absolute";
		divRight[i].style.width = "5px";
		divRight[i].style.height = height[i] + "px";
		divRight[i].style.left = width[i] + "px";
		divRight[i].style.top = "0px";
		divRight[i].style.cursor = "e-resize";
		divRight[i].style.MozUserSelect = "none";
		
		divBottom[i].style.position = "absolute";
		divBottom[i].style.width = width[i] + "px";
		divBottom[i].style.height = "5px";
		divBottom[i].style.left = "0px";
		divBottom[i].style.top = height[i] + "px";
		divBottom[i].style.cursor = "s-resize";
		divBottom[i].style.MozUserSelect = "none";
		
		divCorner[i].style.position = "absolute";
		divCorner[i].style.width = "5px";
		divCorner[i].style.height = "5px";
		divCorner[i].style.left = width[i] + "px";
		divCorner[i].style.top = height[i] + "px";
		divCorner[i].style.cursor = "se-resize";
		divCorner[i].style.MozUserSelect = "none";
		
		// For debug purpose
//		divRight[i].style.background = "#F00";
//		divBottom[i].style.background = "#0F0";
//		divCorner[i].style.background = "#00F";
		
		textDiv[i].style.width = (textBox[i].style.width = width[i] + "px");
		textDiv[i].style.height = (textBox[i].style.height = height[i] + "px");

		textDiv[i].appendChild(textBox[i]);
		textDiv[i].appendChild(divRight[i]);
		textDiv[i].appendChild(divBottom[i]);
		textDiv[i].appendChild(divCorner[i]);
		textDiv[i].appendChild(document.createElement("div"));
						
		move[i] = function(object, type, i) {
			var lastPos = {X:0, Y:0};
			var lastOffset = {X:0, Y:0};
			var stopMoving = function(e) {
				document.removeEventListener("mousemove", keepMoving, true);
				document.removeEventListener("mouseup", stopMoving, true);
			}
			
			var keepMoving = function(e) {
				var moveX = function (x) {
					if (x > 0 || parseInt(textBox[i].style.width) + x > 50) {
						textDiv[i].style.width = (textBox[i].style.width = (parseInt(textBox[i].style.width) + x) + "px");
						divRight[i].style.left = (parseInt(divRight[i].style.left) + x) + "px";
						divBottom[i].style.width = (parseInt(divBottom[i].style.width) + x) + "px";
						divCorner[i].style.left = (parseInt(divCorner[i].style.left) + x) + "px";
					}
				}
				var moveY = function (y) {
					if (y > 0 || parseInt(textBox[i].style.height) + y > 50) {
						textDiv[i].style.height = (textBox[i].style.height = (parseInt(textBox[i].style.height) + y) + "px");
						divRight[i].style.height = (parseInt(divRight[i].style.height) + y) + "px";
						divBottom[i].style.top = (parseInt(divBottom[i].style.top) + y) + "px";
						divCorner[i].style.top = (parseInt(divCorner[i].style.top) + y) + "px";
					}
				}
				var pos = {X:e.clientX, Y:e.clientY};
				if (type == 0 || type == 2)
				moveX(pos.X - lastPos.X + window.pageXOffset - lastOffset.X);
				if (type == 1 || type == 2)
				moveY(pos.Y - lastPos.Y + window.pageYOffset - lastOffset.Y);
				lastPos.X = e.clientX;
				lastPos.Y = e.clientY;
				lastOffset.X = window.pageXOffset;
				lastOffset.Y = window.pageYOffset;
			}
			
			var getMove = function(e) {
				lastPos.X = e.clientX;
				lastPos.Y = e.clientY;
				lastOffset.X = window.pageXOffset;
				lastOffset.Y = window.pageYOffset;
				document.addEventListener("mousemove", keepMoving, true);
				document.addEventListener("mouseup", stopMoving, true);
			}
			
			object.addEventListener("mousedown", getMove, true);
		}
		
		move[i](divCorner[i], 2, i);
		move[i](divRight[i], 0, i);
		move[i](divBottom[i], 1, i);
	}
	
}