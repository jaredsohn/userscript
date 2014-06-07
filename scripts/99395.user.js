// ==UserScript==
// @name           ntvmsnbc.com foto galeri
// @namespace      http://userscripts.org/users/297509
// @description    ntvmsnbc.com foto galeri bölümündeki sayfa altı bölümünü kaldırır, fotoğrafı orijinal boyutunda gösterir.
// @include        http://fotogaleri.ntvmsnbc.com/*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var f = document.getElementById("Footer");
f.parentNode.removeChild(f);

/********************************************/
var imgurl = $('#imgPicture').attr("src");
var nextPic = $("#hylPicture").attr("href");
var infoBox = $("#InfoBox").html();

$("#PhotoContainer").css("display","none");
$("#PageSkinWrapper").prepend("<div style='text-align:center;'><div style='float:left; position:relative;'><a href='"+nextPic
+"'><img src='"+imgurl+"' alt=''/></a>"
+"</div><div id='newInfo' class='Info-Box' style='display: block; width: 300px;'></div></div>");
$("#newInfo").html(infoBox);
$("#PhotoWrapper").empty().css("display","none");
/********************************************/