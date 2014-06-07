// ==UserScript==
// @name           Add Contacts Link to Google Bar (GMail/Google Apps etc.)
// @description    Add Google contact link in the top-navigation bar on gmail, google docs and google plus. Based shamelessly on http://userscripts.org/scripts/show/95077.
// @include        https://mail.google.com/mail/*
// @include        https://docs.google.com/*
// @include        https://plus.google.com/*
// @match          https://mail.google.com/mail/*
// @match          https://docs.google.com/*
// @match          https://plus.google.com/*
// ==/UserScript==

function addcontactLink() {
        var contentframe=null, gbar=null, sites=null, contact=null, contactlink=null;

        if (document.location.host == "mail.google.com")
                contentframe=document.getElementById('canvas_frame').contentDocument;
        else
                contentframe=document;

        gbar=contentframe.getElementById('gbz').getElementsByClassName('gbtc')[0];

        // Walk tree looking for [Sites]
        for (i = 0; i < gbar.childNodes.length; i++) {
                if (gbar.childNodes[i].textContent.match("Agenda")){
                        sites = gbar.childNodes[i];
                        break;
                }
        }
        if (sites == null) /*If we don't find the sites element, insert arbitrarily before the 4th element*/
                sites = gbar.childNodes[3];

        // Clone the [Sites] Element
        contact=sites.cloneNode(true);

        contact.getElementsByClassName('gbts')[0].textContent="Contacts";
        contactlink=contact.getElementsByClassName("gbzt")[0];
        contactlink.setAttribute('href', 'https://mail.google.com/mail/u/0/?shva=1#contacts');
        // Let Google know we use that contact link
        contactlink.setAttribute('onclick', 'gbar.logger.il(1,{t:32})');
        contactlink.id='gb_32';
        // Set the background to have the contact icon; maybe we should set that only with the new google menu
        contact.getElementsByClassName('gbtb2')[0].style.cssText = "background-position: -111px -353px;";

        gbar.insertBefore(contact, sites);

};

try {
        addcontactLink();
} catch (e) {
        setTimeout(addcontactLink, 2000);
}
