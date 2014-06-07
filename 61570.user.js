// ==UserScript==
// @name          jntu Theme	
// @namespace     M Tricks....
// @description	  Cool Photo....
// @author        ---------->
// @homepage      http://www.orkut.co.in/Main#Community.aspx?cmm=33299242
// @include http://www.orkut.com/*
// @include https://www.orkut.com/*
// @exclude http://www.orkut.com/Privacy.aspx
// @exclude http://www.orkut.com/About.aspx
//
// @include http://www.orkut.co.in/*
// @include https://www.orkut.co.in/*
// @exclude http://www.orkut.co.in/Privacy.aspx
// @exclude http://www.orkut.co.in/About.aspx
// @include http://www.orkut.com.br/*
// @include https://www.orkut.com.br/*
// @exclude http://www.orkut.com.br/Privacy.aspx
// @exclude http://www.orkut.com.br/About.aspx
// ==/UserScript==
var css = "/* theme: autor: --------> software */ body{background-image: url(http://www.orkut.co.in/Main#AlbumZoom?uid=14358760779514020334&pid=1242206094525&aid=1$pid=1242206094525);
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {		
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

