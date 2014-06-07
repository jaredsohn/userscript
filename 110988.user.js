// ==UserScript==
// @name       FWZ: Snipe Script
// @namespace  http://www.somethingafal.com/
// @version    0.1
// @description  puts a button by a thread when it's ready to be sniped
// @include    http://*.forumwarz.com/discussions/topics/*
// @include    http://forumwarz.com/discussions/topics/*
// @include    http://*.forumwarz.com/discussions/reply/*
// @include    http://forumwarz.com/discussions/reply/*
// @copyright  2011+, Johnald The Robot
// ==/UserScript==

if (window.location.hash == "#snipe") {
    document.getElementById("discussion_post_body").value = "SNIPING THIS THRADE";
    document.getElementById("preview_buttons").children[0].onclick();
}

var threads = document.getElementsByTagName("table")[1].children[0].children;

for (var i = 1; i < threads.length; i++) {
    var thread = threads[i];
    if (thread.children[3].innerHTML % 20 == 0) {
        var topic = thread.children[1];
        var url = topic.getElementsByTagName("a")[0].href.replace("view", "reply");
        topic.innerHTML += '<big><b><a style="color:red;" href="' + url + '#snipe">SNIPER</a></b></big>';
    }
}