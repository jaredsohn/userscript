// ==UserScript==
// @name           Amazing Super Powers
// @namespace      amazingsuperpowers
// @description    Written by Matt Sandy (http://matt.mn/)
// @include        http://www.amazingsuperpowers.com/*
// ==/UserScript==
//------------------------------------------------------------------------------------------------------
var styleSheet=document.styleSheets[0];
//------------------------------------------------------------------------------------------------------
styleSheet.insertRule("a #imageLink {opacity:0.1;}", 0);
styleSheet.insertRule("a:hover #imageLink {opacity:1;}", 0);
styleSheet.insertRule("a #extraComic {position:absolute;display:block;margin-left:-9999px;margin-top:-9999px;border:solid 4px black;}", 0);
styleSheet.insertRule("a:hover #extraComic {margin-top:-45px;}", 0);
//------------------------------------------------------------------------------------------------------
var linkies = document.getElementById('comic').getElementsByTagName("a");
linkies[linkies.length-1].innerHTML =	"<img src=\"../../../../ASPeasteregg.png\" border=\"0\" id=\"imageLink\">" + 
										"<span id=\"extraComic\"><img src=\"" + linkies[linkies.length-1].getAttribute("href") + "\" border=\"0\" id=\"extraComicImage\" /></span>";
//------------------------------------------------------------------------------------------------------
loader();
//------------------------------------------------------------------------------------------------------
function loader()
{
	//alert("test");
	window.setTimeout(function() 
	{
		if(parseInt(document.getElementById("extraComicImage").width)>0)
		{
			document.getElementById("extraComicImage").setAttribute("alt",parseInt(document.getElementById("extraComicImage").width));
			document.styleSheets[0].insertRule("a #extraComic {margin-left:-" + (parseInt(document.getElementById("extraComicImage").getAttribute("alt"))+10) + "px;}", 5);
		}
		else
		{
			loader();
		}
	},1000);
}