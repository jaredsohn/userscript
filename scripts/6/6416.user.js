// ==UserScript==
// @name          Ynet Video Links
// @description   Replaces embedded videos in Ynet to links to the videos
// @include       http://ynet.co.il/*
// @include       http://*.ynet.co.il/*
// Based on Ynet Links and Vids, modified by Ohad Lutzky
// ==/UserScript==

function setSrcs(ifsrc, obj) {
    if (ifsrc.indexOf("castup.net") != -1) {
        obj.vidSrc = unescape(ifsrc.split("clipurl=")[1]);
        obj.prevImgSrc = obj.vidSrc + "&th=1&ndth=1";
    }
    else {
        var vidNum = ifsrc.split("/")[7];
        obj.vidSrc = "http://players.mediazone.co.il/media/authors/34/playlists/" + vidNum +
                        "/" + vidNum + "_static.asx";
        obj.prevImgSrc = "http://ynet.mediazone.co.il/mediazone/images/authors/34/" + vidNum + ".jpg"
    }
}

// Search for an iframe containing a video
XQuery = "//iframe[contains(@src,'mediazone.co.il') or contains(@src, 'castup.net')]";
var res = document.evaluate(XQuery, document,
                    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (res.snapshotLength == 1) {
    var iframe = res.snapshotItem(0);
    var srcs = {vidSrc:'', prevImgSrc:''};
    setSrcs(iframe.src, srcs);

    var vidDiv = document.createElement("div");
    vidDiv.id = "videoDiv";
    vidDiv.style.height = iframe.height;
    vidDiv.style.width = iframe.width;
    vidDiv.style.cssText += "text-align:center; background-color: #5A7DB5; margin-top: 5px";
    vidDiv.innerHTML +=
        "<div style='background-color: #38639A; color: white; border-bottom: 1px solid white; height: 55px'>" +
        "<h1 style='font-size: 18px; margin: 0 auto; padding-top: 3px'>" +
        unescape("Ynet%20%u05D5%u05D9%u05D3%u05D0%u05D5") +
        "</h1><h1 style='font-size: 14px'>" +
        unescape("%u05DC%u05D7%u05E6%u05D5%20%u05DC%u05E6%u05E4%u05D9%u05D4") +
        "</h1></div>";

    // Preview image for the video
    var prevImg = document.createElement("img");
    prevImg.src = srcs.prevImgSrc;
    prevImg.style.cssText += "cursor: pointer; position: relative; top: 15px; border: 0";
    if (prevImg.width > 320)
        prevImg.width = 320;
    if (prevImg.height > 240)
        prevImg.height = 240;

    var iLink = document.createElement("a");
    iLink.href = srcs.vidSrc;
    iLink.appendChild(prevImg);

    vidDiv.appendChild(iLink);
    iframe.parentNode.replaceChild(vidDiv, iframe);
}
