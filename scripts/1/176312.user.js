// ==UserScript==
// @name        Kongregate - Show Chat Loader SWF
// @namespace   http://www.kongregate.com/accounts/Kannushi_Link
// @description Show Kong Chat Loader SWF so you can click to activate chat when you turn on "click to play" in [about:config] and choose "ask to activate" in (addon -> plugin) in Firefox
// @author      Link Wang (Kannushi_Link)
// @version     1.0.0
// @date        8.22.2013
// @grant       none
// @include     http://kongregate.com/games/*
// @include     http://www.kongregate.com/games/*
// ==/UserScript==

//do it when page finish loading or it won't work
window.addEventListener('load', function() {
    //1. get chat SWF object element
    a=document.getElementById("konduit");
    //2. set size, can not be too small or it won't work
    a.height=100;
    a.width=100;
    //3. and force reorder the parent div(s) so Firefox can "redraw" it
    a.parentNode.appendChild(a);
    //4. ???
    //5. profit!!!
}, false);