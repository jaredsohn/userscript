// ==UserScript==
// @name           whatimg fast copy
// @namespace      whatimg
// @description    Creates 1-click formatted textareas
// @include        https://whatimg.com/
// @include        https://whatimg.com/upload.php
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version        0.1
// ==/UserScript==

// using waitForKeyElements.js so this works with the drag'n'drop upload script: http://userscripts.org/scripts/show/105520

function replaceOutput() {
    var originalOutputArea = $(".input_field");

    if (originalOutputArea.length === 1) {
        var links = extractLinks();
        originalOutputArea.hide();

        var directLinksBox = createLinksBox("Direct Links", "", "", "", "", links[0]);
        var htmlFormattedLinksBox = createLinksBox("HTML Formatted Links", "<img src=\"", "\">", "<center>", "</center>", links[0]);
        var bbFormattedHotlinksBox = createLinksBox("BB Formatted Hotinks", "", "", "", "", links[1]);
        var bbFormattedLinksBox = createLinksBox("BB Formatted Links", "[img]", "[/img]", "", "", links[0]);

        $(directLinksBox + htmlFormattedLinksBox + bbFormattedHotlinksBox + bbFormattedLinksBox).prependTo("#page_body");
    }
}

function createLinksBox(title, openTag, closeTag, groupOpenTag, groupCloseTag, links) {
    var newLine = "\n";
    if (openTag === "<img src=\"") {
        newLine = "\n\n";
    }
    var boxElement = "<b>" + title + ":</b><br><textarea style=\"width: 90%; height: 150px;\" class=\"input_field\"  wrap=\"off\" onclick=\"this.select();\" title=\"Click to select\">" + groupOpenTag + openTag + links.join(closeTag + newLine + openTag) + closeTag + groupCloseTag + "</textarea><br><br>";
    return boxElement;
}

function extractLinks() {
    var textLines = $(".input_field").text().split("\n");
    var returnLinks = [];
    var returnBB = [];
    if ($.trim(textLines[0]) !== "Direct Links:") {
        alert("Something changed in the page, the script \"whatimg fast copy\" may fail!");
    }
    for (var i = 1; i < textLines.length; i++) {
        var currLine = $.trim(textLines[i]);
        if (currLine.indexOf("http") === 0) {
            returnLinks.push(currLine);
        } else if (currLine.indexOf("[URL=") === 0) {
            returnBB.push(currLine);
        }
    }
    console.log(returnLinks);
    console.log(returnBB);
    return [returnLinks, returnBB];
}

waitForKeyElements(".input_field", replaceOutput);