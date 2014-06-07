// ==UserScript==
// @name        %name%
// @namespace   %namespace%
// @description %description%
// @include     https//*.google.ru/*
// @exclude     %exclude%
// @version     1
// @grant       none
// ==/UserScript==
select=document.getElementById('hplogo')
selectCont = select.parent
selectCont.appendChild(select.cloneNode(true))

selectCont.appendChild(select.cloneNode(true))

selectCont.appendChild(select.cloneNode(true))