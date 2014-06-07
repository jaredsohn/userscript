// ==UserScript==
// @name           oprav-odkazy-na-zpovednici
// @namespace      deamonicky script
// @description    opraví roztrhané odkazy na Zpovednice.cz
// @include        http://www.zpovednice.cz*
// @include        http://zpovednice.cz*
// @exclude        http://zpovednice.cz/souhlas.php
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(".absoltext").each(function(i) {
		// each odd
		if (i % 2) {
	        //this.css("");//value.match(/[^\d]/);
	        $(this).css("border","13px solid red");
	        var text = $(this).text();
	        var words = text.split(" ");
	        // classify each 
	        // 
	        //alert (y);
       }
    })
    //.addClass("inputError")
;



//conftext

var html = document.documentElement.innerHTML; // http://www.webdeveloper.com/forum/showthread.php?t=42602
/*
  conftext">http://www.novinky.cz/zahranicni/238296- na-odvraceni-planetarnich-katastrof-je-t reba-1-3-trilionu.html<br
*/
var hidden_plus_surrounding = html.match(/conftext">.*?<br/gm); // array
if (0) alert(hidden_plus_surrounding);
/*
  http://www.novinky.cz/zahranicni/238296- na-odvraceni-planetarnich-katastrof-je-t reba-1-3-trilionu.html
*/
var hidden = hidden_plus_surrounding[0] /*first*/.split(/>/gm)[1].split(/</gm)[0];
if (0) alert(hidden);
var shown = hidden.replace(/\s/gm, "");
if (0) alert(shown);


document.documentElement.innerHTML = html.replace(hidden,"<a href=\""+shown+"\">"+shown+"</a>");
