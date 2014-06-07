// ==UserScript==
// @name        FoxSports Mod
// @namespace   http://msn.foxsports.com
// @description This is a FoxSports mod. 
// @include     http://msn.foxsports.com/collegefootball/team/*
// @include     http://msn.foxsports.com/collegefootball/team/*
// @include     http://msn.foxsports.com/collegefootball/game*
// @include     http://msn.foxsports.com/collegefootball/game*
// @include     http://msn.foxsports.com*
// @include     http://msn.foxsports.com/collegefootball*
// @include     http://msn.foxsports.com/collegefootball/standings*
// @include     http://qa.static.foxsports.com/fe/images/home/fs_defaultskin.jpg*
// @version     1.0
// ==/UserScript==
// Initiate custom CSS function


function GM_addStyle(css) {
    var parent, style, textNode;
    parent = document.getElementsByTagName("head")[0];
    if (!parent) {
        parent = document.documentElement;
    }
    style = document.createElement("style");
    style.type = "text/css";
    textNode = document.createTextNode(css);
    style.appendChild(textNode);
    parent.appendChild(style);
    }

// Custom CSS interface styling
GM_addStyle("\
.fyre .fyre-comment-actions a.fyre-delete-link {display:inline !important}\
.overlayBg { background:#000000 url('https://pbs.twimg.com/media/BRndHbUCEAAkmyN.png:large') repeat center top ; }"
);