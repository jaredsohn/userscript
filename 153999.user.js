// ==UserScript==
// @name        1chan UP button
// @namespace   object
// @include     http://1chan.ru/*
// @version     1
// ==/UserScript==
$(document).ready(function(){
 $('.b-underlinks').append($('<a href="#">').text('Вверх ↑')) 

})
