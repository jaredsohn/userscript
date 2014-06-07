// ==UserScript==
// @name         ReviewBoardEx
// @namespace    http://userscripts.org/users/introkun
// @description  Enhancements for sites using Review Board (www.reviewboard.org)
// @match        http://*/dashboard/*
// @match        http://*/r/*
// @updateURL    http://userscripts.org/scripts/source/178584.user.js
// @run-at       document-end
// @grant        none
// @version      1
// ==/UserScript==

var container = document.getElementById('container');
var headerbar = document.getElementById('headerbar');
var navbar = document.getElementById('navbar');
var pageContainer = document.getElementById('page-container');

if (container == undefined && headerbar == undefined && navbar == undefined &&
    pageContainer == undefined)
{
    return;
}

var newListItem = document.createElement('li');
newListItem.innerHTML = '<a href="/dashboard/?view=to-me\"">To Me</a>';
navbar.appendChild(newListItem);