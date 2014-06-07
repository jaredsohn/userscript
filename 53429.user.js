// ==UserScript==
// @name           FullScreenVideo
// @version        1.5
// @date           2009-07-15
// @author         Hans Loeblich <thehans@gmail.com>
// @include        *
// ==/UserScript==
// 
// This script allows the user to view HTML 5 <video> elements in fullscreen, 
// by simply double-clicking the element.
// To completely fill the screen, the user can set Firefox to fullscreen mode with F11
// Double-click once more to return the video to it's original position on the page
// This script is for Firefox version 3.5 or higher only.
//
// New feature with v 1.5 is the ability to blend in the background color to match the video.  
// Hold the shift key while double-clicking to enable this feature.
// This may not work on some sites due to the same-origin policy in firefox:
// the domain of the current page and the video source must match exactly.
//
//
// Changelog
// 1.5
//     - Completely refactored code structure
//     - Added optional background color blending feature
// 1.4 
//     - Added this changelog
//     - Added some comments to the code
//     - Fixed positioning issue in cases where page is scrolled down or left before maximizing
//     - Added support for video thate are already embedded in a frame
// 1.3 
//     - Removed barely noticeable default iframe border
// 1.2 
//     - Fixed styles to correctly return to previous settings when leaving fullscreen
// 1.1 
//     - Fixed major issue of video not filling the screen... the whole point of this script (oops!)
// 1.0 
//     - Initial release
//


// if no width or height given, then use same dimensions as original video
// if width only given, then scale height proportionally
// frameComputer can be any object that has a computeFrame property, 
//     computeFrame must be a function, which accepts image data and, optionally, the elapsed time between frames
//     image data is an object containing width, height and data(RGBA pixel array) properties (http://www.whatwg.org/specs/web-apps/current-work/#imagedata)
function VideoProcessor(videoElement, frameComputer, frameDataWidth, frameDataHeight) {
    this.video = videoElement;
    this.frameComputer = frameComputer;
    frameDataWidth = frameDataWidth || this.video.videoWidth;
    frameDataHeight = frameDataHeight || frameDataWidth * this.video.videoHeight / this.video.videoWidth; 

    this.canvas = unsafeWindow.document.createElement("canvas");
    this.canvasContext = this.canvas.getContext("2d");
    this.canvas.width = frameDataWidth;
    this.canvas.height = frameDataHeight;
    this.enabled = false;
    var self = this;
    this.playHandler = function () { 
        self.timerCallback();
    };
    return this;
}
VideoProcessor.prototype.timerCallback = function () {
    if (!this.enabled || this.video.paused || this.video.ended) {
        return;
    }
    this.canvasContext.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    var frame = this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    var now = new Date();
    this.elapsed = (now.getTime() - this.previousFrameTimestamp.getTime()) / 1000;
    this.previousFrameTimestamp = now;
    this.frameComputer.computeFrame(frame, this.elapsed);
    setTimeout(this.playHandler, 0);
};
VideoProcessor.prototype.enable = function () {
    this.enabled = true;
    this.previousFrameTimestamp = new Date();
    if (!this.video.paused && !this.video.ended) {
        this.timerCallback();
    }
    this.video.addEventListener("play", this.playHandler, false);
};
VideoProcessor.prototype.disable = function () {
    this.enabled = false;
    if (this.onplay) {
        this.video.removeEventListener("play", this.playHandler, false);
    }
};

function Histogram() {
    var numOfColorValues = 256;
    this.histSize = 4;
    this.divider = numOfColorValues / this.histSize;
    this.histMaxIndex = this.histSize * this.histSize * this.histSize;
    return this;
}

// computes the histogram of rectangle subset of an ImageData frame
Histogram.prototype.computeMostCommonColor = function (frame, left, top, width, height) {
    var histMaxIndex = this.histMaxIndex;
    var dataWidth = frame.width;
    var data = frame.data;
    var histSize = this.histSize;
    var divider = this.divider;
    var hist = new Array(histMaxIndex);

    for (var y = 4 * top * dataWidth, endY = 4 * (top + height) * dataWidth, stepY = dataWidth * 4; y < endY; y += stepY) {
        for (var i = y + 4 * left, endI = y + 4 * (left + width); i < endI; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var histIndex = Math.floor(r / divider) * histSize * histSize + Math.floor(g / divider) * histSize + Math.floor(b / divider);
            if (!hist[histIndex]) {
                hist[histIndex] = [r, g, b];
            } else {
                hist[histIndex].push(r, g, b);
            }
        }
    }

    var maxHistCount = 0;
    var histEl, maxHistEl;
    for (i = 0; i < histMaxIndex; i++) {
        if ((histEl = hist[i]) && histEl.length > maxHistCount) {
            maxHistCount = histEl.length;
            maxHistEl = histEl;
        }
    }

    var accR = 0, accG = 0, accB = 0;
    for (i = 0; i < maxHistCount; i += 3) {
        accR += maxHistEl[i];
        accG += maxHistEl[i + 1];
        accB += maxHistEl[i + 2];
    }

    maxHistCount /= 3;
    accR = accR / maxHistCount;
    accG = accG / maxHistCount;
    accB = accB / maxHistCount;

    return [accR, accG, accB, maxHistCount];
};


function RgbColor(r, g, b) {
    if (r instanceof Array) {
        this.r = r[0];
        this.g = r[1];
        this.b = r[2];
    } else {
        this.r = typeof r == 'undefined' ? 0 : r;
        this.g = typeof g == 'undefined' ? 0 : g;
        this.b = typeof b == 'undefined' ? 0 : b;
    }
    return this;
}
RgbColor.prototype.toCssString = function () {
    return "rgb(" + Math.floor(this.r) + "," + Math.floor(this.g) + "," + Math.floor(this.b) + ")";
};
RgbColor.prototype.blend = function (color, amount) {
    this.r += (color[0] - this.r) * amount; 
    this.g += (color[1] - this.g) * amount;
    this.b += (color[2] - this.b) * amount;
    return this;
};

function BackgroundSetter(bgElement) {
    this.bgElement = bgElement;
    this.bgHistogram = new Histogram();
    this.bgColor = new RgbColor(0, 0, 0);
}
BackgroundSetter.prototype.computeFrame = function (frame, elapsed) {
    // only read the top row of pixels, since this tends to be a good representation of background color
    var val = this.bgHistogram.computeMostCommonColor(frame, 0, 0, frame.width, 1);
    var targetDuration = 2 * (frame.width - val[3]) / frame.width;
    targetDuration *= targetDuration;
    var blendAmount = Math.min(elapsed / targetDuration, 1);
    var colorStr = this.bgColor.blend(val, blendAmount).toCssString();
    this.bgElement.style.backgroundColor = colorStr; 
};

function FullScreenToggler(video) {
    this.video = video;
    this.videoParent = video.parentNode;
    var self = this;
    this.dblclickHandler = function (e) {
        self.toggleOn(e);
    };
    video.addEventListener("dblclick", this.dblclickHandler, true);
    return this;
}
FullScreenToggler.prototype.toggleOn = function (e) {
    this.blendBg = e.shiftKey;
    var video = this.video;
    var topDoc = top.document;

    var self = this; // used solely for keeping proper context when registering events
    
    // create a div to replace the oroginal spot of the video element
    this.dummyDiv = document.createElement("div");

    // record existing styles of video element for restoring later
    this.vidWidth = video.style.width;
    this.vidHeight = video.style.height;
    this.vidMargin = video.style.margin;
    this.vidPadding = video.style.padding;

    // create a new frame which will fill the whole window
    var fs = topDoc.createElement("iframe");
    // set onload event of new frame
    // wait for frame to initialize before editing it's document
    this.loadListener = function () { 
        self.frameLoaded(); 
    };
    fs.addEventListener("load", this.loadListener, true);
    // set frame style, size and position for fullscreen effect
    fs.style.position = "absolute";
    fs.style.width = "100%";
    fs.style.height = "100%";
    fs.style.zIndex = 2147483647;
    fs.style.border = 0;
    fs.style.top = top.scrollY;
    fs.style.left = top.scrollX;
    this.fs = fs;

    this.bodyOverflow = topDoc.body.style.overflow;
    topDoc.body.style.overflow = "hidden";
    topDoc.body.appendChild(fs);

    video.removeEventListener("dblclick", this.dblclickHandler, true);
    this.dblclickHandler = function (e) { 
        self.toggleOff(e); 
    };
    video.addEventListener("dblclick", this.dblclickHandler, true);
};
FullScreenToggler.prototype.toggleOff = function (e) {
    var video = this.video;
    var fs = this.fs;
    // moving the video node will automatically pause, so remember if it was playing or not
    var wasPlaying = !(video.paused || video.ended);

    // put video back into original document
    this.videoParent.replaceChild(video, this.dummyDiv);

    // remove fullscreened frame
    fs.parentNode.removeChild(fs);

    // set top frame style back to original settings
    top.document.body.style.overflow = this.bodyOverflow;

    // set video element style back to original settings
    video.style.width = this.vidWidth;
    video.style.height = this.vidHeight;
    video.style.margin = this.vidMargin;
    video.style.padding = this.vidPadding;

    // resume if was already playing before
    if (wasPlaying) {
        video.play();
    }

    var self = this;
    video.removeEventListener("dblclick", this.dblclickHandler, true);
    this.dblclickHandler = function (e) { 
        self.toggleOn(e); 
    };
    video.addEventListener("dblclick", this.dblclickHandler, true);
};
FullScreenToggler.prototype.frameLoaded = function () {
    var video = this.video;
    var frameDoc = this.fs.contentWindow.document;
    frameDoc.body.style.backgroundColor = "black";
    frameDoc.body.style.margin = 0;

    // moving the video node will automatically pause, so remember if it was playing or not
    var wasPlaying = !(video.paused || video.ended);
    
    this.videoParent.replaceChild(this.dummyDiv, video);
    frameDoc.body.appendChild(video);
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.margin = 0;
    video.style.padding = 0;

    // enable background color blending if shift-double-clicked
    // if video is on a different domain than the page, don't even bother.
    if (this.blendBg && document.domain == video.src.match(/:\/\/([^/]*)\//)[1]) {
        this.videoProcessor = new VideoProcessor(video, new BackgroundSetter(frameDoc.body), 100);
        this.videoProcessor.enable();
    }
    if (wasPlaying) {
        video.play();
    }
};

window.addEventListener("load", function () {
    var els = document.getElementsByTagName("video");
    for (var i = 0; i < els.length; i++) {
        var x = new FullScreenToggler(els[i]);
    }
}, false);
