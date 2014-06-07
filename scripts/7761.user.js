// ==UserScript==
// @name            LookItUpIdeomordbogen
// @description     Select a word, and immidiately see the translation (English to Danish). The script looks up the word in ordbogen.com. If you dont have an account, you will only be able to look up two words a day.
// @source          http://userscripts.org/scripts/show/7761
// @identifier      http://userscripts.org/scripts/source/7761.user.js
// @version         1.0
// @date            2007-03-03
// @author          Bjorn Rosell
// @namespace       http://www.rosell.dk/gm/
// @include         http://www.idiomordbogen.dk/idiom.php?lookitup*
// ==/UserScript==


// ------------------------------------------------------------------------------------
//                              Part 0: Remove all, except search result
// ------------------------------------------------------------------------------------

function cloneRange(elmFrom, elmTo, elmAppendTo) {
    var elm = elmFrom;
    while (elm != elmTo) {
        elmAppendTo.appendChild(elm.cloneNode(true));
        elm = elm.nextSibling;
    }
}
function findNextTag(elm, tagName) {
    elm = elm.nextSibling;
    while ((elm != null) && (elm.nodeName != tagName)) elm = elm.nextSibling;
    return elm;
}

var hrs = document.getElementsByTagName('hr');
if (hrs.length > 1) {
    var elmFrom = hrs[1];
    elmFrom = findNextTag(elmFrom, 'TABLE');
    if (elmFrom != null) elmFrom = elmFrom.nextSibling;
    if (elmFrom != null) {
        var div = document.createElement("div");
        cloneRange(elmFrom, null, div);
        document.body.innerHTML = ''
        document.body.appendChild(div);
    }
}

// ------------------------------------------------------------------------------------
//                              Part 1: Auto-update
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
        url:'http://userscripts.org/scripts/source/7761.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version         1.0') == -1) {
                var elmInsertPoint = document.body;
                var elmA = document.createElement("a");
                elmA.setAttribute("href", "http://userscripts.org/scripts/source/7761.user.js");
                elmA.appendChild(document.createTextNode('Der er en ny version af "Ideomordbogen - LookItUp" scriptet. Klik her for at installere'));
                elmInsertPoint.insertBefore(elmA, elmInsertPoint.firstChild);
            }
        }
    });
}
autoupdate();


