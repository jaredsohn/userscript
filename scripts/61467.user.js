// ==UserScript==
// @name Hello habrahabr!
// @namespace absolvo.ru/
// @version 0.00001
// @source absolvo.ru/
// @description example script to insert div with h1 on every page habrahabr.ru
// @include *
// @exclude absolvo.ru/*
// ==/UserScript==

var str="<img src="http://s28.ucoz.net/sm/2/smile.gif">";
document.write(str.replace(":-)", "http://s28.ucoz.net/sm/2/smile.gif"));