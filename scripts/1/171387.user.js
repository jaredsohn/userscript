// ==UserScript==
// @name        Youtube full description on click
// @namespace   http://userscripts.org/users/519557
// @description Expands any youtube description to the full version on click.
// @match       *://*.youtube.com/*
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @version     1.0.5
// ==/UserScript==

"use strict";

var mylog = function () {
    return;
};
//uncomment for debugging
mylog = console.log;

//Parse a paragraph for urls and create anchors
function createP(str) {
    mylog("createP: start");

    var p, urlexp, urls, n, i, x1, x2, txt, a, url;
    p = document.createElement("p");
    // regexp to find urls
    // http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without-the
    // with several bugfixes added
    urlexp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9.\-]+)((?:\/[\+~%\/.\w_\-]*)?\??(?:[\-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/g;

    urls = str.match(urlexp);
    n = urls ? urls.length : 0;
    x1 = 0;
    for (i = 0; i < n; i++) {
        url = urls[i];
        x2 = str.indexOf(url, x1);
        txt = str.substring(x1, x2);
        x1 = x2 + url.length;

        mylog("createP: adding text: " + txt);
        p.appendChild(document.createTextNode(txt));

        mylog("createP: adding a href: " + url);
        a = document.createElement("a");
        a.href = url;
        a.appendChild(document.createTextNode(url));
        p.appendChild(a);
    }
    txt = str.substring(x1);
    mylog("createP: adding text: " + txt);
    p.appendChild(document.createTextNode(txt));
    mylog("createP: done");
    return p;
}

//Transform flat multi-line text into a div with paragraphs
function formatDescription(txt) {
    mylog("formatDescription: ", txt);
    var lines, div, i;
    div = document.createElement("div");
    div.className = "monkey-full-description-replacement monkey-full-description-margin";
    lines = txt.split("\n");
    for (i = 0; i < lines.length; i++) {
        div.appendChild(createP(lines[i]));
    }
    mylog("formatDescription: done");
    return div;
}

//For a given video ID request info from youtube api
function requestApi(vid, handler) {
    mylog("requestApi: ", vid);
    var url = "https://gdata.youtube.com/feeds/api/videos/" + vid + "?v=2&alt=json";
    mylog("requestApi: ", url);
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: handler
    });
    mylog("requestApi: done");
}

//OnClick replace this with this.other
function swap(event) {
    var me = event.currentTarget;
    mylog("swap: ", me.className, " ", me.other.className);
    if (event.button === 0 && event.target.tagName !== 'A') {
        me.parentNode.replaceChild(me.other, me);
    }
    mylog("swap: done");
}

//Prepare orig and full for onclick swapping, do one swap
function bindSwap(orig, full) {
    mylog("bindSwap: ", orig.className, " ", full.className);
    orig.className = orig.className + ' monkey-full-description-prepared';
    orig.other = full;
    full.other = orig;
    full.addEventListener('click', swap, false);
    orig.addEventListener('click', swap, false);
    orig.parentNode.replaceChild(full, orig);
    mylog("bindSwap: done");
}

//Prepare .description div to be swapped with the full-text description
function prepareDescription(event) {
    if (event.button === 0) {
        var orig, vid, infoHandler;
        orig = event.currentTarget;
        mylog("prepareDescription: ", orig);
        orig.removeEventListener('click', prepareDescription, false);
        orig.className = orig.className + " monkey-full-description-prepared";
		vid = orig.parentNode.parentNode.parentNode.getAttribute("data-context-item-id");
		if (!vid){ vid = orig.parentNode.parentNode.getAttribute("data-context-item-id"); }
        //Parse api response json, extract description text
        infoHandler = function (response) {
            mylog("infoHadnlder: ", vid);
            var info, desc, full;
            //    mylog(JSON.stringify(response, null, 4))
            info = JSON.parse(response.responseText);
            //    mylog(info);
            desc = info.entry.media$group.media$description.$t;
            full = formatDescription(desc);
            bindSwap(orig, full);
            mylog("infoHadnlder: done");
        };
        requestApi(vid, infoHandler);
        mylog("prepareDescription: done");
    }
}

function prepareEllipsis(event) {
    if (event.button === 0) {
        var me, orig, full, data;
        me = event.currentTarget;
        mylog("prepareEllipsis: ", me.className);
        me.removeEventListener('click', prepareEllipsis, false);
        orig = me.firstChild;
        data = orig.getAttribute("data-original-html");
        mylog("prepareEllipsis: ", data);

        full = document.createElement("div");
        full.className = "monkey-full-description-replacement";

        bindSwap(orig, full);
        full.innerHTML = data;
        mylog("prepareEllipsis: done");
    }
}

//Hack to listen for additional nodes inserted 
//(for example when scrolling down subscriptions feed)
//http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/
document.addEventListener('animationstart', function (event) {
    var item = event.target;
    if (event.animationName === 'DescriptionNodeInserted') {
        item.addEventListener('click', prepareDescription, false);
        mylog("added description listener");
    } else if (event.animationName === 'EllipsisNodeInserted') {
        item.addEventListener('click', prepareEllipsis, false);
        mylog("added ellipsis listener");
    }
}, false);

GM_addStyle('@keyframes DescriptionNodeInserted {\n' +
    'from { clip: rect(1px, auto, auto, auto); }\n' +
    'to { clip: rect(0px, auto, auto, auto); } }\n' +
    'div.description:not(.monkey-full-description-prepared), div.yt-lockup-description:not(.monkey-full-description-prepared)  { animation-duration: 0.001s; animation-name: DescriptionNodeInserted;}\n' +
    '@keyframes EllipsisNodeInserted {\n' +
    'from { clip: rect(1px, auto, auto, auto); }\n' +
    'to { clip: rect(0px, auto, auto, auto); } }\n' +
    'div.yt-lockup2-description { animation-duration: 0.001s; animation-name: EllipsisNodeInserted; max-height: none; }\n' +
    'div.monkey-full-description-margin { margin-top:7px;}\n');


