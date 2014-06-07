// ==UserScript==
// @name           Get Gmail Thread Link
// @description    Adds a button which lets you copy the persistent URL of a Gmail thread
// @version        1.0
// @namespace      oyvey
// @include        http*://mail.google.com/*
// @match          http://mail.google.com/*
// @match          https://mail.google.com/*
// ==/UserScript==


var getUrl = function() {
    var gmailUrl = parent.location.href;
    var threadId = gmailUrl.substring(gmailUrl.lastIndexOf('/')+1);
    var threadUrl = "https://mail.google.com/mail/#all/" + threadId;
    return prompt("Copy to clipboard: Ctrl+C or ⌘+C", threadUrl);
}

var addButton = function() {
    var iframe = document.getElementById('canvas_frame');
    if (iframe == null) return;
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (innerDoc.getElementById("copy_url") != null) return; 
    var c = innerDoc.getElementById(':ro');
    var c1 = null;
    for (var i=0; i< c.children.length; i++) {
       if (c.children[i].hasAttribute("gh")) {c1 = c.children[i]; break;}
    }
    if (c1==null) {
        return;	
    }
    
    if (!c1.children[0].hasAttribute("gh")) return;
    var p = c1.children[0].children[0];
    var d = document.createElement('div');

    d.addEventListener('click', getUrl, true);
    d.setAttribute("class", "G-Ni J-J5-Ji");
    d.innerHTML = "<div tabindex=\"0\" role=\"button\" class=\"T-I J-J5-Ji T-I-Js-IF ar7 T-I-ax7 L3\" id=\"copy_url\" aria-expanded=\"false\" style=\"-moz-user-select: none;\" aria-haspopup=\"true\" aria-label=\"Get Link\" onmouseover=\"this.className=\'T-I J-J5-Ji T-I-Js-IF ar7 T-I-ax7 L3 T-I-JW'\" onmouseout=\"this.className=\'T-I J-J5-Ji T-I-Js-IF ar7 T-I-ax7 L3'\"><div class=\"asa\">Get Link</div></div>";
    p.appendChild(d);	
}

var hasMessageId = function() {
    var hashVal = top.location.hash;
    if (hashVal.indexOf("#label/") != -1) {
        hashVal = hashVal.substring(7);
    }
    if (hashVal.indexOf('/') != -1) {
        return 1;
    }
    return 0;
}

var checkUrl = function() {
    var hashVal = top.location.hash;
    if (hasMessageId()) {
        addButton();
    } 
}

var init = function() {
    window.addEventListener("hashchange", checkUrl, false);
    checkUrl();
}

init();