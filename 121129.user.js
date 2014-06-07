// ==UserScript==
// @name           Tag Remove (Camel)
// @namespace      Tag remove for links of Camelcamelcame.com
// @description    Cambio enlaces Camelcamelcamel.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://*.camelcamelcamel.com/*
// @include        http://camelcamelcamel.com/*
// @author         WeSo
// @version        20120818
// ==/UserScript==

function thisCodeProduct () {
  var url = unescape(location.href);
  var pattern = "http://([a-z]{0,2}).?camelcamelcamel.com/(.*)/product/B([A-Z0-9]{9}).*";
  var exp = new RegExp(pattern, "gi");
  return url.replace(exp,"$3");
}

function thisCodeName () {
  var url = unescape(location.href);
  var pattern = "http://([a-z]{0,2}).?camelcamelcamel.com/(.*)/product/B([A-Z0-9]{9}).*";
  var exp = new RegExp(pattern, "gi");
  return url.replace(exp,"$2");
}

var url = unescape(location.href);
var pattern = "http://([a-z]{0,2}).?camelcamelcamel.com/.*";
var exp = new RegExp(pattern, "gi");
var code = url.replace(exp,"$1");

if (code == '')
  code = 'com';
else if (code == 'uk')
  code = 'co.uk';
  
$(document).ready(function() {
  	var links = document.evaluate("//a[contains(@href, 'camelcamelcamel.com')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  	for (var i = 0; i < links.snapshotLength; i++) 
  	{ 
  	  var link = links.snapshotItem(i);
  	  if (link.title == 'View the product page at Amazon') {
  	    link.removeAttribute('onclick');
  	    link.href = 'http://www.amazon.'+code+'/dp/B'+thisCodeProduct()+'/'+thisCodeName()+'/';
  	  }
  	} 
});