// ==UserScript==
// @name           Bitefight: Menu button for City
// @description    Button for bitefight.ru
// @version	   1.0
// @include        http://*.bitefight.ru/*
// ==/UserScript==


(function() {
var strHTML = document.getElementsByTagName("html")[0].innerHTML;
var strpos = strHTML.search("robberystats");
var Buttons = document.getElementById('menuHead');
if (!Buttons) return;
    var div = document.createElement("div");
    var li = document.createElement("li");
	li.id = "city";
    div.appendChild(li);
    var a = document.createElement("a");
    li.appendChild(a);
	a.style.position = "important";
	a.style.background = "none";
	a.style.height = "10px";
if (strpos == "-1"){
	a.style.top = "-592px";
        } else {
	a.style.top = "-636px";
        }
	a.style.left = "33px";
	a.href = "#";
	a.className = "tooltip";
	a.target = "_top";
    a.innerHTML += '<style type="text/css">a.tooltip {position:relative; z-index:2; text-decoration:underline;} a.tooltip span {display: none} a.tooltip:hover span {display:block; position:absolute; border:0px; background: none; text-align: center;}</style><font size="+3">+</font><span><a href="/city/shop"  target="_top" class="" >Торговец</a><a href="/city/graveyard"  target="_top" class="" >Кладбище</a><a href="/city/taverne"  target="_top" class="" >Таверна</a><a href="/city/grotte"  target="_top" class="" >Пещера</a><a href="/city/market"  target="_top" class="" >Рынок</a><a href="/city/counterfeiter"  target="_top" class="" >Библиотека</a><a href="/city/church"  target="_top" class="" >Храм</a><a href="/city/arena"  target="_top" class="" >Дом Боли</a></span>';
Buttons.appendChild(div);
})()
