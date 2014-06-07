// Google Reader Preview with increase sizes for widescreen owners ;)
// version 0.1
// 2007-07-19
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// WHAT IT DOES:
// Replaces Google Reader's article summary with a frame containing the actual blog item
// --------------------------------------------------------------------
// ==UserScript==
// @name            Google Reader Preview with increase sizes for widescreen owners ;)
// @description     Replaces Google Reader's article summary with a frame containing the actual blog item. This script is enchanmets of http://userscripts.org/scripts/show/6412
// @include         http://reader.google.com/reader/*
// @include         http://www.google.com/reader/*
// ==/UserScript==

document.getElementsByClassName = function(className, parentNode) {
  var elements = [];
  var parent = parentNode;
  if (parentNode == undefined) {
	  parent = document.body;
  }
  if (parent.getElementsByTagName == undefined) {
	  return elements;
  }
  var children = parent.getElementsByTagName('*');
  for (var i = 0; i < children.length; i ++) {
	var child = children[i];
    if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
      elements[elements.length] = child;
	}
  }
  return elements;
}

var decorate_new_elements = function(e) {
	var element = e.target;
	if (element.className != "entry-container") {
		return;
	}
	var elements = document.getElementsByClassName("entry-title", element);
	if ((elements == undefined) || (elements.length == 0)) {
		return;
	}
	var entry_title = elements[0];
	var href_array = /\"(http:\/\/[^\"]*)\"/.exec(entry_title.innerHTML);
	if (href_array == undefined || href_array.length == 0) {
		return;
	}
	var href = href_array[1];

	elements = document.getElementsByClassName("entry-body", element);
	if (elements != undefined && (elements.length > 0)) {
		var body = elements[0];
		// Turn off preview for URLs that match the strings below.
		if (
			href.lastIndexOf("non_sequitur")==-1 &&
			href.lastIndexOf("dilbert")==-1 &&
			href.lastIndexOf("penny-arcade")==-1 &&
			href.lastIndexOf("comic_foxtrot")==-1 &&
			href.lastIndexOf("userfriendly")==-1 &&
			href.lastIndexOf("joeandmonkey")==-1 &&
			href.lastIndexOf("xkcd")==-1 &&
			href.lastIndexOf("ulff")==-1 &&
			href.lastIndexOf("lilkobi")==-1
		) 
		{
		body.innerHTML = "<IFRAME src='"+href+"' height=600 width=1120></IFrame>";
		}
	}
}

document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);
