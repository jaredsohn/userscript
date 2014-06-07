// ==UserScript==
// @name          One Vids Enabler
// @namespace     OneSpace
// @description   Enables embedded video clips in articles for one.co.il.
// @include       http://one.co.il/*
// @include       http://*.one.co.il/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey  (0.5+) user script.
//
// To install, you need Firefox  http://www.getfirefox.com and
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools|Manage User Scripts,
// select the script and click Uninstall.
//
// --------------------------------------------------------------------

// v1.1a - BigFix: video’s preview image linking fixed.
// v1.1 - Added support for video hosted on best-tv and removed commercials.
// v1.0 - public release.

(function() {
    // Search for an iframe containing a video
    var res = document.evaluate("//iframe[contains(@src,'VideoURL=')]", document, 
                        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (res.snapshotLength == 1) {
        var iframe = res.snapshotItem(0);
        var src = unescape(iframe.src.split("VideoURL=")[1]);
	src = src.split("&Ad=")[0];
	var ImageName = unescape(iframe.src.split("ImageURL=")[1]);
	ImageName = ImageName.split("&Article")[0];
	var prevImgSrc = "http://images.one.co.il/images/video/segment/" + ImageName;
        //dump ("src = " + src + "\n");

        // Preview image for the video
        var prevImg = document.createElement("img");
        prevImg.src = prevImgSrc;
        prevImg.style.cssText += "cursor: pointer; position: relative; top: 5px;";
//        if (prevImg.width > 320)
//            prevImg.width = 320;
//        if (prevImg.height > 240)
//            prevImg.height = 240;
	prevImg.width = iframe.width;
	prevImg.height = iframe.height-46;

        var vidDiv = document.createElement("div");
        vidDiv.id = "videoDiv";
        vidDiv.style.height = iframe.height;
        vidDiv.style.width = iframe.width;
        vidDiv.style.cssText += "text-align:center; background-color: #5A7DB5; margin-top: 15px";
        vidDiv.innerHTML +=
            "<div style='background-color: #38639A; color: white; border-bottom: 1px solid white; height: 20px'>" +
            "<h1 style='font-size: 15px; margin: 0 auto; padding-top: 3px'>" +
            unescape("One%20%u05D5%u05D9%u05D3%u05D0%u05D5") + 
            "</h1></div>";

        var vidObj = document.createElement("object");
        vidObj.id = "videoPlayer";
        vidObj.type = "video/x-ms-wmv";
        // constrain the size of the player to small or normal size
        vidObj.height = iframe.height; //(iframe.height > 286) ? 240+46 : iframe.height; // Player controls are 46px high
        vidObj.width = iframe.width; //(iframe.width > 320) ? 320 : iframe.width;
        vidObj.data = src;

        // Attach the video and clear the div when the user clicks the image
        prevImg.addEventListener("click", function() {
            vidDiv.innerHTML = "";
            vidDiv.style.backgroundColor = "white";
            vidDiv.appendChild(vidObj);
        }, true);

        vidDiv.appendChild(prevImg);
        iframe.parentNode.replaceChild(vidDiv, iframe);
    }
})();


