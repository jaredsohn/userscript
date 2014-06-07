// ==UserScript==
// @name           Metafilter mark librarian contributions
// @namespace      http://plutor.org/
// @description    Mark Jessamyn's colleagues' contributions on Metafilter
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

/* -- Configuration variables, sort of -------------------------------------- */

var showcontacts = 1;            // Boolean

var updateevery = 86400 * 1000;         // One day
var debug = 0;

var contactimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFBw8vA%2BfHrcEAAAIMSURBVDjLbZM9blRBEIS%2F7vfWuzKYRbKEbBkRQIJERIKQCEg4Aycw4jgkJFwAcQhERkJETAQEEPiHP6N989dF8N4aGzPJtDSt6qrqGmM6kgwEGOPNWAuwGHtw3Gz9uO6ACC0wdgzmExwSyAyTMLMJWpLiGDh27wOgj4jZz5OTB8%2Bev3i6ubXc6WZm%2FeZ1bGMLAY5ockzCy69h%2F%2FHDV4v5xktgBdCb2cbxt%2B%2F3Dg6PHt29cevK8uoSza6g%2FjKmmGgG5o2vX1erT18O3t6%2BudetJfSSrEOL9vv7%2FP3bN93W9ibd9n267Xto0o4FjpOGTf%2Fw8dBv39yzUwAzQwoiKjmC9EOwSLAUHg3oRikenJQZqAf81MQewMwoOdME5oU%2BVyyDYUDQEJ2MUhrQEDoPIIlSKrVWhNGnjOeGEaP3CI8g1UAIO7PGfl2kUihDplWw1UCfGxZTu4HRyEUTK%2F4nITGkRCkNHzJdCkwjWWE4otaGzNbxOS%2Bh1sKQBoLExirjQ2BnkukY0TSlVBcl1NrIZSBKoaWMZ%2BhsTOXoRIWIafg%2FACklSinklGklM0sF6t%2F8A3hAH04tXFij3H1w9xyheS7VrGWsJTza5LkIBQFRaz2noQfy7u7uuyf7%2B68PDg93UJhd2oPL6TTKa5%2BQhju3rn2W1M79xlrrwt13MeaGGWe2Pc4%2FNTOQHQNH7mPO%2FwDlpTq2DvtS9QAAAABJRU5ErkJggg%3D%3D";

/* -- Global variables ------------------------------------------------------ */

var clist = new Object();
var now = new Date();

/* -- Simple helper functions ----------------------------------------------- */

function mlc_get_cached_data() {
    try {
        clist = eval(GM_getValue("MefiLibrarians", ""));
    } catch(e) {
        GM_log("Error parsing cache");
        clist = new Object();
    }
}

function mlc_last_cache_update() {
    if (!clist) return 0;
    if (!clist.stamp) return 0;

    if (debug) GM_log("Last updated at " + clist.stamp, 0);
    return clist.stamp;
}

/* -- XMLHTTP request ------------------------------------------------------- */

function mlc_update_contact_list() {
    /* GET http://www.metafilter.com/usercontacts/USERID */
    var url = 'http://www.metafilter.com/usercontactsdata.mefi?user_id=292'; // Jessamyn
    if (debug) GM_log("Getting " + url, 0);

    GM_xmlhttpRequest({
        method: "GET",
        url:    url,
        onload: mlc_got_contact_list });
}

function mlc_got_contact_list(details) {
    if (details.readyState == 4 && details.status == 200) {
        var xml = new DOMParser().parseFromString(details.responseText, 'text/xml');
        mlc_handle_contact_list(xml);
    }
}

/* -- Creates the list from the contact list page --------------------------- */

function mlc_handle_contact_sublist(root, tagname) {
    var contacts = root.getElementsByTagName(tagname);

    if (contacts) {
        contacts = contacts[0].childNodes;

        for (var i=0; i<contacts.length; ++i) {
            var contact = contacts[i];
            if (contact.tagName && contact.tagName.toUpperCase() == 'USER') {
                var rel = '';
                var id = '';
                var name = ''
                var dist;
                try {
                    id = contact.getElementsByTagName('id')[0].childNodes[0].nodeValue;
                    name = contact.getElementsByTagName('username')[0].childNodes[0].nodeValue;
                } catch (e) {
                    // Can't find all the required bits
                    continue;
                }

                try {
                    rel = contact.getElementsByTagName('relationship')[0].childNodes[0].nodeValue;
                } catch(e) {}

                try {
                    dist = contact.getElementsByTagName('distance')[0].childNodes[0].nodeValue;
                } catch(e) {}


                // Toss out any non-collegues
                if (!rel.match(/colleague/)) {
                    continue;
                }

                var newc;
                if (clist.uid[id]) {
                    newc = clist.uid[id];
                    if (rel) newc.rel = rel;
                    if (dist) newc.dist = dist;
                } else {
                    newc = { id: id, name: name, rel: rel, dist: dist };
                }
                newc[tagname] = 1;
                clist.uid[id] = newc;
                clist.name[name] = newc;
            }
        }
    }
}

function mlc_handle_contact_list(xml) {
    var root = xml.documentElement;

    var numcontacts = 0;
    clist = { uid: {}, name: {} };
    
    mlc_handle_contact_sublist(root, 'contacts');

    /* Save */
    clist.stamp = now.valueOf();
    GM_setValue("MefiLibrarians", clist.toSource());

    /* Now mark contributions */
    mlc_mark_contribs();
}

/* -- Marks contribs from contacts  ----------------------------------------- */

var alreadymarked = 0;
function mlc_mark_contribs() {
    if (alreadymarked) return;
    var t0 = new Date();

    var userhrefre = new RegExp("^(http://(www\.)?metafilter\.com)?/user(\.mefi)?/");
    var usernamehrefre = new RegExp("(http://(www\.)?metafilter\.com)?/username.mefi/");

    for (var i in document.links) {
        var l = document.links[i];
        var lh = new String(l.href);
        var key = lh.substr(lh.lastIndexOf("/")+1);
        var obj = null;

        if (lh.match(userhrefre)) {
            obj = clist.uid[key];
            if (key == 292)
                obj = "jessamyn"; // jessamyn is a librarian
        }
        else if (lh.match(usernamehrefre)) {
            obj = clist.name[key];
            if (key == "jessamyn")
                obj = "jessamyn"; // jessamyn is a librarian
        }

        if (obj) {
            var ni = document.createElement("img");
            ni.src = contactimg;
            ni.title = 'This user is a librarian';
            ni.style.borderWidth = '0';
            l.parentNode.insertBefore(ni, l);
        }
    }

    alreadymarked = 1;
        if (debug) GM_log("Took " + (new Date() - t0) + "ms to mark");
}

/* -- Main ------------------------------------------------------------------ */

function mlc_init() {
    /* Get cached data */
    mlc_get_cached_data();

    var url = location.href;
    url = url.replace(/https?:\/\/([^\/]*\.)?metafilter.com/, '');

    if (now - mlc_last_cache_update() > updateevery) {
        /* Download page and update cache if it's old */
        mlc_update_contact_list();
    } else {
        /* Otherwise, just mark the contributions immediately */
        mlc_mark_contribs();
    }
}

/* DO IT */
mlc_init();



