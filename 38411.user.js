// ==UserScript==
// @name           orlowskifixer 
// @namespace      http://www.pint.org.uk/greasemonkey/
// @description    Reduce risk of seeing bile on el reg
// @include        http://www.theregister.co.uk/*
// ==/UserScript==


var node_list =  document.getElementsByTagName('p');
var needed_node;
for(var i = 0; i < node_list.length; i++) {
	var this_node = node_list[i];
	if( this_node.hasAttribute("class") && this_node.getAttribute("class") == 'byline'){
		var RegExp = /Andrew Orlowski/;
		if (RegExp.test(this_node.innerHTML)){
		needed_node = 'True';
		}
	}
}

if( needed_node == 'True'){
	var containing_div=document.getElementById('article');
	var warning = document.createElement("div");
	warning.innerHTML = "<h1>WARNING</h1><p>You really don't want to read " + '<a href="#" onclick="' + "var containing_div=document.getElementById('article'); containing_div.style.display = '';" + '">' + "this</a></p>";
	containing_div.parentNode.insertBefore(warning, containing_div);
	containing_div.style.display = 'none';
}
