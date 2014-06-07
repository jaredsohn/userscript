// ==UserScript==
// @name           Castle Age Stat Box
// @namespace      http://userscripts.org/users/ahmedabdou
// @description    A small utility that follows you around the game to help with a multitude of actions
// @include        http*://apps.facebook.com/castle_age/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var globalContainer = document.querySelector('#app46755028429_globalContainer');

$(document).ready(function() {
    process_box();
});


globalContainer.addEventListener('click', function(event) {
        process_box();
}, true);

globalContainer.addEventListener('load', function(event) {
        process_box();
}, true);

globalContainer.addEventListener('DOMNodeInserted', function(event) {
process_box();
}, true);


function process_box()
{
var navbar;

navbar = document.getElementById('app46755028429_globalContainer');
//navbar = document.getElementById('app46755028429_equippedGeneralContainer');

var box = document.createElement("div");
var Energy = $("#app46755028429_st_2_2 strong").text();
var Health = $("#app46755028429_st_2_3 strong").text();
var Stamina = $("#app46755028429_st_2_4 strong").text();

box.innerHTML = '<div style="position:fixed;top:50%;left:10px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 0.2em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Energy: ' + '</td>' + '<td>' +
    Energy + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Health: ' + '</td>' + '<td>' +
    Health + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Stamina: ' + '</td>' + '<td>' +
    Stamina + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
navbar.parentNode.insertBefore(box, navbar);
}