// ==UserScript==
// @name        PocketSaver
// @namespace   http://trulz.ca
// @include     https://pay.reddit.com/*
// @include     https://www.reddit.com/*
// @include     http://reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

function applyChanges() {
    $(".entry .flat-list").each(function( index ) {
        var perm = $( this ).find(".first a")
        var url = perm.attr("href");
        if (url != undefined) {
            var pocketlink = $("<a>")
            pocketlink.text("pocket")
            pocketlink.attr("href", "http://rs.andred.ca/" + url.split("reddit.com/")[1])
            var listItem = $("<li>")
            listItem.append(pocketlink)
            $(this).append(listItem)
        }
    });
}

window.addEventListener('neverEndingLoad', function() {
    applyChanges();
});

$(applyChanges);