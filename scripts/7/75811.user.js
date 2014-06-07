// ==UserScript==
// @name           Reddit Comment Navigation Keys
// @namespace      skyo
// @description    Use h, j, k, and l to navigate comments
// @include        http://www.reddit.com/r/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

const selector = ".comment:first";

var cursor;

$(document).keypress(
    function(event){
        var newCursor;   
             
        if(event.which == '106'){ //j
            newCursor = cursor ? cursor.nextAll(selector) : $(selector);
        } 
        else if (event.which == '107' && cursor) { //k
            newCursor = cursor.prevAll(selector);
        } 
        else if (event.which == '108' && cursor) { //l
            newCursor = cursor.find(selector);
        } 
        else if (event.which == '104' && cursor) { //h
            newCursor = cursor.parents(selector);
        }
                
        if(newCursor && newCursor.length > 0){
            cursor = newCursor;
            cursor[0].scrollIntoView();
        }
    }
);
