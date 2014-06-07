// ==UserScript==
// @name           redditenemies
// @namespace      redditenemies
// @description    enemies. on reddit
// @include        http://*.reddit.com/*
// ==/UserScript==

var user24_reddit_enemies = function() {
    var enemies = "";

    var public = {
        setEnemies: function(strEnemies) {
            enemies = strEnemies;
        },
        go: function () {
            var taglines = document.getElementsByClassName("tagline");

            enemies = enemies.toLowerCase();

            // search in normal threads and user pages:
            if(window.location.toString().search("/r/")>=0 || window.location.toString().search("/user/")>=0) {
                var children;
                for(var i=0 ; i<taglines.length ; i++) {
                    children = taglines[i].children;
                    for(var j=0 ; j<children.length ; j++) {

                        var candidate = children[j].innerHTML.toLowerCase();
                        if(children[j].className.search("author")>=0 && enemies.search(new RegExp("(^| |,)" + candidate + "($| |,)", "i"))>=0) {
                            children[j].style.color = "#FAA";
                            children[j].innerHTML += " [ENEMY]";
                            taglines[i].nextSibling.children[1].innerHTML = "<a href='#' style='color: #AAA;' onClick='this.innerHTML=unescape(\""+escape("<span style='color:#aaa;'>"+taglines[i].nextSibling.children[1].innerHTML+"</span>")+"\"); return false;'>enemy comment hidden</a>";
                            break;
                        }
                    }
                }
            }

            // search in inbox:
            if(window.location.toString().search("/message/")>=0) {
                var inboxChild;
                for(var i=0 ; i<taglines.length ; i++) {
                    inboxChild = taglines[i].children[1].children[0].children[0];
                    var candidate = inboxChild.innerHTML.toLowerCase();
                    if(enemies.search(new RegExp("(^| |,)" + candidate + "($| |,)", "i"))>=0) {
                        inboxChild.style.color = "#FAA";
                        inboxChild.innerHTML += " [ENEMY]";
                        taglines[i].nextSibling.nextSibling.children[0].innerHTML = "<a href='#' style='color: #AAA;' onClick='this.innerHTML=unescape(\""+escape("<span style='color:#aaa;'>"+taglines[i].nextSibling.nextSibling.children[0].innerHTML+"</span>")+"\"); return false;'>enemy comment hidden</a>";
                   }
                }
            }
        }
    }
    // very important - return the public part!
    return public;
}();

user24_reddit_enemies.setEnemies(""); // simple comma separated string, eg "jimbo,dave,pete". case insensitive

user24_reddit_enemies.go();