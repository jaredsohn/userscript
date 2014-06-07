// ==UserScript==
// @name       Zoopla - address in title
// @namespace  http://delyan.me
// @version    0.1
// @description  Put property address in the title on Zoopla. Additionally, if the price is available, it will be appended as well
// @match      http://*zoopla.co.uk/*/details/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright  2012+, Delyan Kratunov
// ==/UserScript==

$(function(){
    var title = $("#listing-details-address h2").text();
    var price = $("#listing-details-price");
    var pw = $("span", price).text().replace(/[ ()]*/g, "");
    var pcm = price.remove("span").text();
    
    var price_text = "";
    if(pw) {
        price_text = "[" + pw + "]";
    } else if (pcm) {
        price_text = "[" + pcm + "]";
    } else {
    }
    
    document.title = title + " " + price_text;
});
