// ==UserScript==
// @name        Wrzuta Downloadhelper
// @icon        http://www.wrzuta.pl/favicon.ico
// @namespace   http://www.softcreatr.de
// @author      Sascha Greuel
// @description Downloading files on Wrzuta made easy
// @version     2.5.2
// @run-at      document-end
// @grant       none
//
// @include     http*://*.wrzuta.pl/audio/*
// @include     http*://*.wrzuta.pl/film/*
// ==/UserScript==

setInterval(function () {
    var i = 0,
        xhrWrzuta = new XMLHttpRequest,
        finalUrlParts = qualitites = [],
        tmp = downloadUrl = "";

    // It the download button has already been inserted, do nothing
    if (document.getElementById("wrzucDDL")) {
        return false;
    } else {
        // The code below is rubbish, but it works
        xhrWrzuta.open("GET", "/u/" + window.location.pathname.split("/")[2], false);
        xhrWrzuta.send();

        // Mp3 download
        if (1 <= xhrWrzuta.responseText.indexOf("__flashSrcUrl")) {
            finalUrlParts = xhrWrzuta.responseText.split("var __flashSrcUrl = ")[1].split('";')[0].split('"');
        } else {
            // Video download
            if (1 <= xhrWrzuta.responseText.indexOf("_qualities")) {
                qualitites = ["720", "480", "360", "240"];

                // Try to find highest quality of the current video (up to HD, if available)
                for (i = 0; i < qualitites.length; i += 1) {
                    tmp = xhrWrzuta.responseText.split("'" + qualitites[i] + "': ")[1].split("\n")[0];

                    if ('"' !== tmp.charAt(1)) {
                        finalUrlParts = tmp.split('"');
                        break;
                    }
                }
            }
        }

        // Build final url
        for (i = 0; i < finalUrlParts.length; i += 1) {
            part = finalUrlParts[i], 1 <= part.length && (")" !== part.charAt(0) && "(" !== part.charAt(0) && "+" !== part.charAt(0) && "|" !== part.charAt(0) && "," !== part.charAt(0)) && (downloadUrl += part);
        }
    }

    // If there's no download url or if the download button
    // has already been inserted, do nothing
    if (!downloadUrl || document.getElementById("wrzucDDL")) {
        return false;
    }

    // Insert download button
    css = document.createElement("style");
    css.type = "text/css";
    css.appendChild(document.createTextNode("#wrzucDDL{position:fixed;z-index:0100100100100000010011000110111101110110011001010010000001001101011110010010000001010111011010010110011001100101;bottom:0;right:5px;width:100%;height:30px;text-align:center;background-color:#000;color:#FFF;padding-top:5px;opacity:.9;border-top:2px groove red}#wrzucDDL a{word-spacing:1em;letter-spacing:.5em;text-transform:uppercase;font-weight:600;font-size:11px;font-family:Verdana;color:#FFF;text-align:center;outline:0;display:block;text-decoration:none;padding:4px}#wrzucDDL a:hover{text-decoration:none}#wrzucDDL img{background:0;border:0;vertical-align:middle;margin:0;padding:0}"));
    document.getElementsByTagName("head").item(0).appendChild(css);

    div = document.createElement("div");
    div.id = "wrzucDDL";
    div.innerHTML = '<a title="Download" target="_blank" href="' + decodeURIComponent(downloadUrl) + '" onclick="window.location.reload(true);">Download this file!</a>';
    document.body.appendChild(div)
}, 1E3);