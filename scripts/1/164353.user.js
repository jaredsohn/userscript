// ==UserScript==
// @name           Add IRC Chat to navbar
// @description    Add a link to the IRC chat
// @include        http://www.cs-manager.com/csm/*
// @include        http://www.cs-manager.com/forum/*
// ==/UserScript==


var ol = document.getElementById("main-nav");
if(!ol) 
    return;

var ul = document.createElement('ul');
ul.setAttribute("class", "right");
ul.innerHTML = "<li><a href='http://cs-manager.comuf.com'>IRC</a></li>";
ol.appendChild(ul);