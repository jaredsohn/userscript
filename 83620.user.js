// ==UserScript==
// @name           Link SWF Taringa
// @namespace      mcodina.com.ar
// @description    Habilita los links en los SWF en Taringa
// @include        http://taringa.net/*
// @include        http://www.taringa.net/*
// @include        http://poringa.net/*
// @include        http://www.poringa.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$("embed").each(function(){
	var p = $(this).parent();
	var src = $(this).attr("src");
	var width = $(this).attr("width");
	var height = $(this).attr("height");

	p.html('<embed width="' + width + '" height="' + height + '" wmode="transparent" allowscriptaccess="always" allownetworking="all" type="application/x-shockwave-flash" quality="high" src="' + src + '">');
});
