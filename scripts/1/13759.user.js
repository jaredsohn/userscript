// ==UserScript==
// @name          Ynet Links and Vids1
// @namespace     Jillian
// @description   Replaces javascript links with normal links on ynet.co.il, and enables embedded video clips in articles (v2.7).
// @include       http://ynet.co.il/*
// @include       http://*.ynet.co.il/*
// @include       http://players.mediazone.co.il/*
// @include       http://switch*.castup.net/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.6+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
//
// To uninstall, go to Tools|GreaseMonkey|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------

// v2.7 - Major refactoring.
//      - Instead of replacing the iframes with divs, the script replaces the iframes' content.
//      - The script now waits for the image to partly load before it goes on checking its size.
//      - All popups are made resizable.
//      - When visisting ynet.co.il, a menu item is added to toggle direct video links,
//         instead of embedding the player inside the page.
//         If Ctrl is pressed the movie is always embedded.
//      - bug fix: previously, some unusually named preview images were not shown.
// v2.6 - new! supports multiple videos in one page.
//      - new! supports the Video section.
//      - new! supports videos in mediazone.co.il windows.
//      - new! spports embedded audio streams.
// v2.5 - updated to embed videos from Mediazone (Ynet's new streaming video provider).
//         added NewsFlash links to the allowed popup list.
// v2.4 - fixed image size bug, and reworked JS links removal.
// v2.3 - remove JS links in talkbacks too.
// v2.2 - bug fix: preview images are also sometimes too big - now set to fixed size.
// v2.1 - bug fix: video clip size was sometimes too big.
// v2.0 - public release: rewrite of a previous script.

// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node)
{
    if (!node) node = document;
    var res = document.evaluate(expr, node, null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return res.singleNodeValue;
}

var DirectVideoLinkCfg = "directVideoLink";

var mainObj = {
    // Elements:
    vidObj : null, // Holds the video object element
    vidDiv : null,
    prevImg : null,

    vidUrl : "",
    prevImgSrc : "",
    iters : 0, // Number of iterations of waitForImageDimentions()
    MaxIterations : 50, // 5 seconds (iterations are in 100ms intervals)

    setVidUrls : function() {
        var url = document.location.href;
        if (url.indexOf("castup.net") != -1) {
            this.vidUrl = unescape(url.split("clipurl=")[1]);
            this.prevImgSrc = this.vidUrl + "&th=1&ndth=1";
            GM_log("prevImgSrc = " + this.prevImgSrc);
        }
        else { // must be mediazone.co.il
            this.vidUrl = document.getElementById("prmURL").value;
            this.prevImgSrc = getFirstXPathResult("//div[@id='spnPreview']/img").src;
        }
    },

    // Create and append an img element to hold the preview image
    appendPreviewImg : function() {
        this.prevImg = document.createElement("img");
        this.prevImg.src = this.prevImgSrc;
        this.prevImg.style.cssText += "cursor: pointer; position: relative; top: 15px;";

        this.waitForImageDimentions();
    },
    
    // Waits for the image to partly load -- until its dimensions are known
    waitForImageDimentions : function() {
        if (!this.prevImg.width && ++this.iters < this.MaxIterations) {
            setTimeout(function() { mainObj.waitForImageDimentions(); }, 100);
            return;
        }
        else if (this.iters >= this.MaxIterations) {
            GM_log("Could not show image at " + this.prevImg.src);
            // Continue with a broken image so the user has something to click on
        }
        this.onPreviewImgReady();
    },
    
    onPreviewImgReady : function() {
        var img = this.prevImg;

        if (img.width > 320)
            img.width = 320;
        if (img.height > 240)
            img.height = 240;
        // If the movie is on the front page, make sure the image doesn't bleed out of the div
        if (innerWidth < 280) {
            img.width = Math.min(img.width, 240); // The height will adjust proportionally
            img.style.top = "6px";
        }
        // General case for image > div, shouldn't happen
        if (img.width > innerWidth) {
            img.width = innerWidth - 10;
        }

        if (GM_getValue(DirectVideoLinkCfg, false)) {
            var iLink = document.createElement("a");
            iLink.href = this.vidUrl;
            iLink.addEventListener("click", onDirectVideoLinkClick, true);
            iLink.appendChild(img);
            this.vidDiv.appendChild(iLink);
        }
        else {
            // Attach the video and clear the div when the user clicks on the image
            img.addEventListener("click", onPrevImgClick, true);
            this.vidDiv.appendChild(img);
        }
    },
    
    createVideoObject : function() {
        var obj = document.createElement("object");
        obj.type = "application/asx";
        // Constrain the size of the player to a maximum of 320x286
        obj.height = Math.min(innerHeight, 240+46); // Player controls are 46px high
        obj.width = Math.min(innerWidth, 320);
        obj.data = this.vidUrl;
        return obj;
    },

    setVideoDivCSSAndHTML : function() {
        this.vidDiv.style.textAlign = "center";
        this.vidDiv.style.backgroundColor = "#5A7DB5";
        //this.vidDiv.style.marginTop = "5px";
        this.vidDiv.innerHTML =
            "<div style='background-color: #38639A; color: white; border-bottom: 1px solid white; height: 45px'>" +
            "<h1 style='font-size: 18px; margin: 0 auto;'>" +
            unescape("Ynet%20%u05D5%u05D9%u05D3%u05D0%u05D5") +
            "</h1><h1 style='font-size: 14px'>" +
            unescape("%u05DC%u05D7%u05E6%u05D5%20%u05DC%u05E6%u05E4%u05D9%u05D4") +
            "</h1></div>";
    },

    setAudioDiv : function() {
        // Use a generic picture
        this.prevImgSrc = "http://go.ynet.co.il/images/play_b.jpg";
        this.vidObj.height = 46; // Show controls only
        this.vidDiv.style.textAlign = "center";
    },

    embedVideo : function() {
        this.setVidUrls();
        this.vidDiv = document.createElement("div");
        this.vidObj = this.createVideoObject()
        if (isAudioOnly()) {
            this.setAudioDiv();
        }
        else {
            this.setVideoDivCSSAndHTML();
        }
        this.vidDiv.style.height = "100%";
        document.body.style.overflow = "hidden"; // Prevents scrollbars
        document.body.removeAttribute("bgcolor"); // For the old castup frames
        this.appendPreviewImg();
        document.body.innerHTML = "";
        document.body.appendChild(this.vidDiv);
    },

    /* ========== main() ========== */
    main : function() {
        if (isVideoFrame()) {
            // Get rid of the annoying error messages caused by playerStateCheck();
            unsafeWindow.playerStateCheck = function() {};
            this.embedVideo();
        }
        else {
            linkifyJSLinks();
            overrideOpen();
            // Create a menu to toggle direct links to movies option
            GM_registerMenuCommand("Toggle direct video links on ynet", toggleDirectVideoLinks);
        }
    }
}; // mainObj


function onPrevImgClick(evt, div) {
    if (!div) div = this.parentNode;
    div.innerHTML = "";
    div.style.backgroundColor = "";
    div.appendChild(mainObj.vidObj);
}

// Even if videos are linked directly, embed the video if Ctrl is pressed.
function onDirectVideoLinkClick(evt) {
    if (evt.ctrlKey) {
        evt.preventDefault();
        evt.stopPropagation();
        onPrevImgClick(null, this.parentNode);
    }
}

function toggleDirectVideoLinks() {
    var direct = !GM_getValue(DirectVideoLinkCfg, false);
    GM_setValue(DirectVideoLinkCfg, direct);
    alert("Direct video links will be " + ((direct) ? "enabled" : "disabled"));
    document.location.replace(document.location.href);
}

function isAudioOnly() {
    // If the iframe is so short it means it's audio only
    // +20 is a safe margin against future changes
    return (innerHeight <= 60+20);
}

function isVideoFrame() {
    // castup.net serves a special page for Firefox users, w/o a video object
    return ( (/mediazone/.test(document.location.hostname) && getFirstXPathResult("//object"))
            || /castup/.test(document.location.hostname));
}

function linkifyJSLinks() {
    // Attributes to remove
    var attrs = "onclick oncontextmenu ondeactivate onblur onmouseover onmouseout".split(" ");
    // Links that contain these keywords are allowed to open in a popup window
    var popupRE =
        /CdaDisplayGallery|CdaArticleSendtoForm|CdaTalkBack|CdaViewBlogTalkBack|CdaNewsFlash/;
    
    // Traverse over the urls; if they're javascript and do not contain the keywords above,
    // remove the attributes and change the href to the real url.
    var links = document.getElementsByTagName("a");
    var curLink;
    for (var i = 0; (curLink = links[i]); i++) {
        if (popupRE.test(curLink.href)) {
            continue;
        }
    
        // From my experience this is the safest method to get the URL
        var cmFunc = curLink.getAttribute("oncontextmenu");
        if (cmFunc) {
            var href = cmFunc.slice("this.href=\"".length, -1); // Until the matching apos.
            if (href[0] == ' ') {
                // Sometimes ynet mistakenly puts a space before the URL
                href = href.substr(1);
            }
            curLink.href = href;
            for (a in attrs) {
                curLink.removeAttribute(attrs[a]);
            }
        }
        // Handle simple JS links, such as in talkbacks
        else if (/(openInnewWindow|openWin|open)\b/.test(curLink.href)) {
            // Assumes the url is the first thing between quotes
            curLink.href = unescape(/\(['"](.+?)["']/.exec(curLink.href)[1]);
        }
    }
    
    linkifySpVideoLinks();
}

function linkifySpVideoLinks() {
    var uw = unsafeWindow;

    if (uw.playVideo) {
        uw.old_playVideo = uw.playVideo;
        uw.playVideo = function() {
            try { uw.old_playVideo.apply(null, arguments); } catch(e) {}
            // old_playVideo() set the global tempArticleUrl to the current story's url.
            document.getElementById("fullArticleUrl").href = uw.tempArticleUrl;
        }
    }
    else if (uw.vDisplay) {
        // If there's no playVideo() but there is vDisplay(), 
        // signal our version of open() that we don't want a new window
        uw.old_vDisplay = uw.vDisplay;
        uw.vDisplay = function() {
            uw.override = true;
            uw.old_vDisplay.apply(null, arguments);
        }
    }
}

// Makes all popups resizable, and optionally redirects instead of opening a new window.
function overrideOpen() {
    unsafeWindow.open = function (url, name, feats) {
        if (!feats) feats = "";
        feats += ",resizable=yes";
        if (unsafeWindow.override)
            document.location.assign(url);
        else
            return open(url, name, feats);
    }
}

mainObj.main();


