// ==UserScript==
// @name        League of Legends
// @namespace   League of Legends
// @description Enlarge the new forum from League of Legends
// @include     http://forums.*.leagueoflegends.com/board/*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==




$(".section-wrapper-content-wrapper").width('85%');
$("#breadcrumbs").width('85%');
$(".section-wrapper-top").height('150px');
$(".table td a").css({'font-size':'16px'}); 
$(".section-wrapper-content").css("background-image", "url(http://nsa33.casimages.com/img/2013/08/01/130801021017332908.png)");  
$(".section-wrapper-bottom").css("background-image", "url(http://nsa34.casimages.com/img/2013/08/01/130801020041170294.png)");
$(".section-wrapper-top").css("background-image", "url(http://nsa34.casimages.com/img/2013/08/01/130801035140164532.png)");  
$('head').append("<style>.section-wrapper-top:before{ display:none; }</style>");

