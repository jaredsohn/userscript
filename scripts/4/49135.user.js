// ==UserScript==
// @name           OpenAllInNewTab
// @namespace      oaint@kwierso.com
// @description    Open all RT threads with new messages in new tabs!
// @include        http://roosterteeth.com/*forum/*?*id=*
// @include        https://roosterteeth.com/*forum/*?*id=*
// @include        http://*.roosterteeth.com/*forum/*?*id=*
// @include        https://*.roosterteeth.com/*forum/*?*id=*
// ==/UserScript==

(function() {
    try {
        var threadListHolder = document.getElementById("pageContent").firstChild.firstChild.firstChild.firstChild.firstChild
                             .firstChild.childNodes[4].firstChild.getElementsByTagName("div")[0].childNodes[1].childNodes[1];
    } catch(e) { return;}
    var allThreads = [];
    var newThreads = [];
    var newLinks = [];

    for(i = 0; i < threadListHolder.childNodes.length; i++) {
        if(threadListHolder.childNodes[i].innerHTML != undefined)
            allThreads.push(threadListHolder.childNodes[i]);
    }
    for(i in allThreads) {
        try {
            if(allThreads[i].getElementsByTagName("img")[0].src.match("new"))
                newThreads.push(allThreads[i]);
        } catch(e) { }
    }
    for(i in newThreads) {
        try {
            newLinks.push(newThreads[i].getElementsByTagName("b")[2].parentNode.href);
        } catch(e) { newLinks.push(newThreads[i].getElementsByTagName("a")[0].href); }
    }
    var cell = document.createElement("td");
    var button = document.createElement("a");
    var bold = document.createElement("b");
    bold.innerHTML = "Open New Threads";
    button.appendChild(bold);
    button.addEventListener("click", function() {
                if(newLinks.length == 0)
                    alert("No threads have unread messages.");
                for(i in newLinks) {
                    GM_openInTab(newLinks[i]);
                }
            }, false);
    cell.appendChild(button);
    cell.className = "small";
    cell.vAlign = "top";
    cell.align = "right";

    allThreads[0].getElementsByTagName("tr")[0].insertBefore(cell, allThreads[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1]);
})();