// Wowhead Buttons
// version 0.2.1 BETA!
// Copyright (c) 2008, Claire Matthews aka PoeticDragon
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wowhead Buttons
// @namespace     http://www.stormblaze.net/
// @description   display "View in 3D" and "Get Link" buttons on lists, search results, and same model tab
// @include       http://www.wowhead.com/?item*
// @include       http://www.wowhead.com/?itemset*
// @include       http://www.wowhead.com/?npc*
// @include       http://www.wowhead.com/?quest*
// @include       http://www.wowhead.com/?spell*

var colorCodes = ['9d9d9d', 'ffffff', '1eff00', '0070dd', 'a335ee', 'ff8000', 'e5cc80'];

if (document.getElementById('lv-items')) { var list = document.getElementById('lv-items').getElementsByTagName('table')[0]; var mode = 'item'; }
if (document.getElementById('lv-itemsets')) { var list = document.getElementById('lv-itemsets').getElementsByTagName('table')[0]; var mode = 'itemset'; }
if (document.getElementById('lv-npcs')) { var list = document.getElementById('lv-npcs').getElementsByTagName('table')[0]; var mode = 'npc'; }
if (document.getElementById('lv-quests')) { var list = document.getElementById('lv-quests').getElementsByTagName('table')[0]; var mode = 'quest'; }
if (document.getElementById('lv-spells')) { var list = document.getElementById('lv-spells').getElementsByTagName('table')[0]; var mode = 'spell'; }
if (document.getElementById('tab-same-model-as')) { var list = document.getElementById('tab-same-model-as').getElementsByTagName('table')[0]; var mode = 'npc'; }


if (list && mode) { addButtons(list,mode); }

function addButtons(list, mode)
{
    var listHead = list.tHead;
    for (var h = 0; h < listHead.rows.length; h++) {

        var newTH = document.createElement('th');
        listHead.rows[h].appendChild(newTH);

        newTH.innerHTML = '<div><a href="javascript:;"><span><span>&nbsp;</span></span></a></div>';
    }

    var listBody = list.tBodies[0];
    for (var i = 0; i < listBody.rows.length; i++) {
        var newCell = listBody.rows[i].insertCell(-1);
        newCell.style.width = (mode == 'item' ? '161px' : (mode == 'npc' ? '83px' : '68px'));

        if (mode == 'item') {
            var linkInfo = listBody.rows[i].getElementsByTagName('td')[1].innerHTML.match('/?item=([0-9]+).*class="q([0-6])">(.*)?</a>');
            linkInfo[3] = "'" + linkInfo[3].split("'").join("\\'") + "'";
            var btnLink = createButton('Get link', linkInfo.slice(1), function() {
                    var linkInfo = this.className.match('([0-9]+),([0-9]),\'(.*)\'');
                    getIngameItemLink(linkInfo[2],linkInfo[1],linkInfo[3]);
                });
            btnLink.style.margin = '';
            newCell.appendChild(btnLink);
        } else if (mode == 'spell') {
            var linkInfo = listBody.rows[i].getElementsByTagName('td')[1].innerHTML.match('/?' + mode + '=([0-9]+).*>(.*)?</a>');
            linkInfo[2] = "'" + linkInfo[2].split("'").join("\\'") + "'";
            var btnLink = createButton('Get link', linkInfo.slice(1), function() {
                    var linkInfo = this.className.match('([0-9]+),\'(.*)\'');
                    getIngameRecipeLink(mode,linkInfo[1],linkInfo[2]);
                });
            newCell.appendChild(btnLink);
        } else if (mode == 'quest') {
            var linkInfo = listBody.rows[i].getElementsByTagName('td')[0].innerHTML.match('/?' + mode + '=([0-9]+).*>(.*)?</a>');
            linkInfo[2] = "'" + linkInfo[2].split("'").join("\\'") + "'";
            var btnLink = createButton('Get link', linkInfo.slice(1), function() {
                    var linkInfo = this.className.match('([0-9]+),\'(.*)\'');
                    getIngameRecipeLink(mode,linkInfo[1],linkInfo[2]);
                });
            newCell.appendChild(btnLink);
        }

        if (mode == 'item' || mode == 'itemset' || mode == 'npc') {
            var viewInfo = listBody.rows[i].innerHTML.match('/?' + mode + '=([0-9]+)');
            var btnView = createButton('View in 3D', viewInfo.slice(1), function() {

                    var viewInfo = this.className.match('([0-9]+)');
                    getModelViewer(mode, viewInfo[1]);
                });
            newCell.appendChild(btnView);
        }
    }
}

function createButton(text, data, func) {
    var newLink = document.createElement('a');
    newLink.addEventListener("click", func, true);
    newLink.href = 'javascript:;';
    newLink.className = 'button-red [' + data.join(',') + ']';
    newLink.style.textDecoration = 'none';
    newLink.style.margin = 0;
    newLink.innerHTML = '<div><blockquote><i>' + text + '</i></blockquote><span>' + text + '</span></div>';
    return newLink;

}

function getIngameItemLink(quality, id, name) {
    prompt('Copy/paste the following to your in-game chat window:',
           '/script DEFAULT_CHAT_FRAME:AddMessage("Shift-click this link to put into chat: \\124cff' + colorCodes[quality] + '\\124Hitem:' + id + ':0:0:0:0:0:0:0\\124h[' + name.split("\\'").join("'").split('"').join('\\"') + ']\\124h\\124r");');
}

function getIngameRecipeLink(mode, id, name) {
    if (mode == 'quest') id += ':-1';
    color = (mode == 'spell' ? '71d5ff' : (mode == 'quest' ? 'ffff00' : 'ffd000'));

    prompt('Copy/paste the following to your in-game chat window:',
           '/script DEFAULT_CHAT_FRAME:AddMessage("Shift-click this link to put into chat: \\124cff' + color + '\\124H' + mode + ':' + id + '\\124h[' + name.split("\\'").join("'").split('"').join('\\"') + ']\\124h\\124r");');
}

function getModelViewer(mode, id) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.wowhead.com/?' + mode + '=' + id,
        onload: function(responseDetails) {
            var viewInfo = responseDetails.responseText.match('ModelViewer.show\(.*\)"');
            if (viewInfo != null) {
                viewInfo = viewInfo[0].substring(0,viewInfo[0].length-1);
                eval('unsafeWindow.'+viewInfo);
            } else {
                alert("No model available");
            }
        }
    });
}