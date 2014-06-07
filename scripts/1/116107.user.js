// ==UserScript==
// @id             anime-planet pictures in tags search
// @name           anime-planet pictures in tags search
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://www.anime-planet.com/tags/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require    http://code.jquery.com/jquery-1.6.4.min.js
// @require    http://autobahn.tablesorter.com/jquery.tablesorter.min.js
// @run-at         document-end
// ==/UserScript==

var a = new Array();
if (0){$("td[class=tableTitle]").each(function(){a.push($(this).text())});}
else{
var aa = new Array();
$("td[class=tableTitle]").each(function(){aa.push($("a",this).attr("href"));}); 
//var i=3;
var aaa = aa.map(function(x){ return x.substring(x.lastIndexOf("/")+1);});
a = aaa;
//alert(a);
}


var b = a.map(function(x){ return x.replace(/[\s!=?\:\-']/g,"") /*...*/ . toLowerCase();});
 var c = b.map(function(x){ return "<img src=\"http://www.anime-planet.com/images/anime/main_images/"+x+".jpg\"\/>"; });

$("td[class=tableTitle]").each(function(i){ $(this).append(c[i]);  });