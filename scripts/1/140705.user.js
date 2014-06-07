// ==UserScript==
// @name        Sunbroadband Philippines Auto Redirect
// @namespace   http://sbw.sunbroadband.ph/*
// @include     http://www.sunbroadband.ph/*
// @include     http://sbw.sunbroadband.ph/*
// @author		rayanuki
// @description	This script redirects the page to the Correct Webpage redirected from http://www.sunbroadband.ph/ after activating the sunbroadband modem
// @version     0.1.1
// ==/UserScript==

var str_url = window.location.href;

var num_path = str_url.indexOf("URL=");
var str_link = str_url.substring(num_path+4, str_url.length);

if(str_link != ""){
	window.location=str_link;
}