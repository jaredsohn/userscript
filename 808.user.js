// ==UserScript==
// @name           Metafilter mark contact contributions
// @namespace      http://plutor.org/
// @description    Mark contact contributions on Metafilter
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

/* -- Configuration variables, sort of -------------------------------------- */

var showcontacts = 1;            // Boolean

var updateevery = 86400 * 1000;         // One day
var debug = 0;

var contactimgs = {
    // 1 - link to contact, star
    'linkto': "data:image/jpeg;base64,R0lGODlhEAAMAKUAACcnCgwMA3l5HlNTFQAAAMnJMqOjKBcXBfb2OObmNAMDAUFBC1ZWD4yMGe/vLWdnEkJCCysrBxcXBKmpGebmIZeXFxERAwICAGhoC9nZFt3dFs7OFU9PCWFhBdTUCjw8A42NAc3NAWxsAQoKAMXFAL6+AEJCAGlpAMvLAKqqAEVFAJqaABgYADo6ALu7ABwcACsrABcXADIyAP///////////////////////////////////////////////////yH5BAEKAD8ALAAAAAAQAAwAAAZSwJ9w+AMEiEikYJBsEgqGZvKASCikC4a24XA8IOAIUTKhmM/migV5wWQ0cM2GI/11PHjPp/4Dhf4hInUjJCUmJygpdSorLEItLi9SMBdEMTJEQQA7",
    // 2 - link from contact, grey star
    'linkfrom': "data:image/jpeg;base64,R0lGODlhEAAMAOcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAP8ALAAAAAAQAAwAAAhmAP8JHPgvQQCCCBF6WZGwIYBsqBomHJAPHgCJGlxo9FOvnhANIBcQHPDqncmTJiMdJAhACDl0MNFpMyHxH45vOL9VqPlPz7Wf147UBPDsWAYh1VjV3CBpgMAJwwhIVHBx4AAHBAMCADs%3D",
    // 3 - two-way link, double star
    'mutuallink': "data:image/jpeg;base64,R0lGODlhEQAMAKUAACcnCgwMA3l5HlNTFQAAAMnJMqOjKBcXBfb2OObmNAMDAUFBC1ZWD4yMGe/vLWdnEkJCCysrBxcXBKmpGebmIZeXFxERAwICAGhoC9nZFt3dFs7OFU9PCWFhBdTUCjw8A42NAc3NAWxsAQoKAMXFAL6+AEJCAGlpAMvLAKqqAEVFAJqaABgYADo6ALu7ABwcACsrABcXADIyAP///////////////////////////////////////////////////yH5BAEKAD8ALAAAAAARAAwAAAZpwJ9wCAj8isOkUjD4MZVQQsEgNUCVB0RCoVVAF4xww+F4QM4RtFAyobjf7oqFIh9eMBmNXrPh8DlXHR6DHh+DH1c/ICGMISKMIlcjJCUmJygplylXKissnS0uL6EvUDAXP6c/MTKrrUJBADs%3D",
    'nearby': "data:image/gif,GIF89a%10%00%0C%00%C6%5C%00%00%00%00%01%00%00%03%02%01%05%01%01%05%02%01%06%02%01%09%02%02%0A%03%02%08%04%03%09%04%03%0B%04%03%0C%04%03%0D%05%04%0F%05%03%11%05%03%0F%06%04%12%06%03%13%06%04%11%07%05%13%08%05%15%08%05%15%08%06%17%08%05%18%08%05%17%09%07%17%0A%073%10%09%3A%11%099%12%0AG%16%0BO%19%0Eb%20%13r%25%14m3(%86*%17%906%23%A52%1A%B38%1E%BB7%1C%96H9%BF%3B%20%D0%40%22%D8%40!%E2C%22%E4D%23%EAE%23%EAF%23%EBF%24%ECF%23%ECF%24%EFG%24%EFH%25%EFJ'%ECQ0%F0Q0%F0Q1%F0R2%EBT5%CCfP%F0Y%3A%F1%60B%D0p%5D%F1hL%CE%7Ck%EBqW%D9zf%F2y_%F3%80h%F3%82k%F3%83k%F4%85n%F4%86p%F5%99%86%E9%A5%97%F6%A1%90%F5%A2%91%F6%A4%93%F6%A9%99%F7%AB%9C%F3%B1%A3%EB%B6%AB%F8%B8%AA%F3%BB%B0%F6%BC%B0%F8%BD%B1%F9%C5%BA%FD%F2%F0%FD%F5%F3%FD%F8%F7%FE%FB%FB%FE%FE%FD%FE%FE%FE%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%7F%00%2C%00%00%00%00%10%00%0C%00%00%07%7D%80%7F%82%83%7F%07%03%84%88%84%04A%23%89%88%04%18%19)%1E%08%12%0A%8E%7F'SO4%40IR%3D%0E%89%10P%5BV7Q%5BUK%20%89!X%5B%5BWZY%3EL%3A%05%84%02%3F%B1%BDT38M%1C%84%01%1FBCDFE6%26%2C%22%06%88%119N2J%3C0%17%24%1D%89%165H2G%3B.%13(%1B%89%0D*-11%2F%2B%0B%25%1A%8E%04%0C%15%14%11%0F%00%09%01%83%81%00%3B"
};

var CONFIG = {
    "you":          'none',
    "linkto":       'icon',
    "linkfrom":     'icon',
    "mutuallink":   'icon',
    "nearby":       'icon'
};
var USERTYPES = { "you":        "You",
                  "linkto":     "Your contacts",
                  "linkfrom":   "Contact you",
                  "mutuallink": "Mutual contacts",
                  "nearby":     "Nearby" };
var CONFIGVALS = {
    "icon":  0,
    "color": 1,
    "style": 1,
    "none":  0
}; // Name => has text field
var NEARBY_MAX_DIST = 10;    // Miles

/* -- Global variables ------------------------------------------------------ */

var userid = mcc_get_cookie("USER_ID");
var clist = new Object();
var now = new Date();

/* -- Simple helper functions ----------------------------------------------- */

function mcc_is_logged_in() {
        if (!userid || userid <= 0) return 0;
        return 1;
}

function mcc_get_cached_data() {
    try {
        clist = eval(GM_getValue("MefiContacts", ""));
    } catch(e) {
        GM_log("Error parsing cache");
        clist = new Object();
    }
}

function mcc_last_cache_update() {
    if (!clist) return 0;
    if (!clist.stamp) return 0;

    if (debug) GM_log("Last updated at " + clist.stamp, 0);
    return clist.stamp;
}

/* -- XMLHTTP request ------------------------------------------------------- */

function mcc_update_contact_list() {
    /* GET http://www.metafilter.com/usercontacts/USERID */
    var url = 'http://www.metafilter.com/usercontactsdata.mefi?user_id=' + userid;
    if (debug) GM_log("Getting " + url, 0);

    GM_xmlhttpRequest({
        method: "GET",
        url:    url,
        onload: mcc_got_contact_list });
}

function mcc_got_contact_list(details) {
    if (details.readyState == 4 && details.status == 200) {
        var xml = new DOMParser().parseFromString(details.responseText, 'text/xml');
        mcc_handle_contact_list(xml);
    }
}

/* -- Creates the list from the contact list page --------------------------- */

function mcc_handle_contact_sublist(root, tagname) {
    var contacts = root.getElementsByTagName(tagname);

    if (contacts) {
        contacts = contacts[0].childNodes;

        for (var i=0; i<contacts.length; ++i) {
            var contact = contacts[i];
            if (contact.tagName && contact.tagName.toUpperCase() == 'USER') {
                var rel, id, name, dist;
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

                var newc;
                if (clist.uid[id]) {
                    newc = clist.uid[id];
                } else {
                    newc = { id: id, name: name };
                }
                if (dist) newc.dist = dist;
                if (rel) {
                    if (newc.rel)
                        newc.rel += " " + rel
                    else
                        newc.rel = rel;
                }
                newc[tagname] = 1;

                clist.uid[id] = newc;
                clist.name[name] = newc;
            }
        }
    }
}

function mcc_handle_contact_list(xml) {
    var root = xml.documentElement;

    var numcontacts = 0;
    clist = { uid: {}, name: {} };
    
    mcc_handle_contact_sublist(root, 'contacts');
    mcc_handle_contact_sublist(root, 'contactsfrom');
    mcc_handle_contact_sublist(root, 'nearby');

    /* Save */
    clist.stamp = now.valueOf();
    GM_setValue("MefiContacts", clist.toSource());

    /* Now mark contributions */
    mcc_mark_contribs();
}

/* -- Helper function for mcc_handle_contact_list --------------------------- */

/* blob - The HTML of a list of contacts */
/* returns a list of contacts in that blob */
function handleCListGetNames(blob) {
        var list = new Array();

        var listre = new RegExp("<a href=\"/user/([^\"]*)\"[^>]*>([^<]*)", "gi");
        var matches = blob[0].match( listre );

        if (matches) {
                for (i=0; i<matches.length; ++i) {
                        var j = matches[i];
                        var n = j.match(/\d+/);

                        if (n) {
                                list.push(n[0]);
                        }
                        list.push(j.substr(j.lastIndexOf(">")+1));
                }
        }

        return list;
}

/* -- Marks contribs from contacts  ----------------------------------------- */

var alreadymarked = 0;
function mcc_mark_contribs() {
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
        }
        else if (lh.match(usernamehrefre)) {
            obj = clist.name[key];
        }

        if (obj) {
            var type = "";
            if (obj.contacts && obj.contactsfrom)       { type = 'mutuallink'; }
            else if (obj.contacts && !obj.contactsfrom) { type = 'linkto'; }
            else if (!obj.contacts && obj.contactsfrom) { type = 'linkfrom'; }
            else if (key == userid && l.innerHTML != "My Profile") { type = 'you'; }

            if (type && CONFIG[type]) {
                if (CONFIG[type] == 'icon' && contactimgs[type]) {
                    var ni = document.createElement("img");
                    ni.src = contactimgs[type];
                    ni.style.borderWidth = '0';
                    l.parentNode.insertBefore(ni, l);
                } else if (CONFIG[type].match('^color')) {
                    var val = CONFIG[type].replace(/^color /, '');
                    l.style.color = val;
                } else if (CONFIG[type].match('^style')) {
                    var val = CONFIG[type].replace(/^style /, '');
                    l.style.cssText = val;
                }
            }

            if ((obj.dist != null) && CONFIG['nearby'] &&
                parseInt(obj.dist) <= parseInt(NEARBY_MAX_DIST)) {
                if (CONFIG['nearby'] == 'icon') {
                    var title = "This user lives " + obj.dist + " miles away from you";
                    var ni = document.createElement("img");
                    ni.src = contactimgs['nearby'];
                    ni.title = title;
                    ni.style.borderWidth = '0';
                    l.parentNode.insertBefore(ni, l);
                } else if (CONFIG['nearby'].match('^color')) {
                    var val = CONFIG['nearby'].replace(/^color /, '');
                    l.style.color = val;
                } else if (CONFIG['nearby'].match('^style')) {
                    var val = CONFIG['nearby'].replace(/^style /, '');
                    l.style.cssText = val;
                }
            }
        }
    }

    alreadymarked = 1;
        if (debug) GM_log("Took " + (new Date() - t0) + "ms to mark");
}

/* -- Get cookie value (for USER_ID) ---------------------------------------- */

/* From http://www.netspade.com/articles/javascript/cookies.xml */
function mcc_get_cookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}

/* ======================================================================== */

function mcc_load_preferences() {
    for (type in USERTYPES) {
        CONFIG[type] = GM_getValue('mcc_' + type, CONFIG[type]);
    }

    var nmd = GM_getValue('mcc_nearby_max_dist', NEARBY_MAX_DIST);
    if (nmd)
        NEARBY_MAX_DIST = nmd;
}

function mcc_save_preferences() {
    for (type in USERTYPES) {
        var name = 'mcc_' + type + '_config';

        var select_el = document.getElementById(name);
        var select_val = select_el.value;

        var text_id = 'mcc_' + type + '_' + select_val;
        var text_el = document.getElementById(text_id);

        if (text_el) {
            select_val = select_val + " " + text_el.value;
        }
    
        GM_setValue('mcc_' + type, select_val);
    }

    var nearby_max_dist = document.getElementById('mcc_nearby_max_dist').value;
    GM_setValue('mcc_nearby_max_dist', nearby_max_dist);

    return true; /* So it actually submits, too */
}

/* ======================================================================== */

function mcc_escape(str) {
    return str.replace(/"/g, '&quot;');
}

/* ======================================================================== */

function mcc_init_preferences() {
    var inputs = document.getElementsByTagName('input');
    var submit_button;

    // Find the submit button
    for (var i=0; i<inputs.length; ++i) {
        if (inputs[i].type == 'submit' && inputs[i].value.match(/Save your Preferences/)) {
            submit_button = inputs[i];
            break;
        }
    }
    if (!submit_button) return;

    // Create the fieldset
    var mcc_fieldset = document.createElement('fieldset');
    var mfftext = '<legend>Contact contribution display preferences</legend>';

    for (type in USERTYPES) {
        var name = 'mcc_' + type + '_config';

        mfftext += '<label for="'+ name + '">' + USERTYPES[type] + ': </label>'
                + '<select id="'+ name + '" name="'+ name + '" style="margin-left:0px;" onfocus="this.style.background=\'#ddd\';" onblur="this.style.background=\'#ccc\';">';

        for (j in CONFIGVALS) {
            var selected = (CONFIG[type].match("^" + j)) ? " selected" : "";
            mfftext += '<option value="' + j + '"' + selected + '>' + j + '</option>'
        }

        mfftext += '</select> ';

        for (j in CONFIGVALS) {
            if (CONFIGVALS[j]) {
                var display = (CONFIG[type].match("^" + j)) ? "inline" : "none";
                var id = 'mcc_' + type + '_' + j;
                var val = "";
                if (display != "none") {
                    val = mcc_escape(CONFIG[type].replace(RegExp("^" + j + " "), ''));
                }
                mfftext += '<input type="text" id="' + id + '" size="40" '
                        + 'style="display: ' + display + '; margin: 0;" value="' + val + '">'
            }
        }

        //mfftext += '<br>';
	    mfftext += '<div style="clear: both;"></div>';
    }

    mfftext += '<label for="mcc_nearby_max_dist">Nearby user threshold: </label>'
    	+ '<input type="text" id="mcc_nearby_max_dist" name="mcc_nearby_max_dist" value="'
        + NEARBY_MAX_DIST
        + '" maxlength="4" size="4" onfocus="this.style.background=\'#ddd\';" onblur="this.style.background=\'#ccc\';" /> <span class="smallcopy">miles</span><br />';

    mcc_fieldset.innerHTML = mfftext;
    submit_button.parentNode.insertBefore( mcc_fieldset, submit_button );

    // Add change listeners
    for (type in USERTYPES) {
        var name = 'mcc_' + type + '_config';
        var el = document.getElementById(name);
        if (el)
            el.addEventListener( 'change', mcc_pref_show_text, true );
    }

    // Add javascript to the form
    submit_button.form.addEventListener( 'submit', mcc_save_preferences, true );
}

/* Show the right text box (if any) for the dropdown */
function mcc_pref_show_text(e) {
    if (!this) return;
    var sel = this;
    var sel_id = sel.id;
    var type = (sel_id.split("_"))[1];
    var val = sel.options[sel.selectedIndex].value;

    for (j in CONFIGVALS) {
        if (CONFIGVALS[j]) {
            var textel = document.getElementById('mcc_' + type + '_' + j);
            var display = (val == j) ? "inline" : "none";
            textel.style.display = display;
        }
    }
}

/* -- Main ------------------------------------------------------------------ */

function mcc_init() {
    if (!mcc_is_logged_in()) return;

    /* Get cached data */
    mcc_get_cached_data();
    mcc_load_preferences();

    /* Update cache if we're at the contact list */
    /* FIXME - Also update if we're adding a contact (submitting a form to xfnaction.cfm) */

    var url = location.href;
    url = url.replace(/https?:\/\/([^\/]*\.)?metafilter.com/, '');

    if (url.match('^/contribute/customize.cfm')) {
        /* Show preferences list */
        mcc_init_preferences();
    } else if (now - mcc_last_cache_update() > updateevery) {
        /* Download page and update cache if it's old */
        mcc_update_contact_list();
    } else {
        /* Otherwise, just mark the contributions immediately */
        mcc_mark_contribs();
    }
}

/* DO IT */
mcc_init();



