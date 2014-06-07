// ==UserScript==
// @name        APOD
// @namespace   st0n3.co.uk
// @include     http://apod.nasa.gov/apod/*
// @version     5
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

var title   = $('b:eq(0)').text();
var prev    = 'http://apod.nasa.gov/apod/'+$('a:contains("<")').attr('href');
var next    = 'http://apod.nasa.gov/apod/'+$('a:contains(">")').attr('href');
var p       = $('p:eq(1)').html().split('<br>');
var p1      = $.trim(p[1]);
var date    = $.trim(p[0]).split(' ');
console.log(date);
var explanation = $.trim($('p:eq(2)').html());
explanation = explanation.substring(22);

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var d = new Date();
var year = d.getFullYear();
var month = monthNames[d.getMonth()];
var day = d.getDate();


$('body').empty();
$('body').prepend('<div id="header"><a href="http://www.nasa.gov/" id="logo"><i></i></a><h1>'+title+'</h1><a href="http://apod.nasa.gov/apod/astropix.html" id="date">'+date[2]+' '+date[1]+' '+date[0]+'</a></div> \
<a id="prev" href="'+prev+'"><span>&laquo;</span></a><a id="next" href="'+next+'"><span>&raquo;</span></a> \
<div id="image">'+p1+'</div> \
<div id="explanation">'+explanation+'</div>');

if(day == date[2] && month == date[1] && year == date[0]){
    $('#next').hide();
}


if (p1.toLowerCase().indexOf("iframe") >= 0) {
    $('iframe').addClass('iframe');
}



$('head').append(' \
<style> \
    body{ \
        background-color: #222; \
        font-family: Arial, Helvetica, sans-serif \
    } \
    a{ \
       color: #666; \
text-decoration: none; \
    } \
    #header{ \
        position: relative; \
        width: 900px; \
        height: 92px; \
        margin: 20px auto; \
     } \
    #logo{ \
        float: left; \
    } \
    #logo i{ \
        background-image: url(data:image/png;base64,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); \
        width: 110px; \
        height: 92px; \
       display: inline-block; \
        left: 0; \
    } \
    h1{ \
        color: #eee; \
        text-align: right; \
        line-height: 36px; \
        padding-top: 25px; \
        font-weight: 300; \
    } \
    #date{ \
       position: absolute; \
       top: 0; \
       right: 0; \
       color: #ccc; \
    }\
    #prev, #next{ \
        position:fixed; \
        top:0; \
        display:table; \
        height:100%; \
        text-align:center; \
        width:100px; \
        text-decoration:none; \
        font-size:50px; \
        color:#666; \
       transition: background-color 300ms; \
    } \
    #prev:hover, #next:hover{ \
       background-color: rgba(255,255,255,0.1); \
       transition: background-color 300ms; \
    } \
    #prev{ \
       left: 0; \
    } \
    #next{ \
       right: 0; \
    } \
    #prev span,#next span { \
       display: table-cell; \
       vertical-align: middle; \
    } \
    #image{ \
       width: 900px; \
       margin: 0px auto 30px; \
    } \
    #image img{ \
       width: 100%; \
       border-radius: 10px; \
       box-shadow: 0 0 10px 2px rgba(0,0,0,0.5); \
    } \
    .iframe { \
       width: 900px; \
    } \
    #explanation{ \
       color: #CCCCCC; \
       margin: 0 auto 30px; \
       text-align: justify; \
       width: 700px; \
    } \
        @media (max-width: 1160px) { \
             #header, #image, .iframe, #explanation{ \
                width: 700px; \
             } \
             #explanation { \
                 width: 600px; \
             } \
        } \
        @media (max-width: 980px) { \
             #header, #image, .iframe, #explanation{ \
                width: 600px; \
             } \
             #explanation { \
                width: 500px; \
             } \
        } \
        @media (max-width: 850px) { \
             #prev, #next { \
                width: 50px; \
             } \
        } \
</style>');