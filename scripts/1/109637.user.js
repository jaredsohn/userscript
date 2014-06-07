// ==UserScript==
// @name Hello habrahabr!
// @namespace absolvo.ru/
// @version 0.01
// @source absolvo.ru/
// @description example script to insert div with h1 on every page habrahabr.ru
// @include habrahabr.ru/*
// @include http://*.privatbank.ua/*
// @exclude absolvo.ru/*
// ==/UserScript==

var logo = document.createElement(«div»);
logo.innerHTML = '
<div style=«margin: 0pt auto; width: 800px; text-align: center;»>
<h1 style=«margin: 15px;»>' +
'Hello World habrahabr! ' +
'</h1>
</div>
';

document.body.insertBefore(logo, document.body.firstChild);
