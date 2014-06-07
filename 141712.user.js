// ==UserScript==
// @name           Tag Remove (Keepa)
// @namespace      Tag remove for links of Keepa to Amazon
// @description    Elimina la variable tag de los vínculos hacia Amazon desde Keepa.com
// @include        http://keepa.com/r/*
// @include        http://*.keepa.com/r/*
// @author         WeSo
// @version        20130311
// ==/UserScript==

// Amazon sites
var sites = Array(
  		"amazon.com",
  		"amazon.es",
  		"amazon.co.uk",
  		"amazon.de",
  		"amazon.it",
  		"amazon.fr",
  		"amazon.ca",
  		"amazon.cn",
  		"amazon.co.jp"
		);
		
function delTag (text) {
  var tmp = unescape(text);
  tmp = tmp.replace(/&amp;/gi,"&");
  
  // &...&
  var pattern = "&tag=[a-zA-Z0-9.-]*-[0-9]{1,2}&";
  var exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"&");  
  
  // &...
  pattern = "&tag=[a-zA-Z0-9.-]*-[0-9]{1,2}";
  exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"");   
  
  // ?...&
  pattern = "\\?tag=[a-zA-Z0-9.-]*-[0-9]{1,2}&";
  exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"?");    

  // ?...
  pattern = "\\?tag=[a-zA-Z0-9.-]*-[0-9]{1,2}";
  exp = new RegExp(pattern, "g");
  tmp = tmp.replace(exp,"");    
  
  
  return tmp;
}


// META
for (var n = 0; n < sites.length; n++) {		
	var links = document.evaluate("//meta[contains(@content, '"+sites[n]+"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  	for (var i = 0; i < links.snapshotLength; i++) 
  	{ 
  	  var link = links.snapshotItem(i);
  	  link.content = delTag(link.content);  
  	} 
}

// BODY
var body = delTag(document.body.getAttribute('onLoad'));
document.body.setAttribute('onLoad', body);