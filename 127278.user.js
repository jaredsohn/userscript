// ==UserScript==
// @name           Metafilter mark scientist contributions
// @namespace      Shamelessly ripped-off of Plutor's original librarian version: http://plutor.org/
// @description    Mark Scientist's colleagues' contributions on Metafilter
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

/* -- Configuration variables, sort of -------------------------------------- */

var showcontacts = 1;            // Boolean

var updateevery = 86400 * 1000;         // One day
var debug = 0;

var contactimg = "data:image/png;base64,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";
/* -- Icon: BanzaiTokyo www.iconarchive.com/artist/banzaitokyo.html --------- */
/* -- Global variables ------------------------------------------------------ */

var clist = new Object();
var now = new Date();

/* -- Simple helper functions ----------------------------------------------- */

function mlc_get_cached_data() {
    try {
        clist = eval(GM_getValue("Mefiscientists", ""));
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
    var url = 'http://www.metafilter.com/usercontactsdata.mefi?user_id=114110'; // Scientist
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
    GM_setValue("Mefiscientists", clist.toSource());

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
            if (key == 114110)
                obj = "Scientist"; // Scientist is a scientist
        }
        else if (lh.match(usernamehrefre)) {
            obj = clist.name[key];
            if (key == "Scientist")
                obj = "Scientist"; // Scientist is a scientist
        }

        if (obj) {
            var ni = document.createElement("img");
            ni.src = contactimg;
            ni.title = 'This user is a scientist';
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



