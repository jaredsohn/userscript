// ==UserScript==
// @name           OnlinerNews Comments Enumerator
// @namespace      http://userscripts.org/users/294297
// @description    Adds serial numbers to comments
// @description    Let's count the comments!
// @author         Intnzy
// @licanse        GPL v3
// @version 1.5
// @match        http://dengi.onliner.by/*
// @match        http://auto.onliner.by/*
// @match        http://realt.onliner.by/*
// @match        http://tech.onliner.by/*
// @include        http://dengi.onliner.by/*
// @include        http://auto.onliner.by/*
// @include        http://realt.onliner.by/*
// @include        http://tech.onliner.by/*
// @grant       none
// ==/UserScript==

(function(){
    var element = document.getElementsByClassName('comment-info');
    
    for (var i=1; i<=element.length; i++){
        element[i-1].innerHTML="<span id=\"comment_number\" style=\"color: #6E67F5; background-color: #FFFF5E; font-weight: bold;\">#"+i+"</span> "+element[i-1].innerHTML
        }
    }
)();
