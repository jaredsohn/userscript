// ==UserScript==
// @name fix-planetaryorg-blog
// @namespace http://wainstead.info/
// @description Unset the color on visited links so I can tell I've visited them
// @include http://*planetary.org/*
// @include https://*planetary.org/*
// ==/UserScript==

// Author: Steve Wainstead swain@panix.com
// Kudos to Gina Trapani; copied this from her delicio.us prettifier:
// http://www.lifehacker.com/software/uploaded/2005-12-16/deliciousprettifier.user.js

(function () {
	//EDIT ME
	var newstyle = "body { font-family:Georgia, Verdana ! important; font-size:110% ! important; } a { color:#0000CC ! important } a:visited {color:#9900CC ! important; } .meta a { color:black ! important; } .header {background-color:gray ! important; } #header { background-color:#ccc ! important }";
	//END EDIT ME


	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();
