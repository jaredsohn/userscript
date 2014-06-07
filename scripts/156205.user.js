// ==UserScript==
// @name       Kanobu Shouts Refresh
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Updates Kanobu Shouts
// @match      http://kanobu.ru/*
// @copyright  2013+, OREL
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
var $ = window.jQuery;

$(document).ready(function(){
function updateShouts(){
              $.get('http://kanobu.ru/',function(data){
                  var shouts = $(data).find('.crylist-mini').html();
                  $('.crylist-mini').html(shouts);
                  setTimeout(updateShouts(), 1000);
            });    
        }
updateShouts();
});