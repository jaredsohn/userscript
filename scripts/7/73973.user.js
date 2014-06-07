// ==UserScript==
// @name           Large Number of the Followers
// @namespace      Large Number of the Followers
// @description    すごい！人気者！
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

    if(document.getElementsByTagName("html")[0].lang == "ja") {
        follower = "<font face=Georgia size=3>95,535</font><br/>フォローされている"
    }
    document.getElementById("follower_count_link").innerHTML = follower;