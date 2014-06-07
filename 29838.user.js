// ==UserScript==
// @name        muti
// @namespace   http://fluidapp.com
// @description Removes some elements from www.muti.co.za for an SSB
// @include     http://www.muti.co.za/*
// @author      Ismail Dhorat
// ==/UserScript=

var search = document.getElementById('banner'); 
search.parentNode.removeChild(search); 

var rfooter = document.getElementById('footer'); 
rfooter.parentNode.removeChild(rfooter);

var usercopy=document.getElementById('usernamedisplay');
var nav = document.getElementById("nav_strip");

nav.innerHTML = '<a class="view" href="/new">new</a>' + 
    '<a class="view" href="/hot">hot</a>' + 
    '<a class="view" href="/active">active</a>|';

nav.appendChild(usercopy);

var Sidebar = document.getElementById('rightcol');
Sidebar.parentNode.removeChild(Sidebar); 