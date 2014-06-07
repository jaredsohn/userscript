// ==UserScript==
// @name Synesgodt-om.dk EasyVid
// @match http://synesgodt-om.dk/*
// @match http://sejevideoer.dk/*
// ==/UserScript==

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

function removeD(){
	document.getElementById('overlay').style.display = "none";
	document.getElementById('overlayed').style.display = "none";
	document.getElementById('youtube_image').style.display = "none";
	var elm = document.getElementsByClassName("youtube_video");
	elm[0].style.display = "block";

load_vid();
	
}

setTimeout(removeD, 5000);