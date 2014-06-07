// ==UserScript==
// @name           GreatLeader
// @namespace      greatleader
// @description    This script makes DPRK's leaders' names larger, as in North Korean Internet and newspapers
// @include        *
// ==/UserScript==

/*
Wrap every instance of the Great Leaders' (,  and Kim Il-song)
names in a span with a class of 'kju' and size of 140%.

Credits go to: http://mgakashim.com/405/kim-jong-un
*/

function findText(element, pattern, callback) {
    for (var childi= element.childNodes.length; childi-->0;) {
        var child= element.childNodes[childi];
        if (child.nodeType==1) {
            findText(child, pattern, callback);
        } else if (child.nodeType==3) {
            var matches= [];
            var match;
            while (match= pattern.exec(child.data))
                matches.push(match);
            for (var i= matches.length; i-->0;)
                callback.call(window, child, matches[i]);
        }
    }
}

findText(document.body, /\bKim J[ou]ng[- ]?([eE]?[uU]n|[Ii][lr])\b|\uAE40\uC815(\uC77C|\uC740)|\u91D1\u6B63(\u65E5|\u6069)|Kim I[rl][- ]?[Ss][eu]ng?/g, function(node, match) {
    var span= document.createElement('span');
    span.className= 'kju';
    span.style.fontSize = '140%';
    node.splitText(match.index+11);
    span.appendChild(node.splitText(match.index+0));
    node.parentNode.insertBefore(span, node.nextSibling);
});