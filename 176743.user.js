// ==UserScript==
// @name        btspread
// @namespace   colossus123
// @include     http://www.btspread.com/magnet/detail/hash/*
// @version     1
// ==/UserScript==

xaddress = document.getElementById("magnetLink")
x = document.getElementById("magnetDownload")
x.href = "http://www.happyfuns.com/happyvod/?url="+xaddress.innerHTML

//for liu