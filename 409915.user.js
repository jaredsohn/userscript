// ==UserScript==
// @name        Facebook_color
// @namespace   facebook.com
// @description Mudar a cor do Facebook!
// @include     https://www.facebook.com/
// @require     http://code.jquery.com/jquery-2.1.0.js
// @version     1
// @grant       none
// ==/UserScript==


$("#blueBar").css("background-image", "none");
$("#blueBar").css("background-color", "green");
$("#blueBar a").css("color", "white");

