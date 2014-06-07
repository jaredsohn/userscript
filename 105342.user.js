// ==UserScript==
// @name            Google Reader Preview Plus
// @description     Replaces Google Reader's text summaries with a frame containing the full HTML webpage whenever an item in list view is expanded. Updated to work with Firefox 4.
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


var decorate_new_elements = function(e) {
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

	var href = href_array[1];

	elements = document.getElementsByClassName("entry-body", element);
	if (elements != undefined && (elements.length > 0)) {
		var body = elements[0];
		// You can make the script default to Google Reader's regular text summary for certain feeds by adding the base part of the feed URL to the list below as shown. This is useful for things like webcomics, Twitter feeds, full-content blog posts, sites with ugly layouts (or ugly commenters), and other items where you want to see the content alone instead of loading the full page every time.
		if (
			href.lastIndexOf("amazingsuperpowers.com")==-1 &&
			href.lastIndexOf("feeds.gawker.com")==-1 &&
			href.lastIndexOf("geekosystem")==-1 &&
			href.lastIndexOf("Hyperbole-and-a-half")==-1 &&
			href.lastIndexOf("twitter.com")==-1 &&
			href.lastIndexOf("xkcd.com")==-1
		) 
		{
		body.innerHTML = "<IFRAME src='"+href+"' height=600 width=1120></IFrame>";
		}
	}

}

document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);