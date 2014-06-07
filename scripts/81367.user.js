// ==UserScript==
// @name           link to class-site
// @namespace      SpineEyE
// @description    linkifies the listed classes on the class catalog site and the user site
// @include        http://*ureddit.com
// @include        http://*ureddit.com/user/*
// ==/UserScript==

(function() {
	var tags = document.getElementsByClassName('link-signup-button');
	for(i=0; i<tags.length; i++) {
		var idSearch = /\{id\: \'([0-9]+)\'\}/;
		var id = idSearch.exec(tags[i].getAttribute('onclick'));
		if(id!==null) {
			var aText = tags[i].parentNode.parentNode.nextSibling.nextSibling.textContent.replace(/(^\s*|\s*$)/g, ""); //also strip whitespace
			tags[i].parentNode.parentNode.nextSibling.nextSibling.innerHTML='<a href="http://universityofreddit.com/v2/class.php?id='+id[1]+'">'+aText+'</a>';
		}
	}
}	
)();