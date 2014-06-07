// Mirtesen group invitation script
// version 0.1
// 2008-12-15
// Copyright (c) 2008, Nikita Kabardin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mirtesen.ru GroupInviter
// @description   Advanced script to invite people to group at Mirtesen.ru social network
// @include       http://mirtesen.ru/*
// @include       http://*.mirtesen.ru/*
// ==/UserScript==

var getInviteButtons = function(){
    return document.getElementsByClassName("invite_into_group");
}

var getNextPageLink = function(){
    var active_span = document.getElementsByClassName("pages")[0]
    .getElementsByTagName("span")[0];
    
    var cur = active_span;
        
    while (cur.tagName !== "A" && cur !== null){ cur = cur.nextSibling;}
    
    if ( cur && cur.href ){ return cur.href } else { return }   
}

var getActiveButtons = function(){
    return document.getElementsByClassName("loading_sm");
}

var inviteAll = function(){
        while(getInviteButtons().length){
            buttons = getInviteButtons();
            for (i=0; i < buttons.length; i++){
                buttons[i].click()
            }
        }
        
        (function check (){
            var a = getActiveButtons();
            if (a&&a.length){setTimeout(check, 300)}else{
                var link = getNextPageLink();
                link && (document.location.href = link)
            }
        })()
}

var createSplash = function(){
    splash = document.createElement("div");
    splash.style.position = "fixed";
    splash.style.background = "#0099CC";
    splash.style.bottom = "0";
    splash.style.right = "0";
    splash.style.padding = "3px"
    a = document.createElement("a");
    a.style.color = "white";
    a.textContent = "Пригласить всех!";
    a.addEventListener("click", inviteAll, false);
    splash.appendChild(a);
    document.body.appendChild(splash);
}

if (getInviteButtons().length){
    createSplash();
}