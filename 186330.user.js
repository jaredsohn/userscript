// ==UserScript==
// @name        Appscan Enterprise Highlighter
// @namespace   ASEHighlighter.CyberNinjas.com
// @description This plugin adds a button to Appscan Enterprise issue details so you can jump to the correct place in the HTTP Request/Response to see the details.
// @include     */ase/Reports/AboutThisIssue.aspx*
// @version     1.2
// @grant       none
// @updateURL http://userscripts.org/scripts/source/186330.user.js
// ==/UserScript==


//Works past an ASE bug which prevents flagging of items because VIEWSTATE is too big
document.getElementById("__VIEWSTATE").value = "";

var selections = document.getElementsByClassName("Highlight");
//Find the Test HTTP Traffic Div
var testDiv = document.getElementById("ctl00_ContentPanePlaceHolder_layoutControl_tab2_custom_TestPanel_header");
//Create the count field.
var c = document.createElement('input');
c.value = selections.length;
c.style = "margin-left: 1.5em;width: 2em;";
c.readOnly = true;
c.disabled = true;
testDiv.appendChild(c);

//Create the Button for find highlight
var i = document.createElement('input');
if(selections.length = 0) i.disabled = true;
i.type = "image";
i.style = "vertical-align: bottom; padding-left: .5em;";
i.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAATCAYAAACUef2IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAFZSURBVDhP1ZHNSsNAFIXPBEzbjQvrxh/EpbhQN+KiT+CDuPUB3IivoStBn0HcFCwqulFoka4UhSKi0qhMJs0kTcwkM7H5EYs2Cz+4zL13Zs6c3BDHcXwUAOGcFyKsyXXkFCZMbNuOR6HrJZl9D+d2uDbvOZbm9TDP49eO9+sfOGmZssryozAhMklRKY2h0fZQv36XnSSa7/tQMQzqLLP6mJut4vDUwfkNjfsqMo6Fw7RLUWupk4y7eDE4KJnG5m4HxxcduROREQ4eC2NQXNSumxRnzMPdUx9XzQeQbgsT4xW5EzGUY4HoiQcUhqWhffuM0lsDe1s1rC5W5U5EQlhdHhRQpB8zDAr+eIaDnRqWF6Zk94uEsBpBWkTUYgyeJxsB3LSxvbESiM7IThJiWVbsr1xOzimPXs8K16PLV6yvTYZ5HoQxlvPhfyfz80YFMU3znzmmlBbgGPgEAauPc7DROcIAAAAASUVORK5CYII="
i.value = 0;
i.onclick = function(){ this.value = goToHighlight(this.value, "Highlight"); return false;};
testDiv.appendChild(i);

//Create Search Box
s = document.createElement('input');
s.value = "Enter phrase...";
s.onchange = function(){ highlightSearch(this.value); };
s.onclick = function(){ this.value = "" };
s.style = "margin-left: .5em; width:8em;";
testDiv.appendChild(s);

//Create Button for Search Box
var i = document.createElement('input');
i.type = "image";
i.style = "vertical-align: bottom; padding-left: .5em;";
i.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADaSURBVDhPpZFBC0RAGIbn//8GJYQU/oELN0kRRy7EgSs79rRv+32pHdumneeg93vHY5ohnhroyceFruvCMDRNM4oiZG6/ocp93wdB0Lbtuq51XXueh4bXLqgydmuahofjqKoKDeUsyyicCPmJYRjLsvAg5TRNaChblpWmKWVClXFa7MyDlEVRoKEMWfFVGSd0HCfP83meYbqui4aWfsnDMJRlmSQJ3qbbxvM0gWIClsdxxMXYtg2fmiuKCVj2fR8fho/9qbmDeLyJ4xi/FCaNNxG7Bnry9jfb9gJ8fT53yosP7gAAAABJRU5ErkJggg==";
i.value = 0;
i.onclick = function(){ this.value = goToHighlight(this.value, "searchItem"); return false;};
testDiv.appendChild(i);

//Functions -----------------

function goToHighlight(item, className){
    var objs = document.getElementsByClassName(className);
    var x = parseInt(item);
    objs[x].scrollIntoView();
    return (x + 1 >= objs.length ) ? 0 : x + 1;
}

function highlightSearch(searchText){
    var targetElement = document.getElementById("ctl00_ContentPanePlaceHolder_layoutControl_tab2_custom_TestPanel_ctl00_TestPre");
    var targetText = targetElement.innerHTML;
    
    var highlightStartTag = "<font class='searchItem' style='background-color:#00FF00;'>";
    var highlightEndTag = "</font>";
    
    targetElement.innerHTML = doHighlight(targetText, searchText, highlightStartTag, highlightEndTag);
    
    targets = targetElement.getElementsByClassName("searchItem")
    
}

//-------- Function From http://www.nsftools.com/misc/SearchAndHighlight.htm - Thank-you!
/*

* This is the function that actually highlights a text string by
* adding HTML tags before and after all occurrences of the search
* term. You can pass your own tags if you'd like, or if the
* highlightStartTag or highlightEndTag parameters are omitted or
* are empty strings then the default <font> tags will be used.
*/
function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) {
    // the highlightStartTag and highlightEndTag parameters are optional
    if ((!highlightStartTag) || (!highlightEndTag)) {
        highlightStartTag = "<font style='background-color:green;'>";
        highlightEndTag = "</font>";
    }
    // find all occurences of the search term in the given text,
    // and add some "highlight" tags to them (we're not using a
    // regular expression search, because we want to filter out
    // matches that occur within HTML tags and script blocks, so
    // we have to do a little extra validation)
    var newText = "";
    var i = -1;
    var lcSearchTerm = searchTerm.toLowerCase();
    var lcBodyText = bodyText.toLowerCase();
    while (bodyText.length > 0) {
        i = lcBodyText.indexOf(lcSearchTerm, i + 1);
        if (i < 0) {
            newText += bodyText;
            bodyText = "";
        } else {
            // skip anything inside an HTML tag
            if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
                // skip anything inside a <script> block
                if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
                    newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
                    bodyText = bodyText.substr(i + searchTerm.length);
                    lcBodyText = bodyText.toLowerCase();
                    i = -1;
                }
            }
        }
    }
    return newText;
}