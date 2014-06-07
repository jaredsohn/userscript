// ==UserScript==
// @name           XFA
// @namespace      http://www.hexblue.net/
// @description    Extend furaffinity's limited tags to do even more!
// @include        http://furaffinity.net/*
// @include        http://www.furaffinity.net/*
// @match        http://furaffinity.net/*
// @match        http://www.furaffinity.net/*
// ==/UserScript==

//getElementsByClassName is from http://codesnippets.joyent.com/posts/show/686
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.getAttribute("class"))){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements);
}

//Actual XFA Code
translateXfaTags(document);

//Translate all of the tags into their html equivalents
function translateXfaTags(document){
	autoLinks = getElementsByClassName(document, "a", "auto_link");
	for(var i in autoLinks){
		var href = autoLinks[i].href;
		if(href.indexOf("#xfaTag")!=-1){
			var xfaRawData = href.substr(href.lastIndexOf("#")+1).split("&");
			var xfaTag = [];
			for(var j in xfaRawData){
				var tempData = xfaRawData[j].split("=");
				xfaTag[tempData[0]] = unescape(tempData[1]);
			}
			var newNode = getHTMLTag(document, xfaTag);
			var currentNode = autoLinks[i];
			var parentNode = currentNode.parentNode;
			parentNode.replaceChild(newNode, currentNode);
		}
	}
}

//Translate a single xfaTag into html
function getHTMLTag(document, xfaTag){
	var newNode;
	if( xfaTag["xfaTag"].toLowerCase() == "img" ){
		newNode = document.createElement("img");
		newNode.src = xfaTag["src"];
		newNode.alt = xfaTag["alt"];
		return newNode;
	}
	return document.createTextNode("Unknown XFA Tag: '" + xfaTag["xfaTag"] + "'. You might consider upgrading to the most recent version of XFA. ");
}
