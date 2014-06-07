// ==UserScript==
// @name           Adfree www2012
// @namespace      http://www.antoinelefeuvre.com
// @description 	 For those tired of the blinking logos of www2012 website 
// @include        http://www2012.wwwconference.org/*
// @require 			 http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$('div.sidebar div.widget:not(:has(div.feedbar))').hide();