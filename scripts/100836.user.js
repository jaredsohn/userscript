// ==UserScript== 
// @name	UserFlashEOL
// @version	1.3
// @namespace	userflasheol
// @description	Habilita el uso de Flash en ElOtroLado
// @run-at	document-end
// @include	http://www.elotrolado.net/hilo_*
// @include	http://www2.elotrolado.net/hilo_*
// @match	http://www.elotrolado.net/hilo_*
// @match	http://www2.elotrolado.net/hilo_*
// ==/UserScript== 

var getFileName = function(url) {
	var fileEnd = url.indexOf("?");
	if (fileEnd == -1) {
		fileEnd = url.length;
	};
	
	var fileStart = url.lastIndexOf("/", fileEnd) + 1;

	return url.substring(fileStart, fileEnd);
};

var getFileExtension = function(url) {
	var fileName = getFileName(url);
	
	var dot = fileName.lastIndexOf(".");
	if (dot == -1) {
		return "";
	} else {
		return fileName.substring(dot + 1).toLowerCase();
	};
};

var getUrlParam = function(url, selectedParam) {
	var fileEnd = url.indexOf("?");
	
	var params = url.substring(fileEnd + 1).split("&");
	var curParam = 0;
	
	for (curParam = 0; curParam < params.length; curParam++) {
		var curParamValueStart = params[curParam].indexOf("=");
		if (params[curParam].substring(0, curParamValueStart) == selectedParam) {
			return params[curParam].substring(curParamValueStart + 1);
		};
	};
	return "";
};

var insertAfter = function(newElement, targetElement) {
	// From http://snipplr.com/view/2107/insertafter-function-for-the-dom/

	var parent = targetElement.parentNode;
 
	if(parent.lastchild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	};
};

var removeNode = function(elem) {
	return elem.parentNode.removeChild(elem);
};

var toggleSwf = function(flashCount, flashUrl, flashWidth, flashHeight) {
	try {
	var flashNode = document.getElementById("userflash-swf-" + flashCount);
	if (flashNode) {
		removeNode(flashNode);
	} else {
		var flashNodeContent = "<" + "center><" + "object width=\"" + flashWidth + "\" height=\"" + flashHeight + "\">";
		flashNodeContent += "<" + "param name=\"movie\" value=\"" + flashUrl + "\">";
		flashNodeContent += "<" + "embed src=\"" + flashUrl + "\" width=\"" + flashWidth + "\" height=\"" + flashHeight + "\">";
		flashNodeContent += "<" + "/embed><" + "/object><" + "/center>";

		flashNode = document.createElement("span");
		flashNode.id = "userflash-swf-" + flashCount;
		flashNode.innerHTML = flashNodeContent;
		insertAfter(flashNode, document.getElementById("userflash-btt-" + flashCount));
	};
	} catch(e) {
		alert("UserFlashEOL ha petado.\nDatos técnicos:\n" + e);
	};
};

var writeScript = function(name, func) {
	var hold = document.createElement("script");
	hold.type = "text/javascript";
	hold.innerHTML = name + " = " + func + ";";
	document.body.appendChild(hold);
};

writeScript("toggleSwf", toggleSwf);
writeScript("insertAfter", insertAfter);
writeScript("removeNode", removeNode);

var flashCount = 1;
var posts = document.getElementsByClassName("post");

try {
for (var curPost = 0; curPost < posts.length; curPost++) {
	postElem = posts[curPost].getElementsByClassName("content")[0];
	if (postElem) {
		postInput = postElem.childNodes;

		for (var cur = 0; cur < postInput.length; cur++) {
			if ((postInput[cur].tagName == "A") && (getFileExtension(postInput[cur].href) == "swf")) {
				var flashUrl = postInput[cur].href;
				var flashWidth = getUrlParam(flashUrl, "W");
				var flashHeight = getUrlParam(flashUrl, "H");

				if ((flashWidth == "") || (isNaN(flashWidth))) flashWidth = 640;
				if ((flashHeight == "") || (isNaN(flashHeight))) flashHeight = 480;

				var flashNodeContent = "<" + "a href=\"javascript:toggleSwf(" + flashCount + ",'" + escape(flashUrl) + "'," + flashWidth + "," + flashHeight + ");void(0);\" ";
				flashNodeContent += "id=\"userflash-btt-" + flashCount + "\" title=\"Haz click para cargar la animaci&oacute;n directamente\">";
				flashNodeContent += "<" + "img src=\"http://img848.imageshack.us/img848/8385/adobe.png\" alt=\"Flash\" height=\"10\" width=\"10\">";
				flashNodeContent += "<" + "/a>";

				var flashNode = document.createElement("span");
				flashNode.innerHTML = flashNodeContent;
				insertAfter(flashNode, postInput[cur]);

				cur++;
				flashCount++;
			};
		};
	};
};
} catch(e) {
	alert("UserFlashEOL ha petado.\nDatos técnicos:\n" + e);
};
