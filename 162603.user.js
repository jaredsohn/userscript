// ==UserScript==
// @name            Cantr Visual Event Enhancement, Basic Edition
// @description     Restyles Events and *Emotes* in Cantr event logs.
// @version         1.3b
// @include         http://*.cantr.net/*
// @include         https://*.cantr.net/*
// @include         http://*cantr.net/*
// @include         https://.cantr.net/*
// @copyright       2013+, Natso
// ==/UserScript==

var events = document.getElementById('eventsList').getElementsByTagName('div');

var hilight_quotes = function(i, a, b) {
    
    // There are several styles of emotes that vary by region.  If you enable them all, you will probably get a mis-identified emote on occasion, sorry!
    // To enable one, remove from the "//" beginning of the line.  To Disable, put a // at the beginning of the line.
    
    // *Paired Astrisks*
    b = b.replace(/\*[^<>]*?\*/g,hilight_emotes);
    
    // -Paired Dashes-
    // b = b.replace(/-[^<>]*?-/g,hilight_emotes);
    
    // #Paired Hashtags#
    b = b.replace(/#[^<>]*?#/g,hilight_emotes);
    
    return a + '<span style="color:#FFFFFF">' + b + '</span>';
};
var hilight_emotes = function(i) {return '<span style="color: #cccccc;font-style: italic;">' + i + '</span>';};
var hilight_characters = function(i, a, b, c) {return a + '<span style="cvee_character">' + b + '</span>'+c;};
var hilight_events = function(i) {return '<span style="color:#999999">' + i + '</span>';};

var parse_events = function(limit) {
    for(var i = 0; i < events.length && i != limit; i+=1) {
        events[i].innerHTML = events[i].innerHTML.replace(/(: )("[\s\S]*?")/g,hilight_quotes);
        events[i].innerHTML = events[i].innerHTML.replace(/(<a.*?>)([\s\S]*?)(<\/a>)/g,hilight_characters);
        events[i].innerHTML = hilight_events(events[i].innerHTML);
    }
};
parse_events(-1);

unsafeWindow.handlerFuncOriginal = unsafeWindow.handlerFunc;
unsafeWindow.handlerFunc = function(t){
    unsafeWindow.handlerFuncOriginal(t);
    var j = JSON.parse(t.responseText);
    if(j.length > 0) parse_events(j.length);
};
