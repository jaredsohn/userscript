// ==UserScript==
// @name        Google Tasks for Pomotodo
// @description Replace pomotodo's todo-list with gtasks.
// @namespace   g2w.userjs.gmail_for_pomotodo
// @include     http://pomotodo.com/*
// @version     0.3
// @author      greatghoul
// ==/UserScript==

var todo_container = document.getElementById('todo');

var preloader = document.createElement('div');
preloader.style.width = '100%';
preloader.style.height = '305px';
preloader.style.lineHeight = '305px';
preloader.style.textAlign = 'center';
preloader.style.fontWeight = 'bold';
preloader.style.color = '#888';
preloader.innerHTML = 'Loading Google Tasks ...';

todo_container.innerHTML = '';
todo_container.appendChild(preloader);

var iframe = document.createElement('iframe');
iframe.width = '100%';
iframe.height = '305';
iframe.style.display = 'none';
iframe.frameBorder = '0';
iframe.src = "https://mail.google.com/tasks/ig";
iframe.onload = function () {
    this.style.display = 'block';
    preloader.style.display = 'none';
};

todo_container.appendChild(iframe);