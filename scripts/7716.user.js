// ==UserScript==
// @name            LookItUpOrdbogen
// @description     This script supplements "LookItUp". It strips the resultpage of all the stuff no one needs.
// @source          http://userscripts.org/scripts/show/7716
// @identifier      http://userscripts.org/scripts/source/7716.user.js
// @version         1.0
// @date            2007-02-28
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         http://ordbogen.com/opslag.php?lookitup*
// ==/UserScript==

// ------------------------------------------------------------------------------------
//                              Part 0: Auto-update
// ------------------------------------------------------------------------------------

function autoupdate() {
    // only check for updates one time a day
    var d = new Date();
    if (GM_getValue('lastcheck') == d.getDate()) {
        return
    }
    GM_setValue('lastcheck',d.getDate());
    
    // check for update
    GM_xmlhttpRequest({
        method:"GET",
        url:'http://userscripts.org/scripts/source/7716.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version         1.0') == -1) {
                var elmInsertPoint = document.body;
                var elmA = document.createElement("a");
                elmA.setAttribute("href", "http://userscripts.org/scripts/source/7716.user.js");
                elmA.appendChild(document.createTextNode('Der er en ny version af "Engelsk-Dansk" scriptet. Klik her for at installere'));
                elmInsertPoint.insertBefore(elmA, elmInsertPoint.firstChild);
            }
        }
    });
}
autoupdate();

// ------------------------------------------------------------------------------------
//                              Part 1: Remove all, except search result
// ------------------------------------------------------------------------------------

function getChildNodes(elm, tagName) {
    var a = [];
    for (var i=0;i<elm.childNodes.length;i++) {
        //alert()
        if (elm.childNodes[i].nodeName == tagName) a.push(elm.childNodes[i])
    }
    return a;
}
function removeNode(elm) {
    elm.parentNode.removeChild(elm);
}

function removeNodesWithStyleProperty(collection, stylePropertyName, styleValue) {
    for (var i=0; i<collection.length; i++) {
        var style = collection[i].style;
        if ((style!=null) && (style[stylePropertyName] == styleValue)) {
            removeNode(collection[i]);
        }
    }
}

var tables = document.getElementsByTagName('TABLE');
var popupTable = tables[0];
var mainTable = tables[1];
mainTable.style.width = '100%';

mainTable.setAttribute('align', 'left');
popupTable.parentNode.removeChild(popupTable);
var trs = mainTable.getElementsByTagName('TR');
removeNode(trs[0])

var tds = getChildNodes(trs[0], 'TD');
removeNode(tds[0]);
removeNode(tds[2]);
removeNode(tds[3]);

var div = getChildNodes(tds[1],'DIV')[0];
removeNode(getChildNodes(div,'TABLE')[0]);
var subdivs = getChildNodes(div,'DIV');
removeNode(subdivs[0]);
removeNode(subdivs[1]);

// remove commercial stuff 
// (when user is not registred, commercials are displayed)
// -------------------------------------------------------
var iframes = mainTable.getElementsByTagName('IFRAME');
if (iframes.length > 0) {
    removeNode(iframes[0]);
}

removeNodesWithStyleProperty(document.getElementsByTagName('DIV'), "height", "365px");
removeNodesWithStyleProperty(trs, "height", "96px");

