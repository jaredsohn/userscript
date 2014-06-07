// ==UserScript==
// @name			Hello_World
// @namespace			Hello_World_0123
// @description			Hello_World_0123_Test
// @author			Hello_World
// @include			htt*://www.facebook.com/*
// @version			0.0
// ==/UserScript==
var get_stat = Math.floor((Math.random()*24));
var t_delay = Math.floor((Math.random()*60)) * 3000;
var random_stat = ["Hello World!",""];
document.getElementsByTagName('textarea')[0].value = random_stat[get_stat] + "\n\n" +Date();
window.setTimeout(function(){document.getElementById('u_0_l').submit();},t_delay);