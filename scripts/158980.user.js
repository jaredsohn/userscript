// ==UserScript==
// @name           avare be oyunlar
// @description    avare be oyunlar
// @include        http://avare.be/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        1.0
// ==/UserScript==
var bulrandomgul = $("div#usticsol");
var style = "padding:10px;margin-left:2px;display: inline-block;margin-top:2px;text-transform: none;";
bulrandomgul.after('<a class="but" href="http://avare.be/half%20life%20ba%C5%9Fl%C4%B1%C4%9F%C4%B1.html" name="bkz" target="main" style="'+style+'">Half-Life</a>');
bulrandomgul.after('<a class="but" href="http://avare.be/haxball%20ba%C5%9Fl%C4%B1%C4%9F%C4%B1.html" name="bkz" target="main" style="'+style+'">Haxball</a>');
bulrandomgul.after('<a class="but" href="http://avare.be/tank%20ba%C5%9Fl%C4%B1%C4%9F%C4%B1.html" name="bkz" target="main" style="'+style+'">Tank</a>');