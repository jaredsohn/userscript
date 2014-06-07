// ==UserScript==
// @name           imgur SMz formatter
// @namespace      imgur.com
// @description    Adds a ready-for-SMz code option to imgur
// @updateURL      https://userscripts.org/scripts/source/175306.meta.js
// @downloadURL    https://userscripts.org/scripts/source/175306.user.js
// @include        http://imgur.com/*
// @include        http://www.imgur.com/*
// @include        https://imgur.com/*
// @include        https://www.imgur.com/*
// @version        0.1.2
// ==/UserScript==

function extractUrls() {

    var imgUrls = [];

    var html = $('body').html();

    var startScript = html.indexOf("var imgurShare = new ImgurShare({");
    var endScript = html.indexOf("imgurShare.init()", startScript);
    var script = html.substring(startScript, endScript);

    var startRowHashes = script.indexOf("hashes:");
    var startHashes = script.indexOf("[{", startRowHashes) + 2;
    var endHashes = script.indexOf("}]", startHashes);
    var hashesString = script.substring(startHashes, endHashes);
    var hashes = hashesString.split("},{");

    var startRowCdnUrl = script.indexOf("cdnUrl:");
    var startCdnUrl = script.indexOf("//", startRowCdnUrl);
    var endCdnUrl = script.indexOf(",", startCdnUrl) - 1;
    var cdnUrl = "http:" + script.substring(startCdnUrl, endCdnUrl);

    $.each(hashes, function(i, v) {

        var startImgID = v.indexOf("hash") + 7;
        var endImgID = v.indexOf(",", startImgID) - 1;
        var imgID = v.substring(startImgID, endImgID);

        var startExt = v.indexOf("ext\":") + 6;
        var endExt = v.indexOf(",", startExt) - 1;
        var ext = v.substring(startExt, endExt);

        imgUrls.push(cdnUrl + "/" + imgID + ext);
    });

    return imgUrls;
}

var imgUrls = extractUrls();

var plainText = imgUrls.join("\n");
var formattedText = '<center><img src="' + imgUrls.join('">\n\n<img src="') + '"></center>';

var formattedTextBox = '<div id="formattedTextBox" class="panel"><h3>Formatted images</h3><textarea style="cursor:pointer; overflow: auto; height: 100px; background-color: #181817; border: 0 none; border-radius: 4px 4px 4px 4px; color: #ABABA1; font-size: 12px; margin-bottom: 5px; padding: 6px; width: 95%;" wrap="off" onclick="this.select();" title="Click to select">' + formattedText + '</textarea></div>';

var plainTextBox = '<div id="plainTextBox" class="panel"><h3>Unformatted images</h3><textarea style="cursor:pointer; overflow: auto; height: 100px; background-color: #181817; border: 0 none; border-radius: 4px 4px 4px 4px; color: #ABABA1; font-size: 12px; margin-bottom: 5px; padding: 6px; width: 95%;" wrap="off" onclick="this.select();" title="Click to select">' + plainText + '</textarea></div>';

var divs = formattedTextBox + plainTextBox;

$(divs).insertBefore("#link-codes");