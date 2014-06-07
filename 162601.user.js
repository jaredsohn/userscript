// ==UserScript==
// @name            Cantr Visual Event Enhancement, Advanced Edition (Some Assembly Required)
// @description     ***If you do not know how to use CSS, get the Basic Edition!!***
// @description     Inserts CSS classes "cvee_emote", "cvee_character", "cvee_event", and "cvee_quote" as span tags for your own styling needs.
// @description     Custom CSS can be provided in the Player Settings->Interface page.  
// @description     Remember you can enable "Custom skin extends base instead of replacing".
// @description     Further customization is possible by referencing the event's type (eventgroup_21 for talking, eventgroup_9 for radio, and so on)
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
    
    return a + '<span class="cvee_quote">' + b + '</span>';
};
var hilight_emotes = function(i) {return '<span class="cvee_emote">' + i + '</span>';};
var hilight_characters = function(i, a, b, c) {return a + '<span class="cvee_character">' + b + '</span>'+c;};
var hilight_events = function(i) {return '<span class="cvee_event">' + i + '</span>';};

var parse_events = function(limit) {
    for(var i = 0; i < events.length && i != limit; i+=1) {
        events[i].innerHTML = events[i].innerHTML.replace(/(: )("[\s\S]*")/g,hilight_quotes);
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
