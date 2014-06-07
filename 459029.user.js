// ==UserScript==
// @name        Mangaupdates Scanlationsgroup Website quicklink
// @description Makes the group name a clickable link to a google query with "<groupname> + scan". Access Scanlation sites more quickly
// @include     *mangaupdates.com/groups*
// @version     1
// ==/UserScript==

var element = document.getElementsByClassName('specialtext');
var name = element[0].innerHTML;
name = name.replace(/ /g, '+');
element[0].innerHTML = '<a href = https://www.google.de/#q='+name+'+scan>'+element[0].innerHTML+'</a>';