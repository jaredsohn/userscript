// ==UserScript==
// @name	full ignore
// @version 	0.1
// @description	Completely hide posts from ignored users on metallicabb
// @include	http://*metallicabb.com/index.php?showtopic=*

// ==/UserScript==

function getElementsByClass(searchClass, node, tag)
{

	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';

	var classElements = new Array();
	var elements = node.getElementsByTagName(tag);	
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");

	for (el in elements) {
		if (pattern.test(el.className))
			classElements.push(el);
	}

	return classElements;
}

function removeElement(element)
{
	while (element.childNodes.length > 0)
		element.removeChild(element.childNodes[0]);
}

function hide_posts()
{

	var posts = getElementsByClass("post_block", document, "div");

	for (post in posts) {
		if (getElementsByClass("post_ignore", post, "div").length > 0)
			removeElement(post);
	}
}

hide_posts();
