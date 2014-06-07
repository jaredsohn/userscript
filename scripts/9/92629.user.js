// ==UserScript==

// @name           konachan

// @namespace      http://userscripts.org/users/137201/scripts

// @description    Opens the images directly.

// @include        http://konachan.com/post/show/*

// ==/UserScript==



for (var i = 0; i < document.images.length; i++) {

 if (document.images[i].id == "image") {

  var url = document.images[i].src;

 }

}



document.location = url;