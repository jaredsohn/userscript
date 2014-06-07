// ==UserScript==
// @name        MAL bbcode enabler
// @namespace   mal
// @description (re)-enables [img] on MyAnimeList
// @include     http://myanimelist.net/*
// @version     2.1.1
// @grant       none
// ==/UserScript==
window.onload = function() {
    var selector =
            'div[id^="comment"] .borderClass:nth-child(2),' +
            '.forum_boardrow1 div[id^="message"], .forum_boardrow1 .sig,' +
            'div[id^="com"] div[id^="comtext"],' +
            '#content > div[style="padding: 0 0 13px 13px;"],' +
            'a[name^="com"] + table,' +
            'div[id^="more"] .borderRBL, ' +
            'div[style="width: 690px; overflow: hidden; margin: 0 auto;"], ' +
            '.borderClass[valign="top"][style="border-width: 0 1px 0 0 ;"]:first-child';

    var elementList = document.querySelectorAll(selector);
    var imgBB = /\[img\](.+?)\[\/img\]/gi;
    var ytBB = /\[yt\]([-a-zA-Z0-9]+?)\[\/yt\]/gi;
    var urlPattern = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:;@#%&()~_?\+=\/\\\.]*$/;
    var disabledImgTag = /<!--<img\s+(class="userimg")?\s*data-src="([^"]*?)"\s*\/>-->/gi
    var toImgTag = function (fullMatch, firstBrackets, offset, s) {
        var myUrl = firstBrackets;
        urlPattern.lastIndex = 0;
        if ( !urlPattern.test( myUrl ) ) {
            myUrl = "";
        }
        return '<img src="' + myUrl + '" />';
    }
    var toYouTube = function (fullMathch, firstBrackets, offset, s) {
        return '<embed width="425" height="355" wmode="transparent"' +
                'type="application/x-shockwave-flash" src="http://www.youtube.com/v/' +
                firstBrackets + '&rel=1">';
    }
    var toEnabledImgTag
    = function (fullMatch, firstBrackets, secondBrackets, offset, s) {
        var url = secondBrackets;
        urlPattern.lastIndex = 0;
        if ( !urlPattern.test( url ) ) {
            url = "";
        }
        return '<img src="' + url + '" />';
    }

    for (var i = 0; i < elementList.length; ++i) {
        var item = elementList[i];
        item.innerHTML = item.innerHTML
        .replace(imgBB, toImgTag)
        .replace(ytBB, toYouTube)
        .replace(disabledImgTag, toEnabledImgTag);
    }
    
    // Sometimes MAL puts your sig out of div.sig
    // The following code aims to fix that
    String.prototype.escape = function() {
        var tagsToReplace = {
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        };
        return this.replace(/[<>'"]/g, function(tag) {
            return tagsToReplace[tag] || tag;
        });
    };
    
    var sigDivs = document.getElementsByClassName('forum_boardrow1');
    for (var i = 0; i < sigDivs.length; ++i) {
    var children = sigDivs[i].childNodes;
        for (var j = 0; j < children.length; ++j) {
            var child = children[j];
            if (child.nodeType == child.TEXT_NODE
                && imgBB.exec(child.textContent)) {
                var newDiv = document.createElement("div");
                newDiv.innerHTML = child.textContent
                .replace(disabledImgTag, toEnabledImgTag)
                .escape().replace(imgBB, toImgTag);
                sigDivs[i].replaceChild(newDiv, child);
            }
        }
    }
    var imgTags = document.getElementsByTagName("img");
    for (var i = 0; i < imgTags.length; ++i) {
        var tag = imgTags[i];
        if (tag.hasAttribute("data-src")
           && !tag.hasAttribute("src")) {
            tag.setAttribute("src", tag.getAttribute("data-src"));
        }
    }
}
