// ==UserScript==
// @name           BUX Clicker
// @namespace      BUX Clicker
// @description    Auto Click Ads On Bux.to by Syco
// @include        http://*bux*/*surf.php
// @copyright      Syco
// @version        1.0
// ==/UserScript==

////////////////////////////////////////////////////////////////////////
// MADE BY SYCO
//
// DO NOT REMOVE THIS OR I WILL FIND
// YOUR SCRIPT AND HAVE IT DELETED
// FOR COPYRIGHT INFRINGEMENT
////////////////////////////////////////////////////////////////////////
// Version history
// 1.0 - Script created
// 1.1 - Random timer
// 1.2 - Fix random timer bug
////////////////////////////////////////////////////////////////////////

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var next = new Array();

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();

function refresh_iframe() {
    t=parseInt($('#syco_bux_timer').html());
    if(t>0) {
        t-=1;
        $('#syco_bux_timer').html(''+t);
        setTimeout(function() { refresh_iframe(); },1000);
    } else {
        if(next.length>0) {
            $('#syco_bux_frame').attr('src','http://www.bux.to/'+next.pop());
            $('#syco_bux_links').html('');
            for(var i=0; i<next.length; i++) {
                $('#syco_bux_links').html($('#syco_bux_links').html()+next[i]+'<br>');
            }
            t=Math.round(Math.random()*30)+30;
            $('#syco_bux_timer').html(''+t);
            setTimeout(function() { refresh_iframe(); },1000);
        } else {
            document.location.reload(true);
        }
    }
}

function letsJQuery() {
    $('a').each(function(index) {
        temp=$(this).attr('href');
        if(temp.substr(0,12)=="view.php?ad=") {
            next.push(temp);
        }
    });
    next.sort();
    if(next.length>0) {
        $('body').append("<div style='text-align: center;'><span id='syco_bux_timer' style='float: center; border: 2px solid red; border-bottom: none;'></spna><br>");
        $('body').append("<div id='syco_bux_links' style='width: 50%; margin-left: 25%; border: 2px solid red; border-bottom: none;'></div>");
        $('body').append("<iframe id='syco_bux_frame' style='width: 75%; height: 300px; margin-left: 12.5%; border: 2px solid red;' src=''></iframe></div>");
        refresh_iframe();
    }
}
