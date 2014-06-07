// ==UserScript==
// @name        Google Tasks for Pomodoro
// @description Replace Pomodoro's history with gtasks.
// @namespace   g2w.userjs.gmail_for_pomodoro
// @include     http://tomatoi.st/*
// @version     0.1
// @author      left
// ==/UserScript==
var iframe = '<iframe width="100%" height="270" frameborder="0" src="https://mail.google.com/tasks/ig"></iframe>';
var todo_container = document.getElementById('history');
var footer_container = document.getElementById('footer');
if (todo_container) todo_container.innerHTML = iframe;
if (todo_container) footer_container.parentNode.removeChild(footer_container);;