// ==UserScript==
// @name           Plurk Mobile Old Style
// @namespace      http://userscripts.org/users/149324
// @include        http://www.plurk.com/m/*
// @include        http://www.plurk.com/m
// @include        http://plurk.com/m/*
// @include        http://plurk.com/m

(function() {
    var select = document.getElementsByName("mode")[0];
    if (select) {
	var links = document.createElement("span");
	for (var i = 0; i<select.options.length; i++) {
	    var link = document.createElement("a");
	    var text=select.options[i].text;
	    link.innerHTML=text.replace(/(\.\.\.|&nbsp;)/g, '');
	    link.href="/m/?mode="+select.options[i].value;
	    links.appendChild(link);
	    var space = document.createElement("TextNode");
	    space.innerHTML="&nbsp;"
	    links.appendChild(space);
	}
	var p = select.parentNode
	p.parentNode.insertBefore(links, p);
	select.parentNode.parentNode.removeChild(select.parentNode);
    }
})();
// ==/UserScript==