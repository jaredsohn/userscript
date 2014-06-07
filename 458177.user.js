// ==UserScript==
// @name        WeebM
// @namespace   Triangle@WeebM
// @description Adds some mplayer/mpv style bindings to WebM files on 4chan.
// @include     *://boards.4chan.org/*/*
// @version     0.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Note: Tampermonkey MUST have "Settings->Runtime->UnsafeWindow retrieval method: Native"

var selectedVideo = null;
var mouseDown = false;
var mouseDownX = null;
var mouseDownY = null;
var mouseMoved = false;
var activeVideos = [];
var fourchanX = document.getElementsByTagName("html")[0].className.indexOf("fourchan-x") != -1;

function main() {
    document.addEventListener("keydown", function(e) {
        if (selectedVideo) {
            e.preventDefault();
            var modifier = {
                "shiftKey": e.shiftKey,
                "ctrlKey": e.ctrlKey,
                "altKey": e.altKey
            };
            keyPress(selectedVideo, e.which, modifier); 
        }
    });
    document.addEventListener("click", function(e) {
        if (e.target.tagName == "VIDEO")  {
            selectedVideo = e.target;
            removeActiveVideo(e.target);
            if (!fourchanX && e.button == 0 && e.target.className == "expandedWebm" && !e.target.getAttribute("controls") && !mouseMoved) {
                collapseWebm(e.target);
            }

        }
        else if (e.target.tagName == "IMG" && e.target.parentNode.className == "fileThumb") {
            selectedVideo = e.target.parentNode.parentNode.getElementsByTagName("video")[0];
            if (fourchanX && !removeActiveVideo(selectedVideo)) {
                activeVideos.push(selectedVideo);
            }
        }
        else if (e.target.tagName == "A" && e.target.href.split(".").pop() == "webm") {
            selectedVideo = e.target.parentNode.getElementsByTagName("video")[0];
            if (fourchanX && !removeActiveVideo(selectedVideo)) {
                activeVideos.push(selectedVideo);
            }
        }
        else {
            selectedVideo = null;
        }
        mouseMoved = false;
    });
    document.addEventListener("mousedown", function(e) {
        if (e.target.tagName == "VIDEO") {
            e.preventDefault();
            mouseDown = true; 
            mouseDownX = e.clientX;
            mouseDownY = e.clientY;
        }
    });
    document.addEventListener("mouseup", function(e) {
        mouseDown = false;
        mouseDownX = null;
        mouseDownY = null;
    });
    document.addEventListener("mousemove", function(e) {
        if (mouseDown && Math.abs(e.clientX - mouseDownX) > 5) {
            mouseMoved = true;
        }
        if (mouseDown && Math.abs(e.clientY - mouseDownY) > 5) {
            mouseMoved = true;
        }
        if (mouseDown && !e.target.getAttribute("controls")) {
            scaleVideo(e.target, e.clientX - mouseDownX);
        }
    });
    document.addEventListener("DOMNodeInserted", function(e) {
        if (e.target.tagName == "VIDEO") {
            if (e.target.className == "expandedWebm" || e.target.className == "full-image") {
                activeVideos.push(e.target);
            }
            selectedVideo = e.target;
            selectedVideo.removeAttribute("controls");
            selectedVideo.style.cursor = "pointer";
        }
    }, false);
    setInterval(function(e) {
        for (var i = activeVideos.length - 1; i >= 0; i--) {
            var video = activeVideos[i];
            var bottomY = video.offsetTop + video.videoHeight;
            if (bottomY - window.scrollY < 0) {
                var height = activeVideos[i].videoHeight;
                var scrollY = window.scrollY;
                collapseWebm(activeVideos[i]);
                activeVideos.splice(i, 1);    
                window.scrollTo(0, scrollY - height);
            }
        }
    }, 1000);
}
function keyPress(video, keyCode, modifier) {
    if (modifier.shiftKey) {
        switch(keyCode) {
            case KeyEvent.DOM_VK_LEFT:
                video.currentTime -= 1;
                break;
            case KeyEvent.DOM_VK_RIGHT:
                video.currentTime += 1;
                break;
            case KeyEvent.DOM_VK_UP:
                video.currentTime += 5;
                break;
            case KeyEvent.DOM_VK_DOWN:
                video.currentTime -= 5;
                break;
        }
    }
    else {
        switch(keyCode) {
            case KeyEvent.DOM_VK_O:
                if (!video.getAttribute("controls")) {
                    video.setAttribute("controls", "controls");
                    video.style.cursor = "default";
                }
                else {
                    video.removeAttribute("controls");
                    video.style.cursor = "pointer";
                }
                break;
            case KeyEvent.DOM_VK_SPACE:
                (video.paused) ? video.play() : video.pause();
                break;
            case KeyEvent.DOM_VK_COMMA:
                video.pause();
                video.currentTime -= (23.976/1000);
                break;
            case KeyEvent.DOM_VK_PERIOD:
                video.pause();
                video.currentTime += (23.976/1000);
                break;
            case KeyEvent.DOM_VK_LEFT:
                video.currentTime -= 10;
                break;
            case KeyEvent.DOM_VK_RIGHT:
                video.currentTime += 10;
                break;
            case KeyEvent.DOM_VK_UP:
                video.currentTime += 60;
                break;
            case KeyEvent.DOM_VK_DOWN:
                video.currentTime -= 60;
                break;
            case KeyEvent.DOM_VK_ESCAPE:
            case KeyEvent.DOM_VK_Q:
                collapseWebm(video);
                break;
            case KeyEvent.DOM_VK_R:
                reverseImageSearch(video);
                break;
            case KeyEvent.DOM_VK_S:
                saveScreenshot(video);
                break;
            case KeyEvent.DOM_VK_OPEN_BRACKET:
                video.playbackRate -= 0.5;
                break;
            case KeyEvent.DOM_VK_CLOSE_BRACKET:
                video.playbackRate += 0.5;
                break;
            case KeyEvent.DOM_VK_F:
                toggleFullscreen(video);
                break;
        }
    }
}
function scaleVideo(video, dw) {
    var aspect = video.videoWidth / video.videoHeight;
    if (video.width == 0) {
        video.width = video.videoWidth;
    }
    if (video.height == 0) {
        video.height = video.videoHeight;
    }
    var s = video.width + dw;
    if ((s > 50) && (s <= parseInt(video.style.maxWidth))) {
        video.width += dw;
        video.height = video.width / aspect;
    }
}
function toggleFullscreen(video) {
    if (!video.fullscreenElement       &&
        !video.mozFullScreenElement    && 
        !video.webkitFullscreenElement) {
        
        if (video.requestFullScreen) {
            video.requestFullScreen();
        }
        else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
        else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        }
    }
    else {
        if (video.exitFullscreen) {
            video.exitFullscreen();
        } 
        else if (document.mozCancelFullScreen) {
            video.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            video.webkitCancelFullScreen();
        }
    }
}
function removeActiveVideo(video) {
    for (var i = 0; i < activeVideos.length; i++) {
        if (activeVideos[i] == video) {
            activeVideos.splice(i, 1);
            return true;
        }
    }
    return false;
}
function collapseWebm(video) {
    if (fourchanX) {
        var y = window.pageYOffset;
        video.click();
        window.scrollTo(0, y);
    }
    else {
        var close = video.parentNode.getElementsByClassName("collapseWebm")[0].children[0];
        close.click();
    }
}
function saveScreenshot(video) {
    screenshot(video, function(dataURL, filename, time) {
        var a = document.createElement("a");
        a.href = dataURL;
        var i = filename.lastIndexOf(".");
        var name = filename.substring(0, i) + " [" + time + "].jpg";
        a.setAttribute("download", name);
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
    });
}
function screenshot(video, callback) {
    if (fourchanX) {
        var filename = video.parentNode.parentNode.getElementsByClassName("file-info")[0].children[0].innerHTML;
    }
    else {
        var filename = video.parentNode.getElementsByClassName("fileText")[0].children[1].innerHTML;
    }
    var time = video.currentTime;
    // CORS is not set, so any canvas we normally create would be tainted. We can work around
    // that by getting the data from GM_xmlhttpRequest. Hopefully it's at least still cached!
    GM_xmlhttpRequest({
       method: "GET",
       url: video.src,
       overrideMimeType: 'text/plain; charset=x-user-defined',
       onload: function(e) {
          if (e.status == 200 || e.status == 206 || e.status == 304) {
              var blob = dataToBlob(e.responseText, e.responseText.length);
              var blobURL = window.URL.createObjectURL(blob);
              var blobVideo = document.createElement("video");
              blobVideo.src = blobURL;
              blobVideo.addEventListener("loadedmetadata", function(e) {
                  e.target.removeEventListener(e.type, arguments.callee);
                  blobVideo.currentTime = time;
                  blobVideo.addEventListener("seeked", function(e) {
                      e.target.removeEventListener(e.type, arguments.callee); 
                      var canvas = document.createElement("canvas");
                      canvas.width = video.videoWidth;
                      canvas.height = video.videoHeight;
                      var ctx = canvas.getContext("2d");
                      ctx.fillRect(0, 0, canvas.width, canvas.height);
                      ctx.drawImage(blobVideo, 0, 0, canvas.width, canvas.height);
                      var dataURL = canvas.toDataURL("image/jpeg");
                      callback(dataURL, filename, time);  
                  }, false);
              }, false); 
          }
       },
	});
}
function dataToBlob(data, length, type) {
    var array = new Uint8Array(length);
    for (var i = 0; i < length; i++) {
        array[i] = data.charCodeAt(i) & 0xFF;
    }
    if (type) {
        return new Blob([array.buffer], {"type": type});
    }
    else {
        return new Blob([array.buffer]);
    }
}
function reverseImageSearch(video) {
    screenshot(video, function(dataURL, filename) {
        var splitURL = dataURL.split(",");
        var mime = splitURL[0].split(":")[1].split(";")[0];
        var binary = atob(splitURL[1]);
        var blob = dataToBlob(binary, binary.length, mime);
        var data = new FormData();
        data.append("encoded_image", blob, filename);
        GM_xmlhttpRequest({
            method: "POST",
             url: "http://www.google.com/searchbyimage/upload",
             data: data,
             onload: function(e) {
                 if (e.status == 200) {
                     window.open(e.finalUrl, "_blank");
                 }
             }
        });
    });
}
// Chrome doesn't have this built-in for whatever reason.
if (typeof KeyEvent == "undefined") {
    var KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}
main();
