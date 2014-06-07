// ==UserScript==
// @name        4chan board-specific names
// @namespace   http://userscripts.org/users/77660
// @description Remembers a different name for each board you post on.
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// ==/UserScript==

var board = location.pathname.split("/").slice(0,2).join("/");
var name = decodeURIComponent((document.cookie.match(/(?:;|^)\s*4chan_name_boardspecific\s*=\s*([^;]*)/) || ["",""])[1]);
document.getElementsByName("name")[0].value = name;
document.cookie = "4chan_name=" + escape(name) + ";path=" + board;
document.addEventListener("change", function(e) {
    if (e.target.name == "name") {
        document.cookie = "4chan_name=" + encodeURIComponent(e.target.value) + ";path=" + board;
        document.cookie = "4chan_name_boardspecific=" + encodeURIComponent(e.target.value) + ";path=" + board;
    }
}, false);
