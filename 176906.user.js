// ==UserScript==
// @name          topicBlock
// @description   Removes annoying topics from the frontpage
// @include       http://gbatemp.net/
// @grant none
// ==/UserScript==

function purge(){ 
 
    var keywords = [
    "dumb topic",
    "xuphor do",
    "sony sux",
    "nintendo doomed"
    ];
    
    var tr;
    var a = document.getElementsByClassName('PreviewTooltip');
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < keywords.length; j++) {
            if (a[i].innerHTML.match(new RegExp(keywords[j], "gim"))) {
                tr = a[i].parentNode.parentNode;
                tr.style.display='none';
            }
        }
    }
}
purge();
