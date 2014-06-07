// ==UserScript==
// @name        4chan Sounds PNG Uploader
// @namespace   03439702a2904cac964aa322ffcb6a00
// @description Embeds sound files in steganographic PNGs in the format of https://github.com/dnsev/4cs so they can be uploaded to 4chan.
// @license     Public domain
// @match       *://boards.4chan.org/*
// @match       *://sys.4chan.org/*
// @grant       none
// ==/UserScript==

var MAX_BITS = 4;

function setupFileConverter(converter) {
    var postForm = document.getElementsByName("post")[0];
    var upfile = document.getElementById("postFile");
    var submitButton = document.evaluate('.//input[@type="submit"]', postForm, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var resultBlob;
    var resultName;
    var previewURL;

    // Call archive generation if needed
    function genArchive2(callback) {
        if (resultBlob != undefined) {
            callback();
        } else {
            converter.genArchive(
                upfile.files,
                function(resultBlob2, resultName2) {
                    resultBlob = resultBlob2;
                    resultName = resultName2;
                    callback();
                }
            );
        }
    }

    // Enable checkbox
    var enableBox = document.createElement("input");
    enableBox.id = "enableConvert" + converter.id;
    enableBox.type = "checkbox";
    enableBox.className = "fileOperation";
    function enableUpdate() {
        if (enableBox.checked) {
            var others = document.getElementsByClassName("fileOperation");
            for (var i = 0; i < others.length; i++) {
                if (others[i] != enableBox) others[i].checked = false;
            }
        }
    }
    enableBox.addEventListener("change", enableUpdate, false);

    // Controls
    var controls = document.createElement("span");
    controls.innerHTML = '<label for="enableConvert' + converter.id + '">' + converter.description + '</label>';

    // Hideable Controls
    var hideables = document.createElement("span");
    hideables.id = "controlsConvert" + converter.id;
    hideables.style.display = "none";
    var ss = document.createElement("style");
    ss.type = "text/css";
    ss.textContent = "#enableConvert" + converter.id + ":checked ~ span > #controlsConvert" + converter.id + " {display: inline !important;}";
    document.head.appendChild(ss);
    controls.appendChild(hideables);

    // Preview button
    var preview = document.createElement("a");
    preview.textContent = " [preview/save]";
    preview.addEventListener("click", function(e) {
        genArchive2(function() {
            previewURL = URL.createObjectURL(resultBlob);
            open(previewURL, "_blank");
        });
    }, false);
    hideables.appendChild(preview);

    // Additional controls
    for (var i = 0; i < converter.controls.length; i++) {
        hideables.appendChild(converter.controls[i]);
    }
    controls.appendChild(document.createElement("br"));

    // Watch for form updates
    function clearResults() {
        resultBlob = undefined;
        resultName = undefined;
        if (previewURL != undefined) URL.revokeObjectURL(previewURL);
        previewURL = undefined;
    }
    function removeEl(node) {
        if (node.parentNode != null) node.parentNode.removeChild(node);
    }
    upfile.addEventListener("change", function(e) {
        clearResults();
        converter.testApplicable(upfile.files, function(applicable, precedence) {
            if (applicable) {
                upfile.parentNode.insertBefore(enableBox, upfile);
                upfile.parentNode.insertBefore(controls, upfile);
                enableBox.checked = (converter.precedence || document.getElementsByClassName("fileOperation").length == 1);
                enableUpdate();
            } else {
                enableBox.checked = false;
                removeEl(enableBox);
                removeEl(controls);
            }
        });
    }, false);
    for (var i = 0; i < converter.controls.length; i++) {
        if (converter.controls[i].tagName == "INPUT") {
            converter.controls[i].addEventListener("change", function(e) {
                clearResults();
            }, false);
        }
    }

    // Capture form submit
    postForm.addEventListener("submit", function(e) {
        if (enableBox.checked) {
            e.preventDefault();
            submitButton.value = "Converting...";
            genArchive2(function() {
                // Check size
                var maxSize = parseInt(document.getElementsByName("MAX_FILE_SIZE")[0].value);
                if (resultBlob.size > maxSize) {
                    alert("Result too large to upload (" + resultBlob.size + " bytes)");
                    submitButton.value = "Submit";
                    return;
                }

                // Edit and post form
                upfile.name = "";
                var fd = new FormData(postForm);
                fd.append("upfile", resultBlob, resultName);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", postForm.action);

                // Display response
                xhr.onload = function(e) {
                    var rt = xhr.responseText;
                    location.href = "data:text/html;base64," + btoa(unescape(encodeURIComponent(rt)));
                }
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        submitButton.value = "Uploading (" + Math.round(100 * e.loaded / e.total) + "%)";
                    }
                }
                submitButton.value = "Uploading...";
                xhr.send(fd);
            });
        }
    }, false);
}

function deflate(inputData) {
    var outputData, codeLengths, codes;
    var pos = 0;

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

    function writeSymbols(data) {
        for (var i = 0; i < data.length; i++) {
            var nbits = codeLengths[data[i]];
            var bits = codes[data[i]];
            write(bits, nbits);
        }
    }

    function histogram(data, nSymbols) {
        var counts = [];
        for (var i = 0; i < nSymbols; i++) counts.push(0);
        for (var i = 0; i < data.length; i++) {
            counts[data[i]]++;
        }
        return counts;
    }

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

    var literalCounts = histogram(inputData, 286);
    literalCounts[256]++;
    var literalCodeLengths = optLengths(literalCounts, 15);

    var distanceCounts = [];
    for (var i = 0; i < 30; i++) distanceCounts.push(Math.random());
    var distanceCodeLengths = optLengths(distanceCounts, 15);

    var lengthCodeLengths = optLengths(histogram(literalCodeLengths.concat(distanceCodeLengths), 19), 7);

    var maxsize = 1+2+5+5+4 + 19*3 + (286+30+inputData.length+1)*15;
    outputData = new Uint8Array(Math.ceil(maxsize / 8));
    write(1, 1);
    write(2, 2);
    write(literalCodeLengths.length - 257, 5);
    write(distanceCodeLengths.length - 1, 5);
    write(lengthCodeLengths.length - 4, 4);

    for (var i = 0; i < lengthCodeLengths.length; i++) {
        var j = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15][i];
        write(lengthCodeLengths[j], 3);
    }

    setCodes(lengthCodeLengths);
    writeSymbols(literalCodeLengths);
    writeSymbols(distanceCodeLengths);

    setCodes(literalCodeLengths);
    writeSymbols(inputData);
    writeSymbols([256]);

    return outputData.subarray(0, Math.ceil(pos / 8));
}

function encodePNG(imageData) {
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

    function mkInt32(n) {
        return new Uint8Array([n >>> 24, n >>> 16, n >>> 8, n]);
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

    function s2ba(s) {
        var a = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
            a[i] = s.charCodeAt(i);
        }
        return a;
    }

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

    function adlerSum(data) {
        var s1 = 1;
        var s2 = 0;
        for (var i = 0; i < data.length; i++) {
            s1 = (s1 + data[i]) % 65521;
            s2 = (s2 + s1) % 65521;
        }
        return s2*65536 + s1;
    }

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

// Encode big-endian integer
function writeInt(arr, pos, len, x) {
    for (var i = 0; i < len; i++) {
        arr[pos+i] = (x >>> (8*(len-1-i))) & 0xFF;
    }
}

// Encoder for data in image
function Encoder(imageData) {
    this.data = imageData.data;
    this.pos = 0;
    this.channel = 0;
    this.bits = 0;
    this.nbits = 0;
}

Encoder.prototype.writePixel = function(x) {
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

Encoder.prototype.writeData = function(data) {
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

Encoder.prototype.finish = function() {
    if (this.nbits > 0) {
        this.bits = this.bits | (Math.floor(256*Math.random()) << this.nbits);
        this.writePixel(this.bits);
    }
    while (this.pos < this.data.length) {
        this.writePixel(Math.floor(256*Math.random()));
    }
}

// Cover image field
var coverFile = document.createElement("input");
coverFile.type = "file";

setupFileConverter({
    // Determine whether file is applicable for conversion
    testApplicable: function(files, callback) {
        if (files.length != 1) {
            callback(false);
            return;
        }
        var name = files[0].name;
        callback(/\.og[ag]$/i.test(name));
    },
    // Generate archive
    genArchive: function(files, callback) {
        var name = files[0].name.replace(/\.oga$/i, ".ogg");
        if (coverFile.files.length == 1) {
            coverURL = URL.createObjectURL(coverFile.files[0]);
        } else {
            alert("Select a cover image");
            return;
        }

        // Wait for file to be read
        var fr = new FileReader();
        fr.onload = function(e) {
            var data = new Uint8Array(e.target.result);

            name = unescape(encodeURIComponent(name)); // UTF-8 encode
            var header = new Uint8Array(8 + name.length);
            writeInt(header, 0, 2, 1);
            writeInt(header, 2, 2, name.length);
            writeInt(header, 4, 4, data.length);
            for (var i = 0; i < name.length; i++) {
                header[8+i] = name.charCodeAt(i);
            }
            var totalLength = header.length + data.length;

            // Wait for cover image to load
            var coverImg = new Image();
            coverImg.onload = function() {
                // Compute width, height, bits used
                var spaceNeeded = Math.ceil(totalLength * 8 / MAX_BITS) + 2;
                var spaceAvailable = 3 * coverImg.width * coverImg.height;
                var width = coverImg.width;
                var height = coverImg.height;
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
                ctx.drawImage(coverImg, 0, 0, width, height);
                URL.revokeObjectURL(coverURL);

                // Encode archive in data from canvas image
                var imageData = ctx.getImageData(0, 0, width, height);
                var enc = new Encoder(imageData);
                enc.bitsUsed = 3;
                enc.writePixel(bitsUsed - 1);
                enc.writePixel(0);
                enc.bitsUsed = bitsUsed;
                enc.writeData(header);
                enc.writeData(data);
                enc.finish();

                // Create PNG file
                var name2 = coverFile.files[0].name;
                var blob = encodePNG(imageData);

                callback(blob, name2);
            };
            coverImg.onerror = function() {
                URL.revokeObjectURL(coverURL);
            };
            coverImg.src = coverURL;
        };
        fr.readAsArrayBuffer(files[0]);
    },
    id: "SoundsPNG",
    description: "Upload as 4chan Sounds PNG",
    controls: [
        document.createElement("br"),
        document.createTextNode("Cover image: "),
        coverFile
    ],
    precedence: true
});
