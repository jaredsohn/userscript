// ==UserScript==
// @name           Title Text Viewer For Touchscreens
// @description    Provides a button for showing/hiding title text on images
// @namespace      http://userscripts.org/scripts/show/119708
// @include        *
// ==/UserScript==

function initTitles() {
	var allImages = document.body.getElementsByTagName("img");

	for (var i = 0; i < allImages.length; i++) {
		var image = allImages[i];
		
		if (image.title && image.title != "") {
			var title = image.title;
			
			var buttonTextNode = document.createTextNode("+");
			var buttonDivId = "mobileTitleTextButton"+i;
			
			var titleTextNode = document.createTextNode(title);
			var titleTextDivId = "mobileTitleText"+i;
			
			var buttonDiv = document.createElement("div");
			buttonDiv.id = buttonDivId;
			buttonDiv.style.background = "none repeat scroll 0 0 #FFFFFF";
			buttonDiv.style.border = "1px solid black";
			buttonDiv.style.display = "block";
			buttonDiv.style.margin = "0";
			buttonDiv.style.padding = "10px 15px";
			buttonDiv.style.opacity = "0.25";
			buttonDiv.style.zIndex = image.style.zIndex + 1;
			buttonDiv.appendChild(buttonTextNode);
			document.body.appendChild(buttonDiv);
			buttonDiv.style.position = "absolute";
			buttonDiv.style.cursor = "pointer";
			
			var imageOffsetTop = image.offsetTop;
			var imageOffsetLeft = image.offsetLeft;
			
			var imageParent = image.offsetParent;

			while(imageParent != document.body) {
				imageOffsetTop += imageParent.offsetTop;
				imageOffsetLeft += imageParent.offsetLeft;
				imageParent = imageParent.offsetParent;
			}
			
			buttonDiv.style.top = (imageOffsetTop + image.offsetHeight - buttonDiv.offsetHeight) + "px";
			buttonDiv.style.left = (imageOffsetLeft + image.offsetWidth - buttonDiv.offsetWidth) + "px";
			
			var buttonDivTop = buttonDiv.offsetTop;
			var buttonDivLeft = buttonDiv.offsetLeft;
			
			(function (buttonDiv, titleTextDivId, buttonDivId, buttonDivTop, buttonDivLeft) {
				buttonDiv.addEventListener("click", function(){showHideTitleText(titleTextDivId, buttonDivId, buttonDivTop, buttonDivLeft)});
			}(buttonDiv, titleTextDivId, buttonDivId, buttonDivTop, buttonDivLeft));

			
			var titleTextDiv = document.createElement("div");
			titleTextDiv.id = titleTextDivId;
			titleTextDiv.style.background = "none repeat scroll 0 0 #FFF9BD";
			titleTextDiv.style.border = "1px solid black";
			titleTextDiv.style.display = "none";
			titleTextDiv.style.margin = "0";
			titleTextDiv.style.padding = "2px 10px";
			titleTextDiv.style.maxWidth = "50%";
			titleTextDiv.appendChild(titleTextNode);
			document.body.appendChild(titleTextDiv);
		}
	}
}

function showHideTitleText(titleTextId, buttonDivId, topPos, leftPos) {
	var titleTextDiv = document.getElementById(titleTextId);
	var buttonDiv = document.getElementById(buttonDivId);
	
	if (titleTextDiv.style.display == "none") {
		titleTextDiv.style.display = "block";
		titleTextDiv.style.position = "absolute";
		titleTextDiv.style.zIndex = buttonDiv.style.zIndex + 1;
		if ((topPos - titleTextDiv.offsetHeight) < 0) { 
			titleTextDiv.style.top = (topPos + buttonDiv.offsetHeight) + "px";
		} else {
			titleTextDiv.style.top = (topPos - titleTextDiv.offsetHeight) + "px";
		}
		if ((leftPos - titleTextDiv.offsetWidth) < 0) {
			titleTextDiv.style.left = (leftPos + buttonDiv.offsetWidth) + "px";
		} else {
			titleTextDiv.style.left = (leftPos - titleTextDiv.offsetWidth) + "px";
		}
		buttonDiv.childNodes[0].nodeValue = "-";
		titleTextDiv.addEventListener("click", function(){showHideTitleText(titleTextId, buttonDivId, topPos, leftPos)});
	} else {
		titleTextDiv.style.display = "none";
		buttonDiv.childNodes[0].nodeValue = "+";
	}
}

window.addEventListener('load', function() { initTitles(); },	false);