// ==UserScript==
// @name           Mefi Contact Activity Sidebar Everywhere
// @namespace      http://plutor.org/
// @description    Shows the contact activity sidebar on every subsite
// @include        http://*.metafilter.com/
// @include        http://www.metafilter.com/contribute/activity/contacts/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

// DONE 2009-03-03:
// * Change URL to <http://www.metafilter.com/contact-news-mini.mefi>
// * Hide/show
// * Configurable on contact activity page
// * A little less ugly loading throbber

// TODO:
// * Ability to add sidebar to music and projects
// * Handle the blue

// ================================================================================

// THROBBER_SRC is the throbber image to use while loading
var THROBBER_SRC = 'data:image/gif;base64,R0lGODlhEAAQAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv///////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAEAAQAAAESBDJiQCgmFqbZwjVhhwH9n3hSJbeSa1sm5GUIHSTYSC2jeu63q0D3PlwCB1lMMgUChgmk/J8LqUIAgFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UKgmFqbpxDV9gAA9n3hSJbeSa1sm5HUMHTTcTy2jeu63q0D3PlwDx2FQMgYDBgmk/J8LqWPQuFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YSgmFqb5xjV9gQB9n3hSJbeSa1sm5EUQXQTADy2jeu63q0D3PlwDx2lUMgcDhgmk/J8LqUPg+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+cagmFqbJyHV9ggC9n3hSJbeSa1sm5FUUXRTEDy2jeu63q0D3PlwDx3FYMgAABgmk/J8LqWPw+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+QihmFqbZynV9gwD9n3hSJbeSa1sm5GUYXSTIDy2jeu63q0D3PlwDx3lcMgEAhgmk/J8LqUPAOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UqhmFqbpzHV9hAE9n3hSJbeSa1sm5HUcXTTMDy2jeu63q0D3PlwDx0FAMgIBBgmk/J8LqWPQOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YyhmFqb5znV9hQF9n3hSJbeSa1sm5EUAHQTQTy2jeu63q0D3PlwDx0lEMgMBhgmk/J8LqUPgeBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+c6hmFqbJwDV9hgG9n3hSJbeSa1sm5FUEHRTUTy2jeu63q0D3PlwDx1FIMgQCBgmk/J8LqWPweBRhV6z2q0VF94iJ9pOBAA7';

// CACHE_AGE represents the number of seconds to wait from one update of the
// contacts activity to the next
var CACHE_AGE = 30 * 60;     // 30 minutes

// ================================================================================

var userid = readCookie("USER_ID");
var now = Math.floor((new Date().getTime())/1000);

function is_logged_in() {
    if (!userid || userid <= 0) return 0;
    return 1;
}

// Taken from <http://www.quirksmode.org/js/cookies.html>
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function get_config(subsite) {
    var config = {
        "www": 0,
        "metatalk": 1,
        "ask": 1,
        "projects": 0,
        "music": 0,
        "jobs": 1
    };

    // Get and parse JSON with GM_getValue
    var val = GM_getValue("config");
    if (val) {
        try {
            var c = eval(val);
            config = c;
        } catch (e) { }
    }

    if (subsite) {
        return config[subsite];
    } else {
        return config;
    }
}

function set_config(subsite, value) {
    var config = get_config();

    if (config[subsite] != undefined) {
        config[subsite] = value;
    }

    // Save JSON with GM_setValue
    var c = config.toSource();
    GM_setValue("config", c);
}

function get_subsite() {
    var loc = String(location.host);
    var subdomain = loc.replace(/\..*/, "");

    if (subdomain == "metafilter")    return "www"
    else                return subdomain
}

function prepare_sidebar() {
    var contact_activity = $('<div id="contact_activity"></div>')
        .css({
            'margin': 0,
            'background': 'transparent url(' + THROBBER_SRC + ') no-repeat left',
            'padding-left': '22px'
        })
        .html('<span class="smallcopy">Loading activity</span>');

    if ($(".sidebar").length > 0) {
        // prepend to sidebar
        $(".sidebar:first").prepend(contact_activity);
    } else {
        // TODO - Add a sidebar
        /* var html = '<div id="menufooter" class="sidebar" style="margin-top:10px;">'
             + contact_activity
             + '</div>';
        $("body").append(html); */
    }
}

function get_cache() {
    // Get and parse JSON with GM_getValue
    var val = GM_getValue("data");
    if (!val) return;

    return eval(val);
}

function set_cache(data) {
    data.stamp = now;

    // Save JSON with GM_setValue
    var val = data.toSource();

    GM_setValue("data", val);
}

function get_activity() {
    GM_xmlhttpRequest({
        method: "GET",
        url:    'http://www.metafilter.com/contact-news-mini.mefi',
        onload: handle_activity
    });
}

function handle_activity(d) {
    if (d.readyState == 4 && d.status == 200) {
        var content = d.responseText;
        set_cache( { "content": content } );        
        show_sidebar(content);
    }
}

function show_sidebar(content) {
    if (!content || content.length < 1) return;

    var color = $("body").css('background-color') || '#638B9F';

    var contentdom = $(content);
    contentdom.filter("div").css( { 'border-bottom-color': color, 'text-align': 'left' } );
    contentdom.find("a:not([href^='http://'])").each( function() {
        var newurl = "www.metafilter.com/" + $(this).attr('href');
        newurl = "http://" + newurl.replace("//", "/");
        $(this).attr('href', newurl);
    } );
    contentdom.find(".smallcopy").css("font-size", "80%");

    $("#contact_activity").empty()
        .css({
            'background': 'transparent',
            'padding-left': 0
        })
        .append(contentdom)
        // Add footer
        .after('<div style="margin:10px 0px 10px 0px;padding-bottom:7px;text-align:center;font-size:10px;border-bottom:solid ' + color + ' 1px;">'
            + '<a id="toggle_activity" href="http://www.metafilter.com/javascript-required.mefi">Hide Activity</a> | '
            + '<a href="http://www.metafilter.com/contribute/activity/contacts/" target="_self">All Activity</a>'
            + '</div>');

     $("#toggle_activity")
        .click( function() {
            if ( $("#contact_activity").is(':visible') ) {
                // Turn off this subsite
                set_config(get_subsite(), 0);

                // Hide
                $("#contact_activity").slideUp();
                $(this).text("Show Activity");
            } else {
                // Turn on this subsite
                set_config(get_subsite(), 1);

                // Hide
                $("#contact_activity").slideDown();
                $(this).text("Hide Activity");
            }
            return false;
        } );
}

function init_config() {
    var config = get_config();

    $(".sidebar").eq(0).append(
        '<p class="sidebartext" style="margin-top:3em;margin-bottom:3px;">Show Activity On:</p>' +
        '<div style="padding:7px;">' +
            '<input name="visibleon_XXX" type="checkbox" value="www" style="vertical-align:middle;" checked disabled /> ' +
            '<img src="http://images.metafilter.com/mefi/service-icons/mefi1.gif" style="vertical-align:middle;" width="16" height="16" border="0"/>' +
            ' MetaFilter' +
        '</div>' +
        '<div style="padding:7px;">' +
            '<input name="visibleon" type="checkbox" value="ask" style="vertical-align:middle;"' +
            (config.ask ? ' checked="checked"' : '') + '/> ' +
            '<img src="http://images.metafilter.com/mefi/service-icons/mefi3.gif" style="vertical-align:middle;" width="16" height="16" border="0"/>' +
            ' Ask MetaFilter' +
        '</div>' +
        '<div style="padding:7px;">' +
            '<input name="visibleon" type="checkbox" value="metatalk" style="vertical-align:middle;"' +
            (config.metatalk ? ' checked="checked"' : '') + '/> ' +
            '<img src="http://images.metafilter.com/mefi/service-icons/mefi5.gif" style="vertical-align:middle;" width="16" height="16" border="0"/>' +
            ' MetaTalk' +
        '</div>' +
        /* '<div style="padding:7px;">' +
            '<input name="visibleon" type="checkbox" value="projects" style="vertical-align:middle;"' +
            (config.projects ? ' checked="checked"' : '') + '/> ' +
            '<img src="http://images.metafilter.com/mefi/service-icons/mefi7.gif" style="vertical-align:middle;" width="16" height="16" border="0"/>' +
            ' Projects' +
        '</div>' + */
        /* '<div style="padding:7px;">' +
            '<input name="visibleon" type="checkbox" value="music" style="vertical-align:middle;"' +
            (config.music ? ' checked="checked"' : '') + '/> ' +
            '<img src="http://images.metafilter.com/mefi/service-icons/mefi8.gif" style="vertical-align:middle;" width="16" height="16" border="0"/>' +
            ' Music' +
        '</div>' + */
        '<div style="padding:7px;">' +
            '<input name="visibleon" type="checkbox" value="jobs" style="vertical-align:middle;"' +
            (config.jobs ? ' checked="checked"' : '') + '/> ' +
            '<img src="http://images.metafilter.com/mefi/service-icons/mefi10.gif" style="vertical-align:middle;" width="16" height="16" border="0"/>' +
            ' Jobs' +
        '</div>' +
        '<div style="padding:7px;text-align:center;">' +
            '<input type="button" value="Save" class="button" id="savevisibleon"/>' +
        '</div>'
    );

    $("#savevisibleon").click( function() {
        // Save it
        $("input[name=visibleon]").each( function() {
            var key = $(this).attr("value");
            var val = $(this).attr("checked") ? 1 : 0;
            set_config(key, val);
        } );
        location.reload();
    } );
}

function init() {
    // Are we logged in?
    if (!is_logged_in()) return;

    // Are we on the contact activity page?
    if ( location.href.indexOf('/contribute/activity/contacts/') >= 0 ) {
        init_config();
        return;
    }

    // Are we in a subsite where it's configured on?
    if ( !get_config(get_subsite()) ) {
        return;
    }

    // Prepare
    prepare_sidebar();

    // Load the cache
    var data = get_cache();

    // If the cache is too old, load
    // <http://www.metafilter.com/contribute/activity/contacts/>
    if (!data || !data.stamp || (now - data.stamp > CACHE_AGE)) {
        data = get_activity();
    } else {
        show_sidebar(data.content);
    }
}

init();
