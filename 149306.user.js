// ==UserScript==
// @name        kat
// @namespace   katph
// @include     http://kat.ph/*
// @include     http://kickass.to/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready( function(){
$("table.data tr").each(function (i) {
if(i>0){
if( $(this).children("td:nth-child(5)").text()==0){
/*alert($(this).children("td:nth-child(5)").text());*/
$(this).hide();
}
}
});
});
