// ==UserScript==
// @name           XXX GET (get edition)
// @namespace      Filth
// @description    Shows last 3 digits of posts on 4chan. Also points out doubles, triples, etc.
// @include        http://*.4chan.*/*
// ==/UserScript==

var elements = document.getElementsByTagName("*");

for (var i = 0; i < elements.length; i++) {
	var type = 0;
	if (elements[i].id.substr(0, 5) == 'norep')
		type = 5;
	else if (elements[i].id.substr(0, 8) == 'nothread')
		type = 8;
	if (type != 0) {
		var post = elements[i].id.substring(type);
		elements[i].innerHTML = elements[i].innerHTML.replace(post.substring(0, post.length - 3) + "XXX", post);
		var getType = 0;
		var lastChar = "";
		for (var i2 = post.length - 1; i2 >= 0; i2--) {
			if (lastChar == post.charAt(i2))
				getType++;
			else if (lastChar.length > 0)
				break;
			lastChar = post.charAt(i2);
		}
		if (getType > 0) {
			var colors = new Array("", "#00FFFF", "#00FF33", "#0099FF", "#0033FF", "#FF0066", "#FF3333", "#FFFF33", "#9900CC", "#990066", "#990033", "#990000");
			if (getType < colors.length)
				elements[i].innerHTML += "<b style=\"color:" + colors[getType] + "\"> " + ++getType + "x GET!</b>";
			else
				elements[i].innerHTML += "<b style=\"color:red\"> " + ++getType + "x EPIC GET!!!</b>";
		}
	}
}