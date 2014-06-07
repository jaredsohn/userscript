// ==UserScript==
// @name       Auto Scroller
// @namespace  http://www.diknows.com
// @version    0.1
// @description  Shift + Down increases scrolling down speed
// @match      http://*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==
            
;$(document).ready(function(){
    var keys = {
        8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
        20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
        37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
        96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
        104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
        112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
        120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: ";", 191: "/",
        220: "\\", 222: "'", 224: "meta"
    };

    
    var speed = 0;
    var lastSpeed = 0;
    function speedUp(){
        ++speed;
    }
    function slowDown(){
        --speed;
    }
   
    document.onkeydown = function(evt){    
       var key = evt.keyCode;
        if(evt.shiftKey && keys[key] === 'down'){
           speedUp();
            return false;
        }else if (evt.shiftKey && keys[key] === 'up') {
            slowDown();
            return false;
        }else if (keys[key] === 'esc') {
            speed = 0;
        }
    }
    
    setInterval(function(){
        window.scrollBy(0,speed);
    },50);
});

