// ==UserScript==
// @name       Piclair url fixer
// @namespace  http://google.com/
// @version    0.2
// @description Converts piclair.com/123abc to piclair.com/data/123abc.jpg
// @match      http://piclair.com/*
// @copyright  2012 makkesk8
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


var url = $("#resizeimg").attr("src");
var check = window.location.href.match("/data/");

if (check == null && url !== undefined)
{
    window.location  = "http://piclair.com" + url;   
}
else if (check == "/data/")
{
    $('body').html('<div style="text-align: center;"><img src="' + window.location + '" style="margin: 0 auto;" /></div>');
}