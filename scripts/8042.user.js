// ==UserScript==
// @name           MySpace Backdate Blogs
// @namespace      Adrian232
// @description    Allows you to select years before 2006 when you edit your blog.
// @include        http://blog.myspace.com/*blog.edit*
// @include        http://blog.myspace.com/*blog.create* 
// ==/UserScript==

(function() {
	var start_year = 2003;
	
	var form = document.getElementById("theForm");
	var select = form.elements.namedItem("postYear");
	
	// create new option fields
	for (var i = 2005; i >= start_year; i--) {
		var option = document.createElement("option");
		option.value = '' + i;
		option.appendChild(document.createTextNode('' + i));
		select.insertBefore(option, select.firstChild);
	}
})();
