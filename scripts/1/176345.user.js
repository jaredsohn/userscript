// ==UserScript==
// @name		Memorial Opera Presto Link Selection Style
// @description	Disable draggable link when left click to select link's text
// @author		t7yang
// @namespace   t7yang.blogspot.com
// @icon		https://dl.dropboxusercontent.com/u/99508/t7Space/Icon/MemorialOperaPrestoLinkSelectionStyle.png
// @version		1.0.0
// @include		http://*
// @include		https://*
// ==/UserScript==


window.onload = doUnDraggable();

function doUnDraggable()
{
	//find out how many a tag in this website
	var aArray = document.getElementsByTagName("a");
	
	//if found any a tag
	if(aArray.length > 0){
		for(var i = 0; i < aArray.length; i++){
			//make it undraggable by set a new attribute draggable with false
			var newAttr = document.createAttribute("draggable");
			newAttr.nodeValue = false;
			aArray[i].attributes.setNamedItem(newAttr);
			
			//add listener for each a tag
			aArray[i].addEventListener("click", linkOrText, false);
		}
	}
}

//if user had select text from link, avoid goto the link target
function linkOrText(e){
	if(e.which == 1){
		var text = getSelectedText();
		if(text != false){
			e.preventDefault();
		}
	}
}

//From: http://ppt.cc/IDSZ
//check if user had select any text from the link
function getSelectedText(){
	if(window.getSelection){
		return window.getSelection().toString();
	}else if (document.selection){
		return document.selection.createRange().text;
	}
	return false;
}
