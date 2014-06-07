// ==UserScript==
// @id			lwgame_header_images
// @name		lwgame_header_images
// @namespace		http://userscripts.org/scripts/show/104873
// @version		1.0
// @history		1.0 Релиз
// @include		http://www.lwgame.net/*
// @updateURL		https://userscripts.org/scripts/source/104873.meta.js
// @download		http://userscripts.org/scripts/source/104873.user.js
// ==/UserScript==
///////////////////////////////////////////////////////////////////////
//  			Выставите тут свои ссылки                    //
///////////////////////////////////////////////////////////////////////
var night=""; //Прямая cсылка на ночную картинку
var morning=""; //Прямая cсылка на утреннюю картинку
var day=""; //Прямая cсылка на дневную картинку
var evening=""; //Прямая cсылка на вечернюю картинку
///////////////////////////////////////////////////////////////////////
//  			НИЖЕ НИЧЕГО НЕ ТРОГАТЬ!!!                    //
///////////////////////////////////////////////////////////////////////

function $(period){if(period=="night") var time=night;if(period=="morning") var time=morning;if(period=="day") var time=day;if(period=="evening") var time=evening;
return document.getElementById("top_fixing").parentNode.innerHTML='<img src="'+time+'" style="position:relative" width="100%" height="auto"/>';}
document.addEventListener('DOMContentLoaded',function(){
var h=(new Date()).getHours();
if (h > 23 || h <7)   $("night")
if (h > 6 && h < 12)  $("morning")
if (h > 11 && h < 19) $("day")
if (h > 18 && h < 24) $("evening")
},false);