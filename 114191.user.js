// ==UserScript==
// @name           Add Reader to new gbar
// @description    Add Google Reader link back to where it was in the top-navigation bar on gmail, google docs and google plus. Based shamelessly on http://userscripts.org/scripts/show/95077.
// @include        https://mail.google.com/mail/*
// @include        https://docs.google.com/*
// @include        https://plus.google.com/*
// @match          https://mail.google.com/mail/*
// @match          https://docs.google.com/*
// @match          https://plus.google.com/*
// ==/UserScript==

function addReaderLink() {
        var contentframe=null, gbar=null, sites=null, reader=null, readerlink=null;

        if (document.location.host == "mail.google.com")
                contentframe=document.getElementById('canvas_frame').contentDocument;
        else
                contentframe=document;

        gbar=contentframe.getElementById('gbz').getElementsByClassName('gbtc')[0];

        // Walk tree looking for [Sites]
        for (i = 0; i < gbar.childNodes.length; i++) {
                if (gbar.childNodes[i].textContent.match("Sites")){
                        sites = gbar.childNodes[i];
                        break;
                }
        }
        if (sites == null) /*If we don't find the sites element, insert arbitrarily before the 4th element*/
                sites = gbar.childNodes[3];

        // Clone the [Sites] Element
        reader=sites.cloneNode(true);

        reader.getElementsByClassName('gbts')[0].textContent="Reader";
        readerlink=reader.getElementsByClassName("gbzt")[0];
        readerlink.setAttribute('href', 'https://www.google.com/reader/view/');
        // Let Google know we use that Reader link
        readerlink.setAttribute('onclick', 'gbar.logger.il(1,{t:32})');
        readerlink.id='gb_32';
        // Set the background to have the Reader icon; maybe we should set that only with the new google menu
        reader.getElementsByClassName('gbtb2')[0].style.cssText = "background-position: -111px -353px;";

        gbar.insertBefore(reader, sites);

};

try {
        addReaderLink();
} catch (e) {
        setTimeout(addReaderLink, 2000);
}
