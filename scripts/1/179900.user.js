// ==UserScript==
// @name       1672340 - Education Time
// @namespace  http://www.torn.com/profiles.php?XID=1672340
// @version    1.1
// @description  Displays the time of the education course being viewed while taking into consideration perks and merits.
// @include     http://www.torn.com/*
// @require 	ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013, Fumph
// ==/UserScript==

/* BEFORE YOU USE! 
 * 
 * The following variable, yourEducationMerits, should be equal to the amount of merits you have spent on the education length upgrade, 0-10.
 * 
 * */

var yourEducationMerits = 3

$( document ).ready(function() {
    var acceptWin = 'http://www.torn.com/education.php?step=info';
    if (window.location.href.substr(0,acceptWin.length) == acceptWin) {
        var amountOff = 0
        $.get("index.php",function(data){
            $(data).find('#perks').find('tbody').children().each(function() {
                var txt = $(this).text();
                if (txt.indexOf('% Education') !== -1){
                    amountOff += Number(txt.substring(txt.indexOf(':')+4,txt.indexOf('%')));
                } 
                if (txt.indexOf('− Education') !== -1){
                    if (yourEducationMerits > 10 || yourEducationMerits < 0) yourEducationMerits = 0;
                    amountOff += yourEducationMerits*2
                }
            });
            amountOff /= 100;
            amountOff = 1-amountOff
            $.get(window.location.href,function(data){
                var timewo = data.substring(data.indexOf('<b>Length:</b>')+'<b>Length:</b>'.length,data.indexOf(' week'));
                var timewosec = Number(timewo)*7*24*60*60;//Week*Day*hour*minute*sec
                $('b:contains(Cost)').before('<b>Length with Perks:</b> '+secondsToReadable(amountOff * timewosec)+'<br><br>')
            });
        });
    }
});
function secondsToReadable(seconds){
    
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var seconds = Math.round(((seconds % 86400) % 3600) % 60);

    return days+' days, '+hours+' hours, '+minutes+' minutes, '+seconds+' seconds';
}