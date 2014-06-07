// ==UserScript==
// @name           Slow down Animated GIFs
// @namespace      http://userscripts.org/users/140318
// @include        *
// ==/UserScript==

/*global document, GM_xmlhttpRequest, btoa*/

function slowDownAnimatedGifs() {
// Set a slice of a string. Only works with positive indices
function setSlice(orig, replacement, indexFrom, indexTo) {
    if(typeof indexTo == "undefined") {
        return orig.slice(0, indexFrom) + replacement;
    }
    return orig.slice(0, indexFrom) + replacement + orig.slice(indexTo);
}

// Zero all but the low-order 8 bits of each character in a string.
function zeroHigh(si) {
    var so = "";
    for(var x = 0; x < si.length; x++) {
        so += String.fromCharCode(si.charCodeAt(x) & 0xff);
    }
    return so;
}
    
function thresholdGIFDelays(gif, minin, minout) {
    var y = 0;
    // Check the header
    switch(gif.slice(0,6)) {
        case "GIF87a":
            // Can't be an animated GIF
            throw new Error("GIF87a file specified");
        case "GIF89a":
            // Skip to the location of the first block, checking GCTF
            if((gif.charCodeAt(10) & 0xff)) {
                // After the GCT
                y = 13 + 3 * (2 << (gif.charCodeAt(10) & 0x07));
            } else {
                // No GCT
                y = 13;
            }
            // Read one block at a time
            while(gif.charCodeAt(y) != 0x3b) {
                switch(gif.charCodeAt(y)) {
                    case 0x2c: // Image block
                        // Seek to the start of data subblocks
                        if((gif.charCodeAt(y + 9) & 0xff)) {
                            // After the LCT and LMCS
                            y += 11 + 3 * (2 << (gif.charCodeAt(y + 9) & 0x07));
                        } else {
                            // No LCT, only a LMCS
                            y += 11;
                        }
                        // Skip subblocks, one at a time
                        while(gif.charCodeAt(y)) {
                            y += 1 + gif.charCodeAt(y);
                        }
                        // Seek past block terminator
                        y++;
                        break;
                    case 0x21: // Extension block
                        if(gif.charCodeAt(y + 1) == 0xf9) {
                            // Graphic Control Extension
                            // Get the delay
                            var delay = (gif.charCodeAt(y + 5) << 8) |
                                gif.charCodeAt(y + 4);
                            // Threshold the delay
                            if(delay < minin) {
                                delay = minout;
                            }
                            // A couple checks
                            if(delay < 0) {
                                delay = 0;
                            } else if (delay > 0xffff) {
                                delay = 0xffff;
                            }
                            // Patch in the new delay
                            gif = setSlice(gif, String.fromCharCode(
                                delay & 0xff, delay >> 8), y + 4, y + 6);
                        }
                        // Skip two-byte block header
                        y += 2;
                        // Skip subblocks, one at a time
                        while(gif.charCodeAt(y)) {
                            y += 1 + gif.charCodeAt(y);
                        }
                        // Seek past block terminator
                        y++;
                        break;
                    default:
                        throw new Error("invalid block type");
                }
            }
            break;
        default:
            throw new Error("not a GIF image");
    }
    return gif;
}

function slowGIFImage(img) {
    GM_xmlhttpRequest({
        method: "GET",
        url: img.src,
        overrideMimeType: "text/plain; charset=x-user-defined",
        onload: function(x){
            try {
                img.src = "data:image/gif;base64," +
                    btoa(thresholdGIFDelays(zeroHigh(x.responseText), 6, 10));
            } catch(e) {}
        }
    });
}

for(var i = 0; i < document.images.length; i++) {
    // Edit the regex below to match other filenames.
    // Right now it matches static .GIFs and vBulletin avatars
    if(/\.gif|image\.php/i.test(document.images[i].src)) {
        slowGIFImage(document.images[i]);
    }
}
}
slowDownAnimatedGifs();