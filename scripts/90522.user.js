// ==UserScript==
// @name           No F5
// @namespace      http://userscripts.org/users/77660
// @include        http://*.4chan.org/*/res/*
// @description    Thread refresher for 4chan.  Uses Content-Range header to only reload the needed part of the page.
// ==/UserScript==

var interval = 5000;
var fudgeBack = 50;
var matchLen = 300;
var lookForward = 800;
var postSignal = "<a name=\"";
var postSignal2 = "</blockquote>";
var postSignal2b = "</td></tr></table>\n";
var endSignal = "<br clear=left><hr>";

var pos, modTime, pageHTML, firstNew, intervalID;

// This should get the just-cached version of the page,
// so don't worry, this is not downloading the page twice.
GM_xmlhttpRequest({
    method: "GET",
    url: location.href,
    onload: init
});

function init(resp) {
    modTime = "";
    setModTime(resp.responseHeaders);

    pos = resp.responseText.indexOf(endSignal);
    if (pos < 0) pos = resp.responseText.length;
    pageHTML = resp.responseText.substr(0, pos);

    // Mark insertion point
    var insertionPoint = document.getElementsByName("delform")[0].getElementsByTagName("hr")[0];
    do {
        insertionPoint = insertionPoint.previousSibling;
    } while (insertionPoint != null && insertionPoint.nodeType != 1);
    insertionPoint.setAttribute("id", "insertionpoint");

    // Make sure displayed posts are up to date with stored copy
    firstNew = 0;
    addNewPosts();

    intervalID = setInterval(requestPage, interval);
}

function requestPage() {
    var startPos = pos - fudgeBack - matchLen;
    if (startPos < 0) startPos = 0;
    var endPos = pos + lookForward - 1;

    GM_xmlhttpRequest({
        method: "GET",
        url: location.href,
        headers: {
            "User-Agent": "",
            "Accept": "",
            "Accept-Language": "",
            "Accept-Encoding": "",
            "Accept-Charset": "",
            "Keep-Alive": "",
            "Connection": "",
            "Range": "bytes=" + startPos + "-" + endPos,
            "If-Modified-Since": modTime
        },
        onload: updatePage
    });
}

function updatePage(resp) {
    if (resp.status == 404) {
        threadDied();
        return;
    }
    if (resp.status == 416) { // Requested Range Not Satisfiable
        pos -= fudgeBack + matchLen + lookForward;
        if (pos < 0) pos = 0;
        requestPage(1);
        return;
    }
    if (resp.status <= 199 || 300 <= resp.status) return;

    // Determine byte range actually downloaded
    var startPos, endPos, pageLen;
    var rangeMatch = resp.responseHeaders.match(/^Content-Range: bytes (\d+)-(\d+)\/(\d+)/mi);
    if (rangeMatch != null) {
        startPos = parseInt(rangeMatch[1], 10);
        endPos = parseInt(rangeMatch[2], 10) + 1;
        pageLen = parseInt(rangeMatch[3], 10);
    } else {
        startPos = 0;
        endPos = resp.responseText.length;
        pageLen = resp.responseText.length;
    }
    if (pos < startPos + fudgeBack + matchLen || endPos <= pos) return;

    // Try to match up new stuff with old; move backward if no match
    var matchPos = pageHTML.lastIndexOf(resp.responseText.substr(0, matchLen));
    if (matchPos < 0 || resp.responseText.length < matchLen) {
        if (startPos > 0) {
            pos = startPos + matchLen - lookForward;
            if (pos < 0) pos = 0;
            requestPage();
            return;
        } else {
            matchPos = 0;
        }
    }

    // If nothing new, move forward
    if (resp.responseText == pageHTML.substr(matchPos, resp.responseText.length)) {
        pos = endPos;
        if (pos < pageLen) requestPage();
        return;
    }

    // Find first point of departure and update record of page HTML
    for (var i = 0; i < resp.responseText.length; i++) {
        if (matchPos + i >= pageHTML.length) break;
        if (resp.responseText.charAt(i) != pageHTML.charAt(matchPos + i)) break;
    }
    if (firstNew > matchPos + i) firstNew = matchPos + i;
    pageHTML = pageHTML.substr(0, matchPos + i) + resp.responseText.substr(i);

    // Look for end of page; if not found, move forward
    var endOfPosts = pageHTML.indexOf(endSignal);
    if (endOfPosts >= 0) {
        pageHTML = pageHTML.substr(0, endOfPosts);
        pos = startPos + (endOfPosts - matchPos);
        setModTime(resp.responseHeaders);
    } else {
        pos = endPos;
        if (pos < pageLen) requestPage();
        return;
    }

    addNewPosts();
}

function setModTime(headers) {
    var modTimeMatch = headers.match(/^Last-Modified: (.+)$/mi);
    if (modTimeMatch != null) modTime = modTimeMatch[1];
}

function addNewPosts() {
    var delform = document.getElementsByName("delform")[0];
    var insertionPoint = document.getElementById("insertionpoint");

    while (true) {
        var nextPost = pageHTML.indexOf(postSignal, firstNew);
        if (nextPost < 0) return;
        var nextPost2 = pageHTML.indexOf(postSignal2, nextPost);
        if (nextPost2 < 0) return;
        nextPost2 += postSignal2.length;
        if (pageHTML.substr(nextPost2, postSignal2b.length) == postSignal2b) nextPost2 += postSignal2b.length;
        firstNew = nextPost2;
        var postHTML = pageHTML.substring(nextPost, nextPost2);
        var postNum = postHTML.substr(postSignal.length).match(/\d*/)[0];
        if (document.getElementsByName(postNum).length == 0) {
            var span = document.createElement("span");
            span.innerHTML = postHTML;
            while (span.firstChild) {
                var el = span.firstChild;
                span.removeChild(el);
                delform.insertBefore(el, insertionPoint);
            }
        }
    }
}

function threadDied() {
    clearInterval(intervalID);
    document.title = "Thread Died";

    var delform = document.getElementsByName("delform")[0];
    var insertionPoint = document.getElementById("insertionpoint");
    var span = document.createElement("span");
    span.innerHTML = "<hr><br><center><font size=5 color=black>*** Thread Died ***</font></center>";
    delform.insertBefore(span, insertionPoint);
}
