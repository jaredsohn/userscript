// ==UserScript==
// @name		JVCAuteurColor
// @namespace		JVCAuteurColor
// @version			0.1
// @description		Colore le pseudo de l'auteur
// @copyright		Craftbukkit
// @include		http://www.jeuxvideo.com/forums/1-*.htm*
// @include		http://www.jeuxvideo.com/forums/3-*.htm*
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
var rep="";
url = document.URL;
url = url.split("#formpost").join("");
url = url.split("forums/3").join("forums/1");
url2 = url.split("-");
url3 = url.split("0-1-0");
urlfinal = url2[0]+"-"+url2[1]+"-"+url2[2]+"-1-0-1-0"+url3[1];
$(document).ready( function () { 					 
		$.ajax({
		   type: "GET",
		   url: urlfinal,
		   data: "",
		   success: function(msg){
var pseudos = msg.split("<li class=\"pseudo\">");
var speudos = pseudos[1].split("<strong>");
var speudoss = speudos[1].split("</strong>");
var pseudofinal = speudoss[0];
var s = document.body.innerHTML.split("<strong>"+pseudofinal+"</strong>").join("<font color='blue'><strong>"+pseudofinal+"</strong></font>");
document.body.innerHTML = s;
		   }
		});
});