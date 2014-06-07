// ==UserScript==
// @name       Eventhubs fix
// @namespace  mynamespace
// @version    0.2
// @description  you can see the stories again with this, but you should really just install the noscript extension. Works in chrome, didn't test anything else.
// @match      
// @copyright  
// @include http://eventhubs.com/*
// @include http://www.eventhubs.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


$( "#site_center" ).css("display","block");

$("#main_content_left").children("div").each(function() 
{
this.style.display = "block";
});