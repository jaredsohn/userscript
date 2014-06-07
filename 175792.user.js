// ==UserScript==
// @name        Forum Kappa
// @namespace   ad1n.tk
// @description Dodaje nowe emotikony na forum
// @include     http://www.leagueoflegends.pl/forum/*
// @include     *.leagueoflegends.pl/forum/*
// @include     leagueoflegends.pl/forum/*
// @grant       none
// @version     1
// ==/UserScript==

document.getElementById("quick_reply_submit").onclick=function(){
     var textField = document.getElementById("message");
     var textString = textField.value;
     textField.value = textString.replace("Kappa", "[img]http://i.imgur.com/ZHR7PKY.png[/img]");
};