// ==UserScript==
// @name           Google Reader Search Current Feed Button
// @namespace      http://qixinglu.com
// @description    Add a new button next search button, to search current feed.
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

var search_current_feed = function() {
    var url, search_string, replace_string, reg;
    url = window.location.href;
    search_string = document.getElementById("search-input").value;
    if (search_string === "") {
        return;
    }
    replace_string = "#search/" + search_string + "/";
    if (url.indexOf("#stream") !== -1) {
        window.location.href = url.replace("#stream",replace_string);
    } else if (url.indexOf("#search") != -1) {
        reg = new RegExp("#search/[^/]\+/");
        window.location.href = url.replace(reg,replace_string);
    }
}

var search_button = document.getElementById("gbqfb")
var new_search_button = search_button.cloneNode(true);
new_search_button.id = "gbqfb_new";
new_search_button.style.marginLeft = '8px';

new_search_button.addEventListener("click", search_current_feed, false);
new_search_button.addEventListener("mouseover", function() {
    this.classList.add('jfk-button-hover');
}, false);
new_search_button.addEventListener("mouseout", function() {
    this.classList.remove('jfk-button-hover');
}, false);

search_button.parentNode.appendChild(new_search_button);
