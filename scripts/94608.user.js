// ==UserScript==   
// @name            TextAdventureInventory
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.0
// @description     Adds /i and /inv commands to keep track of inventory in chat-based text adventures. Type "/i h" for in-built help.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/94608
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {

javascript:void(window.location.assign('javascript:void((function(){function m(c,m){c.displayUnsanitizedMessage("Inventory Bot",m,{"class":"whisper received_whisper"},{"non_user":true});};var invObj={};function inv(h,t){var chat=h.activeDialogue();t=String(t.substr(3)).toLowerCase();if(t.length){if(t.charCodeAt(0)==0x76)t=t.substr(2);if(t.length){var a=t.match(/^\\s*(\\S+)(?:\\s+(\\S+))?/),i=a;if(i&&i[1]){i=i[1].toLowerCase();if(!(i=="help"||i=="h"||i=="hep"))if(i=="show"||i=="sho"||i=="s"){i=a[2];if(i){t="Inventory for "+i+":";a=invObj[i];for(i in a){t+="<br>• "+i+": "+a[i];}m(chat,t);return false;}}else if(i=="add"||i=="ad"||i=="a"){i=a[2];if(i){a=t.match(/^\\s*\\S+\\s+\\S+\\s+([^:]+)(?::\\s*([\\s\\S]*))?/)if(a&&a[1]){if(!invObj[i])invObj[i]={};invObj[i][a[1]]=(a[2]||"An object.").replace(/</g,"&lt;");m(chat,"Added "+a[1]+" to "+i+"\'s inventory.");return false;}}}else if(i=="del"||i=="remove"||i=="r"||i=="d"){i=a[2];if(i){a=t.match(/^\\s*\\S+\\s+\\S+\\s+([\\s\\S]+)/);if(a&&a[1]){a=a[1];if(invObj[i]){if(invObj[i][a]){delete invObj[i][a];m(chat,"Removed "+a+" from "+i+"\'s inventory.");}else{m(chat,i+" does not have "+a+".");}}else{m(chat,i+" does not have an inventory.");}return false;}}}}}}m(chat,"<span style=\'font-style:normal\' onclick=\'var a=this.down(\\".invcollapse\\");a.style.display==\\"none\\"?a.show():a.hide();return false;\'>Inventory help.<span class=\'invcollapse\'><br>help: Displays this help message. Format:<br>• <code>/inv help</code><br>add: Adds an item to the inventory list. Format:<br>• <code>/inv add username name of item</code><br>• <code>/inv add username name of item: item description</code><br>remove or del: Removes an item from the inventory list. Format:<br>• <code>/inv del username name of item</code><br/>show: Shows the inventory list for a user. Format:<br>• <code>/inv show username</code></span></span>");return false;}holodeck.addChatCommand("inv",inv);holodeck.addChatCommand("i",inv);})())'));

}, 1250);
}