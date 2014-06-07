// ==UserScript==
// @name       Twitch main page filter
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*.twitch.tv/directory/all
// @copyright  2012+, You
// ==/UserScript==

// here replace the "aaaaaa" string, by what game title you want to be blacklisted
var gameBlackList = [
    "League of Legends",
    "Dota 2",
    "StarCraft II: Wings of Liberty",
    "Minecraft",
    "World of Warcraft: Mists of Pandaria",
    "DayZ",
    "Path of Exile",
    "Smite",
    "Heroes of Newerth",
    "Call of Duty: Black Ops II",
    "Halo 4",
    "Counter-Strike: Global Offensive",
    "World of Tanks",
    "StarCraft: Brood War",
    "StarCraft",
    "Diablo III",
    "StarCraft II: Heart of the Swarm",
    "The War Z",
    "Battlefield 3",
    "FIFA Soccer 13",
    "Warcraft III: The Frozen Throne",
    "Guild Wars 2",
    "aaaaaa",
    "aaaaaa",
    "aaaaaa",
    "aaaaaa",
    "aaaaaa",
];

// run the script every 3 seconds
window.setInterval(function() {filterPage()}, 3000);

// main method of the script
function filterPage() {
 
    var streamItems = document.getElementsByClassName('stream item');
    
    for (var i = 0; i < streamItems.length; i++) {
     	
        var meta = streamItems[i].getElementsByClassName('boxart');
        
        if (meta.length > 0) {
        
        	var originalTitle = meta[0].getAttribute("title");
            if (isGameBlackListed(originalTitle)) {
             	
                streamItems[i].parentNode.removeChild(streamItems[i]);
                i--;
                //alert("delete" + originalTitle);
            } else {
                //alert("pas delete" + originalTitle);
            }
        
        }
        
    }     
    
}   

// return true if the game title is in gameBlackList list, else can return anything else
function isGameBlackListed(gameTitle) {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    }
    if (gameBlackList.indexOf(gameTitle) >= 0) {
        return true;
    }
}    