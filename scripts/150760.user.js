// ==UserScript==
// @name        FAP Mario
// @namespace   http://www.erepublik.com
// @description 
// @include     http://www.erepublik.com/en/military/battlefield/*
// @include     http://www.erepublik.com/es/military/battlefield/*
// @version     0.2
// @require     http://code.jquery.com/jquery.min.js
// @grant       none
// ==/UserScript==

var mario_q1 = [{x: 258}, {y: 8}, {w: 14}, {h: 17}, {o: 14}];


var me = $("#scroller").children().first().children().first().children().first();
//me.attr("src", "http://imageshack.us/a/img41/6977/mario33.png");
me.attr("src", "");
me.css(["background-image": "http://www.spriters-resource.com/custom_edited/mario/mario33.png", "background-position": "0px 0px"]);
