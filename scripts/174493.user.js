// ==UserScript==
// @name        4chan Images Viewer
// @namespace   03439702a2904cac964aa322ffcb6a00
// @description Displays concatenated sequences of images that have been posted to 4chan.
// @match       *://boards.4chan.org/*
// @match       *://i.4cdn.org/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Specifies whether an image from the given URL should be tested
function doTestImagesFrom(url) {
    if (/^https?:\/\/i.4cdn.org\//i.test(url)) return true;
    return false;
}

// Retrieve a file from the given URL
function request(url, callback) {
    if (/chrome/i.test(navigator.userAgent) && typeof(GM_info) == "undefined") {
        var x = new XMLHttpRequest();
        x.open("GET", url);
        x.overrideMimeType("text/plain; charset=x-user-defined");
        x.responseType = "arraybuffer";
        x.onload = function(response) {
            callback(new Uint8Array(x.response));
        };
        x.onerror = function(response) {
            callback(null);
        };
        x.send();
    } else {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            overrideMimeType: "text/plain; charset=x-user-defined",
            onload: function(response) {
                var rText = response.responseText;
                var data = new Uint8Array(rText.length);
                for (var i = 0; i < rText.length; i++) {
                    data[i] = rText.charCodeAt(i);
                }
                callback(data);
            },
            onerror: function(response) {
                callback(null);
            }
        });
    }
}

// Image file type data
var JPEG = 0xFF;
var GIF = 0x47;
var PNG = 0x89;
var FILE_TYPES = [];
FILE_TYPES[JPEG] = "image/jpeg";
FILE_TYPES[GIF] = "image/gif";
FILE_TYPES[PNG] = "image/png";

// Find the end of the image data, starting from position i
function eoi(data, i) {
    if (data[i] == JPEG) {
        i += 2;
        while (i+2 <= data.length) {
            if (data[i] == 0xFF && data[i+1] >= 0xC0) {
                if (data[i+1] == 0xD9) return i+2;
                if (data[i+1] == 0xD8) return -1;
                if (0xD0 <= data[i+1] && data[i+1] <= 0xD7) {
                    i += 2;
                } else {
                    if (i+4 > data.length) return data.length;
                    i += data[i+2]*256 + data[i+3] + 2;
                }
            } else {
                i++;
            }
        }
        return data.length;
    } else if (data[i] == GIF) {
        i += 10;
        if (i >= data.length) return data.length;
        if (data[i] & 0x80) i += (3 << ((data[i] & 0x07) + 1));
        i += 3;
        while (i < data.length) {
            switch (data[i]) {
            case 0x2C:
                i += 9;
                if (i >= data.length) return data.length;
                if (data[i] & 0x80) i += (3 << ((data[i] & 0x07) + 1));
                i += 2;
                while (i < data.length && data[i]) i += data[i] + 1;
                i++;
                break;
            case 0x21:
                i += 2;
                while (i < data.length && data[i]) i += data[i] + 1;
                i++;
                break;
            case 0x3B:
                return i+1;
            default:
                return data.length;
            }
        }
        return data.length;
    } else if (data[i] == PNG) {
        i += 11;
        while (i < data.length) {
            var len = data[i-3]*(1<<24) + (data[i-2]<<16) + (data[i-1]<<8) + data[i];
            if (data[i+1]==0x49 && data[i+2]==0x45 && data[i+3]==0x4E && data[i+4]==0x44) {
                if (i+9 <= data.length) return i+9;
                else return data.length;
            }
            i += len + 12;
        }
        return data.length;
    } else {
        return data.length;
    }
}

// Test whether the data starting at position i matches the magic number
function matches(data, i, magic) {
    if (i + magic.length > data.length) return false;
    for (var j = 0; j < magic.length; j++) {
        if (data[i+j] != magic[j]) return false;
    }
    return true;
}

// Test whether the data starting at position i is an image
function isImage(data, i) {
    if (matches(data, i, [0xFF,0xD8,0xFF])) return true;
    if (matches(data, i, [0x47,0x49,0x46,0x38])) return true;
    if (matches(data, i, [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A])) return true;
    return false;
}

// Draw image indicating length of non-image data
function drawSize(n) {
    var can = document.createElement("canvas");
    can.width = 100;
    can.height = 100;
    var ctx = can.getContext("2d");
    ctx.fillText("non-image data", 0, 10);
    ctx.fillText(n + " bytes", 0, 20);
    return can.toDataURL();
}

// Decompose image sequence data into images
function decompose(data) {
    var ranges = [];
    var i = 0;
    while (i < data.length && isImage(data, i)) {
        var i2 = eoi(data, i);
        ranges.push([i, i2]);
        i = i2;
    }
    if (ranges.length == 0) {
        return null;
    } else if (ranges.length == 1 && i == data.length) {
        return null;
    } else {
        var parts = [];
        for (var j = 0; j < ranges.length; j++) {
            var part = data.subarray(ranges[j][0], ranges[j][1]);
            var type = FILE_TYPES[part[0]];
            var blob = new Blob([part], {type: type});
            var url = URL.createObjectURL(blob);
            parts.push(url);
        }
        if (i != data.length) {
            parts.push(drawSize(data.length - i));
        }
        return parts;
    }
}

// Calculate mouse position within image element
function mouseX(e) {
    var box = e.target.getBoundingClientRect();
    return (e.clientX - box.left) / box.width;
}
function mouseY(e) {
    var box = e.target.getBoundingClientRect();
    return (e.clientY - box.top) / box.height;
}

// Set true for URLs of files which do not contain multiple images or are queued for testing
var negatives = {};
var negativesSaved = JSON.parse(localStorage.getItem("concat_image_negatives") || "[]");
for (var i = 0; i < negativesSaved.length; i++) {
    negatives[negativesSaved[i]] = true;
}

// Arrays of blob/data URLs pointing to image parts, indexed by original image URL
var partLists = {};
// Original image URLs, indexed by URLs to parts
var originals = {};

// Set image element el to image from parts given mouse position within image y
function setImage(el, y) {
    var url = el.src;
    if (url in originals) url = originals[url];
    var parts = partLists[url];
    var i = Math.floor(y * parts.length);
    if (i < 0) i = 0;
    if (i >= parts.length) i = parts.length - 1;
    if (el.src != parts[i]) {
        el.style.height = getComputedStyle(el, null).getPropertyValue("height");
        el.style.width = "auto";
        el.style.maxWidth = "100%";
        el.src = parts[i];
    }
}

// Test whether image is concatenated sequence
function testImage(el) {
    negatives[el.src] = true;
    if (!(/^https?:/i.test(el.src) && doTestImagesFrom(el.src))) return;
    request(el.src, function(data) {
        if (data != null) {
            var parts = decompose(data);
            if (parts != null) {
                // Positive
                delete negatives[el.src];
                partLists[el.src] = parts;
                for (var i = 0; i < parts.length; i++) originals[parts[i]] = el.src;
                setImage(el, 0);
            } else {
                // Negative
                var negativesSaved = JSON.parse(localStorage.getItem("concat_image_negatives") || "[]");
                negativesSaved.push(el.src);
                negativesSaved = negativesSaved.slice(-1000);
                localStorage.setItem("concat_image_negatives", JSON.stringify(negativesSaved));
            }
        }
        el.classList.remove("images_viewer_loading");
    });
}

// Indicate if the image has not been tested
function indicateIfLoading(el) {
    if (
        !(el.src in negatives)
        && !(el.src in partLists)
        && !(el.src in originals)
        && /^https?:/i.test(el.src)
        && doTestImagesFrom(el.src)
    ) {
        el.classList.add("images_viewer_loading");
    }
}

// Add event listeners to image
function setupImage(el) {
    // Indicate if image has not been tested
    indicateIfLoading(el);

    // Monitor for change in src attribute
    // Indicate if image has not been tested
    var obs = new MutationObserver(function(mus) {
        for (var i = 0; i < mus.length; i++) {
            if (mus[i].attributeName == "src") {
                indicateIfLoading(el);
            }
        }
    });
    obs.observe(el, {attributes: true});

    // Image file has been loaded
    // Begin testing if mouse is over element
    el.addEventListener("load", function(e) {
        if (document.querySelector("img:hover") == el) {
            if (el.src in partLists) {
                setImage(el, 0);
            } else if (!(el.src in negatives) && !(el.src in originals)) {
                testImage(el);
            }
        }
    }, false);

    // Mouse moved over element
    // Select correct image or begin testing
    el.addEventListener("mousemove", function(e) {
        if (el.src in negatives) return;
        if (el.src in partLists || el.src in originals) {
            setImage(el, mouseY(e));
        } else {
            testImage(el);
        }
    }, false);

    // Element clicked (on right-hand side if in web page)
    // Open selected image from sequence
    el.addEventListener("click", function(e) {
        if (el.src in originals && /^blob:/i.test(el.src)) {
            if (mouseX(e) >= 0.5 || location.href == originals[el.src]) {
                open(el.src);
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, true);
}

// Add CSS to document
var ss = document.createElement("style");
ss.type = "text/css";
ss.textContent = ".images_viewer_loading {cursor: progress;}";
if (document.head != null) document.head.appendChild(ss);

// Setup images in document
for (var i = 0; i < document.images.length; i++) {
    setupImage(document.images[i]);
}

// Setup images added to the document
var obs = new MutationObserver(function(mus) {
    for (var i = 0; i < mus.length; i++) {
        if (mus[i].addedNodes != null) {
            for (var j = 0; j < mus[i].addedNodes.length; j++) {
                if (mus[i].addedNodes[j].nodeName == "IMG") {
                    setupImage(mus[i].addedNodes[j]);
                }
            }
        }
    }
});
obs.observe(document.body, {childList: true, subtree: true});
