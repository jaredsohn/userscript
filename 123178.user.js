// ==UserScript==
// @name           Ponychan-404
// @namespace      http://userscripts.org/users/430392
// @description    Gives Ponychan A New Look To 404
// @include        *.ponychan.net/*
// ==/UserScript==
// Just change the url of imgURL to whatever 404 image that you want.
var imgURL = "http://i.imgur.com/8NqwM.png";
if (document.getElementsByTagName("HTML")[0].innerHTML.indexOf("<center><h1>404 Not Found</h1></center>") != -1)
	{
		document.getElementsByTagName("head")[0].innerHTML = '<style type="text/css"> body{background-image:url("' + imgURL + '");background-repeat:no-repeat;background-attachment:fixed;background-position:center;} </style>';
		document.getElementsByTagName("body")[0].innerHTML = '';
	}