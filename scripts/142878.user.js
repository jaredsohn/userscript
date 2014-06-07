// ==UserScript==
// @name       viewRender
// @namespace  Xevious
// @version    0.1
// @description  aide à la prévisualisation des renders
// @include     http://www.renders-graphiques.fr/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$(function(){var e=GM_getValue("couleurViewRender","black"),t=$('<div style="box-shadow: 0 0 7px #222; position: fixed; top: 10px; z-index: 900; display: none; background-color: '+e+';" />').appendTo("body");$("#bloc_contenu").find("ul.liste").on({mouseenter:function(){var n=$(this);t.html('<img src="'+n.attr("src").replace("mini","normal")+'" style="max-width: 500px;" />').css({left:n.offset().left+125,display:"block"}),$(document).bind("keydown.viewRender",function(n){switch(n.which){case 37:e="black",n.preventDefault();break;case 38:e="red",n.preventDefault();break;case 39:e="white",n.preventDefault();break;case 40:e="chartreuse",n.preventDefault()}GM_setValue("couleurViewRender",e),t.css("background-color",e)})},mouseleave:function(){t.hide(),$(document).unbind("keydown.viewRender")}},"img")})