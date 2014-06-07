// ==UserScript==
// @name           Darkside
// @namespace      http://userscripts.org/users/77660
// @include        http://*.4chan.org/*
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// File types
// endf: function to find end of file
// type: MIME type
var JPEG = {endf: jpeg_end, type: "image/jpeg"};
var GIF = {endf: gif_end, type: "image/gif"};
var PNG = {endf: png_end, type: "image/png"};
var RAR = {endf: rar_end, type: "application/x-rar-compressed"};
var SEVENZ = {endf: sevenz_end, type: "application/x-7z-compressed"};
var ZIP = {endf: zip_end, type: "application/zip"};
var MPEGAUDIO = {endf: mpegaudio_end, type: "audio/mpeg"};
var HTML = {endf: html_end, type: "text/html"};
var UNK = {};

// Finds end of JPEG file in byte array arr starting at start.
function jpeg_end(arr, start) {
    var i = start + 2;
    while (i+2 <= arr.length) {
        if (arr[i] == 0xFF && arr[i+1] >= 0xC0) {
            if (arr[i+1] == 0xD9) return i+2;
            if (arr[i+1] == 0xD8) return -1;
            if (0xD0 <= arr[i+1] && arr[i+1] <= 0xD7) {
                i += 2;
            } else {
                if (i+4 > arr.length) return arr.length;
                i += arr[i+2]*256 + arr[i+3] + 2;
            }
        } else {
            i++;
        }
    }
    return arr.length;
}

// Finds end of GIF file in byte array arr starting at start.
function gif_end(arr, start) {
    var i = start + 10;
    if (i >= arr.length) return arr.length;
    if (arr[i] & 0x80) i += (3 << ((arr[i] & 0x07) + 1));
    i += 3;
    while (i < arr.length) {
        switch (arr[i]) {
        case 0x2C:
            i += 9;
            if (i >= arr.length) return arr.length;
            if (arr[i] & 0x80) i += (3 << ((arr[i] & 0x07) + 1));
            i += 2;
            while (i < arr.length && arr[i]) i += arr[i] + 1;
            i++;
            break;
        case 0x21:
            i += 2;
            while (i < arr.length && arr[i]) i += arr[i] + 1;
            i++;
            break;
        case 0x3B:
            return i+1;
        default:
            return -1;
        }
    }
    return arr.length;
}

// Finds end of PNG file in byte array arr starting at start.
function png_end(arr, start) {
    var i = start + 11;
    while (i < arr.length) {
        var len = arr[i-3]*(1<<24) + (arr[i-2]<<16) + (arr[i-1]<<8) + arr[i];
        if (arr[i+1]==0x49 && arr[i+2]==0x45 && arr[i+3]==0x4E && arr[i+4]==0x44) {
            if (i+9 <= arr.length) return i+9;
            else return arr.length;
        }
        i += len + 12;
    }
    return arr.length;
}

// Finds end of RAR file in byte array arr starting at start.
function rar_end(arr, start) {
    if (arr[start+10] & 0x80) return -1;
    var i = start + 6;
    while (i < arr.length) {
        var len_header = (arr[i]<<8) + arr[i-1];
        if (arr[i-4] == 0x7B) {
            if (i+len_header-6 <= arr.length) return i+len_header-6;
            else return arr.length;
        }
        if (arr[i-2] & 0x80) {
            i += 4;
            if (i >= arr.length) return arr.length;
            var len_block = arr[i]*(1<<24) + (arr[i-1]<<16) + (arr[i-2]<<8) + arr[i-3];
            i += len_header + len_block - 4;
        } else {
            i += len_header;
        }
    }
    return arr.length;
}

// Finds end of 7z file in byte array arr starting at start.
function sevenz_end(arr, start) {
    if (arr.length < start+32) return arr.length;
    var len = 0;
    for (var i = 7; i >= 0; i--) {
        len = 256*len + arr[start+12+i] + arr[start+20+i];
    }
    if (start+32+len <= arr.length) return start+32+len;
    else return arr.length;
}

// Finds end of ZIP file in byte array arr starting at start.
function zip_end(arr, start) {
    var i = start;
    while (i+30 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x03 && arr[i+3]==0x04) {
        if ((arr[i+6] & 0x08) || (arr[i+7] & 0x20)) return -1;
        var len = arr[i+21]*(1<<24) + (arr[i+20]<<16) + (arr[i+19]<<8) + arr[i+18];
        if (len == 0xFFFFFFFF) return -1;
        var namelen = arr[i+27]*256 + arr[i+26];
        var extralen = arr[i+29]*256 + arr[i+28];
        i += 30 + namelen + extralen + len;
    }
    if (i+8 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x06 && arr[i+3]==0x08) {
        i += 8 + arr[i+7]*(1<<24) + (arr[i+6]<<16) + (arr[i+5]<<8) + arr[i+4];
    }
    while (i+46 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x01 && arr[i+3]==0x02) {
        var namelen = arr[i+29]*256 + arr[i+28];
        var extralen = arr[i+31]*256 + arr[i+30];
        var commlen = arr[i+33]*256 + arr[i+32];
        i += 46 + namelen + extralen + commlen;
    }
    if (i+6 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x05 && arr[i+3]==0x05) {
        i += 6 + arr[i+5]*256 + arr[i+4];
    }
    if (i+12 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x06 && arr[i+3]==0x06) {
        var len = 0;
        for (var j = 7; j >= 0; j++) {
            len = len*256 + arr[i+4+j];
        }
        i += 12 + len;
    }
    if (i+4 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x06 && arr[i+3]==0x07) {
        i += 20;
    }
    if (i+22 <= arr.length && arr[i]==0x50 && arr[i+1]==0x4B && arr[i+2]==0x05 && arr[i+3]==0x06) {
        i += 22 + arr[i+21]*256 + arr[i+20];
        if (i > arr.length) return arr.length;
        else return i;
    }
    return -1;
}

// Checks whether file is MPEG audio
function is_mpegaudio(arr, start) {
    var i = start;
    var frames = 0;
    while (i+4 <= arr.length && arr[i] == 0xFF && ((arr[i+1] & 0xE0) == 0xE0)) {
        if ((arr[i+1] & 0x18) == 0x08) break; // illegal version number
        if ((arr[i+1] & 0x06) == 0x00) break; // illegal layer number

        // Find bitrate in kbps
        var bitrate;
        var n = ((arr[i+2] & 0xF0) >> 4);
        switch (arr[i+1] & 0x0E) {
        case 0x0E: // V1,L1
            bitrate = [-1,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1][n];
            break;
        case 0x0C: // V1,L2
            bitrate = [-1,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1][n];
            break;
        case 0x0A: // V1,L3
            bitrate = [-1,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1][n];
            break;
        case 0x06: // V2,L1
            bitrate = [-1,32,48,56,64,80,96,112,128,144,160,176,192,224,256,-1][n];
            break;
        case 0x04: // V2,L2
        case 0x02: // V2,L3
            bitrate = [-1,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1][n];
            break;
        }
        if (bitrate < 0) break;

        // Find sampling rate in Hz
        var samplingrate;
        n = ((arr[i+2] & 0x0C) >> 2);
        switch (arr[i+1] & 0x18) {
        case 0x18: // V1
            samplingrate = [44100,48000,32000,-1][n];
            break;
        case 0x10: // V2
            samplingrate = [22050,24000,16000,-1][n];
            break;
        case 0x00: // V2.5
            samplingrate = [11025,12000,8000,-1][n];
            break;
        }

        var padding = ((arr[i+2] & 0x02) >> 1);

        // Compute frame length
        var len;
        if ((arr[i+1] & 0x06) == 0x06) { // Layer 1
            len = 4 * (Math.floor(12000*bitrate/samplingrate) + padding);
        } else { // Layer 2 or 3
            len = Math.floor(144000*bitrate/samplingrate) + padding;
        }

        if (i+len <= arr.length) {
            i += len;
            frames++;
        } else {
            break;
        }
    }

    if (frames < 4) {
        return false;
    } else {
        if (i+128 <= arr.length && arr[i]==0x54 && arr[i+1]==0x41 && arr[i+2]==0x47) {
            i += 128; // ID3v1 tag at end of file
        }
        is_mpegaudio.end = i;
        return true;
    }
}

// Returns end of MPEG audio file (already found when confirming its type).
function mpegaudio_end(arr, start) {
    return is_mpegaudio.end;
}

// Finds end of HTML file in byte array arr starting at start.
function html_end(arr, start) {
    var i = start;
    while (i+7 <= arr.length) {
        if (arr[i] == 0x3C && arr[i+1] == 0x2F) {
            if ((arr[i+2] & 0xDF) == 0x48 && (arr[i+3] & 0xDF) == 0x54) {
                if ((arr[i+4] & 0xDF) == 0x4D && (arr[i+5] & 0xDF) == 0x4C) {
                    if (arr[i+6] == 0x3E) {
                        i += 7;
                        break;
                    }
                }
            }
        }
        i++;
    }
    while (i < arr.length && (arr[i] == 0x20 || arr[i] == 0x08)) i++;
    while (i < arr.length && (arr[i] == 0x0A || arr[i] == 0x0D)) i++;
    return i;
}

// Adds link to extracted file as data: URI
function add_link(data, type, place) {
    var spn = document.createElement("span");
    spn.className = place.cn;
    place.parent.insertBefore(spn, place.before);
    place.parent.insertBefore(document.createElement("br"), spn);
    var spacesNode = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0");
    place.parent.insertBefore(spacesNode, spn);
    var arr = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) arr[i] = data.charCodeAt(i);
    var lnk = document.createElement("a");
    lnk.target = "_blank";
    lnk.href = URL.createObjectURL(new Blob([arr]));
    lnk.innerHTML = type + ", " + data.length + " bytes";
    spn.appendChild(lnk);
}

// When user clicks link by image, download image and analyze parts
function inspect_file(evt) {
    var link = this;

    // Find spot to put links
    var place = {};
    place.parent = this.parentNode.parentNode;
    place.before = this.parentNode.nextSibling;
    while (place.before && place.before.tagName != "BR") {
        place.before = place.before.nextSibling;
    }
    place.cn = this.parentNode.className;

    // Download file
    GM_xmlhttpRequest({
        method: "GET",
        url: link.getAttribute("file_to_inspect"),
        overrideMimeType: "text/plain; charset=x-user-defined",
        onload: function(r) {
            inspect_file2(r, link, place);
        }
    });
}

function inspect_file2(r, link, place) {

    // Convert to usable form
    var orig = r.responseText;
    var arr = new Array(orig.length);
    var s = "";
    for (var i = 0; i < orig.length; i++) {
        arr[i] = orig.charCodeAt(i) & 0xFF;
        s += String.fromCharCode(arr[i]);
    }


    // Parse file
    var i = 0;       // current position
    var last = 0;    // end of last complete file
    var type = "";   // type of file we are searching for the end of
    while (i < arr.length) {

        // Scan for magic numbers
        var found = null;
        // Provided we're scanning from the start of a new file (type == "")
        // instead of scanning for the end of the last one, ascii and prempg indicate:
        var ascii = 1;    // no non-ASCII characters found; possible text file
        var prempeg = 1;  // possible beginning section of MPEG audio file
        i--;
        while (!found && ((++i) < arr.length)) {
            if (arr[i] >= 128) ascii = 0;
            switch (arr[i]) {
            case 0xFF:
                if (s.substr(i+1,2) == "\xD8\xFF") {
                    if (i - last < 0x10000) {
                        found = JPEG;
                    } else if (arr[i+3] == 0xE0 && s.substr(i+6,5) == "JFIF\0") {
                        found = JPEG;
                    } else if (arr[i+3] == 0xE1 && s.substr(i+6,5) == "Exif\0\0") {
                        found = JPEG;
                    }
                } else if (((arr[i+1] & 0xE0) == 0xE0) && (prempeg || type != "")) {
                    if (is_mpegaudio(arr,i)) {
                        if (type == "") {
                            i = last;
                        }
                        found = MPEGAUDIO;
                    } else {
                        prempeg = 0;
                    }
                }
                break;
            case 0x47:
                if (s.substr(i+1,5) == "IF87a" || s.substr(i+1,5) == "IF89a") found = GIF;
                break;
            case 0x89:
                if (s.substr(i+1,7) == "PNG\x0D\x0A\x1A\x0A") found = PNG;
                break;
            case 0x52:
                if (s.substr(i+1,6) == "ar!\x1A\x07\x00") found = RAR;
                break;
            case 0x37:
                if (s.substr(i+1,5) == "z\xBC\xAF\x27\x1C") found = SEVENZ;
                break;
            case 0x50:
                if (s.substr(i+1,3) == "K\x03\x04") {
                    found = ZIP;
                } else if (type == ZIP.type && s.substr(i+1,3) == "K\x05\x06") {
                    // Marks end of zip file
                    i += 22;
                    found = UNK;
                }
                break;
            case 0x3C:
                if (s.substr(i+1,8).toUpperCase() == "!DOCTYPE") found = HTML;
                if (s.substr(i+1,4).toUpperCase() == "HTML") found = HTML;
                break;
            }
        }

        // Finish extracting previous file which we didn't know the end of, if any
        if (i != last) {
            if (type == "") {
                if (ascii) type = "text/plain";
                else type = "application/octet-stream";
            }
            add_link(s.substring(last,i), type, place);
        }
        last = i;
        type = "";

        // If magic number recognized, try to find the end of the file
        if (found && found != UNK) {
            var end = found.endf(arr,i);
            if (end < 0) {

                // Negative return value indicates end of file not found.
                // Start scanning for magic number at beginning of next.
                type = found.type;
                i++;

            } else {

                // End of file found; extract file and move past the end.
                add_link(s.substring(i,end), found.type, place);
                last = i = end;

            }
        }
    }

    // Remove link
    link.parentNode.removeChild(link.previousSibling);
    link.parentNode.removeChild(link);
}

// Set up "Inspect" links for each image
var links = document.links;
for (var i = 0; i < links.length; i++) {
    if ( /\.(jpg|gif|png)$/.test(links[i].href) ) {
        if (links[i].getElementsByTagName('img').length == 0) {
            var a = document.createElement("a");
            a.href = "javascript:void(0)";
            a.innerHTML = "Inspect";
            links[i].parentNode.insertBefore(a, links[i].nextSibling);
            a.setAttribute("file_to_inspect", links[i].href);
            a.addEventListener("click", inspect_file, true);
            var dash = "-";
            if (a.nextSibling && a.nextSibling.nodeType == 3) {
                var m = a.nextSibling.textContent.match(/^(.*?)\(/);
                if (m) dash = m[1].split("").reverse().join("");
            }
            var dashNode = document.createTextNode(dash);
            links[i].parentNode.insertBefore(dashNode, a);
        }
    }
}
