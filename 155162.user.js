// ==UserScript==
// @name        Post link
// @namespace   smk
// @include     http://2006scape.com/services/forums/thread.ws?*
// @include     http://*.2006scape.com/services/forums/thread.ws?*
// @version     1
// ==/UserScript==

$(function(){var a=window.location.href;$(".message").each(function(){$_=$(this);if(!$_.attr("class").match(/hid/)){var d=$_.find(".report").attr("href").match(/\d+$/);var e=",highlight,"+d+"#"+d;var c=/\,highlight\,\d+\#\d+/;var g=a.match(c)?a.replace(c,e):a+e;var f=$_.find(".msgtime").html();var b=document.createElement("a");b.setAttribute("href",g);b.setAttribute("title","click, then ctrl+c to copy");b.setAttribute("class","pl");b.innerHTML=(f);$_.find(".msgtime").html(b)}});$(".pl").on("click",function(){$_=$(this);var b=$_.html();var c=document.createElement("input");c.setAttribute("value",$_.attr("href"));c.setAttribute("type","text");c.setAttribute("size",50);c.setAttribute("class","pltxt");$_.html(c);$(".pltxt").select();$(".pltxt").on("blur",function(){$(this).parent().html(b)});return false})});