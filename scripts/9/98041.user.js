// This script base on: Itai Lahan's Google Reader Preview 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Modifier: Robi L.
// ==UserScript==
// @name            Google Reader Preview++
// @description     Replaces Google Reader's article summary with a frame containing the actual blog when user click the article's title.
// @description     点击GoogleReader文章标题，即可查看全文页面。免去跳转打开新页面的繁琐操作。
// @include         http://reader.google.com/reader/*
// @include         http://www.google.com/reader/*
// @include         https://reader.google.com/reader/*
// @include         https://www.google.com/reader/*
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


var overideTitleLink = function(e) {
	var element = e.target;
	if (element.className != "entry-container") {
		return;
	}
	var elements = document.getElementsByClassName("entry-title-link", element);
	if ((elements == undefined) || (elements.length == 0)) {
		return;
	}
	var entry_title = elements[0].parentNode;
	var link = elements[0];
	
	var href_array = /\"(http:\/\/[^\"]*)\"/.exec(entry_title.innerHTML);
	if (href_array == undefined || href_array.length == 0) {
		return;
	}
		
	link.setAttribute('href','#'); 
	link.removeAttribute('target');
	entry_title.innerHTML = entry_title.innerHTML;

	var href = href_array[1];

	entry_title.addEventListener('click', function(e) {
			elements = document.getElementsByClassName("entry-body", element);
			if (elements != undefined && (elements.length > 0)) {
				var body = elements[0];
				body.innerHTML = "<IFRAME src='"+href+"' height=500 width=1000></IFrame>";
			}
	}, false);

}

document.body.addEventListener('DOMNodeInserted', overideTitleLink, false);