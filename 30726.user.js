// ==UserScript==
// @name			D3i v2
// @description		Rich Dirty Anchors
// @namespace		http://*dirty.ru/*
// @namespace		http://*d3.ru/*
// @include			http://*dirty.ru/*
// @include			http://*d3.ru/*
// @namespace		http://217.106.233.10/*
// @include			http://217.106.233.10/*
// @namespace		http://*leprosorium.ru/*
// @include			http://*leprosorium.ru/*
// @author			G (agel) <agel.selena@gmail.com>
// @date			2008-07-28 [23:35 AM]
// @version			0.0.2.2G
// ==/UserScript==

(function (){
var s = document.createElement("style");
var h = document.getElementsByTagName("head")[0];
s.setAttribute("type", "text/css");
s.innerHTML = ".dt > a:hover[href *=\".youtube.com/\"], .dt > a:hover[href *=\".wikipedia.org/\"], .dt > a:hover[href *=\".livejournal.com/\"], .dt > a:hover[href *=\"lenta.ru/\"], .dt > a:hover[href *=\"newsru.com/\"], .dt > a:hover[href *=\".d3.ru/\"], .dt > a:hover[href *=\".dirty.ru/\"], .dt > a:hover[href *=\"d3.ru/\"], .dt > a:hover[href *=\"dirty.ru/\"], .dt > a:hover[href *=\".leprosorium.ru/\"], .dt > a:hover[href *=\"leprosorium.ru/\"]{padding-right:17px} .dt > a:hover[href *=\".youtube.com/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171706-ea1e41a263f2dc0354f11e5265373ce2.png) no-repeat center right} .dt > a:hover[href *=\".wikipedia.org/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171711-3cd92e5bd3ad9fd33183aa19d9d51e7c.png) no-repeat center right} .dt > a:hover[href *=\".livejournal.com/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171718-1024bdbaed673c809fec7445e3b4dcb5.png) no-repeat center right} .dt > a:hover[href *=\"lenta.ru/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171725-efbff71cb46ce1f312e6c7bc9db2cca8.png) no-repeat center right} .dt > a:hover[href *=\"newsru.com/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171730-c47218248ce894724cd7bf8c1a356db7.png) no-repeat center right} .dt > a:hover[href *=\".d3.ru/\"], .dt > a:hover[href *=\".dirty.ru/\"], .dt > a:hover[href *=\"d3.ru/\"], .dt > a:hover[href *=\"dirty.ru/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171652-888636ac4480be2e030bf8fd1728f2e0.png) no-repeat center right} .dt > a:hover[href *=\".leprosorium.ru/\"], .dt > a:hover[href *=\"leprosorium.ru/\"]{background: url(http://pit.dirty.ru/dirty/1/2008/07/27/20036-171700-0c4df33741e14f3096c2673b4b5b91da.png) no-repeat center right}";
h.appendChild(s);})();