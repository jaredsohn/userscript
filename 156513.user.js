// ==UserScript==
// @name        Reddit Show gifs in comments
// @namespace   blambi.reddit
// @description Converts gif image links in comments to image tags.
// @include     http://www.reddit.com/r/*/comments/*
// @version     1
// ==/UserScript==

// Use either md or usertext-body, md seems simpler
var comments = document.getElementsByClassName('md');

if(comments.length<1000) {
    for(var x = 0; x<comments.length; x++) {
        // A bit of a hack but :D
        if(comments[x].children[0].innerHTML.match(/<a href=".*\.gif">.*<\/a>/)) {
            var rep_text = comments[x].children[0].innerHTML.replace(/<a href="(.*\.gif)">(.*)<\/a>/, '<a href="$1"><img style="display: inline;" src="$1" alt="$2"/><p>$2</p></a>');
            comments[x].children[0].innerHTML = rep_text;
        }   
    }
}
