// ==UserScript==
// @name       VKontakte TO-DO List
// @match      http://vk.com/*
// @match      https://vk.com/*
// @include       vk.com/*
// @include       http://vk.com/*
// @include       https://vk.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


$(document).ready(function() {

    addGlobalStyle('#todo-box {position: fixed;right: 20px;bottom: 0;display: block;width: 200px;background: #EEF0F2;z-index: 100 !important;height: auto;font-size: 1.1em;}'
                   + 'h4.todo-title{cursor: pointer;background: #597BA5;padding: 10px;color: #fff;font-size: 1.1em;font-weight: 100;}'
                   + '#todolist li {border-bottom: 1px solid #ccc;padding: 5px 10px;margin: 0;line-height: 15px;}'
                   + 'h4.todo-title:before {content: "▼";float: right;font-weight: 100;color: #C7D7E9;}'
                   + 'ul#todolist {margin: 0;padding: 0px;color: #333;list-style: none;outline: none;}'
                   + '.todo-btn {padding: 4px 10px;line-height: 25px;background: #5E95D1;border-radius: 4px;color: #fff;margin-left: 15px;}');

    $("#side_bar").append('<div id="todo-box"><h4 class="todo-title clear_fix">To-Do: Список дел</h4>'
                          + '<ul id="todolist" contenteditable><li>Купить молоко</li></ul></div>');

    var $ul = $('#todolist');

    $('#todolist li').append("test");


    if(localStorage.getItem('list')){
        $ul.html(localStorage.getItem('list'));
    }

    // autosaving
    $ul.keydown(function () {
    	localStorage.setItem('list', $ul.html());
    });

    $ul.keyup(function () {
    	localStorage.setItem('list', $ul.html());
    });


    $('.todo-title').click(function() {
       $('#todolist').slideToggle('200');
    });

});