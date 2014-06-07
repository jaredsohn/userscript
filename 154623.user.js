// ==UserScript==
// @name        4chan appended file masker
// @namespace   03439702a2904cac964aa322ffcb6a00
// @description Masks appended files which trigger the "embedded archive" error when uploaded to 4chan.
// @license     Public domain
// @match       *://boards.4chan.org/*
// @match       *://sys.4chan.org/*
// @grant       none
// ==/UserScript==

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

var FILTERS = ["OggS", "libVorbis", "PK\x03\x04", "7z\xBC\xAF\x27\x1C", "Rar!\x1A\x07\x00", "pFBind", "RIFF", "Krni\x00", "moot\x00", "REs^"];
var FILE_TYPES = {"gif": "image/gif", "jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png"};
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
                return data.length;
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
        return data.length;
    }
}

function maskLCG(data) {
    var state = 0;
    for (var i = 0; i < data.length; i++) {
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
        var mask = state >>> 24;
        state += data[i];
        data[i] = data[i] ^ mask;
    }
}

function unmaskLCG(data) {
    var state = 0;
    for (var i = 0; i < data.length; i++) {
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
        var mask = state >>> 24;
        data[i] = data[i] ^ mask;
        state += data[i];
    }
}

function s2a(s) {
    var a = [];
    for (var i = 0; i < s.length; i++) {
        a.push(s.charCodeAt(i));
    }
    return a;
}

function replaceKrniMoot(data, start) {
    var oldh = [s2a("Krni"), s2a("moot")];
    var newh = s2a("OggS");
    for (var i = start; i < data.length - 4; i++) {
        if (data[i] == oldh[0][0] || data[i] == oldh[1][0]) {
            for (var k = 0; k < 2; k++) {
                var matches = true;
                for (var j = 0; j < 4; j++) {
                    if (data[i+j] != oldh[k][j]) {
                        matches = false;
                        break;
                    }
                }
                if (matches) {
                    for (var j = 0; j < 4; j++) {
                        data[i+j] = newh[j];
                    }
                }
            }
        }
    }
}

var endingsList = [];
endingsList[GIF] = new Uint8Array([0x00, 0x3B]);
endingsList[JPEG] = new Uint8Array([0xFF, 0xD9]);
endingsList[PNG] = new Uint8Array([0x00,0x00,0x00,0x00,0x49,0x45,0x4E,0x44,0xAE,0x42,0x60,0x82]);

function endsWith(data, ending) {
    if (data.length < ending.length) return false;
    for (var i = 0; i < ending.length; i++) {
        if (data[data.length - ending.length + i] != ending[i]) return false;
    }
    return true;
}

var krnimootBox = document.createElement("input");
krnimootBox.id = "krnimoot";
krnimootBox.type = "checkbox";
krnimootBox.checked = true;
var krnimootLabel = document.createElement("label");
krnimootLabel.setAttribute("for", "krnimoot");
krnimootLabel.textContent = "Undo Krni/moot subsitution";

var endingsBox = document.createElement("input");
endingsBox.id = "endings";
endingsBox.type = "checkbox";
endingsBox.checked = true;
var endingsLabel = document.createElement("label");
endingsLabel.setAttribute("for", "endings");
endingsLabel.textContent = "Add fake image endings";

setupFileConverter({
    // Determine whether file is applicable for conversion
    testApplicable: function(files, callback) {
        if (files.length != 1) {
            callback(false);
            return;
        }
        var ext = (files[0].name.match(/\.([^\.]*)$/) || ["",""])[1];
        if (!(ext in FILE_TYPES)) {
            callback(false);
            return;
        }
        var fr = new FileReader();
        fr.onload = function(e) {
            var data = e.target.result;
            var applicable = false;
            for (var i = 0; i < FILTERS.length; i++) {
                if (data.indexOf(FILTERS[i]) != -1) {
                    applicable = true;
                    break;
                }
            }
            callback(applicable);
        };
        fr.readAsBinaryString(files[0]);
    },
    // Generate archive
    genArchive: function(files, callback) {
        var krnimoot = krnimootBox.checked;
        var endings = endingsBox.checked;
        var fr = new FileReader();
        fr.onload = function(e2) {
            var data = new Uint8Array(e2.target.result);
            var imgLen = eoi(data);
            if (krnimoot) replaceKrniMoot(data, imgLen);
            var img = new Uint8Array(imgLen);
            img.set(data.subarray(0, imgLen));
            unmaskLCG(img);
            data.set(img);
            maskLCG(data);
            var ext = (files[0].name.match(/\.([^\.]*)$/) || ["",""])[1];
            if (endings) {
                var blobParts = [data, endingsList[data[0]]];
            } else {
                var blobParts = [data];
            }
            var blob = new Blob(blobParts, {type: FILE_TYPES[ext] || "image/jpeg"});
            callback(blob, files[0].name);
        };
        fr.readAsArrayBuffer(files[0]);
    },
    id: "Masked",
    description: "Mask appended files",
    controls: [
        document.createElement("br"),
        krnimootBox,
        krnimootLabel,
        document.createElement("br"),
        endingsBox,
        endingsLabel
    ],
    precedence: true
});
