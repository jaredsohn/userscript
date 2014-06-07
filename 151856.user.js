// ==UserScript==
// @name          Copy translations
// @namespace     Stardrad
// @author        Stardrad(yin8086)
// @version       1.5
// @license	      GPL v3 or later version
// @updateURL     http://userscripts.org/scripts/source/151856.meta.js
// @downloadURL   http://userscripts.org/scripts/source/151856.user.js
// @description   Copy translations for Pujiahh.com（json版有点问题，还是用1.3版本）
// @match       http://projects.pujiahh.com/*

// ==/UserScript==

var myForm = document.getElementsByTagName("form")[0];
if (myForm) {
    //tagStr = "<input class=\"btn\" accessKey=\"G\" title=\"快捷键Alt+G\" value=\"Copy\" 		onclick=\"myCopy();\" />";
    //document.getElementsByTagName("form")[0].innerHTML += tagStr;
    var mtag = document.getElementsByClassName("alert alert-info")[0];
    if (mtag) {
        var promptDiv = document.createElement("pre");
        var eleI = document.createElement("i");
        eleI.className = "icon-info-sign";
        promptDiv.appendChild(eleI);
        promptDiv.appendChild(document.createTextNode("复制译文Alt+c,复制并提交Alt+g"));
        mtag.parentNode.insertBefore(promptDiv, mtag.nextSibling);
        document.addEventListener("keydown", myCopy, true);
    }
}
function myCopy(event) {
    if (event.altKey) {
        if (event.keyCode == 71 || event.keyCode == 67) {
            mtag = document.getElementsByClassName("alert alert-info")[0];
            if (mtag) {
                trText = mtag.getElementsByTagName("a")[0].innerHTML;
                document.getElementById("id_dest").innerHTML = trText;
                if (event.keyCode == 71)
                    document.getElementsByName("next")[0].click();
            }
        }
    }
}