// ==UserScript==
// @name          usernumber
// @description   usernumber
// @include       http://www.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

var _username = document.getElementsByTagName('h2')[0];
var _number = $('uservote').getElementsByTagName('div')[0].getAttribute('uid');
_username.innerHTML = _username.innerHTML + ' | ' + _number;
