// ==UserScript==

// @name           quote != edit

// @namespace      SAscripts

// @description    removes buttons you don't need

// @include        http://forums.somethingawful.com/showthread*

// ==/UserScript==

var myname = "yournamehere";
var foo = document.getElementsByTagName("table");
for (var i = 0; i < foo.length; i++){
 var bar = foo[i];
 if (bar.getAttribute("class") == "post"){
  var baz0 = bar.getElementsByTagName("dt");
  var baz = baz0[0];
  var author = baz.firstChild.nodeValue;
  if (author == myname){deleteQuote(bar);}
  else{deleteEdit(bar);}
 }
}

function deleteEdit(table){
 var x=table.getElementsByTagName("a");
 for (var i = 0; i < x.length; i++){
  var foo = x[i];
   if (foo.getAttribute("href").substring(0,31) == 'editpost.php?s=&action=editpost'){
    foo.parentNode.removeChild(foo);
   }
 }
}

function deleteQuote(table){
 var x=table.getElementsByTagName("a");
 for (var i = 0; i < x.length; i++){
  var foo = x[i];
   if (foo.getAttribute("href").substring(0,31) == 'newreply.php?s=&action=newreply'){
    foo.parentNode.removeChild(foo);
   }
 }
}