// ==UserScript==
// @name           SoundCloud - Hide comments (with dashboard support)
// @namespace      http://userscripts.org/users/476795
// @description    Hides comments on tracks. Works on any page.
// @icon           http://i.imgur.com/vXfx8.png
// @include        http://soundcloud.com/*
// @version        1.0
// ==/UserScript==

function RemoveComments(players){
    if(players != null){
        var playerCount = players.length,
            player = null;
        
        for (var i = 0; i < playerCount; i++) {
            player = players[i];
            if(player != null){
                player.setAttribute("class", player.getAttribute("class") + " no-comments");
            }
        }
    }
}

function AddCommentRemover(container){
    if(container != null && container.nodeType == 1){
        container.addEventListener("DOMNodeInserted", function(e){
            var target = e.target;
            if(target != null && target.nodeType == 1){
                var tagName = target.tagName.toLowerCase();
                if(tagName == 'li'){
                    RemoveComments(target.getElementsByClassName("player"));
                }else if(tagName == 'div'){
                    target.setAttribute("class", target.getAttribute("class") + " no-comments");
                }
            }
        }, false);
    }
}

RemoveComments(document.getElementsByClassName("player"));

AddCommentRemover(document.getElementById("main-wrapper-inner"));
