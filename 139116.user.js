// ==UserScript==
// @name       Imgur Keyboard Shortcuts
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Keyboard shortcut for sharing to Facebook or Twitter from Imgur
// @match      http://imgur.com/*
// @copyright  2012, Jhecht Falcon
// ==/UserScript==


//this list is extendable to all of the keyboard shorcuts, these, however, are really the only 2 i'd ever use.
var keymap = {
    'f':'facebook_custom',
    't':'twitter_custom'
};

//If the event target is one of these elements, do not fire as the user is typing.
var non_share=[
    'textarea',
    'input',
    'select'
];


document.addEventListener('keypress',function(event){
    var key = String.fromCharCode(event.charCode).toLowerCase();
    
    if(keymap[key]!=null && non_share.indexOf(event.target.tagName.toLowerCase())==-1){
        var class_name = keymap[key];
        var el = document.getElementsByClassName(class_name)[0];
        
        if(el.click){
            el.click();
        }
        
    }
});
