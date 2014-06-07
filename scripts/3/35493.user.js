// ==UserScript==
// @name           ThePirateBay - Spelling Suggester
// @namespace      #avg
// @description    Fixes spelling mistakes when you do searches on the pirate bay
// @include        http://thepiratebay.org/search/*
// @version        0.2.1
// ==/UserScript==
var query=unescape(/\/search\/([^\/]+)/.exec(location.pathname)[1]).replace(/\s+/g,"+");

GM_xmlhttpRequest({
method:'GET',
//url:"http://www.google.com/complete/search?q="+query,
url:"http://www.google.com/search?complete=1&q="+query,

onload:function(a){
//correct=eval(a.responseText.match(/\(.+\)/)[0])[1][0][0];
correct=/<a href="\/search.+?<\/a>/.exec(a.responseText)[0].replace(/<\/?.+?>/g,"");


if(correct!=="Similar pages" && correct !=="More details")
	document.evaluate("/html/body/h2",document,null,9,null).singleNodeValue.innerHTML+=" <strong style=\"font-size:20px\">Did you mean to search for <a href=\""+location.pathname.replace(/\/search\/[^\/]+/,"/search/"+correct)+"\">"+correct+"</a></strong>?";

}
})