// ==UserScript==
// @name          Share with reddit user
// @namespace     http://github.com/mikm/
// @description   Add a link to share a submission or comment with another redditor
// @include       http://*.reddit.com/*
// @exclude        http://*.reddit.com/compose/*
// @exclude        http://*.reddit.com/prefs/*
// @exclude        http://*.reddit.com/message/moderator/*
// @exclude        http://*.reddit.com/message/messages/*
// @exclude        http://*.reddit.com/compose
// @exclude        http://*.reddit.com/reddits/*
// ==/UserScript==
var elms = document.getElementsByClassName("thing");
id_matcher = /id-(t\d)_(\w+)/;
permalink_matcher = /<a href="(.*)" class="bylink" rel="nofollow">permalink</;

for (var i = 0; i < elms.length; ++i) {
    if (elms[i].className.indexOf("reddit-link") != -1) {
        continue;
    }
    var id = id_matcher.exec(elms[i].className);
    console.log(id);

    if (!id) {
        continue;
    }
  
    var uls = elms[i].getElementsByTagName("ul");    
    for (var j = 0; j < uls.length; j++) {
        if (uls[j].className.indexOf("buttons") == -1) {
            continue;
        }
        console.log(uls[j]);
        
        var shareurl;
        if (id[1] == "t1") {
            shareurl = permalink_matcher.exec(uls[j].innerHTML)[1];
        }
        else if (id[1] == "t3") {
            shareurl = "http://reddit.com/" + id[2];
        }
        else {
            continue;
        }
        console.log(shareurl);

        var message_url = "http://reddit.com/message/compose/?message=" + shareurl;
        uls[j].innerHTML += "<li><a href=\"" + message_url + "\">share with redditor</li>";
        break;
    }
}