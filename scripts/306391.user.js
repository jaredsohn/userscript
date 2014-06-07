// ==UserScript==
// @id         		NoLinkBucks
// @name       		NoLinkBucks
// @version    		0.1
// @namespace  		https://highfredo.no-ip.org
// @author     		Highfredo
// @description  	Skip linkBucks ads
// @run-at          document-end
// @match      		*.linkbucks.com/url/*
// @copyright  		2014+, Highfredo
// @require   		http://code.jquery.com/jquery-1.7.1.min.js
// @require	   		https://dl.dropboxusercontent.com/u/29200106/assets/purl.js
// ==/UserScript==

window.onbeforeunload = null;
var $url = $.url(window.location.href, true);
var realUrl = $url.attr('relative').replace('/url/','')
window.location.href = realUrl;