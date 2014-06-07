// ==UserScript==
// @name           Maybe resizes facebook chat
// @namespace      worm3d
// @description    Resizes the chat hopefully
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

function onload(){
	var success = resizeHtmlChat();
}

function tryBody(){
	var toSelect = 'fbNubFlyoutBody scrollable';
	var toSelectTab = 'fbNubFlyout fbDockChatTabFlyout';
	
	var hasClassName = new RegExp("(?:^|\\s)" + toSelect + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		//find all
		var elementClass = element.className;
		if (elementClass && elementClass.indexOf(toSelect) != -1 && hasClassName.test(elementClass)){
			//found one
			//alert("found");
			element.style.height = '534px';
			element.style.maxHeight = '534px';
			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.width = '100%';
			//alert("changed");
		}else if (elementClass && elementClass.indexOf(toSelectTab) != -1 && new RegExp("(?:^|\\s)" + toSelectTab + "(?:$|\\s)").test(elementClass)){
			element.style.height = '534px';
		}
	}
}

function tryFooter(){
	var toSelect = 'fbNubFlyoutFooter';
	var hasClassName = new RegExp("(?:^|\\s)" + toSelect + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		//find all
		var elementClass = element.className;
		if (elementClass && elementClass.indexOf(toSelect) != -1 && hasClassName.test(elementClass)){
			//found one
			//alert("found");
			element.style.position = 'absolute';
			element.style.bottom = '0px';
			//alert("changed");
		}
	}
}

function tryHeader(){
	var toSelect = 'clearfix fbNubFlyoutTitlebar titlebar';
	
	var hasClassName = new RegExp("(?:^|\\s)" + toSelect + "(?:$|\\s)");
	var allElements = document.getElementsByTagName("*");

	var element;
	for (var i = 0; (element = allElements[i]) != null; i++) {
		//find all
		var elementClass = element.className;
		if (elementClass && elementClass.indexOf(toSelect) != -1 && hasClassName.test(elementClass)){
			//found one
			//alert("found");
			element.style.position = 'absolute';
			element.style.bottom = '554px';
			element.style.width = '100%';
			//alert("changed");
		}
	}
}

function resizeHtmlChat(){

	tryBody();
	tryFooter();
	tryHeader();
	
	return true;
}

window.addEventListener('load', onload, true);


/*
function tryOne(){	
	var toSelect='fbNubFlyoutBody scrollable';
	alert("before select");
	var chatWin = document.getElementsByName(toSelect);
	if (chatWin == undefined){
		alert("element undef");
		return false;
	}
	//^^ only finds one
	alert("before change");
	if(chatWin.style == undefined){
		alert("style undef");
		return false;
	}
	chatWin.style.height = '534px';
	alert("changed");
}
*/