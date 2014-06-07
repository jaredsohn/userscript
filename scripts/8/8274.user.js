// ==UserScript==
// @name           AskMetafilter Best Answer Navigation
// @namespace      bestanswermonkey
// @include        http://ask.metafilter.com/*
// @exclude        http://ask.metafilter.com
// ==/UserScript==

//From Robert Nyman: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/-/g, "\-");
	var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}


var bestArr = getElementsByClassName(document, "div", "comments best");
var smallCopyElements = getElementsByClassName(document.getElementById('page'), "span", "smallcopy");

smallCopyElements[1].innerHTML += "[<a href='javascript:window.scroll(0, " + bestArr[0].offsetTop + ")'>First Best Answer</a>]";
for(var i = 0; i < bestArr.length; i++){
	if(i != (bestArr.length - 1)){
		bestArr[i].lastChild.innerHTML += "<a href='javascript:window.scroll(0, " + bestArr[i+1].offsetTop + ")'>[Next Best Answer]</a>";
	} else bestArr[i].lastChild.innerHTML += "<a href='javascript:window.scroll(0,0)'>[Back to Top]</a>";
}


