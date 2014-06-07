// ==UserScript==
// @name           Clean Youtube Page
// @include        http://*.youtube.*/*
// @author         Dark Sky
// ==/UserScript==


function getElementsByClass (cName, domNode) {
	if (cName == undefined || cName.length == 0) return;
	if (domNode == undefined) domNode = document;

	if (domNode.getElementsByClassName)
		return domNode.getElementsByClassName(cName);

	// browser doesn't support getElementsByClassName
	cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
	var elements = domNode.getElementsByTagName('*');
	var res = new Array();
	for (var i = 0; i < elements.length; i++) {
		var className = " " + elements[i].className + " ";
		if (className.indexOf(cName) > -1) {
			res.push(elements[i]);
		}
	}

	return res;
}


document.getElementById('video-sidebar').style.display='none';
getElementsByClass("guide-background",document)[0].style.display = "none";
getElementsByClass("guide-container",document)[0].style.display = "none";





