// ==UserScript==
// @name           Chiquwatter
// @namespace      chiquwatter
// @description    ちくわになります。
// @include        http://twitter.com/*
// ==/UserScript==

    var following = "Chikuwing"
    var follower = "Chikuwers"
    var lists = "Chikuwed"

    if(document.getElementsByTagName("html")[0].lang == "ja") {
        following = "ちくわり"
        follower = "ちくわられ"
        lists = "ちくわぶ"
    }

    document.getElementById("following_count_link").innerHTML = following;
    document.getElementById("follower_count_link").innerHTML = follower;
    document.getElementById("lists_count_link").innerHTML = lists;