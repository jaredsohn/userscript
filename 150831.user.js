// ==UserScript==
// @name        FAP Dragon Ball
// @namespace   http://www.erepublik.com
// @description 
// @include     http://www.erepublik.com/en/military/battlefield/*
// @include     http://www.erepublik.com/es/military/battlefield/*
// @version     0.1
// @require     http://code.jquery.com/jquery.min.js
// @grant       none
// ==/UserScript==

var ssj = "https://dl.dropbox.com/u/14444813/eR/DB/";


var me = $("#scroller").children().first().children().first().children().first();
//me.attr("src", "http://imageshack.us/a/img41/6977/mario33.png");
me.attr("src", "");
me.css({"background-image": ssj + "ssj0/01.png", "background-position": "0px 0px"});
