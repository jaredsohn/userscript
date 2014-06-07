// ==UserScript==
// @name          Amazon Item Shortener
// @version       1.1b
// @date          2013/05/29
// @description   Make links smaller in Amazon
// @creator       Omeryl
// @license       WTFPL; http://www.wtfpl.net/
// @include       http://*.amazon.com/*
// @include       https://*.amazon.com/*
// @namespace http://userscripts.org/scripts/show/168947
// ==/UserScript==
//
// © Omeryl
//
//        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
//                    Version 2, December 2004 

// Copyright (C) 2013 Omeryl <omeryl@bassh.net> 

// Everyone is permitted to copy and distribute verbatim or modified 
// copies of this license document, and changing it is allowed as long 
// as the name is changed. 

//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
//   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

//  0. You just DO WHAT THE FUCK YOU WANT TO.

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	jQ('a[href*="/gp/product"]').each(function() {
		var url = jQ(this).attr('href').split('/');
		url = url[url.indexOf('gp')+2]
		jQ(this).attr('href', "/dp/" + url);
	});
	
	jQ('a[href*="/dp/"]').each(function() {
		var url = jQ(this).attr('href').split('/');
		var url = url[url.indexOf('dp')+1]
		jQ(this).attr('href', "/dp/" + url);
	});
	jQ('a[href*="/gp/"]').each(function() {
		var url = jQ(this).attr('href').split('/');
		var url = url[url.indexOf('gp')+1]
		jQ(this).attr('href', "/dp/" + url);
	});
}

addJQuery(main);