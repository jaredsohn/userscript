// ==UserScript==
// @name           Todoist FavIcon
// @namespace      http://peterwooley.com
// @include        http://todoist.com/*
// ==/UserScript==


window.addEventListener('load', function() {
	var todoist = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZZJREFUeNpi/P//PwMlgBHZAP+8bkKmTdk4qTQXxQCp0q1wjsmPq/+BCjB0Hb94i8FcV5Vh1po9DCKCvIfzd7+zfdrllS5dtm0WC8P/v0Q59cnLtwxh7pYMui37bUF86dLNM592+zKw/P9HnAE8XBwMOk17UMSkijfMZPn37w9mwDAyMoDCpq+vD8zX09Nj0FpwCUPdi/6QdKALfmNIwAK2qKgITIvnL8dQ83JiZDpQfBYTyAAgJw1I/3e30oe7AAT27NnDIJa7iAGkBhnXWwqDxGeB2KBoTBPJmjMTZvKbaSlwW4DiGDaD5IHRzXD0jyDYFkbB9GkYcR/6/wLDakYDDM3vZmTC0gvD4V88YANY/v/9BWKgGLKKQQtI/kLR/H52Pmo4/YXIM/0D+gMomQ6iceHV4drgGIHFCgjA5IAu+M3Al9A+69OCShA9E93ZIHEQcHFxQXMBJPaAsfCHAYR545pndXgYM8D4IAzTjA3A1DByx9TDBZ0FucFRWbb1GEOXtxXDzmMXcRqw9/1XRozcSA4ACDAAw+XhK30U0B0AAAAASUVORK5CYII=';
	setIcon(todoist);
}, true);

function setIcon(icon) {
	var head = top.document.getElementsByTagName("head")[0];
	var links = head.getElementsByTagName("link");
	for (var i = 0; i < links.length; i++)
		if (links[i].type == "image/x-icon" && 
			(links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
			links[i].href != icon)
			head.removeChild(links[i]);
		else if(links[i].href == icon)
			return;

	var newIcon = document.createElement("link");
	newIcon.type = "image/x-icon";
	newIcon.rel = "shortcut icon";
	newIcon.href = icon;
	return head.appendChild(newIcon);
}