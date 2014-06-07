// ==UserScript==
// @name           Galbadia Hotel Link Fixer
// @namespace      http://userscripts.org
// @description    Fix links with '
// @include        http://gh.ffshrine.org/song/*
// ==/UserScript==

window.addEventListener(
    'load', 
    function()
    {
        var italicTexts = document.getElementsByTagName('i');

        var downloadLinks = document.evaluate("//a[contains(@href,'/soundtracks/dl/')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var filePath = downloadLinks.snapshotItem(0).href.substring(0, downloadLinks.snapshotItem(0).href.lastIndexOf('/') + 1);

        var fileName = italicTexts[0].innerHTML.substring(italicTexts[0].innerHTML.indexOf('<i>'));

        var newBody = '<a href="' + filePath + fileName + '>' + filePath + fileName + '</a>';

        document.body.innerHTML = newBody;
    },
    true);
