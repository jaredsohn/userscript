// ==UserScript==
// @name        Random Netflix Movie
// @namespace   Benjamin Højmose Grevenkop-Castenskiold
// @description Add a button to watch a random movie on netflix
// @include     *netflix.com*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

function grm()
{
    var MoviesAv=Array();
    MoviesAv=document.getElementsByClassName("boxShotImg");
    var RandomNumber=Math.floor(Math.random()*1001);
    var Select=MoviesAv[RandomNumber];
    window.location.replace(Select.nextSibling.href);
}


 
var ra = '<li id="aser" class="nav-recentadditions nav-item">'+
'<span class="i-b content">'+
        '<a onclick="grm();">'+
'   '+
            'Random movie'+   //change for your language
'     '+
        '</a>'+
    '</span>'+
    '<span class="i-b shim"></span>'+
    '<span class="down-arrow"></span>'+
    '<span class="down-arrow-shadow"></span>'+
'   '+
'</li>                                 '             

$("#rTab").after($(ra));
$('#aser').click( function() { grm(); return false; } );
