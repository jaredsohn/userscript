// ==UserScript==
// @name          ModelMayhem Image Unlocker
// @description   View all images that are locked on modelmayhem
// @version       1.2
// @include       http://*.modelmayhem.com/portfolio/pic/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function fiximage(){$("#newimage").remove();$("body").delay(1e3).queue(function(e){var t=window.location.hash.replace("#","");$("<div id='newimage'></div>").prependTo("head").load("/portfolio/pic/"+t+" meta[property='og:image']",null,function(){var e=$("#newimage").find("meta[property='og:image']").attr("content");$("#viewpic").html("<img src='"+e+"'>")});e()})}$("a.next").attr("id","next-button");$("a.prev").attr("id","prev-button");$("#next-button").click(function(){fiximage()});$("#prev-button").click(function(){fiximage()});fiximage();