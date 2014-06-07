// ==UserScript==
// @name        BSE comment block
// @namespace   http://localhost
// @description hide comments from specific users
// @include     http://bleachsoulevolution.com/forum/*
// @version     1
// @grant	none
// ==/UserScript==
    var comments = document.getElementById("comment_list");
    var posts = comments.getElementsByTagName("li");
    for (var i = 0; i < posts.length; i++) {
        var block = posts[i].getElementsByTagName("a");
        for (var l = 0; l < block.length; l++) {
            if (block[l].className == "__user __id") { //user id number goes here
                posts[i].style.display = "none";
            }
        }
    }