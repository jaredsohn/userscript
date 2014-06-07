// ==UserScript==
// @name        Hacker News Easy Links
// @namespace   http://userscripts.org/users/491582
// @description Adds 4 links to HN top bar.
//              Links are top, active, best, best comments
//              These are accessible after clicking lists at the bottom of the page, now they are directly acccessible with one click
// @include     https://news.ycombinator.com/*
// @version     1.0
// @author      divya
// @grant       none
// ==/UserScript==

var init = function(){
    var header = document.getElementsByClassName('pagetop');
    //check if we are already on the page
    
    if(header[0].innerHTML.indexOf("front page") == -1){
        header[0].innerHTML += " | <a href='news'>front page</a>";
    }
    
    if(header[0].innerHTML.indexOf("active") == -1){
        header[0].innerHTML += " | <a href='active'>active</a>";
    }
    
    if(header[0].innerHTML.indexOf("best") == -1){
        header[0].innerHTML += " | <a href='best'>best</a>";
    }
    
    if(header[0].innerHTML.indexOf("best comments") == -1){    
        header[0].innerHTML += " | <a href='bestcomments'>best comments</a>";
    }
};

init();