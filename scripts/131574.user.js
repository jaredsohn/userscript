// ==UserScript==
// @name           Politopia 2.0 MyStyle
// @namespace      KarlSRuher
// @description    Restyle Politopia
// @include        http://www.politopia.de/*
// @match          http://*.politopia.de/*
// ==/UserScript==

function addStyle(style)
{
   var head = document.getElementsByTagName("HEA­D")[0];
   var ele = head.appendChild(window.document.createElement('style'));
   ele.innerHTML = style;
   return ele;
}

alert(addStyle('@import "sbh.bplaced.net/politopia/myStyle.css"'));