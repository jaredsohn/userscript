// ==UserScript==
// @name        4chan Sound Uploader
// @namespace   03439702a2904cac964aa322ffcb6a00
// @version     1.3.3
// @description Embeds sound files in images for posting on 4chan.
// @match       *://boards.4chan.org/*
// @match       *://sys.4chan.org/*
// @grant       none
// ==/UserScript==

// Acknowledgements: Portions of this code are originally from
// https://github.com/dnsev/4cs/ (decoding steganographic format sound images)
// https://raw.github.com/devongovett/png.js/ (decoding PNG images), itself including code forked from:
// https://github.com/andreasgal/pdf.js/
// https://github.com/mozilla/pdf.js/

// Create compressed data (DEFLATE format) for PNG encoder
function deflate(inputData) {
    var outputData;  // Uint8Array of compressed data
    var pos = 0;     // bit position in outputData
    var codeLengths; // lengths of current set of Huffman codes
    var codes;       // current set of Huffman codes

    // Compute codes from list of code lengths
    function setCodes(codeLengths2) {
        codeLengths = codeLengths2;
        codes = [];
        var code = 0;
        for (var n = 1; n < 16; n++) {
            for (var i = 0; i < codeLengths.length; i++) {
                if (codeLengths[i] == n) {
                    codes[i] = 0;
                    for (var j = 0; j < n; j++) {
                        codes[i] = codes[i] | (((code >> j) & 1) << (n-1-j));
                    }
                    code++;
                }
            }
            code = code << 1;
        }
    }

    // Write bits to output array
    function write(bits, nbits) {
        while (nbits > 0) {
            var k = pos & 7;
            outputData[pos>>>3] = outputData[pos>>>3] | (bits << k);
            if (k + nbits >= 8) {
                pos += 8 - k;
                nbits -= 8 - k;
                bits = bits >>> (8 - k);
            } else {
                pos += nbits;
                nbits = 0;
            }
        }
    }

    // Convert to Huffman codes and write to output
    function writeSymbols(data) {
        for (var i = 0; i < data.length; i++) {
            var nbits = codeLengths[data[i]];
            var bits = codes[data[i]];
            write(bits, nbits);
        }
    }

    // Compute histogram of data to be compressed
    function histogram(data, nSymbols) {
        var counts = [];
        for (var i = 0; i < nSymbols; i++) counts.push(0);
        for (var i = 0; i < data.length; i++) {
            counts[data[i]]++;
        }
        return counts;
    }

    // Determine optimum Huffman code lengths based on histogram (package-merge algorithm)
    function optLengths(counts, maxCodeLength) {
        var nsymbols = 0;
        for (var j = 0; j < counts.length; j++) {
            if (counts[j] != 0) nsymbols++;
        }
        var packages = [];
        for (var i = 0; i < maxCodeLength; i++) {
            for (var j = 0; j < counts.length; j++) {
                if (counts[j] != 0) {
                    packages.push({value: counts[j], symbols: [j]});
                }
            }
            packages.sort(function(a, b) {return a.value - b.value;});
            var packages2 = [];
            for (var j = 0; j < Math.floor(packages.length / 2); j++) {
                var p1 = packages[2*j];
                var p2 = packages[2*j+1];
                packages2.push({value: p1.value + p2.value, symbols: p1.symbols.concat(p2.symbols)});
            }
            packages = packages2;
        }
        var chosenLengths = [];
        for (var j = 0; j < counts.length; j++) chosenLengths.push(0);
        for (var i = 0; i < nsymbols - 1; i++) {
            for (var j = 0; j < packages[i].symbols.length; j++) {
                chosenLengths[packages[i].symbols[j]]++;
            }
        }
        return chosenLengths;
    }

    // Create tables of Huffman code lengths
    var literalCounts = histogram(inputData, 286);
    literalCounts[256]++;
    var literalCodeLengths = optLengths(literalCounts, 15);

    var distanceCounts = [];
    for (var i = 0; i < 30; i++) distanceCounts.push(Math.random());
    var distanceCodeLengths = optLengths(distanceCounts, 15);

    var lengthCodeLengths = optLengths(histogram(literalCodeLengths.concat(distanceCodeLengths), 19), 7);

    // Allocate space
    var maxsize = 1+2+5+5+4 + 19*3 + (286+30+inputData.length+1)*15;
    outputData = new Uint8Array(Math.ceil(maxsize / 8));

    // Header bits
    write(1, 1);
    write(2, 2);
    write(literalCodeLengths.length - 257, 5);
    write(distanceCodeLengths.length - 1, 5);
    write(lengthCodeLengths.length - 4, 4);

    // Write tables of Huffman code lengths
    for (var i = 0; i < lengthCodeLengths.length; i++) {
        var j = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15][i];
        write(lengthCodeLengths[j], 3);
    }

    setCodes(lengthCodeLengths);
    writeSymbols(literalCodeLengths);
    writeSymbols(distanceCodeLengths);

    // Write compressed data
    setCodes(literalCodeLengths);
    writeSymbols(inputData);
    writeSymbols([256]);

    // Cut array to correct size and return
    return outputData.subarray(0, Math.ceil(pos / 8));
}

// Encode ImageData object as Blob containing PNG file
function encodePNG(imageData) {
    // Encode integers
    function mkInt32(n) {
        return new Uint8Array([n >>> 24, n >>> 16, n >>> 8, n]);
    }

    // Compute CRCs for PNG chunks
    var crc_table = [];
    for (var n = 0; n < 256; n++) {
        var c = n;
        for (var k = 0; k < 8; k++) {
            if (c & 1) {
                c = 0xedb88320 ^ (c >>> 1);
            } else {
                c = c >>> 1;
            }
        }
        crc_table[n] = c;
    }

    function crc32(parts) {
        var crc = -1;
        for (var i = 0; i < parts.length; i++) {
            for (var j = 0; j < parts[i].length; j++) {
                crc = crc_table[(crc ^ parts[i][j]) & 0xff] ^ (crc >>> 8);
            }
        }
        return mkInt32(crc ^ -1);
    }

    // Convert strings (chunk names) into typed arrays
    function s2ba(s) {
        var a = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
            a[i] = s.charCodeAt(i);
        }
        return a;
    }

    // Create PNG chunk; body of chunk given by array of Uint8Array
    function chunk(name, parts) {
        var size = 0;
        for (var i = 0; i < parts.length; i++) {
            size += parts[i].length;
        }
        var parts2 = [s2ba(name)].concat(parts);
        parts2.push(crc32(parts2));
        parts2.splice(0, 0, mkInt32(size));
        return parts2;
    }

    // The parts of our PNG: magic number, header, data, terminator
    var MAGIC = new Uint8Array([0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A]);

    function ihdr(width, height) {
        return chunk("IHDR", [
            mkInt32(width),
            mkInt32(height),
            new Uint8Array([8,2,0,0,0])
        ]);
    }

    function idat(data, chksum) {
        return chunk("IDAT", [
            new Uint8Array([0x78, 0x5E]),
            data,
            mkInt32(chksum)
        ]);
    }

    var IEND = chunk("IEND", []);

    // Create filtered (pixels subtracted from neighbors) data to feed into compressor
    function filter(imData) {
        var data = imData.data;
        var width = imData.width;
        var height = imData.height;
        var data2 = new Uint8Array((3*width+1)*height);
        var i = 0, j = 0, x = 0, c = 0;
        data2[i++] = 1;
        while (x < width) {
            var left = (x != 0) ? data[j - 4] : 0;
            data2[i++] = data[j++] - left;
            c++;
            if (c == 3) {
                c = 0;
                x++;
                j++;
            }
        }
        while (j < data.length) {
            data2[i++] = 3;
            x = c = 0;
            while (x < width) {
                var up = data[j - 4*width];
                var left = (x != 0) ? data[j - 4] : 0;
                data2[i++] = data[j++] - ((left + up) >>> 1);
                c++;
                if (c == 3) {
                    c = 0;
                    x++;
                    j++;
                }
            }
        }
        return data2;
    }

    // Compute Adler checksum of uncompressed data
    function adlerSum(data) {
        var s1 = 1;
        var s2 = 0;
        for (var i = 0; i < data.length; i++) {
            s1 = (s1 + data[i]) % 65521;
            s2 = (s2 + s1) % 65521;
        }
        return s2*65536 + s1;
    }

    // Put it all together
    var filterData = filter(imageData);
    var chksum = adlerSum(filterData);
    var deflateData = deflate(filterData);
    var pngParts = [MAGIC].concat(
        ihdr(imageData.width, imageData.height),
        idat(deflateData, chksum),
        IEND
    );
    return new Blob(pngParts, {type: "image/png"});
}

// Embed data in least significant bits of pixel data
function LSBEmbedder(imageData) {
    this.data = imageData.data;
    this.pos = 0;
    this.channel = 0;
    this.bits = 0;
    this.nbits = 0;
}

// Write bits of next pixel
LSBEmbedder.prototype.writePixel = function(x) {
    var range = 1<<this.bitsUsed;
    var ratio = (256 - range) / 255;
    var mask = range - 1;
    var start = this.data[this.pos] * ratio;
    var val = Math.floor(start);
    var dval = (x - val) & mask;
    if (dval == 0 && Math.random() < start - val) dval += range;
    this.data[this.pos] = val + dval;
    this.pos++;
    this.channel++;
    if (this.channel == 3) {
        this.pos++;
        this.channel = 0;
    }
}

// Write array of bytes into pixels
LSBEmbedder.prototype.writeData = function(data) {
    var range = 1<<this.bitsUsed;
    var ratio = Math.floor((256 - range) * 0x1000 / 255);
    var mask = range - 1;
    for (var i = 0; i < data.length; i++) {
        this.bits = this.bits | (data[i] << this.nbits);
        this.nbits += 8;
        while (this.nbits > this.bitsUsed) {
            var start = this.data[this.pos] * ratio;
            var val = start >>> 12;
            var dval = (this.bits - val) & mask;
            if (dval == 0 && Math.random() < start / 0x1000 - val) dval += range;
            this.data[this.pos] = val + dval;
            this.pos++;
            this.channel++;
            if (this.channel == 3) {
                this.pos++;
                this.channel = 0;
            }
            this.bits = this.bits >>> this.bitsUsed;
            this.nbits -= this.bitsUsed;
        }
    }
}

// Embed leftover bits and pad with random data
LSBEmbedder.prototype.finish = function() {
    if (this.nbits > 0) {
        this.bits = this.bits | (Math.floor(256*Math.random()) << this.nbits);
        this.writePixel(this.bits);
    }
    while (this.pos < this.data.length) {
        this.writePixel(Math.floor(256*Math.random()));
    }
}

// Embed sound file in less significant bits of PNG image
// in format of https://github.com/dnsev/4cs/
function embedStego(coverImage, sounds, maxBits) {
    // Encode big-endian integers
    function writeInt(arr, pos, len, x) {
        for (var i = 0; i < len; i++) {
            arr[pos+i] = (x >>> (8*(len-1-i))) & 0xFF;
        }
    }

    // Create sounds archive header
    var headerLength = 2;
    var namesEnc = [];
    for (var i = 0; i < sounds.length; i++) {
        namesEnc.push(unescape(encodeURIComponent(sounds[i].name + ".ogg"))); // UTF-8 encode
        headerLength += 6 + namesEnc[i].length;
    }
    var header = new Uint8Array(headerLength);
    if (sounds.length >= 0x10000) throw new Error("Too many files");
    writeInt(header, 0, 2, sounds.length);
    var pos = 2;
    for (var i = 0; i < sounds.length; i++) {
        if (namesEnc[i].length >= 0x10000) throw new Error("Name too long");
        if (sounds[i].data.length >= 0x100000000) throw new Error("File too large");
        writeInt(header, pos, 2, namesEnc[i].length);
        writeInt(header, pos+2, 4, sounds[i].data.length);
        pos += 6;
    }
    for (var j = 0; j < sounds.length; j++) {
        for (var i = 0; i < namesEnc[j].length; i++) {
            header[pos++] = namesEnc[j].charCodeAt(i);
        }
    }

    // Compute width and height needed, bits used
    var totalLength = header.length;
    for (var i = 0; i < sounds.length; i++) {
        totalLength += sounds[i].data.length;
    }
    var spaceNeeded = Math.ceil(totalLength * 8 / maxBits) + 2;
    var spaceAvailable = 3 * coverImage.width * coverImage.height;
    var width = coverImage.width;
    var height = coverImage.height;
    if (spaceNeeded > spaceAvailable) {
        // Expand image to fit data
        var ratio = Math.sqrt(spaceNeeded / spaceAvailable);
        width = Math.ceil(ratio * width);
        height = Math.ceil(ratio * height);
    }
    var bitsUsed = Math.ceil(8 * totalLength / (3 * width * height - 2));

    // Draw cover image to canvas
    var can = document.createElement("canvas");
    can.width = width;
    can.height = height;
    var ctx = can.getContext("2d");
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(coverImage, 0, 0, width, height);

    // Embed sounds archive in data from canvas image
    var imageData = ctx.getImageData(0, 0, width, height);
    var emb = new LSBEmbedder(imageData);
    emb.bitsUsed = 3;
    emb.writePixel(bitsUsed - 1);
    emb.writePixel(0);
    emb.bitsUsed = bitsUsed;
    emb.writeData(header);
    for (var i = 0; i < sounds.length; i++) {
        emb.writeData(sounds[i].data);
    }
    emb.finish();

    // Create PNG file
    var blob = encodePNG(imageData);
    return {blob: blob, width: width, height: height, bitsUsed: bitsUsed};
}

// Append obfuscated sound file to image
var embedMasked = (function() {
    var JPEG = 0xFF;
    var GIF = 0x47;
    var PNG = 0x89;

    function eoi(data) {
        if (data[0] == JPEG) {
            var i = 2;
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
        } else if (data[0] == GIF) {
            var i = 10;
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
                    throw new Error("Bad image");
                }
            }
            return data.length;
        } else if (data[0] == PNG) {
            var i = 11;
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
            throw new Error("Bad image");
        }
    }

    function updateState(initState, data) {
        var state = initState;
        for (var i = 0; i < data.length; i++) {
            state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
            var mask = state >>> 24;
            state += data[i] ^ mask;
        }
        return state;
    }

    function maskLCG(initState, src, dest) {
        var state = initState;
        for (var i = 0; i < src.length; i++) {
            state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
            var mask = state >>> 24;
            state += src[i];
            dest[i] = src[i] ^ mask;
        }
        return state;
    }

    var endings = [];
    endings[GIF] = new Uint8Array([0x00, 0x3B]);
    endings[JPEG] = new Uint8Array([0xFF, 0xD9]);
    endings[PNG] = new Uint8Array([0x00,0x00,0x00,0x00,0x49,0x45,0x4E,0x44,0xAE,0x42,0x60,0x82]);

    function s2ba(s) {
        var a = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
            a[i] = s.charCodeAt(i);
        }
        return a;
    }

    function embedMasked(coverData, sounds) {
        var pos = eoi(coverData);
        var imageCut = coverData.subarray(0, pos);
        var state = updateState(0, imageCut);
        var parts = [imageCut];
        for (var i = 0; i < sounds.length; i++) {
            for (var j = 0; j < sounds[i].name.length; j++) {
                var c = sounds[i].name.charAt(j);
                if (c == "[" || c == "]" || c.charCodeAt(0) >= 128) {
                    throw new Error("Illegal character in sound name: " + c);
                }
            }
            var tag = s2ba("[" + sounds[i].name + "]\n");
            state = maskLCG(state, tag, tag);
            parts.push(tag);
            var soundData = new Uint8Array(sounds[i].data.length);
            state = maskLCG(state, sounds[i].data, soundData);
            parts.push(soundData);
        }
        parts.push(endings[coverData[0]]);
        var type = "image/jpeg";
        if (coverData[0] == 0x47) type = "image/gif";
        if (coverData[0] == 0x89) type = "image/png";
        var blob = new Blob(parts, {type: type});
        return blob;
    }
    
    return embedMasked;
})();

var findFiles = (function() {
    // General file extraction code
    function s2a(text) {
        var a = [];
        for (var i = 0; i < text.length; i++) a.push(text.charCodeAt(i));
        return a;
    }

    function matches(x, pos, y) {
        if (pos + y.length > x.length) return false;
        for (var i = 0; i < y.length; i++) {
            if (x[pos+i] != y[i]) return false;
        }
        return true;
    }

    // Determine type of embedding
    function findFiles(data, cb) {
        var data2 = new Uint8Array(data.length);
        var streams = [data, data2];
        var head = [s2a("OggS\0"), s2a("Krni\0"), s2a("moot\0"), s2a("79\x06\x08\0")];
        var startedHead = [];
        for (var k = 0; k < 3; k++) startedHead[head[k][0]] = k;
        var state = unmaskLCG(data.subarray(0, 6), data2); // unmask 6 bytes ahead
        for (var i = 0; i < data.length - 6; i++) {
            for (var m = 0; m < 2; m++) { // search both unmasked and masked data
                var k = startedHead[streams[m][i]];
                if (k != undefined && matches(streams[m], i, head[k])) {
                    // Unmask remainder of file
                    if (m != 0) {
                        unmaskLCG(data.subarray(i+6), data2.subarray(i+6), state);
                    }
                    // Krni/moot replacement starting at beginning of 4chan sounds archive
                    if (k != 0) {
                        var start = readTag(data, i).pos;
                        if (k == 1) replaceHeader(streams[m], s2a("Krni"), s2a("OggS"), start);
                        if (k == 2) replaceHeader(streams[m], s2a("moot"), s2a("OggS"), start);
                        if (k == 3) replaceHeader(streams[m], s2a("79\x06\x08"), s2a("OggS"), start);
                    }
                    findFilesClassic(streams[m], cb);
                    return;
                }
            }
            state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
            var mask = state >>> 24;
            data2[i+6] = data[i+6] ^ mask;
            state += data2[i+6];
        }
        var pngMagic = s2a("\x89PNG\r\n\x1A\n");
        if (matches(data, 0, pngMagic)) {
            findFilesDnsev(data, cb);
        }
    }

    // Krni/moot replacement
    function replaceHeader(data, oldh, newh, i) {
        for (; i < data.length - 4; i++) {
            if (data[i] == oldh[0]) {
                var match = true;
                for (var j = 1; j < 4; j++) {
                    if (data[i+j] != oldh[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    for (var j = 0; j < 4; j++) {
                        data[i+j] = newh[j];
                    }
                }
            }
        }
    }

    // LCG unmasking
    function unmaskLCG(src, dest, state) {
        if (dest == undefined) dest = src;
        if (state == undefined) state = 0;
        for (var i = 0; i < src.length; i++) {
            state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
            var mask = state >>> 24;
            dest[i] = src[i] ^ mask;
            state += dest[i];
        }
        return state;
    }

    // Find files in 4chan Sounds archive
    function readTag(data, pos) {
        var def = {tag: "", pos: pos};
        var skip = s2a(' "\r\n');
        var tagEnd = pos - 1;
        while (tagEnd >= 0 && skip.indexOf(data[tagEnd]) != -1) tagEnd--;
        if (tagEnd < 0 || data[tagEnd] != "]".charCodeAt(0)) return def;
        var tagBegin = tagEnd - 1;
        while (tagBegin >= 0 && data[tagBegin] != "[".charCodeAt(0)) tagBegin--;
        if (tagBegin < 0) return def;
        var tag = "";
        for (var i = tagBegin + 1; i < tagEnd; i++) {
            tag += String.fromCharCode(data[i]);
        }
        return {tag: tag, pos: tagBegin};
    }

    function endOfPage(data, pos) {
        if (pos + 26 >= data.length) return data.length;
        var nSegments = data[pos+26];
        if (pos + 27 + nSegments > data.length) return data.length;
        var segLength = 0;
        for (var i = 0; i < nSegments; i++) {
            segLength += data[pos+27+i];
        }
        if (pos + 27 + nSegments + segLength > data.length) return data.length;
        return pos + 27 + nSegments + segLength;
    }

    function findFilesClassic(data, cb) {
        var head = s2a("OggS\0");
        var pages = [];
        for (var i = 0; i < data.length - 6; i++) {
            if (data[i] == head[0]) {
                var match = true;
                for (var j = 1; j < 5; j++) {
                    if (data[i+j] != head[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) pages.push({start: i, flags: data[i+5]});
            }
        }
        // Lone "OggS\x00\x02" is probably hack to indicate end of data
        if (pages.length > 0 && pages[pages.length - 1].flags == 2) {
            pages.splice(-1);
        }
        var files = [];
        var nTags = 0;
        var j;
        for (var i = 0; i < pages.length; i = j) {
            j = i + 1;
            while (j < pages.length && (pages[j].flags & 2) == 0) j++;
            var tag = readTag(data, pages[i].start).tag;
            if (tag.length > 0) nTags++;
            var endPos = endOfPage(data, pages[j-1].start);
            files.push({name: tag + ".ogg", data: data.subarray(pages[i].start, endPos)});
        }
        if (nTags == 0 && files.length > 0) {
            var foot = s2a("4SPF");
            for (var i = pages[pages.length-1].start; i < data.length; i++) {
                if (data[i] == 0x34 && matches(data, i, foot)) {
                    var files2 = findFilesFooter(data, i);
                    if (files2.length > 0) {
                        cb(files2);
                        return;
                    }
                }
            }
        }
        cb(files);
    }

    function findFilesFooter(data, pos) {
        if (pos - 2 < 0) return [];
        var i = pos - 2 - (data[pos-2] + 0x100*data[pos-1]);
        if (i < 0) return [];
        var files = [];
        while (i < pos - 2) {
            var n = data[i++];
            if (i + n + 8 > pos - 2) return [];
            var tag = "";
            for (var j = 0; j < n; j++) {
                tag += String.fromCharCode(data[i++]);
            }
            var fStart = data[i] + 0x100*data[i+1] + 0x10000*data[i+2] + 0x1000000*data[i+3];
            var fEnd = data[i+4] + 0x100*data[i+5] + 0x10000*data[i+6] + 0x1000000*data[i+7];
            files.push({name: tag + ".ogg", data: data.subarray(fStart, fEnd)});
            i += 8;
        }
        return files;
    }

    // Find files in archive embedded in PNG using least-significant-bits steganography
    // See https://github.com/dnsev/4cs

    // Glue code
    function findFilesDnsev(data, cb) {
        var result = new DataImageReader(new DataImage(data)).unpack();
        if (typeof(result) == "string") return false;
        var files = [];
        for (var i = 0; i < result[0].length; i++) {
            files.push({name: result[0][i], data: result[1][i]});
        }
        cb(files);
        return true;
    }

    function DataImage(data) {
        var png = new PNG(data);
        this.pixels = png.decodePixels();
        this.width = png.width;
        this.height = png.height;
        this.channels = png.hasAlphaChannel ? 4 : 3;
    }
    DataImage.prototype.get_pixel = function(x, y, c) {
        return this.pixels[(x + y * this.width) * this.channels + c];
    }

    // Code from https://github.com/dnsev/4cs
    function DataImageReader (image) {
        this.image = image;
        this.bitmask = 0;
        this.value_mask = 0;
        this.pixel_mask = 0xFF;
        this.x = 0;
        this.y = 0;
        this.c = 0;
        this.bit_value = 0;
        this.bit_count = 0;
        this.pixel_pos = 0;
        this.scatter_pos = 0;
        this.scatter_range = 0;
        this.scatter_full_range = 0;
        this.scatter = false;
        this.channels = 0;
        this.hashmasking = false;
        this.hashmask_length = 0;
        this.hashmask_index = 0;
        this.hashmask_value = null;
    }
    DataImageReader.prototype.unpack = function () {
        try {
            return this.__unpack();
        }
        catch (e) {
            return "Error extracting data; image file likely doesn't contain data";
        }
    }
    DataImageReader.prototype.__unpack = function () {
        // Init
        this.x = 0;
        this.y = 0;
        this.c = 0;
        this.bit_value = 0;
        this.bit_count = 0;
        this.pixel_pos = 0;
        this.scatter_pos = 0;
        this.scatter_range = 0;
        this.scatter_full_range = 0;
        this.scatter = false;
        this.channels = 3;
        this.hashmasking = false;
        this.hashmask_length = 0;
        this.hashmask_index = 0;
        this.hashmask_value = null;

        // Read bitmask
        this.bitmask = 1 + this.__read_pixel(0x07);
        this.value_mask = (1 << this.bitmask) - 1;
        this.pixel_mask = 0xFF - this.value_mask;

        // Flags
        var flags = this.__read_pixel(0x07);
        // Bit depth
        if ((flags & 4) != 0) this.channels = 4;

        // Exflags
        var metadata = false;
        if ((flags & 1) != 0) {
            // Flags
            var flags2 = this.__data_to_int(this.__extract_data(1));
            // Evaluate
            if ((flags2 & 2) != 0) metadata = true;
            if ((flags2 & 4) != 0) {
                this.__complete_pixel();
                this.__init_hashmask();
            }
        }

        // Scatter
        if ((flags & 2) != 0) {
            // Read
            this.scatter_range = this.__data_to_int(this.__extract_data(4));
            this.__complete_pixel();

            // Enable scatter
            if (this.scatter_range > 0) {
                this.scatter_pos = 0;
                this.scatter_full_range = ((this.image.width * this.image.height * this.channels) - this.pixel_pos - 1);
                this.scatter = true;
            }
        }

        // Metadata
        if (metadata) {
            var meta_length = this.__data_to_int(this.__extract_data(2));
            var meta = this.__extract_data(meta_length);
        }

        // File count
        var file_count = this.__data_to_int(this.__extract_data(2));

        // Filename lengths and file lengths
        var filename_lengths = new Array();
        var file_sizes = new Array();
        var v;
        var total_size = 0;
        var size_limit;
        for (var i = 0; i < file_count; ++i) {
            // Filename length
            v = this.__data_to_int(this.__extract_data(2));
            filename_lengths.push(v);
            total_size += v;
            // File length
            v = this.__data_to_int(this.__extract_data(4));
            file_sizes.push(v);
            total_size += v;

            // Error checking
            size_limit = Math.ceil(((((this.image.width * (this.image.height - this.y) - this.x) * this.channels) - this.c) * this.bitmask) / 8);
            if (total_size > size_limit) {
                throw "Data overflow";
            }
        }

        // Filenames
        var filenames = new Array();
        for (var i = 0; i < file_count; ++i) {
            // Filename
            var fn = this.__data_to_string(this.__extract_data(filename_lengths[i]));
            try {
                fn = decodeURIComponent(escape(fn)); // UTF-8 decode
            } catch(e) {}
            // Add to list
            filenames.push(fn);
        }

        // Sources
        var sources = new Array();
        for (var i = 0; i < file_count; ++i) {
            // Read source
            var src = this.__extract_data(file_sizes[i]);
            sources.push(src);
        }

        // Done
        this.hashmasking = false;
        this.hashmask_value = null;
        return [ filenames , sources ];
    }
    DataImageReader.prototype.next_pixel_component = function (count) {
        while (count > 0) {
            count -= 1;

            this.c = (this.c + 1) % this.channels;
            if (this.c == 0) {
                this.x = (this.x + 1) % this.image.width;
                if (this.x == 0) {
                    this.y = (this.y + 1) % this.image.height;
                    if (this.y == 0) {
                        throw "Pixel overflow";
                    }
                }
            }
        }
    }
    DataImageReader.prototype.__extract_data = function (byte_length) {
        var src = new Uint8Array(byte_length);
        var j = 0;
        for (var i = this.bit_count; i < byte_length * 8; i += this.bitmask) {
            this.bit_value = this.bit_value | (this.__read_pixel(this.value_mask) << this.bit_count);
            this.bit_count += this.bitmask;
            while (this.bit_count >= 8) {
                src[j] = (this.bit_value & 0xFF);
                j += 1;
                this.bit_value = this.bit_value >> 8;
                this.bit_count -= 8;
            }
        }
        if (j != byte_length) {
            throw "Length mismatch";
        }
        return src;
    }
    DataImageReader.prototype.__data_to_int = function (data) {
        var val = 0;
        for (var i = 0; i < data.length; ++i) {
            val = val * 256 + data[i];
        }
        return val;
    }
    DataImageReader.prototype.__data_to_string = function (data) {
        var val = "";
        for (var i = 0; i < data.length; ++i) {
            val += String.fromCharCode(data[i]);
        }
        return val;
    }
    DataImageReader.prototype.__read_pixel = function (value_mask) {
        var value = (this.image.get_pixel(this.x, this.y, this.c) & value_mask);
        if (this.hashmasking) {
            value = this.__decode_hashmask(value, this.bitmask);
        }

        if (this.scatter) {
            this.scatter_pos += 1;
            // integer division sure is fun
            var v = ((Math.floor(this.scatter_pos * this.scatter_full_range / this.scatter_range) - Math.floor((this.scatter_pos - 1) * this.scatter_full_range / this.scatter_range)));
            this.pixel_pos += v;
            this.next_pixel_component(v);
        }
        else {
            this.pixel_pos += 1;
            this.next_pixel_component(1);
        }

        return value;
    }
    DataImageReader.prototype.__complete_pixel = function () {
        if (this.bit_count > 0) {
            this.bit_count = 0;
            this.bit_value = 0;
        }
    }
    DataImageReader.prototype.__init_hashmask = function () {
        this.hashmasking = true;
        this.hashmask_length = 32 * 8;
        this.hashmask_index = 0;
        this.hashmask_value = new Uint8Array(this.hashmask_length / 8);
        for (var i = 0; i < this.hashmask_length / 8; ++i) {
            this.hashmask_value[i] = (1 << ((i % 8) + 1)) - 1;
        }
        this.__calculate_hashmask();
        this.hashmask_index = 0;
    }
    DataImageReader.prototype.__calculate_hashmask = function () {
        // Vars
        var x = 0;
        var y = 0;
        var c = 0;
        var w = this.image.width;
        var h = this.image.height;
        var cc = this.channels;

        // First 2 flag pixels
        this.__update_hashmask(this.image.get_pixel(x, y, c) >> 3, 5);
        if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
        this.__update_hashmask(this.image.get_pixel(x, y, c) >> 3, 5);
        if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;

        // All other pixels
        if (this.bitmask != 8) {
            while (true) {
                // Update
                this.__update_hashmask(this.image.get_pixel(x, y, c) >> this.bitmask, 8 - this.bitmask);
                // Next
                if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
            }
        }
    }
    DataImageReader.prototype.__update_hashmask = function (value, bits) {
        // First 2 flag pixels
        var b;
        while (true) {
            // Number of bits that can be used on this index
            b = 8 - (this.hashmask_index % 8);
            if (bits <= b) {
                // Apply
                this.hashmask_value[Math.floor(this.hashmask_index / 8)] ^= (value) << (this.hashmask_index % 8);
                // Done
                this.hashmask_index = (this.hashmask_index + bits) % (this.hashmask_length);
                return;
            }
            else {
                // Partial apply
                this.hashmask_value[Math.floor(this.hashmask_index / 8)] ^= (value & ((1 << b) - 1)) << (this.hashmask_index % 8);
                // Done
                this.hashmask_index = (this.hashmask_index + b) % (this.hashmask_length);
                bits -= b;
                value >>= b;
            }
        }
    }
    DataImageReader.prototype.__decode_hashmask = function (value, bits) {
        var b;
        var off = 0;
        while (true) {
            b = 8 - (this.hashmask_index % 8);
            if (bits <= b) {
                // Apply
                value ^= (this.hashmask_value[Math.floor(this.hashmask_index / 8)] & ((1 << bits) - 1)) << off;
                // Done
                this.hashmask_index = (this.hashmask_index + bits) % (this.hashmask_length);
                return value;
            }
            else {
                // Partial apply
                value ^= (this.hashmask_value[Math.floor(this.hashmask_index / 8)] & ((1 << b) - 1)) << off;
                // Done
                this.hashmask_index = (this.hashmask_index + b) % (this.hashmask_length);
                bits -= b;
                off += b;
            }
        }
    }
    // End code from https://github.com/dnsev/4cs

    return findFiles;
})();

// zlib.js from https://github.com/devongovett/png.js/
// Originally from https://github.com/andreasgal/pdf.js -- using version from devongovett

/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var DecodeStream = (function() {
  function constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  constructor.prototype = {
    ensureBuffer: function decodestream_ensureBuffer(requested) {
      var buffer = this.buffer;
      var current = buffer ? buffer.byteLength : 0;
      if (requested < current)
        return buffer;
      var size = 512;
      while (size < requested)
        size <<= 1;
      var buffer2 = new Uint8Array(size);
      for (var i = 0; i < current; ++i)
        buffer2[i] = buffer[i];
      return this.buffer = buffer2;
    },
    getByte: function decodestream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getBytes: function decodestream_getBytes(length) {
      var pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        var end = pos + length;

        while (!this.eof && this.bufferLength < end)
          this.readBlock();

        var bufEnd = this.bufferLength;
        if (end > bufEnd)
          end = bufEnd;
      } else {
        while (!this.eof)
          this.readBlock();

        var end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    lookChar: function decodestream_lookChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function decodestream_getChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function decodestream_makeSubstream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof)
        this.readBlock();
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function decodestream_skip(n) {
      if (!n)
        n = 1;
      this.pos += n;
    },
    reset: function decodestream_reset() {
      this.pos = 0;
    }
  };

  return constructor;
})();

var FlateStream = (function() {
  var codeLenCodeMap = new Uint32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Uint32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Uint32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Uint32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Uint32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];
  
  function error(e) {
      throw new Error(e)
  }

  function constructor(bytes) {
    //var bytes = stream.getBytes();
    var bytesPos = 0;

    var cmf = bytes[bytesPos++];
    var flg = bytes[bytesPos++];
    if (cmf == -1 || flg == -1)
      error('Invalid header in flate stream');
    if ((cmf & 0x0f) != 0x08)
      error('Unknown compression method in flate stream');
    if ((((cmf << 8) + flg) % 31) != 0)
      error('Bad FCHECK in flate stream');
    if (flg & 0x20)
      error('FDICT bit set in flate stream');

    this.bytes = bytes;
    this.bytesPos = bytesPos;

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this);
  }

  constructor.prototype = Object.create(DecodeStream.prototype);

  constructor.prototype.getBits = function(bits) {
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    var b;
    while (codeSize < bits) {
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;
    this.bytesPos = bytesPos;
    return b;
  };

  constructor.prototype.getCode = function(table) {
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    while (codeSize < maxLen) {
      var b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
      error('Bad encoding in flate stream');
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    this.bytesPos = bytesPos;
    return codeVal;
  };

  constructor.prototype.generateHuffmanTable = function(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    for (var i = 0; i < n; ++i) {
      if (lengths[i] > maxLen)
        maxLen = lengths[i];
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Uint32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] == len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (var i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (var i = code2; i < size; i += skip)
            codes[i] = (len << 16) | val;

          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  constructor.prototype.readBlock = function() {
    function repeat(stream, array, len, offset, what) {
      var repeat = stream.getBits(len) + offset;
      while (repeat-- > 0)
        array[i++] = what;
    }

    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1)
      this.eof = true;
    hdr >>= 1;

    if (hdr == 0) { // uncompressed block
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var blockLen = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      blockLen |= (b << 8);
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var check = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      check |= (b << 8);
      if (check != (~blockLen & 0xffff))
        error('Bad uncompressed block length in flate stream');

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      for (var n = bufferLength; n < end; ++n) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') {
          this.eof = true;
          break;
        }
        buffer[n] = b;
      }
      this.bytesPos = bytesPos;
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr == 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr == 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = Array(codeLenCodeMap.length);
      var i = 0;
      while (i < numCodeLenCodes)
        codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      var len = 0;
      var i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Array(codes);
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code == 16) {
          repeat(this, codeLengths, 2, 3, len);
        } else if (code == 17) {
          repeat(this, codeLengths, 3, 3, len = 0);
        } else if (code == 18) {
          repeat(this, codeLengths, 7, 11, len = 0);
        } else {
          codeLengths[i++] = len = code;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    var buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 == 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos)
        buffer[pos] = buffer[pos - dist];
    }
  };

  return constructor;
})();

// End zlib.js

// Abridged version of png.js from https://github.com/devongovett/png.js/

// Generated by CoffeeScript 1.4.0

/*
# MIT LICENSE
# Copyright (c) 2011 Devon Govett
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of this 
# software and associated documentation files (the "Software"), to deal in the Software 
# without restriction, including without limitation the rights to use, copy, modify, merge, 
# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
# to whom the Software is furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all copies or 
# substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function() {
  var PNG;

  PNG = (function() {
    var APNG_BLEND_OP_OVER, APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_NONE, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas, scratchCtx;

    PNG.load = function(url, canvas, callback) {
      var xhr,
        _this = this;
      if (typeof canvas === 'function') {
        callback = canvas;
      }
      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        var data, png;
        data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
        png = new PNG(data);
        if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
          png.render(canvas);
        }
        return typeof callback === "function" ? callback(png) : void 0;
      };
      return xhr.send(null);
    };

    APNG_DISPOSE_OP_NONE = 0;

    APNG_DISPOSE_OP_BACKGROUND = 1;

    APNG_DISPOSE_OP_PREVIOUS = 2;

    APNG_BLEND_OP_SOURCE = 0;

    APNG_BLEND_OP_OVER = 1;

    function PNG(data) {
      var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
      this.data = data;
      this.pos = 8;
      this.palette = [];
      this.imgData = [];
      this.transparency = {};
      this.animation = null;
      this.text = {};
      frame = null;
      while (true) {
        chunkSize = this.readUInt32();
        section = ((function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 4; i = ++_i) {
            _results.push(String.fromCharCode(this.data[this.pos++]));
          }
          return _results;
        }).call(this)).join('');
        switch (section) {
          case 'IHDR':
            this.width = this.readUInt32();
            this.height = this.readUInt32();
            this.bits = this.data[this.pos++];
            this.colorType = this.data[this.pos++];
            this.compressionMethod = this.data[this.pos++];
            this.filterMethod = this.data[this.pos++];
            this.interlaceMethod = this.data[this.pos++];
            break;
          case 'acTL':
            this.animation = {
              numFrames: this.readUInt32(),
              numPlays: this.readUInt32() || Infinity,
              frames: []
            };
            break;
          case 'PLTE':
            this.palette = this.read(chunkSize);
            break;
          case 'fcTL':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.pos += 4;
            frame = {
              width: this.readUInt32(),
              height: this.readUInt32(),
              xOffset: this.readUInt32(),
              yOffset: this.readUInt32()
            };
            delayNum = this.readUInt16();
            delayDen = this.readUInt16() || 100;
            frame.delay = 1000 * delayNum / delayDen;
            frame.disposeOp = this.data[this.pos++];
            frame.blendOp = this.data[this.pos++];
            frame.data = [];
            break;
          case 'IDAT':
          case 'fdAT':
            if (section === 'fdAT') {
              this.pos += 4;
              chunkSize -= 4;
            }
            data = (frame != null ? frame.data : void 0) || this.imgData;
            for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
              data.push(this.data[this.pos++]);
            }
            break;
          case 'tRNS':
            this.transparency = {};
            switch (this.colorType) {
              case 3:
                this.transparency.indexed = this.read(chunkSize);
                short = 255 - this.transparency.indexed.length;
                if (short > 0) {
                  for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
                    this.transparency.indexed.push(255);
                  }
                }
                break;
              case 0:
                this.transparency.grayscale = this.read(chunkSize)[0];
                break;
              case 2:
                this.transparency.rgb = this.read(chunkSize);
            }
            break;
          case 'tEXt':
            text = this.read(chunkSize);
            index = text.indexOf(0);
            key = String.fromCharCode.apply(String, text.slice(0, index));
            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
            break;
          case 'IEND':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.colors = (function() {
              switch (this.colorType) {
                case 0:
                case 3:
                case 4:
                  return 1;
                case 2:
                case 6:
                  return 3;
              }
            }).call(this);
            this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
            colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
            this.pixelBitlength = this.bits * colors;
            this.colorSpace = (function() {
              switch (this.colors) {
                case 1:
                  return 'DeviceGray';
                case 3:
                  return 'DeviceRGB';
              }
            }).call(this);
            this.imgData = new Uint8Array(this.imgData);
            return;
          default:
            this.pos += chunkSize;
        }
        this.pos += 4;
        if (this.pos > this.data.length) {
          throw new Error("Incomplete or corrupt PNG file");
        }
      }
      return;
    }

    PNG.prototype.read = function(bytes) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
        _results.push(this.data[this.pos++]);
      }
      return _results;
    };

    PNG.prototype.readUInt32 = function() {
      var b1, b2, b3, b4;
      b1 = this.data[this.pos++] << 24;
      b2 = this.data[this.pos++] << 16;
      b3 = this.data[this.pos++] << 8;
      b4 = this.data[this.pos++];
      return b1 | b2 | b3 | b4;
    };

    PNG.prototype.readUInt16 = function() {
      var b1, b2;
      b1 = this.data[this.pos++] << 8;
      b2 = this.data[this.pos++];
      return b1 | b2;
    };

    PNG.prototype.decodePixels = function(data) {
      var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
      if (data == null) {
        data = this.imgData;
      }
      if (data.length === 0) {
        return new Uint8Array(0);
      }
      data = new FlateStream(data);
      data = data.getBytes();
      pixelBytes = this.pixelBitlength / 8;
      scanlineLength = pixelBytes * this.width;
      pixels = new Uint8Array(scanlineLength * this.height);
      length = data.length;
      row = 0;
      pos = 0;
      c = 0;
      while (pos < length) {
        switch (data[pos++]) {
          case 0:
            for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
              pixels[c++] = data[pos++];
            }
            break;
          case 1:
            for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
              byte = data[pos++];
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              pixels[c++] = (byte + left) % 256;
            }
            break;
          case 2:
            for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (upper + byte) % 256;
            }
            break;
          case 3:
            for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
            }
            break;
          case 4:
            for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              if (row === 0) {
                upper = upperLeft = 0;
              } else {
                upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
              }
              p = left + upper - upperLeft;
              pa = Math.abs(p - left);
              pb = Math.abs(p - upper);
              pc = Math.abs(p - upperLeft);
              if (pa <= pb && pa <= pc) {
                paeth = left;
              } else if (pb <= pc) {
                paeth = upper;
              } else {
                paeth = upperLeft;
              }
              pixels[c++] = (byte + paeth) % 256;
            }
            break;
          default:
            throw new Error("Invalid filter algorithm: " + data[pos - 1]);
        }
        row++;
      }
      return pixels;
    };

    return PNG;

  })();

  window.PNG = PNG;

}).call(this);

// End of png.js from https://github.com/devongovett/png.js/

(function() {
    if (typeof(MutationObserver) == "undefined") MutationObserver = WebKitMutationObserver;

    var panelOpen = false; // Is sounds panel open?
    var coverName;         // Name of image file to attach sounds to
    var coverData;         // Image file (as Uint8Array)
    var coverURL;          // Image file (as blob: URI)
    var coverImage;        // Image file (as Image element)
    var sounds = [];       // Array of Sound objects
    var resultBlob;        // Cached result

    function xpath(path, context) {
        return document.evaluate(path, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    // Interface HTML
    var soundsPanel = document.createElement("div");
    soundsPanel.id = "soundsPanel";
    soundsPanel.style.position = "relative";
    soundsPanel.style.marginTop = "2px";
    soundsPanel.innerHTML =
        '<div style="border: 1px solid black; text-align: center; font-weight: bold; height: 18px" class="postblock">'
            + '4chan Sound Uploader'
            + '<a id="soundsPanelClose" style="float: right; cursor: pointer">\xD7</a>'
        + '</div>'
        + '<div style="border: 1px solid black; border-top: none">'
            + '<a id="soundsPreviewLink" target="_blank" style="display: none">'
                + '<img id="soundsPreview" style="max-height: 125px; max-width: 125px; float: right; display: inline">'
            + '</a>'
            + '<div style="padding: .2em">'
                + '<span style="font-weight: bold">Image:</span> <span id="soundsImageItem"></span>'
            + '</div>'
            + '<div style="padding: .2em">'
                + '<div style="font-weight: bold">Sounds</div>'
                + '<div id="soundsFileList" style="margin-left: .5em; max-height: 10em; overflow-y: auto">'
                + '</div>'
            + '</div>'
            + '<div style="padding: .2em">'
                + '<div class="soundsHeader" style="font-weight: bold">Format</div>'
                + '<div style="margin-left: .5em">'
                    + '<label title="Append obfuscated sound data the image file">'
                        + '<input id="soundsFormatMasked" type="radio" name="soundsFormat" style="margin-left: 0" checked> Masked'
                    + '</label>'
                    + '<br>'
                    + '<label title="Embed sound data in least significant bits of pixels (see https://github.com/dnsev/4cs for format details)">'
                        + '<input id="soundsFormatStego" type="radio" name="soundsFormat" style="margin-left: 0"> Steganographic'
                    + '</label>'
                + '</div>'
            + '</div>'
            + '<div id="soundsStegoOptions" style="display: none; padding: .2em">'
                + '<div style="font-weight: bold">Options</div>'
                + '<div style="margin-left: .5em"'
                    + ' title="Using more bits allows the image dimensions and file size to be smaller,'
                    + ' but decreases the quality of the image.">'
                    + 'Use up to <input id="soundsMaxBits" value="4" style="width: 1em; padding: 1px; border: 1px solid #AAAAAA" class="field"> bits'
                + '</div>'
            + '</div>'
            + '<hr style="clear: right">'
            + '<div style="text-align: center">'
                + '<div id="soundsMessageField"></div>'
                + '<input id="soundsEmbedButton" type="button" value="Embed" style="float: none; margin: 2px 4px">'
                + '<input id="soundsPostButton" type="button" value="Post" style="float: none; margin: 2px 4px">'
            + '</div>'
        + '</div>';
    var soundsPanelClose = soundsPanel.querySelector("#soundsPanelClose");
    var soundsPreview = soundsPanel.querySelector("#soundsPreview");
    var soundsPreviewLink = soundsPanel.querySelector("#soundsPreviewLink");
    var soundsImageItem = soundsPanel.querySelector("#soundsImageItem");
    var soundsFileList = soundsPanel.querySelector("#soundsFileList");
    var soundsFormatMasked = soundsPanel.querySelector("#soundsFormatMasked");
    var soundsFormatStego = soundsPanel.querySelector("#soundsFormatStego");
    var soundsStegoOptions = soundsPanel.querySelector("#soundsStegoOptions");
    var soundsMaxBits = soundsPanel.querySelector("#soundsMaxBits");
    var soundsMessageField = soundsPanel.querySelector("#soundsMessageField");
    var soundsEmbedButton = soundsPanel.querySelector("#soundsEmbedButton");
    var soundsPostButton = soundsPanel.querySelector("#soundsPostButton");

    // Add panel-opening link to post form; enable multiple file selection
    // Return false if this is not a post form
    function initForm(form) {
        if (form.nodeType != Node.ELEMENT_NODE) return false;
        var fileField = form.querySelector('input[type="file"]');
        if (fileField == null) return false;

        // Panel-opening link
        var container = xpath('ancestor::*[self::form or self::td][1]', fileField);
        var soundsLinkDiv = document.createElement("div");
        soundsLinkDiv.className = "soundsLinkDiv";
        soundsLinkDiv.style.margin = "2px 0px 3px";
        soundsLinkDiv.innerHTML = '[<a style="cursor: pointer">Add sounds</a>]';
        soundsLinkDiv.getElementsByTagName("a")[0].addEventListener("click", function(e) {
            openPanel(e.target);
        }, false);
        container.appendChild(soundsLinkDiv);

        // Multiple file selection
        fileField.setAttribute("multiple", "");

        return true;
    }

    // Find original post form
    function originalForm() {
        return document.getElementsByTagName("form")[0];
    }

    // Monitor for addition and removal of Quick Reply forms
    var observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            if (nodes != null) {
                for (var j = 0; j < nodes.length; j++) {
                    // Do initial setup of QR form; insert sounds panel if open
                    if (initForm(nodes[j]) && panelOpen) openPanel(nodes[j]);
                }
            }
            nodes = mutations[i].removedNodes;
            if (nodes != null) {
                for (var j = 0; j < nodes.length; j++) {
                    if (nodes[j].querySelector("#soundsPanel") != null) {
                        // Form containing panel removed; close panel
                        closePanel();
                    }
                }
            }
        }
    });
    observer.observe(document.body, {childList: true});

    // Monitor for hiding of Quick Reply forms
    var hideObserver = new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].target.hidden) closePanel();
        }
    });

    // Find post form containing node
    function formContaining(node) {
        return xpath('ancestor-or-self::*[not(self::html or self::body)]', node);
    }

    // Setup/restore posting form when sounds panel is added/removed
    function setupForm(form, addingPanel) {
        if (form == null) return;

        // Hide/restore panel-opening link
        var linkDiv = form.querySelector(".soundsLinkDiv");
        if (linkDiv != null) linkDiv.style.display = addingPanel ? "none" : "block";

        // Disable/re-enable submit button
        var controls = form.getElementsByTagName("input");
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].type == "submit") controls[i].disabled = addingPanel;
        }

        // Remove/add MutationObserver
        if (addingPanel) {
            hideObserver.observe(form, {attributes: true});
        } else {
            hideObserver.disconnect();
        }
    }

    // Insert sounds panel into post form containing node
    function openPanel(node) {
        var newForm = formContaining(node);
        if (newForm == null) return;
        var newLinkDiv = newForm.querySelector(".soundsLinkDiv");
        if (newLinkDiv == null) return;
        var oldForm = formContaining(soundsPanel);
        if (panelOpen && oldForm == newForm) return;

        if (panelOpen) {
            // Restore old form
            if (soundsPanel.parentNode != null) soundsPanel.parentNode.removeChild(soundsPanel);
            setupForm(oldForm, false);
        } else {
            // Newly opened panel
            panelOpen = true;
        }

        // Setup new form
        setupForm(newForm, true);
        newLinkDiv.parentNode.insertBefore(soundsPanel, newLinkDiv.nextSibling);
    }

    // Move panel into focused form
    document.addEventListener("focus", function(e) {
        if (panelOpen) openPanel(e.target);
    }, true);

    // Update/remove the preview thumbnail
    function updatePreview() {
        if (soundsPreview.src) URL.revokeObjectURL(soundsPreview.src);
        if (resultBlob != undefined) {
            var previewURL = URL.createObjectURL(resultBlob);
            soundsPreview.src = previewURL;
            soundsPreviewLink.href = previewURL;
            soundsPreviewLink.style.display = "inline";
        } else {
            soundsPreviewLink.style.display = "none";
            soundsPreview.removeAttribute("src");
            soundsPreviewLink.removeAttribute("href");
        }
    }

    // Clear cached output when settings updated / panel closed
    function clearResults() {
        resultBlob = undefined;
    }

    // Close sound panel, clearing both input and output
    function closePanel() {
        var oldForm = formContaining(soundsPanel);
        if (soundsPanel.parentNode != null) soundsPanel.parentNode.removeChild(soundsPanel);
        setupForm(oldForm, false);
        panelOpen = false;

        clearResults();
        soundsImageItem.textContent = "";
        soundsFileList.innerHTML = "";
        coverName = undefined;
        coverData = undefined;
        if (coverURL != undefined) URL.revokeObjectURL(coverURL);
        coverURL = undefined;
        coverImage = undefined;
        sounds = [];
        updatePreview();
        soundsMessageField.textContent = "";
    }
    soundsPanelClose.addEventListener("click", closePanel, false);

    // Validate and retrieve settings
    function getMaxBits() {
        if (!/^[1-8]$/.test(soundsMaxBits.value)) soundsMaxBits.value = "4";
        return parseInt(soundsMaxBits.value);
    }

    // Listen for settings changes
    function formatChanged(e) {
        clearResults();
        soundsStegoOptions.style.display = soundsFormatStego.checked ? "block" : "none";
    }
    soundsFormatMasked.addEventListener("change", formatChanged, false);
    soundsFormatStego.addEventListener("change", formatChanged, false);
    soundsMaxBits.addEventListener("change", function(e) {
        clearResults();
        getMaxBits();
    }, false);

    // Listen for file selection
    document.addEventListener("change", function(e) {
        var files = e.target.files;
        if (files == null) return;
        for (var i = 0; i < files.length; i++) {
            if (/\.og[ag]$/i.test(files[i].name)) {
                openPanel(e.target);
                break;
            }
        }
        addFiles(files);
    }, true);

    // Listen for file drops
    soundsPanel.addEventListener("dragover", function(e) {
        e.preventDefault();
    }, false);
    soundsPanel.addEventListener("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer != undefined) addFiles(e.dataTransfer.files);
    }, false);

    // Search files for image & sounds and show on list when loaded
    function addFiles(files) {
        var image = null;
        for (var i = 0; i < files.length; i++) {
            if (/\.(gif|jpe?g|png)$/i.test(files[i].name)) {
                if (panelOpen) addImageSounds(files[i]);
                image = files[i];
            }
            if (/\.og[ag]$/i.test(files[i].name)) addSound(files[i]);
        }
        if (image != null) addImage(image);
    }

    // Load image and show name when loaded
    function addImage(file) {
        var coverName2 = file.name;
        var fr = new FileReader();
        fr.onload = function(e) {
            var coverData2 = new Uint8Array(e.target.result);
            var dataType;
            if (coverData2[0] == 0xFF) dataType = "image/jpeg";
            if (coverData2[0] == 0x47) dataType = "image/gif";
            if (coverData2[0] == 0x89) dataType = "image/png";
            var coverURL2 = URL.createObjectURL(new Blob([coverData2], {type: dataType}));
            var coverImage2 = new Image();
            coverImage2.onload = function() {
                clearResults();
                if (coverURL != undefined) URL.revokeObjectURL(coverURL);
                coverName = coverName2;
                coverData = coverData2;
                coverURL = coverURL2;
                coverImage = coverImage2;
                soundsImageItem.textContent = coverName2;
            };
            coverImage2.onerror = function() {
                URL.revokeObjectURL(coverURL2);
            }
            coverImage2.src = coverURL2;
        };
        fr.readAsArrayBuffer(file);
    }

    // Load sound and show on list when loaded
    function addSound(file) {
        // Add placeholder to sound list
        var sound = new Sound(file.name.replace(/\.og[ag]$/i, ""));
        sounds.push(sound);

        // Read sound file
        var fr = new FileReader();
        fr.onload = function(e) {
            sound.setData(new Uint8Array(e.target.result));
        };
        fr.readAsArrayBuffer(file);
    }

    // Load sounds from image and show on list when loaded
    function addImageSounds(file) {
        // Add placeholder to sound list
        var dummy = {};
        sounds.push(dummy);

        // Read image file
        var fr = new FileReader();
        fr.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            // Search for sounds
            findFiles(data, function(files) {
                var pos = sounds.indexOf(dummy);
                if (pos == -1) return;
                sounds.splice(pos, 1);
                for (var i = 0; i < files.length; i++) {
                    if (/\.og[ag]$/i.test(files[i].name)) {
                        var sound = new Sound(files[i].name.replace(/\.og[ag]$/i, ""));
                        sounds.splice(pos++, 0, sound);
                        sound.setData(files[i].data);
                    }
                }
            });
        };
        fr.readAsArrayBuffer(file);
    }

    // Create Sound object (not yet loaded)
    function Sound(name) {
        this.listItem = document.createElement("div");
        this.listItem.innerHTML =
            '<a style="font-weight: bold; cursor: pointer">\xD7</a> '
            + '<input style="border: none !important; background: none; width: 80%">';

        var removeButton = this.listItem.getElementsByTagName("a")[0];
        removeButton.addEventListener("click", this.remove.bind(this), false);

        this.nameField = this.listItem.getElementsByTagName("input")[0];
        this.nameField.value = "[" + name + "]";
        this.nameField.title = "[" + name + "]";
        this.getName();
        this.nameField.addEventListener("change", (function(e) {
            clearResults();
            this.getName();
            this.nameField.title = this.nameField.value;
        }).bind(this), false);
    }

    // Add sound to list when it is done loading
    Sound.prototype.setData = function(data) {
        clearResults();
        this.data = data;
        this.loaded = true;

        // Find place on list and insert there
        var i = sounds.indexOf(this);
        if (i == -1) return;
        var nextItem = null;
        for (var j in sounds) {
            if (j > i && sounds[j].listItem != undefined) {
                nextItem = sounds[j].listItem;
                break;
            }
        }
        soundsFileList.insertBefore(this.listItem, nextItem);
    }

    // Delete sound
    Sound.prototype.remove = function() {
        clearResults();
        if (this.listItem.parentNode != null) this.listItem.parentNode.removeChild(this.listItem);
        var i = sounds.indexOf(this);
        if (i != -1) delete sounds[i];
    }

    // Validate and retrieve name of sound
    Sound.prototype.getName = function() {
        var name = this.nameField.value.replace(/^\[/, "").replace(/\]$/, "");
        if (name == "") name = "1";
        if (this.nameField.value != "[" + name + "]") {
            this.nameField.value = "[" + name + "]";
            this.nameField.title = "[" + name + "]";
        }
        return name;
    }

    // Return {name: "tag", data: [Uint8Array]} object
    Sound.prototype.getFile = function() {
        return {name: this.getName(), data: this.data};
    }

    // Embed sounds in image, run callback when complete
    function embed(callback) {
        if (resultBlob != undefined) {
            callback(true); // used cached results
            return;
        }
        if (coverData == undefined) {
            alert("Select a cover image");
            callback(false);
            return;
        }
        var loadedSounds = [];
        for (var i in sounds) {
            if (sounds[i].loaded) loadedSounds.push(sounds[i].getFile());
        }
        if (loadedSounds.length < 1) {
            alert("Select a sound file");
            callback(false);
            return;
        }
        try {
            soundsMessageField.textContent = "Embedding...";
            if (soundsFormatMasked.checked) {
                resultBlob = embedMasked(coverData, loadedSounds);
                soundsMessageField.textContent =
                    (resultBlob.size / (1<<20)).toFixed(6) + " MB, "
                    + coverImage.width + "x" + coverImage.height;
            } else if (soundsFormatStego.checked) {
                var result = embedStego(coverImage, loadedSounds, getMaxBits());
                resultBlob = result.blob;
                soundsMessageField.textContent =
                    (resultBlob.size / (1<<20)).toFixed(6) + " MB, "
                    + result.width + "x" + result.height + ", "
                    + result.bitsUsed + " bits";
            }
            updatePreview();
            callback(true);
        } catch(e) {
            resultBlob = undefined;
            soundsMessageField.textContent = "Error: " + e.message;
            updatePreview();
            callback(false);
        }
    }
    soundsEmbedButton.addEventListener("click", function(e) {
        embed(function(embedSuccess) {});
    }, false);

    // Reload CAPTCHA
    function reloadCaptcha() {
        location.href = 'javascript:if (QR) QR.reloadCaptcha(); else Recaptcha.reload("t");';
    }

    // Post embedded sounds
    soundsPostButton.addEventListener("click", function(e) {
        soundsPostButton.disabled = true;
        embed(function(embedSuccess) {
            if (!embedSuccess) {
                soundsPostButton.disabled = false;
                return;
            }

            // Check size
            var maxSize = parseInt(document.getElementsByName("MAX_FILE_SIZE")[0].value);
            if (resultBlob.size > maxSize) {
                alert("Result too large to upload (" + (resultBlob.size / (1<<20)).toFixed(6) + " MB)");
                soundsPostButton.disabled = false;
                return;
            }

            // Get form containing panel
            var form = formContaining(soundsPanel);
            if (form == null) {
                soundsPostButton.disabled = false;
                return;
            }
            if (form.parentNode.id == "qr") form = form.parentNode; // 4chan X quick reply

            // Retrieve fields from 4chan X quick reply form
            var resto, captchaChallenge, captchaResponse, pwd;
            var threadField = form.querySelector('select[title~="thread"]');
            if (threadField != null && threadField.value != "new") resto = threadField.value;
            var captchaChallengeImage = xpath('descendant::img[contains(@src,"google.com/recaptcha/api/image?c=")]', form);
            if (captchaChallengeImage != null) captchaChallenge = captchaChallengeImage.src.match(/\?c=([A-Za-z0-9\-_]*)/)[1];
            var captchaResponseField = document.querySelector(".captchainput .field");
            if (captchaResponseField != null) captchaResponse = captchaResponseField.value;
            var passMatch = document.cookie.match(/4chan_pass=([^;]+)/);
            if (passMatch != null) pwd = decodeURIComponent(passMatch[1]);

            // Assemble POST data
            var fd = new FormData();
            function addField(fieldName, fcxValue, checkOriginal) {
                var nameQuery = '*[name="' + fieldName + '"]';
                var input = form.querySelector(nameQuery);
                if (input != null) {
                    // Field value found in form
                    fd.append(fieldName, input.value);
                } else if (fcxValue != undefined) {
                    // Field value retrieved from 4chan X QR
                    fd.append(fieldName, fcxValue);
                } else if (checkOriginal) {
                    // Field value found in original post form
                    input = originalForm().querySelector(nameQuery);
                    if (input != null) fd.append(fieldName, input.value);
                }
            }
            addField("MAX_FILE_SIZE", undefined, true);
            fd.append("mode", "regist");
            addField("resto", resto, true);
            addField("name");
            addField("email");
            addField("sub");
            addField("com");
            addField("recaptcha_challenge_field", captchaChallenge);
            addField("recaptcha_response_field", captchaResponse);
            fd.append("upfile", resultBlob, coverName);
            addField("filetag");
            if (form.querySelector('*[name="spoiler"]:checked, #spoiler:checked') != null) {
                fd.append("spoiler", "on");
            }
            addField("pwd", pwd, true);

            // Make request
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open("POST", document.getElementsByTagName("form")[0].action);
            xhr.onload = function(e) {
                // Display response
                soundsPostButton.disabled = false;
                reloadCaptcha();
                var rText = xhr.responseText;
                soundsMessageField.innerHTML = '<a target="_blank"><div style="max-width: 22em; margin: auto"></div></a>';
                var rLink = soundsMessageField.getElementsByTagName("a")[0];
                rLink.href = "data:text/html;base64," + btoa(unescape(encodeURIComponent(rText)));
                var rDiv = soundsMessageField.getElementsByTagName("div")[0];
                if (xhr.status != 200) {
                    rDiv.textContent = "Error " + xhr.status + ": " + xhr.statusText;
                    return;
                }
                var rText = xhr.responseText;
                if (/<title>Post successful\!<\/title>/.test(rText)) {
                    rDiv.textContent = "Post successful!";
                    return;
                }
                var error = rText.match(/"errmsg"[^>]*>([^<]*)/);
                if (error != null) {
                    rDiv.textContent = error[1];
                    return;
                }
                rDiv.textContent = "Posting Error";
            }
            xhr.upload.onerror = function(e) {
                soundsPostButton.disabled = false;
                soundsMessageField.textContent = "Connection Error";
            }
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    soundsMessageField.textContent = "Uploading (" + Math.round(100 * e.loaded / e.total) + "%)";
                }
            }
            soundsMessageField.textContent = "Uploading...";
            xhr.send(fd);
        });
    }, false);

    // Do initial setup of original post form
    initForm(originalForm())
})();
