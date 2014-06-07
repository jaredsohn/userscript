// ==UserScript==
// @name           ConvertIn
// @namespace      http://*
// @description    Replaces the word "in" with linkedin logo
// @include        http://*
// @include        https://*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
// auther:  petrifiednightmares (Jason Jiang)
// version: 0.0.4
  
/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 
  
/*! jQuery v1.7.2 jquery.com | jquery.org/license */
// the minimum version of jQuery we want

var PICTURE_URL = "http://i.imgur.com/L2SAXKn.png";
var PICTURE_HTML = "<img class='InLogo' style='height: REPLACE; position:relative; margin: -0.1em -0.2em; margin-bottom: -0.45em;' src='"+PICTURE_URL+"'></img>";



function replaceIn(element)
{
    var fontSize = element.css('font-size') || $("body").css('font-size') || "10px";
    var fontPixelSize = fontSizeToPixels(fontSize);
    var content = element.html();
    content = content.replace(/in/g,PICTURE_HTML.replace("REPLACE",fontPixelSize*2+"px"));
    element.html(content);          
    // console.log(fontSize);
}
function fontSizeToPixels(fontSize)
{
    if(fontSize.toLowerCase().indexOf("em") !== -1)
    {
        fontSize.substring(0,fontSize.length-2);
        return parseInt(fontSize) * 16;
    }
    else if(fontSize.toLowerCase().indexOf("px") !== -1)
    {
        fontSize.substring(0,fontSize.length-2);
        return parseInt(fontSize);
    }
    else
    {
        return 10;
    }
}

$(document).ready(function(){


    $("*").each(function(){
        if ($(this).children().length == 0) { 
            replaceIn($(this));
        }
    });

});
