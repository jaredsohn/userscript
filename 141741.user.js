// ==UserScript==
// @name        Imgur Direct Image Links
// @description Changes imgur.com links to i.imgur.com on reddit.
// @author      Wallyruss
// @include     http://www.reddit.com/*
// ==/UserScript==
var links = document.evaluate('//p//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i ++) {
    var meow = links.snapshotItem(i);
    if (meow.href.match(/http:\/\/(www\.)?imgur\.com\/.+/) && meow.href.indexOf("/a/") == -1 && meow.href.indexOf("gallery") == -1 && meow.href.indexOf("blog") == -1 && meow.href.indexOf(".jpg") == -1 && meow.href.indexOf(".png") == -1 && meow.href.indexOf(".gif") == -1 && meow.href.indexOf(".jpeg") == -1) {    
        if (meow.href.indexOf("/r/") != -1) {
            if (meow.href.match(/r\/.*?\/{1}/)) {
                meow.href = meow.href.replace(/r\/[a-zA-Z-0-9]*.{1}/, "");
                var id = meow.href.substr(17);
                meow.href = "http://i.imgur.com/"+id+".jpg";
            }
        }
        else {
            var id = meow.href.substr(17);
            meow.href = "http://i.imgur.com/"+id+".jpg"; //actual extension doesn't matter, just needs to be a typical image one
            //console.log(meow.href);
        }
    }
}