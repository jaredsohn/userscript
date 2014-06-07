// ==UserScript==
// @name           Reader Link in Google HomePage by DemianGod
// @namespace      http://www.google.com.ar
// @description    Change "Libros" link in Google.com.ar HomePage by "Reader"
// 		   Cambia "Libros" en la pagina principal de Google.com.ar por "Reader"
// @include        http://www.google.com.ar*
// ==/UserScript==

var srch = "http://books.google.com.ar/bkshp?hl=es&tab=wp";
var replc = "http://www.google.com.ar/reader/view/?hl=es&tab=wy";
var srchString = "Libros";
var replString = "Reader";

var url1,url2;
url1 = [srch];
url2 = [replc]; 
var a, links;
var tmp="a";
var p,q;
links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    a = links[i];
    for(var j=0;j<url1.length; j++)
	{
	tmp = a.href+"" ;
	if(tmp.indexOf(url1[j]) != -1)
	{
	p=tmp.indexOf(url1[j]) ;
	q = url2[j] + tmp.substring(p+url1[j].length,tmp.length);
	a.href=q ;
	document.body.innerHTML = document.body.innerHTML.replace(srchString,replString);
	}
	}
    }