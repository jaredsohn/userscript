// ==UserScript==
// @name        UP button for imageboards
// @namespace   function
// @include     http://2ch.hk/*
// @include     http://0chan.hk/*
// @include     http://dobrochan.ru/*
// @version     1
// ==/UserScript==
$(document).ready(function(){
 $('.footer').append($('<a href="#">').text('↑'))
 $('.adminbar').append($('<a href="#">').text('↑'))

})
