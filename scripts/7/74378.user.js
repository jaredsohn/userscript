// ==UserScript==
// @name           InwardHellix Riddle Thread
// @namespace      http://n0ctem.net
// @description    Add a link to the thread for the corresponding riddle
// @include        http://inwardhellix.net/*
// @exclude        http://inwardhellix.net/forum/*
// ==/UserScript==

String.prototype.trim = function() { return this.replace(/^\s*/, "").replace(/\s*$/, ""); }

var pageTitle = document.getElementsByTagName("title")[0].innerHTML.trim();

switch(pageTitle) {
    case "Outside...": var riddle = { level: 1, thread: 18 }; break;
    case "Inside...": var riddle = { level: 2, thread: 19 }; break;
    case "Digits...?": var riddle = { level: 3, thread: 20 }; break;
    case "Trust in demon...": var riddle = { level: 4, thread: 22 }; break;
    case "?...": var riddle = { level: 5, thread: 23 }; break;
    case "Save MY Soul...": var riddle = { level: 6, thread: 24 }; break;
    case "Leaving the spectrum...": var riddle = { level: 7, thread: 25 }; break;
    case "The other side...": var riddle = { level: 8, thread: 26 }; break;
    case "Incorrect...": var riddle = { level: 9, thread: 27 }; break;
    case "Circles...": var riddle = { level: 10, thread: 28 }; break;
    case "Fill me up...": var riddle = { level: 11, thread: 31 }; break;
    case "Tears me apart...": var riddle = { level: 12, thread: 32 }; break;
    case "Misfortune...": var riddle = { level: 13, thread: 33 }; break;
    case "Step by step...": var riddle = { level: 14, thread: 34 }; break;
    case "Time to play...": var riddle = { level: 15, thread: 37 }; break;
    case "Wrong floor...": var riddle = { level: 16, thread: 38 }; break;
    case "JRHIYLQLCOTQSCQUNZ": var riddle = { level: 17, thread: 39 }; break;
    case "Obey the rules...": var riddle = { level: 18, thread: 44 }; break;
    case "Chronological disorder...": var riddle = { level: 19, thread: 54 }; break;
    case "Descending upon the vortex...": var riddle = { level: 20, thread: 56 }; break;
    case "I can play and you can not...": var riddle = { level: 21, thread: 59 }; break;
    case "Never EndNever EndNever End...": var riddle = { level: 22, thread: 60 }; break;
    case "Perpendicular lines...": var riddle = { level: 23, thread: 65 }; break;
    case "Deepest look...": var riddle = { level: 24, thread: 66 }; break;
    case "False color...": var riddle = { level: 25, thread: 69 }; break;
    case "<! ..>": var riddle = { level: 26, thread: 79 }; break;
    case "Something's missing...": var riddle = { level: 27, thread: 82 }; break;
    case "Ask for me...": var riddle = { level: 28, thread: 83 }; break;
    case "The suicidal clock chime...": var riddle = { level: 29, thread: 84 }; break;
    case "The wheel of time...": var riddle = { level: 30, thread: 86 }; break;
    case "End End End": var riddle = { level: 30, thread: 87 }; break;
    case "Die...": var riddle = { level: 32, thread: 88 }; break;
    case "The beginning of the end...": var riddle = { level: 33, thread: 89 }; break;
    case "Maze...": var riddle = { level: 34, thread: 90 }; break;
    case "Insanity...": var riddle = { level: 35, thread: 91 }; break;
    case "Data enclosed...": var riddle = { level: 36, thread: 92 }; break;
    case "My sin...": var riddle = { level: 37, thread: 93 }; break;
    case "Eternal darkness...": var riddle = { level: 38, thread: 94 }; break;
    case "Free me...": var riddle = { level: 39, thread: 95 }; break;       // This is as far as I've gotten.. I can't confirm pageTitles are exactly correct after this point.
    case "Remorse...": var riddle = { level: 40, thread: 96 }; break;
    case "Staring at you I see nothing but myself...": var riddle = { level: 41, thread: 98 }; break;
    case "Everything's blue in this world...": var riddle = { level: 42, thread: 99 }; break;
    case "Don't cry...": var riddle = { level: 43, thread: 100 }; break;
    case "Amok...": var riddle = { level: 44, thread: 101 }; break;
    case "Melancholy requiem...": var riddle = { level: 45, thread: 103 }; break;
    case "To myself I turned...": var riddle = { level: 46, thread: 104 }; break;
    case "Lost behind...": var riddle = { level: 47, thread: 105 }; break;
    case "Hyperdimension...": var riddle = { level: 48, thread: 106 }; break;
    case "Sacer nepotibus cruor...": var riddle = { level: 49, thread: 110 }; break;
    case "What i've become...": var riddle = { level: 50, thread: 111 }; break;
    case "False truth...": var riddle = { level: 51, thread: 119 }; break;
    case "Die...": var riddle = { level: 52, thread: 121 }; break;      // Level 32 conflict
    case "2k is wrong...": var riddle = { level: 53, thread: 122 }; break;
    case "Maze of insanity...": var riddle = { level: 54, thread: 131 }; break;
    case "Filled with the emptiness...": var riddle = { level: 55, thread: 135 }; break;
    case "Take me to the perfect reality...": var riddle = { level: 56, thread: 138 }; break;
    case "Chronological order...": var riddle = { level: 57, thread: 157 }; break;
    case "No remorse...": var riddle = { level: 58, thread: 159 }; break;
    case "Empty around...": var riddle = { level: 59, thread: 162 }; break;
    case "My Heaven...": var riddle = { level: 60, thread: 167 }; break;
}

if(riddle) {
    var body = document.getElementsByTagName("body")[0];
    var threadLink = document.createElement('a');
    threadLink.href = "http://inwardhellix.net/forum/viewtopic.php?t="+riddle.thread;
    threadLink.innerHTML = "Level "+riddle.level+": \""+pageTitle+"\" thread";
    threadLink.style.color = 'white';
    threadLink.style.textDecoration = 'none';
    body.appendChild(threadLink);
}