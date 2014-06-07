// ==UserScript==
// @name Hazte Fan
// @namespace Create by nik_olmedo
// @description Script que cambia la frase "Me gusta" por "Hazte Fan"
// @include http://www.facebook.*
// @include http://www.facebook.com/
// @include http://www.facebook.com/*
// @include http://www.facebook.com/pages/*
// @include http://*.facebook.com/*
// @include http://facebook.com/*
// @include http://*.facebook.com/*
// @include http://www.facebook.com/#/*
// @include http://www.facebook.com/#!/*
// ==/UserScript==



document.body.innerHTML= document.body.innerHTML.replace(/Me gusta esta página<\/a>/g,"Hazte Fan<\/a>");

document.body.innerHTML= document.body.innerHTML.replace(/Ya no me gusta<\/a>/g,"Dejar de ser Fan<\/a>");

document.body.innerHTML= document.body.innerHTML.replace(/<i class=\"mrs img sp_2dwm9a sx_38853b\"><\/i>/g,"<img src=http:\/\/i44.tinypic.com\/2w50fn8.jpg><\/img> ");

document.body.innerHTML= document.body.innerHTML.replace(/value=\"Me gusta\">/g,"value=\"Hazte Fan\">");

document.body.innerHTML= document.body.innerHTML.replace(/<i class=\"customimg img spritemap_3jkv60 sx_e44781\"><\/i>/g,"<img src=http:\/\/i44.tinypic.com\/2w50fn8.jpg><\/img>");

document.body.innerHTML= document.body.innerHTML.replace(/http:\/\/static.ak.fbcdn.net\/rsrc.php\/z8I4L\/hash\/3eihabon.gif/g,"http:\/\/i43.tinypic.com\/2n07f44.gif");

document.body.innerHTML= document.body.innerHTML.replace(/http:\/\/cdn.fb.casualcollective.com\/dd\/images\/like.png/g,"http:\/\/i44.tinypic.com\/2w50fn8.jpg");
