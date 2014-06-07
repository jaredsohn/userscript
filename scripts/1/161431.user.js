//Following code belongs to RustleLeague;@RustleLeague;nazifag.com;lowermyjews.org;owned.cc;spyc0;etc.
//Copyright 04-20-1889 Adolf Hitler and RustleLeague;@RustleLeague;nazifag.com;lowermyjews.org;owned.cc;spyc0
//This program is jew-free software: you can redistribute it to non-jews and/or modify
//it under the terms of the Nazi Party also known as Nationalsozialistische Deutsche Arbeiterpartei (NSDAP) the "National Socialist German Workers Party" as published by 
//The Chancellor of Germany and dictator of Nazi Germany (Führer und Reichskanzler).
//This program is distributed in the hope that it will be useful for continuing the Third Reich of Germany - Deutschland,
//but WITHOUT ANY SUICIDE THIS TIME; without even the implied warranty of
//CAMPS or FREIGHT TRAINS FOR ANY PARTICULAR PURPOSE.
//You should have received a copy of the RustleLeague;@RustleLeague;nazifag.com;lowermyjews.org;owned.cc;spyc0 General Public License
//along with this program. If not, see <http://nazifag.com; http://lowermyjews.org; https://twitter.com/RustleLeague>.
//

// ==UserScript==
// @id             RustleLeagueTinyChat
// @name           Rustle League OFFICIALLY STOLEN TinyChat DeRustler ROFL nazifag.com
// @version        0.1
// @namespace      RustleLeagueTinyChat
// @author         @spyc0; @RustleLeague
// @description    Rapes tinychat to be good ex: https://tinychat.com/dannydantali0n
// @author         https://twitter.com/spyc0 https://twitter.com/RustleLeague 
// @include         https://tinychat.com/*
// @include         http://tinychat.com/*
// @exclude        http://*.seacows.*/*
// @exclude        https://*.seacows.*/*
// ==/UserScript==

// style adding
function addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}

// element removal by id
function removeById(id)
{
    var element = document.getElementById(id);
    if (element)
        element.parentNode.removeChild(element);
}

// resize the heigh to fit the screen
function resizeTinyChat()
{
    document.getElementById('chat').style.height = (document.getElementsByTagName('body')[0].clientHeight-30) + "px";
}

// main cleanup function
function cleanerTinyChat()
{
    // modify css styles
    addStyle("#wrapper { width: 100% ! important;}");
    addStyle("#left_block { width: 100% ! important;}");

    // remove unncecessary elements
    removeById('header');
    removeById('footer');
    removeById('right_block');
    removeById('room_header');
    removeById('ad_banner');
    removeById('body_footer_ad');
    removeById('chat-info');
    removeById('goods');

    // resize the heigh to fit the screen
    resizeTinyChat();
    window.addEventListener('resize', resizeTinyChat, false);
}

// setup full windows button
function addMaximizeButton()
{
    // only work on rooms
    if (!document.getElementById('room'))
        return;

    // add the maximize button right after the logo
    var link = document.createElement('a');
    var div = document.getElementById('logo');
    link.className = 'button orange';
    link.addEventListener('click', cleanerTinyChat, false);
    link.innerHTML = '<img src="http://tinychat.com/public/images/exclaim.png">Maximize'
    link.style.position = 'absolute';
    div.appendChild(link);
}

addMaximizeButton();