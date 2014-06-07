// ==UserScript==
// @name          GomTV Remove Comments
// @description   Hides VOD Comments
// @include       http://gomtv.net/*
// @include       http://*.gomtv.net/*
// ==/UserScript==

var NavigationSection = document.getElementById("replyWI");

var MyButtonShow = document.createElement("input");
MyButtonShow.setAttribute("type", 'button');
MyButtonShow.setAttribute("name", 'ShowCommentsBtn');
MyButtonShow.setAttribute("value", 'Show Comments');

var MyButtonHide = document.createElement("input");
MyButtonHide.setAttribute("type", 'button');
MyButtonHide.setAttribute("name", 'HideCommentsBtn');
MyButtonHide.setAttribute("value", 'Hide Comments');

MyButtonShow.addEventListener("click", function(e) { var element = document.getElementById('gomChat'); element.style.display = 'block'; }, false);
MyButtonHide.addEventListener("click", function(e) { var element = document.getElementById('gomChat'); element.style.display = 'none'; }, false);

NavigationSection.appendChild(MyButtonShow);
NavigationSection.appendChild(MyButtonHide);