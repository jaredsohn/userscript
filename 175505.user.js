// ==UserScript==
// @name          Tag YouTube Partner Videos
// @description   Tags YouTube partner videos.
// @namespace     http://turplepurtle.com
// @author        TurplePurtle
// @version       0.1
// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*
// ==/UserScript==


// Util
function $(s,a,p) {
    p = p || document;
    return a ? p.querySelectorAll(s) : p.querySelector(s);
}
function getJson(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

// Tag CSS
var styleTag = document.createElement("style");
styleTag.innerHTML = [
"._partner-tag {",
    "background-color: rgba(33,33,33,0.7);",
    "color: #fff;",
    "position: absolute;",
    "z-index: 100;",
"}"
].join("");

$("head").appendChild(styleTag);

// Get JSON data and tag the vids
var jsonURL = [
    "https://gdata.youtube.com/feeds/api/videos/", null,
    "?v=2&alt=json&fields=media:group(media:credit)",
];

function main() {
    var thumblinks = $('a[href*="/watch?v="].ux-thumb-wrap', true);
    
    [].forEach.call(thumblinks, function(el) {

        var vid = el.href.replace(/^[^v]+v.(.{11}).*/, "$1");
        if (!vid) return;

        jsonURL[1] = vid;

        getJson(jsonURL.join(""), function(obj) {

            var mediaCredit = obj.entry.media$group.media$credit[0];
            var isPartnered = mediaCredit.yt$type ?
                              mediaCredit.yt$type === "partner" : false;

            var tag = document.createElement("span");
            tag.className = "_partner-tag";
            tag.innerHTML = isPartnered ? "P" : "NP";

            el.insertBefore(tag, el.firstChild);
        });
    });
}

main();
