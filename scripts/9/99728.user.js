// ==UserScript==
// @name           	linux.com - auto-redirect
// @description 	linux.com - auto redirect to source site
// @namespace      	-
// @version			0.1

// @author			lukaszg
// @include        	http://www.linux.com/*
// @require        	http://code.jquery.com/jquery-1.5.min.js
// @license		  	GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var div = $(':contains("Read more at")', 'div.article-content')
var href = div.find('a').attr('href')

setTimeout(function() { document.location.href = href }, 2000);