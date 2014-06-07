// ==UserScript==
// @name           undo script emoticon damage
// @namespace      http://forums-archive.secondlife.com
// @description    try to repair code blocks that inappropriately got emoticons when forums.secondlife.com was archived
// @include        http://forums-archive.secondlife.com/*
// ==/UserScript==



var i, j, tags;

tags = document.getElementsByTagName("div");
for (i = 0; i < tags.length; i++) {
    if (tags[i].className == 'post-text') {

        // undo some smilies in the whole body if this is the scripting library or scripting tips forum.
        if (document.URL.match(/forums-archive\.secondlife\.com\/(15|54)\//)) {
            // side effect: real winks become ) instead of ;)
            tags[i].innerHTML =  tags[i].innerHTML.replace(/<img[^>]+?wink\.png\"[^>]+?>/g, ")");
            tags[i].innerHTML =  tags[i].innerHTML.replace(/<img[^>]+?confused\.png\"[^>]+?>/g, ":s");
        }

        // make images clickable, add alt text to re-enable the img as link hack used
        // in the forum's later days
        var images = tags[i].getElementsByTagName("img");
        for (j = 0; j < images.length; j++) {
            if (images[j].src) {
                images[j].border='0';
                var anchor = document.createElement('a');
                anchor.href=images[j].src;
                if (!images[j].alt) {
                    images[j].alt = images[j].src;
                }
                anchor.appendChild(images[j].cloneNode(true)); 
                images[j].parentNode.replaceChild(anchor, images[j]);
            }
        }

        // fix up historical wiki links
        var anchors = tags[i].getElementsByTagName("a");
        for (j = 0; j < anchors.length; j++) {
            if (anchors[j].href) {

                // badgeometry wiki links to lslwiki.net
                anchors[j].href = anchors[j].href.replace(
                    /(http:\/\/www.badgeometry.com\/wiki\/)(.*)/,
                    'http://lslwiki.net/lslwiki/wakka.php?wakka=$2');

                // lslwiki.com to lslwiki.net
                anchors[j].href = anchors[j].href.replace(
                    /(http:\/\/www.lslwiki.com\/)(.*)/,
                    'http://lslwiki.net/$2');
            }
        }
    }
}

tags = document.getElementsByTagName("pre");

// fix up some LL-inflicted damage inside code/lsl blocks
for (i = 0; i < tags.length; i++) {
    if (tags[i].className == 'll-code') {

        // ')' after '"' was mangled to wink emoticon
        tags[i].innerHTML = tags[i].innerHTML.replace(/<img[^>]+?wink\.png\"[^>]+?>/g, ")");

        // some '(' were mangled to cry emoticon
        tags[i].innerHTML = tags[i].innerHTML.replace(/<img[^>]+?cry\.png\"[^>]+?>/g, "(");

        // (h) turned into this, why?
        tags[i].innerHTML = tags[i].innerHTML.replace(/<img[^>]+?shade\.png\"[^>]+?>/g, "(h)");

        // some instances of 'b' variables were turned into <b> tags
        tags[i].innerHTML = tags[i].innerHTML.replace(/<b>/g, "b");
        tags[i].innerHTML = tags[i].innerHTML.replace(/<\/b>/g, "");

        // ... a few <em> were really in colorized code, so ...
        tags[i].innerHTML = tags[i].innerHTML.replace(/(<em>)(<span style.+?>)(.+?)(<\/em>)/g, '<b>$2$3</b>');
        // ... but some instances of 'i' variables were turned into <em> tags
        tags[i].innerHTML = tags[i].innerHTML.replace(/<em>/g, "[i]");
        tags[i].innerHTML = tags[i].innerHTML.replace(/<\/em>/g, "");

        // [url] in LSL was misinterpreted as bbcode :(
        tags[i].innerHTML = tags[i].innerHTML.replace(/<a href=\"(.*?)>/g, "[url]");
    }
}
