// ==UserScript==
// @name       RYM: Track Ratings Total Averages
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  enter something useful
// @match      http://rateyourmusic.com/release/*
// @copyright  2012+, You
// ==/UserScript==

var $ = unsafeWindow.jQuery; 
avg = 0.0;
num = 0;
$.each($('#tracklisting > tbody > tr'), function(){
    if (!isNaN(parseFloat($(this).find('td:last').text()))){
        avg = avg + parseFloat($(this).find('td:last').text())
        num++;
    }
})

overall = avg/num;
if(!isNaN(overall)){
    if(document.getElementById('scrymblemarquee') != undefined){
        $('#tracklisting > tbody').append('<tr><td></td><td></td><td><b>Overall Average: </b>'+overall.toFixed(2)+'</td><td></td><td></td><td></td></tr>');
    } else{
        $('#tracklisting > tbody').append('<tr><td></td><td><b>Overall Average: </b>'+overall.toFixed(2)+'</td><td></td><td></td><td></td></tr>');
    }
}