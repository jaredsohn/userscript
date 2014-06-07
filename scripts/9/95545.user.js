// ==UserScript==
// @author         jrwisard
// @name           Sidebar on the left for joyreactor.ru
// @namespace      joyreactor
// @description    Get sidebar to the left again for joyreactor.ru site
// @include        http://www.joyreactor.ru/*
// @include        http://joyreactor.ru/*
// ==/UserScript==

var sideBar = document.getElementById('sidebar');
var mainContent = document.getElementById('content');

sideBar.style.cssFloat = 'left';
mainContent.style.cssFloat = 'right';

var href = 'http://www.assembla.com/spaces/empaty/milestones/331851-%D0%A1%D0%B0%D0%BF%D0%BF%D0%BE%D1%80%D1%82';
var link = document.createElement('a');
var listNode = document.createElement('li');

link.setAttribute('href', href);
linkText=document.createTextNode('Саппорт');
link.appendChild(linkText);

listNode.appendChild(link);

var insertInto = document.getElementById('navlist');

insertInto.appendChild(listNode);