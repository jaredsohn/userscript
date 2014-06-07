// ==UserScript==
// @name           YouTube's Old Favicon
// @version        1.0
// @description    Replaces YouTube's new favicon with its old one. Based on "Google's Old Favicon" by MkFly.
// @author         MkFly & David Levy
// @namespace      http://userscripts.org/users/32868
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var vodka = document.createElement('link');
vodka.setAttribute('type', 'image/x-icon');
vodka.setAttribute('rel', 'shortcut icon');
vodka.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8AEiP//xIj//8SI///EyP//xIj//8SI///EiP//xIj//8SI///EyP//xIj//8SI///EiP//xIj//////8AEiP//wAc7v8AHO7/AB3v/wAc7v8AHO7/ABzu/wAc7v8AHO7/ABzu/wAd7/8AHe//ABzu/wAc7/8AHe//EiP//xIj//8SI////////09V//+6uv////////////9PVf//z87///////+ysv//EiP//5ub////////0tH//xIj//8SI///EiP///////9PVf///////xIj////////T1X///////8SI////////5qZ////////EiP//xIj//8TI///EiP//xIj////////T1X///////8TI////////09V////////EiP///////+amf/////////////S0f//EiP//xIj//8SI////////09V////////EiL///////9PVf////////////+6uv//EiP//7q6///v8P//0tH//xIj//8SI///EyP///////8SI///EiP//xIj//8SI///EiP///////8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP//////////////////xIj//8SI///EiP//xMj////////EiP//xIj//8SI///EiP//xIj//8SI///EiP//9nZ//8SI///EiP//xMj//8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiL//9na//////////////////////////////////////////////////////////////////////////////////////////////////+r5/b/AAAA//372P//////R5K5/wAAAP/IiWb//////26v1f8AAAD/rGZE////////////////////////////qub1/wAAAP/+/Nj/qub2/wAAAP//////AAAA//782P8TcJ3//vzY/wAAAP///////////////////////////6rm9f8AAAD//vzY/6rm9v8AAAD//////wAAAP/+/Nj/AAAA//////8AAAD///////////////////////////9ur9b/AAAA/+PFov//////R5K6/wAAAP/JiWb//////wAAAP//////AAAA////////////////////////////AAAA//+p7/8AAAD/////////////////////////////////////////////////////////////////bq7V/wxKf///////rGZE/+PFov//////////////////////////////////////////////////////gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==');
head.appendChild(vodka);