// ==UserScript==
// @name Blip.tv Video Download
// @description Provides download links for Blip.tv videos.
// @version 2.4
// @match *://blip.tv/*/*-*
// ==/UserScript==

if (document.getElementsByClassName("Episode")[0] || document.getElementsByClassName("EpisodeLite")[0]) {
    var jsonRequest = new XMLHttpRequest();
    jsonRequest.open("GET", document.URL + "?skin=json", true);
    jsonRequest.onreadystatechange = function () {
        if (jsonRequest.readyState == 4 && jsonRequest.status == 200) {
            var files = eval(jsonRequest.responseText)[0].Post.additionalMedia;

            var downloadList = document.getElementsByClassName("DescContainer")[0];
            downloadList.appendChild(document.createElement("h3"));
            downloadList.lastChild.style.marginTop = "20px";
            downloadList.lastChild.textContent = "Download this episode";

            var downloadHTML = "<ul>";
            for (var i = 0; i < files.length; i++) {
                if (files[i].role != "Blip HLS") {
                    downloadHTML += '<li style = "list-style-type:none; line-height: 18px; margin-bottom: 3px; font-size: .928571429em; color: #A7A7A7;"><a href="' + files[i].url + '" style="font-size: 100%">' + files[i].role[0].toUpperCase() + files[i].role.substring(1, files[i].role.length) + "</a> (";
                    downloadHTML += files[i].description;
                    if (files[i].description == "Unknown file type") {
                        downloadHTML += " (." + files[i].url.split(".").pop() + ")";
                    }
                    downloadHTML += ", " + formatSize(files[i].filesize);
                    if (files[i].media_width != "0" && files[i].media_width != null && files[i].media_height != "0" && files[i].media_height != null) {
                        downloadHTML += ", " + files[i].media_width + "x" + files[i].media_height;
                    }
                    if (files[i].video_codec != "") {
                        if (files[i].audio_codec != "") {
                            downloadHTML += ", " + files[i].video_codec.toUpperCase() + "/" + files[i].audio_codec.toUpperCase();
                        } else {
                            downloadHTML += ", " + files[i].video_codec.toUpperCase();
                        }
                    } else {
                        if (files[i].audio_codec != "") {
                            downloadHTML += ", " + files[i].audio_codec.toUpperCase();
                        }
                    }
                    downloadHTML += ")</li>";
                }
            }
            downloadHTML += "</ul>";
            downloadList.innerHTML += downloadHTML;
        }
    }
    jsonRequest.send();
}

function blip_ws_results(json) {
    return json;
}

function formatSize(filesize) {
    if (filesize < 1024) {
        return filesize + "B";
    } else if (filesize < 1048576) {
        return ((filesize / 102.4 + 0.5) << 0) / 10 + "KiB";
    } else if (filesize < 1073741824) {
        return ((filesize / 104857.6 + 0.5) << 0) / 10 + "MiB";
    } else {
        return ((filesize / 107374182.4 + 0.5) << 0) / 10 + "GiB";
    }
}