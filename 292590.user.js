// ==UserScript==
// @id             www.linux.org.ru-lor-notify
// @name           LOR-notify
// @version    1.0
// @description    Check user notifications in background on http://linux.org.ru/
// @match      http://www.linux.org.ru/*
// @match      https://www.linux.org.ru/*
// @namespace http://www.linux.org.ru/*
// @namespace https://www.linux.org.ru/*
// @include http://www.linux.org.ru/*
// @include https://www.linux.org.ru/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==
$(function() {
    var cfg = {
        pause: 60, //Check interval in seconds
        sound: true, //Sound on/off
        sound_url: 'http://whatsapptones.com/whatsapptones/sonidos/Galaxy%20s3%20sms.mp3', //Sound url
        old_title : '',
        blinks: 0
    }
    
    function check_events () {
        window.interval = setInterval(function() {
            $("#main_events_count").load("# #main_events_count", function () {
                $(this).find("#main_events_count").replaceWith($(this).text());
            });
            
            var events = parseInt($("#main_events_count").html().replace(/[\(\)]/g, "")) || 0;
            
            if (events > 0 && cfg.blinks < events) {
                if (cfg.sound) {
                    $('<audio/>').attr('src', cfg.sound_url)[0].play();
                }
                
                blink_title(events, false);
                cfg.blinks = events;
            }
        }, cfg.pause*1000);
    }
    
    function blink_title (ev, sblink) {
        if (typeof(window.blink) == "number") {
            clearInterval(window.blink);
            $("title").html(cfg.old_title);
        }
        if (sblink) {
            return;
        }
        
        cfg.old_title = $("title").html();
        var bt = false;
        window.blink = setInterval(function() {
            $("title").html(!bt ? "["+ev+"] Новые уведомления..." : cfg.old_title);
            bt = !bt;
        }, 1000);
    }
    
    $(window).on("focus", function () {
        if (typeof(window.interval) == "number") {
       		clearInterval(window.interval);
        }
        blink_title(0, true);
    });
    
    $(window).on("blur", function () {
        check_events();
    });
});
