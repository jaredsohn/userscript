// ==UserScript==
// @name           Dagens Dåre
// @namespace      Dagens Dåre
// @include        http://www.1000apor.se/artiklar/youtube/*
// ==/UserScript==

// This script will solve the difficult question.

//Thanks to www.tutorialspoint.com
// and      www.javascripter.net

//<label for="comment_answer">Vad är 3 + 5 ? : </label>

var texten = document.body.innerHTML

var index = texten.indexOf(">Vad är ");

index = index + 8;

var a = texten.charAt(index).valueOf()

index = index + 4;

var b = texten.charAt(index).valueOf()

var c = parseFloat(a) + parseFloat(b);

//----DEBUG----
//document.title = "Summa :" + c; 

//id="comment_answer" size="2" value=""

document.body.innerHTML = document.body.innerHTML.replace('id="comment_answer" size="2" value=""', 'id="comment_answer" size="2" value="' + c +'"');