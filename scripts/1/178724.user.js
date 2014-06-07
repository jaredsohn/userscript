// ==UserScript==
// @author      Marat Dospolov
// @name        Feedly - Disable specific hotkeys
// @description Enable only specific hotkeys; disable other
// @include     http://cloud.feedly.com/*
// @include     https://cloud.feedly.com/*
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/178724.user.js
// @updateURL   https://userscripts.org/scripts/source/178724.meta.js
// @version     1.0
// ==/UserScript==

var feedlyDisableSpecificHotkeys = {
    disabledButtonsList: [],
    init: function(){
        // fill all buttons list
        for (var i=48; i<=90; i++){
               feedlyDisableSpecificHotkeys.disabledButtonsList.push(i);
        }
        
        // translate enable button list to codes
        for (var i=0; i<feedlyDisableSpecificHotkeys.enabledButtonList.length; i++){
            feedlyDisableSpecificHotkeys.enabledButtonList[i] = feedlyDisableSpecificHotkeys.enabledButtonList[i].toUpperCase().charCodeAt(0);
        }
        
        // remove enabled buttons from disabled buttons list
        for(var i=0; i<feedlyDisableSpecificHotkeys.disabledButtonsList.length; i++){
            for(var j=0; j<feedlyDisableSpecificHotkeys.enabledButtonList.length; j++){
                if(feedlyDisableSpecificHotkeys.enabledButtonList[j] == feedlyDisableSpecificHotkeys.disabledButtonsList[i]){
                    feedlyDisableSpecificHotkeys.disabledButtonsList.splice(i, 1);
                }
            }
        }

        // disable buttons
        document.addEventListener("keydown", function(event) {
            for(var i=0; i<feedlyDisableSpecificHotkeys.disabledButtonsList.length; i++){
                if (event.keyCode == feedlyDisableSpecificHotkeys.disabledButtonsList[i]){
                    event.preventDefault();
                }
            }
        }, true);
    },
    enabledButtonList: ["j","k","v","m"]
}

setTimeout(function(){
    feedlyDisableSpecificHotkeys.init();
}, 1000);