// ==UserScript==
// @name        Hurr Durr
// @namespace   xzxzzxzxzca
// @include     https://twitter.com/*
// @version     0.3
// @grant       none
// ==/UserScript==

var hurs = ["hurr", "durr", "derp"];  // Words for replacement
var revertClassName = "action-hurr-durr";  // Revert element class name

function randomInRange(from, to) {
    return from + Math.round( Math.random() * (to - from) );
}

function randomHurrDurr() {
    return hurs[randomInRange(0, hurs.length - 1)];
}


function hurrDurrText(text) {
    function hurrDurrMatch(match, p1) {
        return (match[0] == "@") ? match : p1 + randomHurrDurr();
    }
    return text.replace(/([@#]?)\S+/g, hurrDurrMatch);
}

function createAction(origHTML, hurrDurrHTML) {
    var fragment = document.createDocumentFragment();
    var li = fragment.appendChild(document.createElement("li"));
    var a = li.appendChild(document.createElement("a"));
    a.setAttribute("href", "#");
    a.text = "Hurr";
    a.classList.toggle(revertClassName);
    a.dataset.hurrDurrOriginalHTML = origHTML;
    a.dataset.hurrDurrHTML = hurrDurrHTML;
    a.dataset.hurrDurr = "1";
    return fragment;
}

function processResponse(response) {
    if (!response.classList.contains("simple-tweet"))
        return;
    var responseText = response.querySelector("div.content > p.tweet-text");
    if (!responseText)
        return;
    // Replace text
    var origHTML = responseText.innerHTML;
    var xpr = document.evaluate('./text()', responseText, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.invalidIteratorState || xpr.snapshotLength < 1)
        return;
    for (var i = 0, len = xpr.snapshotLength; i < len; i++) {
       var textNode = xpr.snapshotItem(i);
       textNode.textContent = hurrDurrText(textNode.textContent);
    }
    // Add revert action
    var actions = response.querySelector("ul.tweet-actions");
    if (!actions)
        return;
    actions.insertBefore(
        createAction(origHTML, responseText.innerHTML),
        actions.childNodes.item(1));
}

function processNode(node) {
    var responses = node.querySelectorAll("div.simple-tweet");
    for (var i = 0, len = responses.length; i < len; i++) {
        var response = responses.item(i);
        try {
           processResponse(response);
        }
        catch (e) {
            alert("Hurr-Durr: " + e + "\n" + response);
        }
    }    
}

function processToggleClick(toggleItem) {
    var xpr = document.evaluate('ancestor::div[@class = "content"]', toggleItem,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.invalidIteratorState || xpr.snapshotLength < 1)
        return;
    var responseText = xpr.snapshotItem(0).querySelector("p.tweet-text");
    if (toggleItem.dataset.hurrDurr == "1") {
        responseText.innerHTML = toggleItem.dataset.hurrDurrOriginalHTML;
        toggleItem.dataset.hurrDurr = "0";
        toggleItem.text = "Durr";
    }
    else {
        responseText.innerHTML = toggleItem.dataset.hurrDurrHTML;
        toggleItem.dataset.hurrDurr = "1";
        toggleItem.text = "Hurr";
    }
}

var repliesContainer = document.querySelector("ol#stream-items-id");

repliesContainer.addEventListener("DOMNodeInserted", function(event) {
    if (!event.target || event.target.nodeType != document.ELEMENT_NODE)
        return;
    processNode(event.target);
}, false);

repliesContainer.addEventListener("click", function(event) {
    var el = event.target;
    if (!el || el.nodeType != document.ELEMENT_NODE)
        return;
    if (el.tagName != "A" || !el.classList.contains(revertClassName))
        return;
    processToggleClick(el);
    event.preventDefault();
}, false);

processNode(document);

