// ==UserScript==
// @name        wimb
// @namespace   default
// @description Where Is My Button, 为豆瓣音乐的专辑添加缺失的电台收听图标
// @include     http://music.douban.com/*
// @version     4
// ==/UserScript==

function registerEvent(target, event, handler) {
    if (window.addEventListener) {
        target.addEventListener(event, handler, false);   
    } else {
        target.attachEvent("on" + event, handler);
    }
}

function fetchSubjectId(href) {
    var start = href.search(/\d+/);
    var end = href.length - 1;
    var subjectId = href.substring(start, end);
    return subjectId;
}

function createStyle(gray) {
    var bg = "http://music.douban.com/pics/radio_8_gray-2.jpg";
    if (!gray) {
        bg = "http://music.douban.com/pics/radio_8-2.jpg"
    }
    var style = [
        "position: absolute",
        "background-image: url(" + bg + ")",
        "width: 48px",
        "height: 18px"
    ].join("; ");
    return style;
}

function createListeningButton(href) {
    var subjectId = fetchSubjectId(href);
    
    var button = document.createElement("a");
    button.setAttribute("href", "http://douban.fm/?context=channel:0|subject_id:" + subjectId);
    button.setAttribute("target", "_blank");
    button.setAttribute("style", createStyle(true));
    registerEvent(button, "mouseover", function(e) {
        button.setAttribute("style", createStyle(false));
    });
    registerEvent(button, "mouseout", function(e) {
        button.setAttribute("style", createStyle(true));
    });
    return button;
}

function createGap() {
    var sep = document.createElement("span");
    sep.innerHTML = "&nbsp;";
    return sep;
}

function place(target, button) {
    var sep = createGap();
    target.parentNode.appendChild(sep);
    target.parentNode.appendChild(button);
}

function scan(handle) {
    var path = window.location.pathname
    handle(path);
}

function iterate(apply) {
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        var href = anchor.href;
        if (/music\.douban\.com\/subject\/\d+/.test(href)) {
            apply(anchor);
        }
    }    
}

function byClass(anchor) {
    var parent = anchor.parentNode;
    var style = parent.getAttribute("class");
    if (style === 'pl2') { // search_subject, recommended, doulist
        place(anchor, createListeningButton(anchor.href));
    }
}

function byTagName(anchor) {
    var parent = anchor.parentNode;
    if (/[hH]6/.test(parent.tagName)) { // musician/<musician_id>/albums
        place(anchor, createListeningButton(anchor.href));
    }
}

function insertAfter(refNode, newNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);   
}

scan(function(path) {
    iterate(function(anchor) {
        byClass(anchor);
    });
    if (/\/musician\/\d+\/albums\/?/.test(path)) {
        iterate(function(anchor) {
            byTagName(anchor);
        });
    }
    if (/\/subject\/\d+\/?/.test(path)) {
        var spans = document.getElementsByTagName("span");
        for (var i = 0; i < spans.length; i++) {
            var span = spans[i];
            var prop = span.getAttribute("property");
            if (prop != null && /v\:itemreviewed/.test(prop)) {
                var gap = createGap();
                var button = createListeningButton(path);
                insertAfter(span, gap);
                insertAfter(gap, button);
                break;
            }
        }
    }
});
