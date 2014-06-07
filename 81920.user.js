// ==UserScript==
// @name           Reddit Username Colorizer
// @description    Colorizes usernames on reddit comments for easy recognition.
// @include        http://www.reddit.com/*
// ==/UserScript==

/* Settings */

/* Add any colors you wish to be used here. */
var colors = [
    "#81204d",
    "#62abb2",
    "#e59aed",
    "#5f6eef",
    "#98837e",
    "#8a46a9",
    "#a3c5f3",
    "#a595d3",

    "#f96271",
    "#fa972f",
    "#ddaa13",
    "#c89113",
    "#fc63a4",
    "#fc5f7e",
    "#fb40a9",
    "#eb369f",
    "#eb57ad",

    "#d3789b",
    "#b58d8b",
    "#54738f",
    "#8394ae",
    "#87717e",
    "#a61325",

    "#972228",
    "#622b7e",
    "#5089ce",
    "#4c7da5",
    "#5a8395",
    "#31527b",
    "#329042",
    "#5c795a",
    "#9f0f0f",

    "#3b2b5c",
    "#12495e",
    "#1961ad",
    "#184473",
    "#5d4a6a",
    "#921e11",
    "#1b0848",
    "#202d1c",
    "#654f76",

    "#035c96",
    "#0d2a6c",
    "#543d67"
];

/* If you want to give yourself a specific color */
var mycolor = null;

(function () {
    if (mycolor != null)
        var myself = unsafeWindow.reddit.logged;

    var authors = document.evaluate(
        "//a[contains(@class, 'author')]",
        document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < authors.snapshotLength; i++)
    {
        var elem = authors.snapshotItem(i);
        var author = elem.textContent;
        elem.textContent = "";

        // Get character sum
        var sum = 0;
        for (var j = 0; j < author.length; j++)
            sum += author.charCodeAt(j);

        // Get color
        if (mycolor != null && author == myself)
            var color = mycolor;
        else
            var color = colors[sum % colors.length];

        // Set color
        var span = document.createElement("span");
        span.textContent = author;
        span.style.color = color;
        elem.appendChild(span);
    }
})()
