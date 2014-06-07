// ==UserScript==
// @name           TLR - Custom UI
// @namespace      Kinetic
// @description    Change your TLR gaming experience.
// @include        http://thelostrunes.com/game.php
// @include        http://www.thelostrunes.com/game.php
// ==/UserScript==

document.getElementById("chat").style.background = 'black';

function addGlobalJS(js)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

addGlobalJS('function handleResponse4(){if(chat.readyState == 4){var response = chat.responseText;var update = new Array();if(response.indexOf("|" != -1)){update = response.split("|");update.shift();var totalUpdates = update.length;var currentUpdate = 1;while (currentUpdate <= totalUpdates){chatArray.shift();chatArray.push(update[currentUpdate-1]);currentUpdate += 1;}var chatmsg = "";for (var i=chatArray.length-1; i>=0; --i){spareVar = 0;chatEdit = chatArray[i];pmCheck = chatEdit.search(/PM/i);errorCheck = chatEdit.search(/#00FF00/i);clanCheck = chatEdit.search(/#aaffaa/i);nameCheck = chatEdit.search("<a");if (pmCheck != -1){spareVar = 1;chatEdit = chatEdit.replace(/#00FF00/gi, "#FF0000"); /*pm*/}if ((pmCheck == -1) && (errorCheck != -1)){spareVar = 1;chatEdit = chatEdit.replace(/#00FF00/gi, "#663399"); /*user-only*/}if ((clanCheck != -1) && (spareVar == 0)){spareVar = 1;chatEdit = chatEdit.replace(/#aaffaa/gi, "#00FF00"); /*clan*/}if (nameCheck != -1){chatEdit = chatEdit.replace(/<a/gi, "<a style=\\"color:#FFFFFF;\\""); /*name*/}if (spareVar == 0){colorChange = 0;whiteCheck = chatEdit.search("/1");redCheck = chatEdit.search("/2");blueCheck = chatEdit.search("/3");greenCheck = chatEdit.search("/4");yellowCheck = chatEdit.search("/5");if ((whiteCheck != -1) && (colorChange == 0)){colorChange = 1;chatEdit = chatEdit.replace(/#bbbfbf/gi, "white"); /*player*/}if ((redCheck != -1) && (colorChange == 0)){colorChange = 1;chatEdit = chatEdit.replace(/#bbbfbf/gi, "red"); /*player*/}if ((blueCheck != -1) && (colorChange == 0)){colorChange = 1;chatEdit = chatEdit.replace(/#bbbfbf/gi, "cyan"); /*player*/}if ((greenCheck != -1) && (colorChange == 0)){colorChange = 1;chatEdit = chatEdit.replace(/#bbbfbf/gi, "green"); /*player*/}if ((yellowCheck != -1) && (colorChange == 0)){colorChange = 1;chatEdit = chatEdit.replace(/#bbbfbf/gi, "yellow"); /*player*/}if (colorChange == 0){chatEdit = chatEdit.replace(/#bbbfbf/gi, "#999999"); /*player*/}}chatEdit = chatEdit.replace(/#87a49f/gi, "#999999"); /*time*/chatEdit = chatEdit.replace(/#33CCCC/gi, "#FFFF00"); /*globals*/chatEdit = chatEdit.replace(/font-style: italic; color: #FFFFFF/gi, "font-style: italic; color: #999999"); /*emote*/chatEdit = chatEdit.replace(/#663399\">Earl/gi, "#00FF00\\">Earl"); /*earl fix*/chatEdit = chatEdit.replace(/#663399\">Lady/gi, "#00FF00\\">Lady"); /*lady noble fix*/chatmsg = chatmsg + chatEdit + "<br />";}document.getElementById("chat").innerHTML = chatmsg;}chatcalled = 0;clearTimeout(disablechattimer);clearTimeout(chatcalledtimer);}}');