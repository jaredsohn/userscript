// ==UserScript==
// @name          Atheism Image Show
// @description   Allows viewing all images in /r/atheism
// @include       *reddit.com/r/atheism/*
// ==/UserScript==

function embed() {
    window.atheism_images_show = function(){var u=document.querySelectorAll("div.linkflair-image .selftext"),i=0;function f(){if(u[i]){u[i].onclick();i+=1}};setInterval(f,1000);};
}

var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));

document.body.appendChild(inject);

$(document).ready(function(){
    
	$('ul.tabmenu').append("<li><a href='javascript:void(0);' onclick='atheism_images_show(); return false;'>Show /r/atheism Images</a></li>");
	});