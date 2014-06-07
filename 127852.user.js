// ==UserScript==
// @id             gizmodohideapple
// @name           Gizmodo: hide Apple-related topics
// @version        1.2
// @namespace      gizmodohideapple@vano
// @author         V@no
// @description    Hide all topics that mention iphone, ipad, Apple or IOS 
// @include        http://gizmodo.com/*
// @include        http://*.gizmodo.com/*
// @run-at         document-end
// ==/UserScript==

var obj = document.getElementsByClassName("post");
if (obj)
{
	var hide, head, title, post, i, height,
			reg = new RegExp("ipad|iphone|apple|ios ?[0-9]", "i");
	for(i = 0; i < obj.length; i++)
	{
		hide = 0;
		height = 30;
		if (obj[i].tagName != "DIV" || obj[i].classList.contains("mainContent"))
			continue;

		if ((head = obj[i].getElementsByClassName("taglink modfont")).length)
		{
			hide += head[0].innerHTML.match(reg) ? 1 : 0;
			height = head[0].parentNode.scrollHeight;
		}

		if ((title = obj[i].getElementsByTagName("h2")).length)
			hide += title[0].innerHTML.match(reg) ? 1 : 0;

		if ((post = obj[i].getElementsByClassName("post-body")).length)
			hide += post[0].innerHTML.match(reg) ? 1 : 0;

		if (hide)
		{
			obj[i].style.maxHeight = height + "px";
			obj[i].style.overflow = "auto";
			obj[i].setAttribute("onmouseover", "this.style.maxHeight = ''");
			obj[i].setAttribute("onmouseout", "this.style.maxHeight = '" + height + "px'");
		}
	}
}