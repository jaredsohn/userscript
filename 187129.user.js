// ==UserScript==
// @name       System Empires - Hangar
// @namespace  http://extreme.sysemp.com
// @version    0.2
// @description  enter something useful
// @match      http://extreme2.sysemp.com/hangar.php*
// @copyright  2013+, Magnus Man
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {
    $(".time label").each(function(index) { 
        var hms = $(this).html(); 
        if(hms.indexOf('s') > -1) {
            hms = hms.replace('s','');      
        } 
        if(hms.indexOf('m') > -1) {
            hms = hms.replace('m ',':')
        } 
        if(hms.indexOf('h') > -1) {
            hms = hms.replace('h ',':');
        } 
        var a = hms.split(':'); // split it at the colons
        if(a.length == 1) {
            a[2] = a[0];
            a[1] = "00";
            a[0] = "00";
        }
        if(a.length == 2) {
            a[2] = a[1];
            a[1] = a[0];
            a[0] = "00";
        }
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        var t = new Date();
        t.setSeconds(t.getSeconds() + seconds);
        var curr_date = t.getDate();
        var curr_month = t.getMonth() + 1; //Months are zero based
        var curr_year = t.getFullYear();
        var currHour = t.getHours();
        var currMinutes = t.getMinutes();
        var currSeconds = t.getSeconds();
        $(this).after("<div style='position:relative;'><span style='color:#FF0000; right: 0; position: absolute; top: 2px;' class='toTime" + index + "'>" + atLeastTwo(curr_date) + "/" + atLeastTwo(curr_month) + " " + atLeastTwo(currHour)+":"+atLeastTwo(currMinutes)+":"+atLeastTwo(currSeconds) +"</span></div>");     }); 
    
    
    setInterval(function() {
        $(".time label").each(function(index) { 
            var hms = $(this).html(); 
            if(hms.indexOf('s') > -1) {
                hms = hms.replace('s','');      
            } 
            if(hms.indexOf('m') > -1) {
                hms = hms.replace('m ',':')
            } 
            if(hms.indexOf('h') > -1) {
                hms = hms.replace('h ',':');
            } 
            var a = hms.split(':'); // split it at the colons
            if(a.length == 1) {
                a[2] = a[0];
                a[1] = "00";
                a[0] = "00";
            }
            if(a.length == 2) {
                a[2] = a[1];
                a[1] = a[0];
                a[0] = "00";
            }
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            if($(this).parent().parent().parent().find("input").length > 0) {
                seconds = seconds * $(this).parent().parent().parent().find("input").val(); 
            }  
            var t = new Date();
            t.setSeconds(t.getSeconds() + seconds);
            var curr_date = t.getDate();
            var curr_month = t.getMonth() + 1; //Months are zero based
            var curr_year = t.getFullYear();
            var currHour = t.getHours();
            var currMinutes = t.getMinutes();
            var currSeconds = t.getSeconds(); 
            if(!isNaN(seconds))
                $(".toTime" + index).html(atLeastTwo(curr_date) + "/" + atLeastTwo(curr_month) + " " + atLeastTwo(currHour)+":"+atLeastTwo(currMinutes)+":"+atLeastTwo(currSeconds)); 
        }); 
        
    },1000);
});

function atLeastTwo(number) {
    return (number < 10 ? "0"+number : number);   
}