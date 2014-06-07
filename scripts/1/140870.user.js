// ==UserScript==
// @name        echo download fix
// @namespace   ilearn
// @description fix echo360
// @include     http://echo.mq.edu.au:8080/ess/echo/presentation/*
// @include     http://content.echo.mq.edu.au:8080/ess/echo/presentation/*
// @version     1
// ==/UserScript==

var link = document.querySelector('a');
var vid = document.querySelector('embed'); link.href = vid.src;