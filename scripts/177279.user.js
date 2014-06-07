// ==UserScript==
// @name        Ignore Users on Cook'd and Bomb'd
// @namespace   http://www.stupidpupil.co.uk
// @include     http://www.cookdandbombd.co.uk/forums/*
// @grant       none
// @version     1.0
// ==/UserScript==

var ignoredUsers, expireAfter, opacity;

expireAfter = 1209600000; //Milliseconds
opacity = '0.3';

ignoredUsers = window.localStorage.getItem("ignoredUsers");
if (ignoredUsers) {
    ignoredUsers = JSON.parse(ignoredUsers);
} else {
    ignoredUsers = {};
}

//

function expireIgnores(){
    var ignore, i;

    for (i in ignoredUsers) {
        ignore = ignoredUsers[i];

        if ((Date.now() - ignore.ignored) > expireAfter){
            unignoreUser(i);
        }
    }
}

function ignoreUser(uid, username) {
    ignoredUsers[uid] = {
        'username': username,
        'ignored': Date.now()
    };
    window.localStorage.setItem("ignoredUsers", JSON.stringify(ignoredUsers));
}

function unignoreUser(uid) {
    delete ignoredUsers[uid];
    window.localStorage.setItem("ignoredUsers", JSON.stringify(ignoredUsers));
}



//

function setIgnoreLink() {
    if (!window.location.search.match("action=profile;u=")) {return false; }

    var infolinks, anchor, uid;
    infolinks = document.getElementById("infolinks");
    anchor = document.getElementById("ignorelink");
    uid = window.location.search.replace(new RegExp(".+;u=(\\d+)"), "$1");


    if (anchor) {
        anchor.childNodes[0].remove();
    } else {
        anchor = document.createElement("a");
        anchor.setAttribute("href", "#ignorelink");
        anchor.setAttribute("id", "ignorelink");

        anchor.addEventListener("click", function () {
            var cuid, username;
            cuid = window.location.search.replace(new RegExp(".+;u=(\\d+)"), "$1");
            username = document.getElementsByClassName("username")[0].textContent.trim();


            if (ignoredUsers[cuid]) {
                unignoreUser(cuid);
            } else {
                ignoreUser(cuid, username);
            }

            setIgnoreLink();
            return false;
        });

        infolinks.appendChild(document.createElement("br"));
        infolinks.appendChild(anchor);
    }


    if (ignoredUsers[uid]) {
        anchor.appendChild(document.createTextNode("Unignore User"));
    } else {
        anchor.appendChild(document.createTextNode("Ignore User"));
    }

}

//

function hideThreads() {
    if (!window.location.href.match("board")) {return false; }

    var subjects, subject, uid, i;
    subjects = document.getElementsByClassName('subject');

    for (i in subjects) {
        subject = subjects[i];

        if (subject.getElementsByTagName) {
            uid = subject.getElementsByTagName("p")[0].getElementsByTagName("a")[0].href.replace(new RegExp(".+u=(\\d+)"), "$1");

            if (ignoredUsers[uid]) {
                subject.parentNode.style.opacity = opacity;
                subject.getElementsByTagName("span")[0].style.display = "none";;
                subject.parentNode.getElementsByClassName("stats")[0].textContent = "";
                subject.parentNode.getElementsByClassName("lastpost")[0].textContent = "";
            }
        }
    }
}

function hidePosts() {
    if (!window.location.href.match("topic")) {return false; }

    var posts, post, uid, i;
    posts = document.getElementsByClassName('post_wrapper');

    for (i in posts) {
        post = posts[i];

        if (post.getElementsByTagName) {
            uid = post.getElementsByClassName("poster")[0].getElementsByTagName("h4")[0].getElementsByTagName("a")[0].href.replace(new RegExp(".+u=(\\d+)"), "$1");

            if (ignoredUsers[uid]) {
                post.parentNode.style.opacity = opacity;
                post.getElementsByClassName("avatar")[0].style.display = "none";;
                post.getElementsByClassName("post")[0].style.display = "none";;
                post.getElementsByClassName("keyinfo")[0].style.display = "none";;
                post.getElementsByClassName("reset")[0].style.display = "none";;
                post.getElementsByClassName("moderatorbar")[0].style.display = "none";;
                post.getElementsByClassName("quote_button")[0].style.display = "none";;
            }
        }
    }
}


function hideQuotes() {
    if (!window.location.href.match("topic")) {return false; }

    var quoteheaders, qh, usernames, qusername, i;
    quoteheaders = document.getElementsByClassName('quoteheader');

    usernames = [];
    for (i in ignoredUsers) {usernames.push(ignoredUsers[i].username); }

    for (i in quoteheaders) {
        qh = quoteheaders[i];
        qusername = qh.textContent.replace(new RegExp("Quote from: (.+?) on .+"), "$1").trim();

        if (usernames.indexOf(qusername) > -1) {
            qh.nextSibling.textContent = "";
            qh.nextSibling.style.opacity = opacity;
            qh.style.opacity = opacity;
        }
    }
}

expireIgnores();
setIgnoreLink();
hidePosts();
hideThreads();
hideQuotes();