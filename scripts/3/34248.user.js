// ==UserScript==
// @name           Auto complete
// @namespace      com.remysharp.autocomplete
// @description    Converts shortcut text as you type
// @include        *
// @exclude        *.twitter.com/*
// ==/UserScript==

// Version 0.1
// Change the keys variable below to add new shortcuts.
// I'm excluding twitter.com to allow compatibility with the Twitter Upgrade script
// Author Remy Sharp - http://remysharp.com

function autoComplete() {
    var keys = { 
        "love" : "♥",
        ":-)" : "☺",
        ":)" : "☺",
        ":-(" : "☹",
        ":(" : "☹",
        "right" : "☛",
        "peace" : "☮",
        "up" : "☝",
        "down" : "☟",
        "copy" : "©",
        "tm" : "™",
        "euro" : "€",
        "<<" : "«",
        ">>" : "»",
        "yen" : "¥"
    },
    status = document.getElementById('status'),
    text, i, word, timer, autoComplete,
    // massive nasty array conversion and concatination
    inputs = [].slice.apply(document.getElementsByTagName('input')).concat([].slice.apply(document.getElementsByTagName('textarea')));
        
    // create a fast lookup regexp of all the terms used in a .test() later on
    var keyMatch = [];
    for (i in keys) {
        keyMatch.push(i.replace(/[\(\)\-]/g, function (m) {
            return '\\' + m;
        }));
    }
    
    keyMatch = new RegExp('(\\s*|^)' + keyMatch.join('|') + '(\\s+)');
	
    autoComplete = function (event) {
        var el = event ? event.target : this;
        clearTimeout(timer); // we do it twice, but it's because we might be called via the blur
        // do a fast .test to see if we need to run
        if (keyMatch.test(el.value.toLowerCase())) {
            el.value = el.value.replace(/(\s*|^)([\S]*)(\s+)/g, function (m, c1, c2, c3) {
                return (c2 && keys[c2.toLowerCase()]) ? keys[c2.toLowerCase()] + c3 : m;
            });
        }
    };
    
    var autoCompleteDelayed = function (event) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            autoComplete(event);
        }, 100);
    };
    
    inputs.forEach(function (element, index, array) {
        element.addEventListener('keydown', autoCompleteDelayed, true);
        element.addEventListener('blur', autoComplete, true);
    });
}

autoComplete();